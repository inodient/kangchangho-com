const menuService = require( require("path").join( __runningPath, "application", "services", "service_menu.js" ) );
const langService = require( require("path").join( __runningPath, "application", "services", "service_lang.js" ) );
const contentService = require( require("path").join( __runningPath, "application", "services", "service_content.js" ) );
const hashService = require( require("path").join( __runningPath, "application", "services", "service_hash.js" ) );
const bannerService = require( require("path").join( __runningPath, "application", "services", "service_banner.js" ) );




exports.control = function( req, res, connection ){
  return new Promise( function(resolve, reject){

    langService.setDefaultLang( req, res )
    .then( function( lang ){
      var contentId = req.query[ "id" ];
      var promises = [];

  		promises.push( menuService.getMenuListByLang( connection, contentId, lang ) );
      promises.push( contentService.selectContent( connection, contentId, lang ) );
      promises.push( contentService.selectRelatedContents( connection, lang ) );
      promises.push( bannerService.getBanner( connection, lang ) );

  		Promise.all( promises )
  		.then( function(){
  			var argv = arguments[0];
        var modelObject = Object.assign( argv[0], argv[1], argv[2], argv[3] );

        contentService.updateContentHitCount( connection, contentId )
        .then( function( results ){
          if( results.status === "succeed" ){
            resolve( modelObject );
          } else{
            reject( {"status": "error occured"} );
          }
        } )
        .catch( function( _err ){
          reject( _err );
        } );
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
