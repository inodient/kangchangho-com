const dbExecutorWriter = require( require("path").join( __runningPath, "application", "model", "dbExecutor_writer.js") );



// SEARCH - START
exports.getWriterText = function( connection, lang, writerId ){
  return new Promise( function(resolve, reject){
    dbExecutorWriter.getWriterText( connection, lang, writerId )
    .then( function( results ){
      resolve( {"searchText": results} );
    } )
    .catch( function(err){
      reject( err );
    } );
	} );
}
// SEARCH - END




// WRITE - START
exports.getWriterList = function( connection ){
  return new Promise( function(resolve, reject){
    dbExecutorWriter.getWriterList( connection  )
    .then( function( results ){
      resolve( {"writer": results} );
    } )
    .catch( function(err){
      reject( err );
    } );
	} );
}

exports.addWriter = function( req, connection ){
  return new Promise( function(resolve, reject){
		dbExecutorWriter.addWriter( connection, req.body )
		.then( function(){

			dbExecutorWriter.getLastWriterIndex( connection )
			.then( function( results ){
				resolve( {lastId:results[0].lastId} );
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
// WRITE - END
