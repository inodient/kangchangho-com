exports.getContentImage = function( connection, contentId, lang ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getContentImage";

    params.push( contentId );
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




exports.addImage = function( connection, parameter ){
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

exports.setImageType = function( connection, type, savedFileName ){
  return new Promise( function(resolve, reject){
    var params = [];
		var queryId = "setImageType";

		params.push( type );
		params.push( savedFileName );

		mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( "success" );
    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}

exports.getUpdatedImageId = function( connection, savedFileName ){
	return new Promise( function(resolve, reject){

		var params = [];
		var queryId = "getUpdatedImageId";

		params.push( savedFileName );

		mysqlHandler.executeQuery( queryId, params, connection )
		.then( function(queryResults){
			resolve( queryResults.results );
		} )
		.catch( function(_err){
			reject(_err);
		} );

	} );
}
