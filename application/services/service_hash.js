exports.insertHash = function( connection, contentId, hashText ){
  return new Promise( function(resolve, reject){
    addHash( connection, contentId, hashText )
    .then( function(){
      resolve( {} );
    } )
    .catch( function(err){
    } );
  } );
}

exports.selectHashRanking = function( connection ){
  return new Promise( function(resolve, reject){
    getHashRanking( connection )
    .then( function( results ){
      resolve( results );
    } )
    .catch( function(err){
    } );
  } );
}




function addHash( connection, contentId, hashText ){
	return new Promise( function(resolve, reject){

		var params = [];
		var queryId = "addHash";

		params.push( hashText );

		mysqlHandler.executeQuery( queryId, params, connection )
		.then( function( queryResults ){

			getInsertedHashId( connection, hashText )
			.then( function( hashId ){

				addContentHashLink( connection, contentId, hashId )
				.then( function(){
					resolve( {} );
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
			logger.error( "addHash" );
			reject( err );
		} );
	} );
}

function getInsertedHashId( connection, hashText ){
	return new Promise( function(resolve, reject){
		var params = [];
		var queryId = "getInsertedHashId";

		params.push( hashText );

		mysqlHandler.executeQuery( queryId, params, connection )
		.then( function( queryResults ){
			resolve( ( (queryResults.results)[0] )._ID );
		} )
		.catch( function( err ){
			logger.error( "getInsertedHashId" );
			reject( err );
		} );
	} );
}

function addContentHashLink( connection, contentId, hashId ){
	return new Promise( function(resolve, reject){
		var params = [];
		var queryId = "addContentHashLink";

		params.push( contentId );
		params.push( hashId );

		logger.debug( contentId, hashId );

		mysqlHandler.executeQuery( queryId, params, connection )
		.then( function( queryResults ){
			resolve( {} );
		} )
		.catch( function( err ){
			logger.error( "addContentHashLink" );
			reject( err );
		} );
	} );
}

function getHashRanking( connection, contentId, hashId ){
	return new Promise( function(resolve, reject){
		var params = [];
		var queryId = "getHashRanking";

		mysqlHandler.executeQuery( queryId, params, connection )
		.then( function( queryResults ){
			resolve( {"hashRanking":queryResults.results} );
		} )
		.catch( function( err ){
			logger.error( "addContentHashLink" );
			reject( err );
		} );
	} );
}
