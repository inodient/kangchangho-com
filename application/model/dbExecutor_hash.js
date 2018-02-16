exports.getHashRanking = function( connection, contentId, hashId ){
	return new Promise( function(resolve, reject){
		var params = [];
		var queryId = "getHashRanking";

		mysqlHandler.executeQuery( queryId, params, connection )
		.then( function( queryResults ){
			resolve( queryResults.results );
		} )
		.catch( function( err ){
			logger.error( "addContentHashLink" );
			reject( err );
		} );
	} );
}






exports.getContentHash = function( connection, contentId, lang ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getContentHash";

    params.push( contentId );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.getAnnounceHashes = function( connection, lang, announceId ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getAnnounceHashes";

    params.push( announceId );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}

exports.getSearchHashes = function( connection, lang, searchWord ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getSearchHashes";

    params.push( lang );
    params.push( searchWord );
    params.push( searchWord );
    params.push( lang );
    params.push( searchWord );
    params.push( searchWord );
    params.push( lang );
    params.push( searchWord );
    params.push( searchWord );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      logger.debug( queryResults.results );

      resolve( queryResults.results );
    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}

exports.getCategoryHashes = function( connection, targetId ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getCategoryHashes";

    params.push( targetId );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}

exports.getWriterHashes = function( connection, targetId ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getWriterHashes";

    params.push( targetId );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}

exports.getHashHashes = function( connection, targetId ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getHashHashes";

    params.push( targetId );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}









exports.getHashText = function( connection, lang, hashId ){
	return new Promise( function(resolve, reject){
		var params = [];
    var queryId = "getHashText";

    params.push( hashId );

		mysqlHandler.executeQuery( queryId, params, connection )
		.then( function( queryResults ){
			resolve( queryResults.results );
		} )
		.catch( function(err){
			reject( err );
		} );
	} );
}

exports.increaseHashHitCount = function( connection, hashId ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "increaseHashHitCount";

    params.push( hashId );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( {"status":"succeed"} );
    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}





exports.addHash = function( connection, contentId, hashText ){
	return new Promise( function(resolve, reject){

		var params = [];
		var queryId = "addHash";

		params.push( hashText );

		mysqlHandler.executeQuery( queryId, params, connection )
		.then( function(){
			resolve( {"status":"succeed"} );
		} )
		.catch( function( err ){
			reject( err );
		} );
	} );
}

exports.getInsertedHashId = function( connection, hashText ){
	return new Promise( function(resolve, reject){
		var params = [];
		var queryId = "getInsertedHashId";

		params.push( hashText );

		mysqlHandler.executeQuery( queryId, params, connection )
		.then( function( queryResults ){
			resolve( queryResults.results );
		} )
		.catch( function( err ){
			reject( err );
		} );
	} );
}

exports.addContentHashLink = function( connection, contentId, hashId ){
	return new Promise( function(resolve, reject){
		var params = [];
		var queryId = "addContentHashLink";

		params.push( contentId );
		params.push( hashId );

		mysqlHandler.executeQuery( queryId, params, connection )
		.then( function( queryResults ){
			resolve( {"status":"succeed"} );
		} )
		.catch( function( err ){
			reject( err );
		} );
	} );
}
