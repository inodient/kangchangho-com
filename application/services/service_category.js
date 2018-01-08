exports.insertCategory = function( req, connection ){
  return new Promise( function(resolve, reject){

		logger.debug( req.body );
		logger.debug( "service_insert_category" );

		addCategory( connection, req.body )
		.then( function(){
			var argv = arguments[0];

			getLastCategoryIndex( connection )
			.then( function( results ){
				resolve( {lastId : results[0].lastId} );
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




function addCategory( connection, parameter ){
	return new Promise( function(resolve, reject){
		var params = [];
		var queryId = "addCategory";

		params.push( parameter.category_en );
		params.push( parameter.category_ko );
		params.push( parameter.category_en );
		params.push( parameter.parent_id );
		params.push( parameter.parent_id );
		params.push( parameter.parent_id );
		params.push( parameter.parent_id );

		mysqlHandler.executeQuery( queryId, params, connection)
		.then( function( queryResults ){
			resolve( "success" );
		} )
		.catch( function(err){
			reject( err );
		} );
	} );
}

function getLastCategoryIndex( connection ){
	return new Promise( function(resolve, reject){
		var params = [];
		var queryId = "getLastCategoryIndex";

		mysqlHandler.executeQuery( queryId, params, connection )
		.then( function( queryResults ){
			resolve( queryResults.results );
		} )
		.catch( function(err){
			reject( err );
		} );
	} );
}
