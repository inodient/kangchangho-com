
// STATIC - START
exports.getMenuListByLang = function( connection, contentId, lang, targetId ){
  return new Promise( function(resolve, reject){
		var params = [];
		var queryId = "getMenuListByLang";

    params.push( lang );
    params.push( contentId );
    params.push( contentId );
    params.push( targetId );
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
// STATIC - END





// SEARCH - START
exports.getCategoryText = function( connection, lang, menuId ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getCategoryText";

    params.push( lang );
    params.push( menuId );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}

// SEARCH - END




// WRITE - START
exports.getMenuList = function( connection ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getMenuList";

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}

exports.addCategory = function( connection, parameter ){
	return new Promise( function(resolve, reject){
		var params = [];
		var queryId = "addCategory";

		params.push( parameter.category_en );
		params.push( parameter.category_ko );
		params.push( parameter.category_en );
    params.push( parameter.category_href );
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

exports.getLastCategoryIndex = function( connection ){
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

// WRITE - END




// CONTENT - START
exports.getContentCategory = function( connection, contentId, lang ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getContentCategory";

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
// CONTENT - END
