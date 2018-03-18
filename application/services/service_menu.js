var dbExecutorMenu = require( require("path").join( __runningPath, "application", "model", "dbExecutor_menu.js" ) );



// STATIC - START
exports.getMenuListByLang = function( connection, contentId, lang, targetId ){
  return new Promise( function(resolve, reject){

    dbExecutorMenu.getMenuListByLang( connection, contentId, lang, targetId )
		.then( function( results ){
      resolve( {"menu":results}  );
		} )
		.catch( function(err){
			reject( err );
		} );
	} );
}
// STATIC - END




// SEARCH - START
exports.getCategoryText = function( connection, lang, targetId ){
  return new Promise( function(resolve, reject){
		dbExecutorMenu.getCategoryText( connection, lang, targetId )
		.then( function( results ){
      resolve( {"searchText":results} );
		} )
		.catch( function(err){
			reject( err );
		} );
	} );
}
// SEARCH - END




// WRITE - START
exports.getMenuList = function( connection, lang, targetId ){
  return new Promise( function(resolve, reject){
		dbExecutorMenu.getMenuList( connection, lang, targetId )
		.then( function( results ){
      resolve( {"category":results} );
		} )
		.catch( function(err){
			reject( err );
		} );
	} );
}

exports.addCategory = function( req, connection ){
  return new Promise( function(resolve, reject){

		dbExecutorMenu.addCategory( connection, req.body )
		.then( function(){
			var argv = arguments[0];

			dbExecutorMenu.getLastCategoryIndex( connection )
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

// WRITE - END
