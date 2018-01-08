exports.getMenuList = function( connection ){
  return new Promise( function(resolve, reject){
		var params = [];
		var queryId = "getMenuList";

		mysqlHandler.executeQuery( queryId, params, connection )
		.then( function( queryResults ){
			resolve( {"category":queryResults.results} );
		} )
		.catch( function(err){
			reject( err );
		} );
	} );
}

exports.getMenuListByLang = function( connection, contentId, lang ){
  return new Promise( function(resolve, reject){
		var params = [];
		var queryId = "getMenuListByLang";

    params.push( lang );
    params.push( contentId );
    params.push( contentId );

		mysqlHandler.executeQuery( queryId, params, connection )
		.then( function( queryResults ){
			resolve( {"menu":queryResults.results} );
		} )
		.catch( function(err){
			reject( err );
		} );
	} );
}
