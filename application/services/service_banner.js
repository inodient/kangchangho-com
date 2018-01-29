const dbExecutorContent = require( require("path").join( process.cwd(), "application", "model", "dbExecutor_content" ) );
const dbExecutorHash = require( require("path").join( process.cwd(), "application", "model", "dbExecutor_hash" ) );




exports.getBanner = function( connection, lang ){
  return new Promise( function(resolve, reject){
    var promises = [];

    promises.push( dbExecutorHash.getHashRanking( connection ) );
    promises.push( dbExecutorContent.getRecentContentList( connection, lang ) );
    promises.push( dbExecutorContent.getMostViewedContentList( connection, lang ) );

    Promise.all( promises )
    .then( function(){
      var argv = arguments[0];

      var recentContents = {"recentContents": argv[1]};
      var mostViewedContents = {"mostViewedContents": argv[2]};

      var modelObject = Object.assign( argv[0], recentContents, mostViewedContents );

      resolve( modelObject );
    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}
