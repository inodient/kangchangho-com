const dbExecutorAnnounce = require( require("path").join( __runningPath, "application", "model", "dbExecutor_announce.js" ) );





exports.getMainAnnounces = function( connection, lang ){
  return new Promise( function(resolve, reject){
    dbExecutorAnnounce.getMainAnnounces( connection, lang )
    .then( function( results ){
      resolve( {"mainAnnounces" : results} );
      resolve( results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}






exports.getPageListOfAnnounce = function( connection, lang, announceId ){
  return new Promise( function(resolve, reject){
    dbExecutorAnnounce.getPageListOfAnnounce( connection, lang, announceId )
    .then( function( results ){

      var pageObject = {};

      if( results.length > 0 ){
        var totalListCount = ( (results)[0] ).total_count;
        var totalPageCount = totalListCount % 8 == 0 ? totalListCount / 8 : parseInt( (totalListCount / 8) ) + 1 ;
        var currentPage = 1;

        pageObject =  {"pageList": results, "totalListCount": totalListCount, "totalPageCount": totalPageCount, "currentPage": currentPage};
      } else{
        pageObject =  {"pageList": results, "totalListCount": 0, "totalPageCount": 0, "currentPage": 0};
      }

      extractContents( pageObject.pageList, lang )
      .then( function( parsedPageList ){
        pageObject.pageList = parsedPageList;
        resolve( pageObject );
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

exports.getPageListOfAnnounceByIndex = function( connection, lang, announceId, parameter ){
  return new Promise( function(resolve, reject){
    getPagingRange( parameter )
    .then( function( pageInfo ){

      var pageRange = pageInfo.pageRange;
      var offset = ( ( parseInt( pageRange[0] ) - 1 ) * 8 );
      var length = ( parseInt( pageRange[pageRange.length-1] ) - parseInt( pageRange[0] ) + 1 ) * 8;

      pageInfo.offset = offset;
      pageInfo.length = length;

      dbExecutorAnnounce.getPageListOfAnnounceByIndex( connection, lang, announceId, pageInfo )
      .then( function( results ){

        logger.debug( results );

        pageInfo.totalListCount = ( (results)[0] ).total_count;
        pageInfo.totalPageCount = pageInfo.totalListCount % 8 == 0 ? pageInfo.totalListCount / 8 : parseInt( (pageInfo.totalListCount / 8) ) + 1 ;
        pageInfo.currentPage = pageInfo.calledPage;
        pageInfo.pageList = results;

        extractContents( pageInfo.pageList, lang )
        .then( function( parsedPageList ){

          pageInfo.pageList = parsedPageList;

          logger.debug( pageInfo );

          resolve( pageInfo );

        } )
        .catch( function( __err ){
          reject( __err );
        } );

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

exports.getAnnounceText = function( connection, lang, announceId ){
  return new Promise( function(resolve, reject){
    dbExecutorAnnounce.getAnnounceText( connection, lang, announceId )
    .then( function( results ){
      resolve( {"searchText":results} );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}








exports.getAnnounceCategory = function( connection ){
  return new Promise( function(resolve, reject){
    dbExecutorAnnounce.getAnnounceCategory( connection )
    .then( function( results ){
      resolve( {"announceCategory":results} );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.getAnnounceType = function( connection ){
  return new Promise( function(resolve, reject){
    dbExecutorAnnounce.getAnnounceType( connection )
    .then( function( results ){
      resolve( {"announceType":results}  );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}






exports.addAnnounce = function( connection, parameter ){
  return new Promise( function(resolve, reject){
    dbExecutorAnnounce.addAnnounce( connection, parameter )
    .then( function(){
      dbExecutorAnnounce.getInsertedAnnounceId( connection )
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
          resolve( {"announceId": announceId} );
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




function addAnnounceContentList( connection, parameter, announceId ){
  return new Promise( function(resolve, reject){
    var promises = [];
    var contentList = parameter.announceContentList;
    var categoryList = parameter.announceContentCategoryList;

    if( contentList && categoryList && contentList.length > 0 && categoryList.length > 0 ){
      for( var i=0; i<contentList.length; i++ ){
        promises.push( dbExecutorAnnounce.addAnnounceContent(connection, announceId, i, contentList[i], categoryList[i] ) );
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

function addAnnounceSearchList( connection, parameter, announceId ){
  return new Promise( function(resolve, reject){
    var promises = [];
    var categoryList = parameter.announceCategoryList;
    var searchCondition = parameter.announceCategoryCondition;
    var searchText = parameter.announceCategoryText;

    if( categoryList && searchCondition && searchText && categoryList.length > 0 && searchCondition.length > 0 && searchText.length > 0 ){
      for( var i=0; i<categoryList.length; i++ ){
        promises.push( dbExecutorAnnounce.addAnnounceSearch(connection, announceId, categoryList[i], searchCondition[i], searchText[i] ) );
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

















function extractContents( pageList, lang ){
  return new Promise( function(resolve, reject){
    var promises = [];

    for( var i=0; i<pageList.length; i++ ){
      promises.push( extractContentText( ( pageList[i] ).content, lang ) );
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

function extractContentText( contentHTML, lang ){
  return new Promise( function(resolve, reject){
    try {
      const cheerio = require( "cheerio" );
      const $ = cheerio.load( contentHTML );

      var contentText = "";

      $("*").each( function(){
        contentText += " " + $(this).text();
      } );

      var targetTextLength = 200;
      if( lang === "en" ){
        targetTextLength = 200;
      } else if( lang === "ko" ){
        targetTextLength = 150;
      }

      if( contentText.length > targetTextLength ){
        contentText = contentText.substring( 0, targetTextLength - 4 );
        var lastIndex = contentText.lastIndexOf( " " );
        contentText = contentText.substring( 0, lastIndex + 1 ) + "...";
      }

      resolve( contentText );
    } catch( err ){
      reject( err );
    }
  } );
}

function getPagingRange( parameters ){
  return new Promise( function(resolve, reject){
    var totalPageCount = parseInt( parameters.totalPageCount );
    var releasedPages = parameters.releasedPages;
    var calledPage = parseInt( parameters.calledPage );

    var pageRange = [];
    for( var i=calledPage-2; i<=calledPage+2; i++ ){

      if( i > 0 && i <= totalPageCount ){

        if( releasedPages.indexOf( i.toString() ) < 0 ){
          pageRange.push( i );
        }
      }
    }

    parameters.pageRange = pageRange;

    resolve( parameters );
  } );
}
