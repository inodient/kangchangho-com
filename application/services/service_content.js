exports.selectContent = function( connection, contentId, lang ){
  return new Promise( function(resolve, reject){
    getContent( connection, contentId, lang )
    .then( function( results ){
      resolve( results );
    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}

exports.insertContent = function( connection, req ){
  return new Promise( function(resolve, reject){
    addContent( connection, req )
    .then( function( contentId ){
      resolve( contentId );
    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}

exports.selectRecentContents = function( connection, lang ){
  return new Promise( function(resolve, reject){
    getRecentContentList( connection, lang )
    .then( function( results ){
      resolve( results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.selectMostViewedContents = function( connection, lang ){
  return new Promise( function(resolve, reject){
    getMostViewedContentList( connection, lang )
    .then( function( results ){
      resolve( results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.updateContentHitCount = function( connection, contentId ){
  return new Promise( function(resolve, reject){
    increaseContentHitCount( connection, 10, contentId )
    .then( function( results ){

      if( results.status == "succeed" ){
        resolve( {"status": "succeed"} );
      } else {
        reject( {"status" : "error occured"} );
      }
    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}

exports.selectRelatedContents = function( connection, lang ){
  return new Promise( function(resolve, reject){
    getRelatedContents( connection, lang )
    .then( function( results ){
      resolve( results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.selectAnnounceContentList = function( connection ){
  return new Promise( function(resolve, reject){
    getAnnounceContentList( connection )
    .then( function( results ){
      resolve( results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.selectPageList = function( connection, lang ){
  return new Promise( function(resolve, reject){
    getPageList( connection, lang )
    .then( function( results ){

      var promises = [];

      extractContents( results.pageList )
      .then( function( parsedPageList ){
        resolve( {"pageList" : parsedPageList} );
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





function getContent( connection, contentId, lang ){
  return new Promise( function(resolve, reject){

    var promises = [];

    promises.push( getContentMaster( connection, contentId, lang ) );
    promises.push( getContentCategory( connection, contentId, lang ) );
    promises.push( getContentHash( connection, contentId, lang ) );
    promises.push( getContentImage( connection, contentId, lang ) );
    promises.push( getContentWriter( connection, contentId, lang ) );

    Promise.all( promises )
    .then( function(){
      var argv = arguments[0];

      resolve( {
        "contentMaster": argv[0],
        "contentCategory": argv[1],
        "contentHash": argv[2],
        "contentImage": argv[3],
        "contentWriter": argv[4]
      } );

    } )
    .catch( function( err ){
      reject( err );
    } );

  } );
}




function getContentMaster( connection, contentId, lang ){
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

function getContentCategory( connection, contentId, lang ){
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

function getContentHash( connection, contentId, lang ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getContentHash";

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

function getContentImage( connection, contentId, lang ){
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

function getContentWriter( connection, contentId, lang ){
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





function addContent( connection, parameter ){
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

			getInsertedContentId( connection, params )
			.then( function( contentId ){
				resolve( contentId );
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

function getInsertedContentId( connection, parameter ){
	return new Promise( function(resolve, reject){
		var params = parameter;
		var queryId = "getInsertedContentId";

		mysqlHandler.executeQuery( queryId, params, connection )
		.then( function( queryResults ){
			resolve( ( (queryResults.results)[0] )._ID );
		} )
		.catch( function( err ){
			reject( err );
		} );
	} );
}

function getRecentContentList( connection, lang ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getRecentContents";

    params.push( lang );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( {"recentContents": queryResults.results} );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

function getMostViewedContentList( connection, lang ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getMostViewedContents";

    params.push( lang );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( {"mostViewedContents": queryResults.results} );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

function increaseContentHitCount( connection, increseHitCount, contentId ){
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

function getRelatedContents( connection, lang ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getRelatedContents";

    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( lang );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( {"relatedContents": queryResults.results} );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

function getAnnounceContentList( connection ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getAnnounceContentList";

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( {"announceContentList": queryResults.results} );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

function getPageList( connection, lang ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getPageList";

    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( lang );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( {"pageList": queryResults.results} );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

function extractContents( pageList ){
  return new Promise( function(resolve, reject){
    var promises = [];

    for( var i=0; i<pageList.length; i++ ){
      promises.push( extractContentText( ( pageList[i] ).content) );
    }

    Promise.all( promises )
    .then( function(){
      var argv = arguments[0];

      for( var i=0; i<argv.length; i++ ){
        ( pageList[i] ).content = argv[i];
      }

      resolve( pageList );
    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}

function extractContentText( contentHTML ){
  return new Promise( function(resolve, reject){
    try {
      const cheerio = require( "cheerio" );
      const $ = cheerio.load( contentHTML );

      var contentText = "";

      $("*").each( function(){
        contentText += " " + $(this).text();
      } );

      if( contentText.length > 200 ){
        contentText = contentText.substring( 0, 196 );
        var lastIndex = contentText.lastIndexOf( " " );
        contentText = contentText.substring( 0, lastIndex + 1 ) + "...";
      }

      resolve( contentText );
    } catch( err ){
      reject( err );
    }
  } );
}
