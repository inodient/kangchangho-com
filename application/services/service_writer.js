exports.insertWriter = function( req, connection ){
  return new Promise( function(resolve, reject){

		logger.debug( req.body );
		logger.debug( "control_add_writer" );

		addWriter( connection, req.body )
		.then( function(){

			getLastWriterIndex( connection )
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

exports.getWriterList = function( connection ){
  return new Promise( function(resolve, reject){
		var params = [];
		var queryId = "getWriterList";

		mysqlHandler.executeQuery( queryId, params, connection )
		.then( function( queryResults ){
			resolve( {"writer": queryResults.results} );
		} )
		.catch( function(err){
			reject( err );
		} );
	} );
}




function addWriter( connection, parameter ){
	return new Promise( function(resolve, reject){
		var params = [];
		var queryId = "addWriter";

		params.push( parameter.writer_en );
		params.push( parameter.writer_ko );
		params.push( parameter.email );
		params.push( parameter.description_en );
		params.push( parameter.description_ko );

		mysqlHandler.executeQuery( queryId, params, connection )
		.then( function( queryResults ){
			resolve( "success" );
		} )
		.catch( function( err ){
			reject( err );
		} );
	} );
}

function getLastWriterIndex( connection ){
	return new Promise( function(resolve, reject){
		var params = [];
		var queryId = "getLastWriterIndex";

		mysqlHandler.executeQuery( queryId, params, connection )
		.then( function( queryResults ){
			resolve( queryResults.results );
		} )
		.catch( function( err ){
			reject( err );
		} );
	} );
}
