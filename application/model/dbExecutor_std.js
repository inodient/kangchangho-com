exports.getHeaderInfo = function( connection, lang, target ){
  return new Promise( function(resolve, reject){
    var queryId = "getHeaderInfo";
    var params = [];

    params.push( lang );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function(queryResults){
      resolve( queryResults.results );
    } )
    .catch( function(err){
      reject( err );
    } )
  } );
}

exports.getFooterInfo = function( connection, lang ){
  return new Promise( function(resolve, reject){
    var queryId = "getFooterInfo";
    var params = [];

    params.push( lang );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function(queryResults){
      resolve( queryResults.results );
    } )
    .catch( function(err){
      reject( err );
    } )
  } );
}
