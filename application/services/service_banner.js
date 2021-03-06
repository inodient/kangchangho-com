var dbExecutorContent = require( require("path").join( process.cwd(), "application", "model", "dbExecutor_content.js" ) );
var dbExecutorHash = require( require("path").join( process.cwd(), "application", "model", "dbExecutor_hash.js" ) );
var dbExecutorNewsletter = require( require("path").join( process.cwd(), "application", "model", "dbExecutor_newsletter.js" ) );



exports.getBanner = function( connection, lang ){
  return new Promise( function(resolve, reject){
    var promises = [];

    promises.push( dbExecutorHash.getHashRanking( connection ) );
    promises.push( dbExecutorContent.getRecentContentList( connection, lang ) );
    promises.push( dbExecutorNewsletter.getRecentNewsLetterList( connection, lang ) );
    promises.push( dbExecutorContent.getMostViewedContentList( connection, lang ) );

    Promise.all( promises )
    .then( function(){
      var argv = arguments[0];

      var hashRanking = {"hashRanking":argv[0]} ;
      var recentContents = {"recentContents": argv[1]};
      var newsLetters = {"newsLetters": argv[2]};
      var mostViewedContents = {"mostViewedContents": argv[3]};

      var modelObject = Object.assign( hashRanking, recentContents, newsLetters, mostViewedContents );

      resolve( modelObject );
    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}
