// WELCOME - START
exports.getPageList = function( connection, lang ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getPageList";

    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( lang );
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

exports.getPageListByIndex = function( connection, lang, parameter ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getPageListByIndex";

    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( lang );
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
// WELCOME - END




// CONTENT PAGE - START
exports.getLastAboutContentId = function( connection ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getLastAboutContentId";

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.getContentMaster = function( connection, contentId, lang ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getContentMaster";

    params.push( lang );
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

exports.getRelatedContents = function( connection, contentId, lang ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getRelatedContents";

    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( lang );
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

exports.increaseContentHitCount = function( connection, increseHitCount, contentId ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "increaseContentHitCount";

    params.push( increseHitCount );
    params.push( contentId );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function(){
      resolve( {"status": "succeed"} );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.increaseContentLikeCount = function( connection, contentId ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "increaseContentLikeCount";

    params.push( {"ID" : contentId} );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}
// CONTENT PAGE - END




// ABOUT CONTENT PAGE - START
exports.getAboutContentMaster = function( connection, lang ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getAboutContentMaster";

    params.push( lang );
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
// ABOUT CONTENT PAGE - END




// SEARCH WORD - START
exports.getPageListWithSearchWord = function( connection, lang, searchWord ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getPageListWithSearchWord";

    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( lang );

    params.push( lang );
    params.push( searchWord );
    params.push( searchWord );
    params.push( lang );
    params.push( searchWord );
    params.push( searchWord );
    params.push( lang );
    params.push( searchWord );
    params.push( searchWord );
    params.push( lang );
    params.push( searchWord );
    params.push( searchWord );

    params.push( lang );
    params.push( lang );
    params.push( lang );

    params.push( lang );
    params.push( searchWord );
    params.push( searchWord );
    params.push( lang );
    params.push( searchWord );
    params.push( searchWord );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.getPageListWithSearchWordByIndex = function( connection, lang, searchWord, parameter ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getPageListWithSearchWordByIndex";

    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( lang );

    params.push( lang );
    params.push( searchWord );
    params.push( searchWord );
    params.push( lang );
    params.push( searchWord );
    params.push( searchWord );
    params.push( lang );
    params.push( searchWord );
    params.push( searchWord );
    params.push( lang );
    params.push( searchWord );
    params.push( searchWord );

    params.push( lang );
    params.push( lang );
    params.push( lang );

    params.push( lang );
    params.push( searchWord );
    params.push( searchWord );
    params.push( lang );
    params.push( searchWord );
    params.push( searchWord );

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
// SEARCH WORD - END




// SEARCH CATEGORY - START
exports.getPageListWithCategory = function( connection, lang, targetId, currentPage ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getPageListWithCategory";

    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( targetId );
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

exports.getPageListWithCategoryByIndex = function( connection, lang, targetId, parameter ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getPageListWithCategoryByIndex";

    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( targetId );
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
// SEARCH CATEGORY - END




// SEARCH WRITER - START
exports.getPageListWithWriter = function( connection, lang, targetId, currentPage ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getPageListWithWriter";

    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( targetId );
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

exports.getPageListWithWriterByIndex = function( connection, lang, targetId, parameter ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getPageListWithWriterByIndex";

    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( targetId );
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
// SEARCH WRITER - END




// SEARCH HASH - START
exports.getPageListWithHash = function( connection, lang, hashId, currentPage ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getPageListWithHash";

    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( hashId );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.getPageListWithHashByIndex = function( connection, lang, hashId, parameter ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getPageListWithHashByIndex";

    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( hashId );
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
// SEARCH HASH - END




// WRITE - START
exports.getAnnounceContentList = function( connection ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getAnnounceContentList";

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.checkAboutContent = function( connection, parameter ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "checkAboutContent";

    params.push( parameter.sel_category );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}


exports.addTimeline = function( connection, parameter ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "_addTimeline";

    params.push( parameter.task );
    params.push( parameter.date );
    params.push( parameter.start );
    params.push( parameter.end );
    params.push( parameter.operation );
    params.push( parameter.lesson );
    params.push( parameter.tag );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.getTimeline = function( connection, parameter ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "_getTimeline";

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}




exports.addContent = function( connection, parameter ){
	return new Promise( function(resolve, reject){
		var params = [];
		var queryId = "addContent";

		params.push( parameter.sel_category );
		params.push( parameter.sel_writer );
		params.push( parameter.title_ko );
		params.push( parameter.title_en );
		params.push( parameter.content_ko );
		params.push( parameter.content_en );
		params.push( parameter.comment_ko );
		params.push( parameter.comment_en );
		params.push( parameter.image_main );
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

exports.addAboutContent = function( connection, parameter ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "addAboutContent";

    params.push( parameter.sel_category );
    params.push( parameter.sel_writer );
    params.push( parameter.title_ko );
    params.push( parameter.title_en );
    params.push( parameter.content_ko );
    params.push( parameter.content_en );
    params.push( parameter.comment_ko );
    params.push( parameter.comment_en );
    params.push( parameter.image_main );
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

exports.modifyContent = function( connection, parameter ){
  return new Promise( function(resolve, reject){
		var params = [];
		var queryId = "modifyContent";

		params.push( parameter.sel_category );
		params.push( parameter.sel_writer );
		params.push( parameter.title_ko );
		params.push( parameter.title_en );
		params.push( parameter.content_ko );
		params.push( parameter.content_en );
		params.push( parameter.comment_ko );
		params.push( parameter.comment_en );
		params.push( parameter.image_main );
		params.push( parameter.image_carousel );
    params.push( parameter.modifyId );

		mysqlHandler.executeQuery( queryId, params, connection )
		.then( function( queryResults ){
      resolve( parameter.modifyId );
		} )
		.catch( function( err ){
			reject( err );
		} );
	} );
}

exports.modifyAboutContent = function( connection, parameter ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "modifyAboutContent";

    params.push( parameter.sel_category );
    params.push( parameter.sel_writer );
    params.push( parameter.title_ko );
    params.push( parameter.title_en );
    params.push( parameter.content_ko );
    params.push( parameter.content_en );
    params.push( parameter.comment_ko );
    params.push( parameter.comment_en );
    params.push( parameter.image_main );
    params.push( parameter.image_carousel );
    params.push( parameter.modifyId );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.getInsertedContentId = function( connection, parameter ){
	return new Promise( function(resolve, reject){
		var params = [];
		var queryId = "getInsertedContentId";

    params.push( parameter.sel_category );
		params.push( parameter.sel_writer );
		params.push( parameter.title_ko );
		params.push( parameter.title_en );
		params.push( parameter.content_ko );
		params.push( parameter.content_en );
		params.push( parameter.comment_ko );
		params.push( parameter.comment_en );
		params.push( parameter.image_main );
		params.push( parameter.image_carousel );

		mysqlHandler.executeQuery( queryId, params, connection )
		.then( function( queryResults ){
			resolve( queryResults.results );
		} )
		.catch( function( err ){
			reject( err );
		} );
	} );
}
// WRITE - END




// MODIFY - START
exports.getModifyContentMaster = function( connection, id ){
  return new Promise( function( resolve, reject){
    var params = [];
    var queryId = "getModifyContentMaster";

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

exports.getModifyAboutContentMaster = function( connection, id ){
  return new Promise( function( resolve, reject){
    var params = [];
    var queryId = "getModifyAboutContentMaster";

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




// BANNER - START
exports.getRecentContentList = function( connection, lang ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getRecentContents";

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

exports.getMostViewedContentList = function( connection, lang ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getMostViewedContents";

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
// BANNER - END
