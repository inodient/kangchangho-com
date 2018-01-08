const menuService = require( require("path").join( __runningPath, "application", "services", "service_menu.js" ) );
const categoryService = require( require("path").join( __runningPath, "application", "services", "service_category.js" ) );
const writerService = require( require("path").join( __runningPath, "application", "services", "service_writer.js" ) );
const hashService = require( require("path").join( __runningPath, "application", "services", "service_hash.js" ) );
const imageService = require( require("path").join( __runningPath, "application", "services", "service_image.js" ) );
const langService = require( require("path").join( __runningPath, "application", "services", "service_lang.js" ) );
const contentService = require( require("path").join( __runningPath, "application", "services", "service_content.js" ) );
const announceService = require( require("path").join( __runningPath, "application", "services", "service_announce.js" ) );
const bannerService = require( require("path").join( __runningPath, "application", "services", "service_banner.js" ) );




exports.control = function( req, res, connection ){
	return new Promise( function(resolve, reject){

		langService.setDefaultLang( req, res )
    .then( function( lang ){
      var contentId = req.query[ "id" ];
      var promises = [];

  		promises.push( menuService.getMenuListByLang( connection, contentId, lang ) );
			promises.push( menuService.getMenuList( connection ) );
      promises.push( writerService.getWriterList( connection )  );
			promises.push( contentService.selectAnnounceContentList( connection )  );
			promises.push( announceService.selectAnnounceCategory( connection ) );
			promises.push( announceService.selectAnnounceType( connection ) );
			promises.push( bannerService.getBanner( connection, lang ) );

  		Promise.all( promises )
  		.then( function(){
  			var argv = arguments[0];

        var modelObject = Object.assign( argv[0], argv[1], argv[2], argv[3], argv[4], argv[5], argv[6] );

        logger.debug( modelObject );

  			resolve( modelObject );
  		} )
  		.catch( function(err){
  			reject( err );
  		} );
    } )
    .catch( function( err ){
      reject( err );
    } );
	} );
}


exports.control_add_category = function( req, res, connection ){
	return new Promise( function(resolve, reject){
		categoryService.insertCategory( req, connection )
		.then( function( results ){
			resolve( {lastId : results.lastId} );
		} )
		.catch( function( err ){
			reject( err );
		} );
	} );
}


exports.control_add_writer = function( req, res, connection ){
	return new Promise( function(resolve, reject){
		writerService.insertWriter( req, connection )
		.then( function( results ){
			resolve( {lastId: results.lastId} );
		} )
		.catch( function(err){
			reject( err );
		} );
	} );
}


exports.control_upload_image = function( req, res, connection ){
  return new Promise( function(resolve, reject){
    imageService.insertImage( req, connection )
		.then( function( _savedFileName ){
			resolve( {savedFileName: _savedFileName} );
		} )
		.catch( function( err ){
			reject( err );
		} );
  } );
}


exports.control_upload_content = function( req, res, connection ){
  return new Promise( function(resolve, reject){

		logger.debug( req.body );
    logger.debug( "control_upload_content" );

		var promises = [];

		promises.push( imageService.setImageType( connection, "main", req.body.image_main ) );
		promises.push( imageService.setImageType( connection, "carousel", req.body.image_carousel ) );

		Promise.all( promises )
		.then( function(){

			var argv = arguments[0];

			req.body.image_main = argv[0];
			req.body.image_carousel = argv[1];

			contentService.insertContent( connection, req.body )
			.then( function( contentId ){

				var _promises = [];
				var hashesList = req.body.hashesList;

				for( var i=0; i<hashesList.length; i++ ){
					_promises.push( hashService.insertHash( connection, contentId, hashesList[i] ) );
				}

				Promise.all( _promises )
				.then( function(){
					logger.debug( "contentId :", contentId );

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

		logger.debug( req.body );
    logger.debug( "control_upload_announce" );

		announceService.insertAnnounce( connection, req.body )
		.then( function( results ){
			logger.debug( "announceId", results );
			resolve( {"announceId": results} );
		} )
		.catch( function( err ){
			reject( err );
		} );
	} );
}
