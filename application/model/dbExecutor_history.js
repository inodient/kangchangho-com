exports.addAccessHistory = function( connection, parameter ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "addAccessHistory";

    params.push( parameter.contextPath );
    params.push( parameter.path );
    params.push( parameter.client );
    params.push( parameter.lang );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( {"status":"succeed"} );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}
