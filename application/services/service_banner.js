const contentService = require( require("path").join( __runningPath, "application", "services", "service_content.js" ) );
const hashService = require( require("path").join( __runningPath, "application", "services", "service_hash.js" ) );




exports.getBanner = function( connection, lang ){
  return new Promise( function(resolve, reject){
    var promises = [];

    promises.push( hashService.selectHashRanking( connection ) );
    promises.push( contentService.selectRecentContents( connection, lang ) );
    promises.push( contentService.selectMostViewedContents( connection, lang ) );

    Promise.all( promises )
    .then( function(){
      var argv = arguments[0];
      var modelObject = Object.assign( argv[0], argv[1], argv[2] );

      resolve( modelObject );
    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}
