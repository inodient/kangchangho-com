const staticService = require( require("path").join( __runningPath, "application", "services", "service_static.js" ) );
const menuService = require( require("path").join( __runningPath, "application", "services", "service_menu.js" ) );
const contentService = require( require("path").join( __runningPath, "application", "services", "service_content.js" ) );
const writerService = require( require("path").join( __runningPath, "application", "services", "service_writer.js" ) );
const announceService = require( require("path").join( __runningPath, "application", "services", "service_announce.js" ) );
const imageService = require( require("path").join( __runningPath, "application", "services", "service_image.js" ) );
const hashService = require( require("path").join( __runningPath, "application", "services", "service_hash.js" ) );




exports.control = function( req, res, connection ){
	return new Promise( function(resolve, reject){

		var targetId = req.params.id;

    staticService.getStaticInfo( req, res, connection, targetId )
    .then( function( staticInfo ){
      var lang = staticInfo.lang;
      var promises = [];

			promises.push( menuService.getMenuList( connection ) );
      promises.push( writerService.getWriterList( connection )  );
			promises.push( contentService.getAnnounceContentList( connection )  );
			promises.push( announceService.getAnnounceCategory( connection ) );
			promises.push( announceService.getAnnounceType( connection ) );

      Promise.all( promises )
      .then( function(){
        var argv = arguments[0];

				logger.debug( argv[0] );
				logger.debug( argv[1] );
				logger.debug( argv[2] );
				logger.debug( argv[3] );

        resolve( Object.assign( staticInfo, argv[0], argv[1], argv[2], argv[3], argv[4] ) );

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

			contentService.addContent( connection, req.body )
			.then( function( contentId ){

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

		} )
		.catch( function(err){
			reject( err );
		} );
  } );
}

exports.control_upload_announce = function( req, res, connection ){
	return new Promise( function(resolve, reject){
		announceService.addAnnounce( connection, req.body )
		.then( function( results ){
			resolve( results );
		} )
		.catch( function( err ){
			reject( err );
		} );
	} );
}
