const staticService = require( require("path").join( __runningPath, "application", "services", "service_static.js" ) );
const contentService = require( require("path").join( __runningPath, "application", "services", "service_content.js" ) );




exports.control = function( req, res, connection ){
  return new Promise( function(resolve, reject){

    var targetId = req.params.id;

    staticService.getStaticInfo( req, res, connection, targetId )
    .then( function( staticInfo ){
      var lang = staticInfo.lang;
      var promises = [];

      promises.push( contentService.getContent( connection, targetId, lang ) );

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
