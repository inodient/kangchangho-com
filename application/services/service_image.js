exports.insertImage = function( req, connection ){

  return new Promise( function(resolve, reject){
    fileHandler.uploadFile( req, "image" )
    .then( function(results){
      logger.debug( results.savedFileName, " saved...." );
      logger.debug( results );

      addImage( connection, results )
      .then( function(){
        resolve( results.savedFileName );
      } )
      .catch( function(_err){
        reject( _err );
      } );

    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}




exports.setImageType = function( connection, type, savedFileName ){
  return new Promise( function(resolve, reject){

		var params = [];
		var queryId = "setImageType";

		params.push( type );
		params.push( savedFileName );

		mysqlHandler.executeQuery( queryId, params, connection )
		.then( function(queryResults){

			getUpdatedImageId( connection, savedFileName )
			.then( function( _queryResults ){
				resolve( _queryResults );
			} )
			.catch( function(_err){
				reject( _err );
			} );

		} )
		.catch( function(err){
			reject( err );
		} );
	} );
}




function getUpdatedImageId( connection, savedFileName ){
	return new Promise( function(resolve, reject){

		var params = [];
		var queryId = "getUpdatedImageId";

		params.push( savedFileName );

		mysqlHandler.executeQuery( queryId, params, connection )
		.then( function(queryResults){
			resolve( ( (queryResults.results)[0] ).ID );
		} )
		.catch( function(_err){
			reject(_err);
		} );

	} );
}




function addImage( connection, parameter ){
	return new Promise( function(resolve, reject){
		var params = [];
		var queryId = "addImage";

		params.push( "" );
		params.push( parameter.originalFileName );
		params.push( parameter.savedFileName );
		params.push( parameter.destDir );
		params.push( parameter.encoding );
		params.push( parameter.mimetype );

		mysqlHandler.executeQuery( queryId, params, connection )
		.then( function( queryResults ){
			resolve( "success" );
		} )
		.catch( function( err ){
			reject( err );
		} );
	} );
}
