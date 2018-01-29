const dbExecutorHash = require( require("path").join( __runningPath, "application", "model", "dbExecutor_hash.js" ) );




// SEARCH - START
exports.getAnnounceHashes = function( connection, lang, announceId ){
  return new Promise( function(resolve, reject){
    dbExecutorHash.getAnnounceHashes( connection, lang, announceId )
    .then( function( results ){
      resolve( {"listHashes":results} );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.getSearchHashes = function( connection, lang, searchWord ){
  return new Promise( function(resolve, reject){
    dbExecutorHash.getSearchHashes( connection, lang, "%" + searchWord + "%" )
    .then( function(results){
      resolve( {"listHashes":results} );
    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}

exports.getCategoryHashes = function( connection, targetId ){
  return new Promise( function(resolve, reject){
    dbExecutorHash.getCategoryHashes( connection, targetId )
    .then( function(results){
      resolve( {"listHashes":results} );
    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}

exports.getWriterHashes = function( connection, targetId ){
  return new Promise( function(resolve, reject){
    dbExecutorHash.getWriterHashes( connection, targetId )
    .then( function(results){
      resolve( {"listHashes":results} );
    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}

exports.getHashHashes = function( connection, targetId ){
  return new Promise( function(resolve, reject){
    dbExecutorHash.getHashHashes( connection, targetId )
    .then( function(results){
      resolve( {"listHashes":results} );
    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}
// SEARCH - END





// SEARCH HASH - START
exports.getHashText = function( connection, lang, hashId ){
  return new Promise( function(resolve, reject){
    dbExecutorHash.getHashText( connection, lang, hashId )
    .then( function(results){

      var results = results;
      results[0].search_text = "#" + results[0].search_text;

      resolve( {"searchText":results} );
    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}

exports.increaseHashHitCount = function( connection, hashId ){
  return new Promise( function(resolve, reject){
    dbExecutorHash.increaseHashHitCount( connection, hashId )
    .then( function( results ){
      resolve( results );
    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}
// SEARCH HASH - END






// WRITE - START
exports.addHash = function( connection, contentId, hashText ){
  return new Promise( function(resolve, reject){

		dbExecutorHash.addHash( connection, contentId, hashText )
		.then( function(){

			dbExecutorHash.getInsertedHashId( connection, hashText )
			.then( function( results ){

        var hashId = ( results[0] )._ID;

				dbExecutorHash.addContentHashLink( connection, contentId, hashId )
				.then( function(){
					resolve( {"status":"succeed"} );
				} )
				.catch( function( __err ){
					reject( __err );
				} );

			} )
			.catch( function( _err ){
				reject( _err );
			} );
		} )
		.catch( function( err ){
			reject( err );
		} );
	} );
}
// WRITE - END

















// function addHash( connection, contentId, hashText ){
// 	return new Promise( function(resolve, reject){
//
// 		var params = [];
// 		var queryId = "addHash";
//
// 		params.push( hashText );
//
// 		mysqlHandler.executeQuery( queryId, params, connection )
// 		.then( function( queryResults ){
//
// 			getInsertedHashId( connection, hashText )
// 			.then( function( hashId ){
//
// 				addContentHashLink( connection, contentId, hashId )
// 				.then( function(){
// 					resolve( {} );
// 				} )
// 				.catch( function( __err ){
// 					reject( __err );
// 				} );
//
// 			} )
// 			.catch( function( _err ){
// 				reject( _err );
// 			} );
// 		} )
// 		.catch( function( err ){
// 			logger.error( "addHash" );
// 			reject( err );
// 		} );
// 	} );
// }
//
// function getInsertedHashId( connection, hashText ){
// 	return new Promise( function(resolve, reject){
// 		var params = [];
// 		var queryId = "getInsertedHashId";
//
// 		params.push( hashText );
//
// 		mysqlHandler.executeQuery( queryId, params, connection )
// 		.then( function( queryResults ){
// 			resolve( ( (queryResults.results)[0] )._ID );
// 		} )
// 		.catch( function( err ){
// 			logger.error( "getInsertedHashId" );
// 			reject( err );
// 		} );
// 	} );
// }
//
// function addContentHashLink( connection, contentId, hashId ){
// 	return new Promise( function(resolve, reject){
// 		var params = [];
// 		var queryId = "addContentHashLink";
//
// 		params.push( contentId );
// 		params.push( hashId );
//
// 		logger.debug( contentId, hashId );
//
// 		mysqlHandler.executeQuery( queryId, params, connection )
// 		.then( function( queryResults ){
// 			resolve( {} );
// 		} )
// 		.catch( function( err ){
// 			logger.error( "addContentHashLink" );
// 			reject( err );
// 		} );
// 	} );
// }
