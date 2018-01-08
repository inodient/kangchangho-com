exports.selectAnnounceCategory = function( connection ){
  return new Promise( function(resolve, reject){
    getAnnounceCategory( connection )
    .then( function( results ){
      resolve( results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.selectAnnounceType = function( connection ){
  return new Promise( function(resolve, reject){
    getAnnounceType( connection )
    .then( function( results ){
      resolve( results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.insertAnnounce = function( connection, parameter ){
  return new Promise( function(resolve, reject){
    addAnnounce( connection, parameter )
    .then( function(){
      getInsertedAnnounceId( connection )
      .then( function( results ){

        var announceId = results.announceId;
        var promises = [];

        if( parameter.announceType === "1" ){
          promises.push( addAnnounceContentList(connection, parameter, announceId) );
        } else if( parameter.announceType === "2" ){
          promises.push( addAnnounceSearchList(connection, parameter, announceId) );
        }

        Promise.all( promises )
        .then( function(){
          resolve( announceId );
        } )
        .catch( function( __err ){
          reject( __err );
        } );
      } )
      .catch( function( _err ){
        reject( _err );
      } );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.selectMainAnnounces = function( connection, lang ){
  return new Promise( function(resolve, reject){
    getMainAnnounces( connection, lang )
    .then( function( results ){
      resolve( results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}




function getAnnounceCategory( connection ){
  return new Promise( function(resolve, reject){
		var params = [];
		var queryId = "getAnnounceCategory";

		mysqlHandler.executeQuery( queryId, params, connection )
		.then( function( queryResults ){
			resolve( {"announceCategory":queryResults.results} );
		} )
		.catch( function( err ){
			reject( err );
		} );
	} );
}

function getAnnounceType( connection ){
  return new Promise( function(resolve, reject){
		var params = [];
		var queryId = "getAnnounceType";

		mysqlHandler.executeQuery( queryId, params, connection )
		.then( function( queryResults ){
			resolve( {"announceType":queryResults.results} );
		} )
		.catch( function( err ){
			reject( err );
		} );
	} );
}

function addAnnounce( connection, parameter ){
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

function getInsertedAnnounceId( connection ){
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

function addAnnounceContentList( connection, parameter, announceId ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "addAnnonceContentList";

    var promises = [];
    var contentList = parameter.announceContentList;
    var categoryList = parameter.announceContentCategoryList;

    if( contentList && categoryList && contentList.length > 0 && categoryList.length > 0 ){
      for( var i=0; i<contentList.length; i++ ){
        promises.push( addAnnounceContent(connection, announceId, i, contentList[i], categoryList[i] ) );
      }
    }

    Promise.all( promises )
    .then( function(){
      resolve( {"status" : "succeed"} );
    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}

function addAnnounceContent( connection, announceId, seq, contentId, contentCategoryId ){
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

function addAnnounceSearchList( connection, parameter, announceId ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "addAnnonceContentList";

    var promises = [];
    var categoryList = parameter.announceCategoryList;
    var searchCondition = parameter.announceCategoryCondition;
    var searchText = parameter.announceCategoryText;

    if( categoryList && searchCondition && searchText && categoryList.length > 0 && searchCondition.length > 0 && searchTest.length > 0 ){
      for( var i=0; i<categoryList.length; i++ ){
        promises.push( addAnnounceSearch(connection, announceId, categoryList[i], searchCondition[i], searchText[i] ) );
      }
    }

    Promise.all( promises )
    .then( function(){
      resolve( {"status" : "succeed"} );
    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}

function addAnnounceSearch( connection, announceId, searchCategoryId, searchCondition, searchText ){
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

function getMainAnnounces( connection, lang ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getMainAnnounces";

    params.push( lang );
    params.push( lang );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( {"mainAnnounces" : queryResults.results} );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}
