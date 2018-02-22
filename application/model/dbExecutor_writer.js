exports.getContentWriter = function( connection, contentId, lang ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getContentWriter";

    params.push( lang );
    params.push( lang );
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

exports.getAboutContentWriter = function( connection, lang ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getAboutContentWriter";

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

exports.getWriterText = function( connection, lang, writerId ){
  return new Promise( function(resolve, reject){
    var params = [];
		var queryId = "getWriterText";

    params.push( lang );
    params.push( writerId );

		mysqlHandler.executeQuery( queryId, params, connection )
		.then( function( queryResults ){
			resolve( queryResults.results );
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
			resolve( queryResults.results );
		} )
		.catch( function(err){
			reject( err );
		} );
	} );
}

exports.addWriter = function( connection, parameter ){
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

exports.getLastWriterIndex = function( connection ){
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
