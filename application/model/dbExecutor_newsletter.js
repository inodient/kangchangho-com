exports.addSubscription = function( connection, addr, lang ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "addSubscription";

    params.push( addr );
    params.push( lang );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.checkSubscription = function( connection, addr, lang ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "checkSubscription";

    params.push( addr );
    params.push( lang );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
		} )
		.catch( function( err ){
			reject( err );
		} );

  } );
}

exports.getRecentNewsLetterList = function( connection, lang ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getRecentNewsLetterList";

    params.push( lang );
    params.push( lang );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}
