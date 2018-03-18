var staticService = require( require("path").join( __runningPath, "application", "services", "service_static.js" ) );
var menuService = require( require("path").join( __runningPath, "application", "services", "service_menu.js" ) );
var contentService = require( require("path").join( __runningPath, "application", "services", "service_content.js" ) );
var writerService = require( require("path").join( __runningPath, "application", "services", "service_writer.js" ) );
var announceService = require( require("path").join( __runningPath, "application", "services", "service_announce.js" ) );
var newsletterService = require( require("path").join( __runningPath, "application", "services", "service_newsletter.js" ) );
var imageService = require( require("path").join( __runningPath, "application", "services", "service_image.js" ) );
var hashService = require( require("path").join( __runningPath, "application", "services", "service_hash.js" ) );




exports.control = function( req, res, connection ){
	return new Promise( function(resolve, reject){

		var targetId = req.params.id;

	    staticService.getStaticInfo( req, res, connection, targetId )
	    .then( function( staticInfo ){
	      var lang = staticInfo.lang;
	      var promises = [];

				promises.push( menuService.getMenuList( connection ) );
	      promises.push( writerService.getWriterList( connection ) );
				promises.push( contentService.getAnnounceContentList( connection ) );
				promises.push( announceService.getNewsletterAnnounceList( connection ) );
				promises.push( announceService.getAnnounceCategory( connection ) );
				promises.push( announceService.getAnnounceType( connection ) );

	      Promise.all( promises )
	      .then( function(){
	        var argv = arguments[0];
	        resolve( Object.assign( staticInfo, argv[0], argv[1], argv[2], argv[3], argv[4], argv[5] ) );
	      } )
	      .catch( function( _err ){
	        reject( _err );
	      } )

	    } )
	    .catch( function( err ){
	      reject( err );
	    } );
	} );
}

exports.control_modify = function( req, res, connection ){
	return new Promise( function( resolve, reject ){

		var type = req.params.type;
		var id = req.params.id;

		staticService.getStaticInfo( req, res, connection, id )
    .then( function( staticInfo ){
      var lang = staticInfo.lang;
      var promises = [];

			promises.push( menuService.getMenuList( connection ) );
      promises.push( writerService.getWriterList( connection )  );
			promises.push( contentService.getAnnounceContentList( connection )  );
			promises.push( announceService.getNewsletterAnnounceList( connection ) );
			promises.push( announceService.getAnnounceCategory( connection ) );
			promises.push( announceService.getAnnounceType( connection ) );

			if( type === "about" ){
				promises.push( contentService.getModifyAboutContentMaster( connection, id ) );
			} else if( type === "content" ){
				promises.push( contentService.getModifyContentMaster( connection, id ) );
			} else if( type === "announce" ){
				promises.push( announceService.getModifyAnnounceMaster( connection, id ) );
			} else if( type === "newsletter" ){
				promises.push( newsletterService.getModifyNewsLetterMaster( connection, id ) );
			}

			Promise.all( promises )
      .then( function(){
        var argv = arguments[0];
        resolve( Object.assign( staticInfo, argv[0], argv[1], argv[2], argv[3], argv[4], argv[5], argv[6] ) );
      } )
      .catch( function( _err ){
        reject( _err );
      } )

    } )
    .catch( function( err ){
      reject( err );
    } );
	} );
}






exports.control_add_category = function( req, res, connection ){
	return new Promise( function(resolve, reject){
		menuService.addCategory( req, connection )
		.then( function( results ){
			resolve( results );
		} )
		.catch( function( err ){
			reject( err );
		} );
	} );
}

exports.control_add_writer = function( req, res, connection ){
	return new Promise( function(resolve, reject){
		writerService.addWriter( req, connection )
		.then( function( results ){
			resolve( results );
		} )
		.catch( function(err){
			reject( err );
		} );
	} );
}






exports.control_upload_image = function( req, res, connection ){
  return new Promise( function(resolve, reject){
    imageService.addImage( req, connection )
		.then( function( results ){
			resolve( results );
		} )
		.catch( function( err ){
			reject( err );
		} );
  } );
}

exports.control_upload_content = function( req, res, connection ){
  return new Promise( function(resolve, reject){
		var promises = [];

		promises.push( imageService.setImageType( connection, "main", req.body.image_main ) );
		promises.push( imageService.setImageType( connection, "carousel", req.body.image_carousel ) );

		Promise.all( promises )
		.then( function(){

			var argv = arguments[0];

			req.body.image_main = argv[0];
			req.body.image_carousel = argv[1];

			if( req.body.writeMode === "insert" ){

				contentService.addContent( connection, req.body )
				.then( function( result ){

					var contentId = result.contentId;

					var _promises = [];
					var hashesList = req.body.hashesList;
					
					for( var i=0; i<hashesList.length; i++ ){
						_promises.push( hashService.addHash( connection, contentId, hashesList[i] ) );
					}

					Promise.all( _promises )
					.then( function(){
						resolve( {"contentId": contentId} );
					} )
					.catch( function( __err ){
						reject( __err );
					} );

				} )
				.catch( function(_err){
					reject( _err );
				} );


			} else if( req.body.writeMode === "modify" ){

				contentService.modifyContent( connection, req.body )
				.then( function( result ){

					var contentId = result.contentId;

					var _promises = [];
					var hashesList = req.body.hashesList;

					if( typeof hashesList != "undefined" ){

						for( var i=0; i<hashesList.length; i++ ){
							_promises.push( hashService.modifyHash( connection, contentId, hashesList[i] ) );

							Promise.all( _promises )
							.then( function(){
								resolve( {"contentId": contentId} );
							} )
							.catch( function( __err ){
								reject( __err );
							} );
						}
					} else {
						resolve( {"contentId": contentId} );
					}

				} )
				.catch( function(_err){
					reject( _err );
				} );

			}

		} )
		.catch( function(err){
			reject( err );
		} );
  } );
}

exports.control_upload_announce = function( req, res, connection ){
	return new Promise( function(resolve, reject){

		if( req.body.writeMode === "insert" ){
			announceService.addAnnounce( connection, req.body )
			.then( function( results ){
				resolve( results );
			} )
			.catch( function( err ){
				reject( err );
			} );
		} else if( req.body.writeMode === "modify" ){
			announceService.modifyAnnounce( connection, req.body )
			.then( function( results ){
				resolve( results );
			} )
			.catch( function( err ){
				reject( err );
			} );
		}

	} );
}

exports.control_upload_newsletter = function( req, res, connection ){
	return new Promise( function(resolve, reject){

		imageService.setImageType( connection, "newsletter", req.body.image_main )
		.then( function( imageId ){
			req.body.imageId = imageId;

			if( req.body.writeMode === "insert" ){
				newsletterService.addNewsLetter( connection, req.body )
				.then( function( results ){
					resolve( results );
				} )
				.catch( function( err ){
					reject( err );
				} );
			} else if( req.body.writeMode === "modify" ){
				newsletterService.modifyNewsLetter( connection, req.body )
				.then( function( results ){
					resolve( results );
				} )
				.catch( function( err ){
					reject( err );
				} );
			}
		} );

	} );
}
