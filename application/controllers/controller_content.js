var staticService = require( require("path").join( __runningPath, "application", "services", "service_static.js" ) );
var contentService = require( require("path").join( __runningPath, "application", "services", "service_content.js" ) );
var commentService = require( require("path").join( __runningPath, "application", "services", "service_comment.js" ) );




exports.control = function( req, res, connection ){
  return new Promise( function(resolve, reject){

    var targetId = req.params.id;

    staticService.getStaticInfo( req, res, connection, targetId )
    .then( function( staticInfo ){
      var lang = staticInfo.lang;
      var promises = [];

      promises.push( contentService.getContent( connection, targetId, lang ) );
      promises.push( commentService.getComment( connection, targetId, lang ) );

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

exports.control_increase_like = function( req, res, connection ){
  return new Promise( function(resolve, reject){
    var contentId = req.body.contentid;

    contentService.increaseContentLikeCount( connection, contentId )
    .then( function(){
      resolve( {"STATUS" : "SUCCEED"} );
    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}

exports.control_about = function( req, res, connection ){
  return new Promise( function(resolve, reject){

    staticService.getStaticInfo( req, res, connection, "" )
    .then( function( staticInfo ){
      var lang = staticInfo.lang;
      var promises = [];

      promises.push( contentService.getAboutContent( connection, lang ) );

      Promise.all( promises )
      .then( function(){
        var argv = arguments[0];
        resolve( Object.assign( staticInfo, argv[0] ) );
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
