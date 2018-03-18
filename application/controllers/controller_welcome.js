var staticService = require( require("path").join( __runningPath, "application", "services", "service_static.js" ) );
var contentService = require( require("path").join( __runningPath, "application", "services", "service_content.js" ) );
var announceService = require( require("path").join( __runningPath, "application", "services", "service_announce.js" ) );
var langService = require( require("path").join( __runningPath, "application", "services", "service_lang.js" ) );




exports.control = function( req, res, connection ){
  return new Promise( function(resolve, reject){

    var targetId = req.params.id;

    staticService.getStaticInfo( req, res, connection, targetId )
    .then( function( staticInfo ){
      var lang = staticInfo.lang;
      var promises = [];

      promises.push( announceService.getMainAnnounces( connection, lang ) );
      promises.push( contentService.getPageList( connection, lang ) );

      Promise.all( promises )
      .then( function(){
        var argv = arguments[0];
        resolve( Object.assign( staticInfo, argv[0], argv[1] ) );
      } )
      .catch( function( _err ){
        reject( _err );
      } );
    } )
    .catch( function(err){
      reject( err );
    } );
	} );
}

exports.control_other_pages = function( req, res, connection ){
  return new Promise( function(resolve, reject){

    langService.setDefaultLang( req, res )
    .then( function( lang ){
      contentService.getPageListByIndex( connection, lang, req.body )
      .then( function(results){
        resolve( results );
      } )
      .catch( function(err){
        reject( err );
      } );
    } );
  } );
}
