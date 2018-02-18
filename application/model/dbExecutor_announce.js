// WELCOME - START
exports.getMainAnnounces = function( connection, lang ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getMainAnnounces";

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
// WELCOME - END





// ANNOUNCE PAGE CONTENTS - START
exports.getAnnounceText = function( connection, lang, announceId ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getAnnounceText";

    params.push( lang );
    params.push( announceId );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}

exports.getPageListOfAnnounce = function( connection, lang, targetId ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getPageListOfAnnounce";

    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( targetId );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.getPageListOfAnnounceByIndex = function( connection, lang, targetId, parameter ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getPageListOfAnnounceByIndex";

    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( targetId );
    params.push( parameter.offset );
    params.push( parameter.length );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}
// ANNOUNCE PAGE CONTENTS - END





// WRITE - START
exports.getAnnounceCategory = function( connection ){
  return new Promise( function(resolve, reject){
		var params = [];
		var queryId = "getAnnounceCategory";

		mysqlHandler.executeQuery( queryId, params, connection )
		.then( function( queryResults ){
			resolve( queryResults.results );
		} )
		.catch( function( err ){
			reject( err );
		} );
	} );
}

exports.getAnnounceType = function( connection ){
  return new Promise( function(resolve, reject){
		var params = [];
		var queryId = "getAnnounceType";

		mysqlHandler.executeQuery( queryId, params, connection )
		.then( function( queryResults ){
			resolve( queryResults.results );
		} )
		.catch( function( err ){
			reject( err );
		} );
	} );
}




exports.addAnnounce = function( connection, parameter ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "addAnnounce";

    params.push( parameter.announceType );
    params.push( parameter.title_en );
    params.push( parameter.title_ko );
    params.push( parameter.sel_writer );
    params.push( parameter.sel_category );
    params.push( 0 );
    params.push( parameter.image_carousel );

    mysqlHandler.executeQuery( queryId, params, connection )
		.then( function( queryResults ){
			resolve( {"status":"succeed"} );
		} )
		.catch( function( err ){
			reject( err );
		} );
  } );
}

exports.modifyAnnounce = function( connection, parameter ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "modifyAnnounce";

    params.push( parameter.announceType );
    params.push( parameter.title_en );
    params.push( parameter.title_ko );
    params.push( parameter.sel_writer );
    params.push( parameter.sel_category );
    params.push( 0 );
    params.push( parameter.image_carousel );
    params.push( parameter.modifyId );

    mysqlHandler.executeQuery( queryId, params, connection )
		.then( function( queryResults ){
			resolve( {"status":"succeed"} );
		} )
		.catch( function( err ){
			reject( err );
		} );
  } );
}

exports.deleteAnnounceContentList = function( connection, parameter ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "deleteAnnounceContentList";

    params.push( parameter.modifyId );

    mysqlHandler.executeQuery( queryId, params, connection )
		.then( function( queryResults ){
			resolve( {"status":"succeed"} );
		} )
		.catch( function( err ){
			reject( err );
		} );
  } );
}

exports.getInsertedAnnounceId = function( connection ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getInsertedAnnounceId";

    mysqlHandler.executeQuery( queryId, params, connection )
		.then( function( queryResults ){
      resolve( {"announceId" : ( (queryResults.results)[0] )._ID} );
		} )
		.catch( function( err ){
			reject( err );
		} );
  } );
}

exports.addAnnounceContent = function( connection, announceId, seq, contentId, contentCategoryId ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "addAnnonceContent";

    params.push( announceId );
    params.push( seq );
    params.push( contentId );
    params.push( contentCategoryId );

    mysqlHandler.executeQuery( queryId, params, connection )
		.then( function( queryResults ){
      resolve( {"status" : "succeed"} );
		} )
		.catch( function( err ){
			reject( err );
		} );
  } );
}

exports.addAnnounceSearch = function( connection, announceId, searchCategoryId, searchCondition, searchText ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "addAnnounceSearch";

    params.push( announceId );
    params.push( searchCategoryId );
    params.push( searchCondition );
    params.push( searchText );

    mysqlHandler.executeQuery( queryId, params, connection )
		.then( function( queryResults ){
      resolve( {"status" : "succeed"} );
		} )
		.catch( function( err ){
			reject( err );
		} );
  } );
}
// WRITE - END




// MODIFY - START
exports.getModifyAnnounceMaster = function( connection, id ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getModifyAnnounceMaster";

    params.push( id );
    params.push( id );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}
// MODIFY - END
