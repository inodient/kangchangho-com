const dbExecutorContent = require( require("path").join( __runningPath, "application", "model", "dbExecutor_content.js" ) );
const dbExecutorMenu = require( require("path").join( __runningPath, "application", "model", "dbExecutor_menu.js" ) );
const dbExecutorHash = require( require("path").join( __runningPath, "application", "model", "dbExecutor_hash.js" ) );
const dbExecutorImage = require( require("path").join( __runningPath, "application", "model", "dbExecutor_image.js" ) );
const dbExecutorWriter = require( require("path").join( __runningPath, "application", "model", "dbExecutor_writer.js" ) );




exports.getContent = function( connection, contentId, lang ){
  return new Promise( function(resolve, reject){

    var promises = [];

    promises.push( dbExecutorContent.getContentMaster( connection, contentId, lang ) );
    promises.push( dbExecutorMenu.getContentCategory( connection, contentId, lang ) );
    promises.push( dbExecutorHash.getContentHash( connection, contentId, lang ) );
    promises.push( dbExecutorImage.getContentImage( connection, contentId, lang ) );
    promises.push( dbExecutorWriter.getContentWriter( connection, contentId, lang ) );
    promises.push( dbExecutorContent.getRelatedContents( connection, lang ) );
    promises.push( dbExecutorContent.increaseContentHitCount( connection, 10, contentId ) );

    Promise.all( promises )
    .then( function(){
      var argv = arguments[0];

      resolve( {
        "contentMaster": argv[0],
        "contentCategory": argv[1],
        "contentHash": argv[2],
        "contentImage": argv[3],
        "contentWriter": argv[4],
        "relatedContents": argv[5]
      } );

    } )
    .catch( function( err ){
      reject( err );
    } );

  } );
}

exports.getAboutContent = function( connection, lang ){
  return new Promise( function(resolve, reject){

    var promises = [];

    dbExecutorContent.getLastAboutContentId( connection )
    .then( function( results ){

      var contentId = typeof results[0] === "undefined" ? -1 : results[0].id;

      // promises.push( dbExecutorContent.getContentMaster( connection, contentId, lang ) );
      // promises.push( dbExecutorMenu.getContentCategory( connection, contentId, lang ) );
      // promises.push( dbExecutorHash.getContentHash( connection, contentId, lang ) );
      // promises.push( dbExecutorImage.getContentImage( connection, contentId, lang ) );
      // promises.push( dbExecutorWriter.getContentWriter( connection, contentId, lang ) );
      // promises.push( dbExecutorContent.getRelatedContents( connection, lang ) );
      // promises.push( dbExecutorContent.increaseContentHitCount( connection, 10, contentId ) );

      promises.push( dbExecutorContent.getAboutContentMaster( connection, lang ) );
      promises.push( dbExecutorWriter.getAboutContentWriter( connection, lang ) );
      
      Promise.all( promises )
      .then( function(){
        var argv = arguments[0];

        resolve( {
          // "contentMaster": argv[0],
          // "contentCategory": argv[1],
          // "contentHash": argv[2],
          // "contentImage": argv[3],
          // "contentWriter": argv[4],
          // "relatedContents": argv[5]

          "contentMaster": argv[0],
          "contentWriter": argv[1]   
        } );

      } )
      .catch( function( err ){
        reject( err );
      } );


    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}






exports.getPageList = function( connection, lang, currentPage ){
  return new Promise( function(resolve, reject){
    dbExecutorContent.getPageList( connection, lang )
    .then( function( results ){

      var totalListCount = typeof ( (results)[0] ) === "undefined" ? 0 : ( (results)[0] ).total_count;
      var totalPageCount = totalListCount % 8 == 0 ? totalListCount / 8 : parseInt( (totalListCount / 8) ) + 1 ;
      var currentPage = 1;

      var pageObject = {"pageList": results, "totalListCount": totalListCount, "totalPageCount": totalPageCount, "currentPage": currentPage};

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

exports.getPageListByIndex = function( connection, lang, parameter ){
  return new Promise( function(resolve, reject){
    getPagingRange( parameter )
    .then( function( pageInfo ){

      var pageRange = pageInfo.pageRange;
      var offset = ( ( parseInt( pageRange[0] ) - 1 ) * 8 );
      var length = ( parseInt( pageRange[pageRange.length-1] ) - parseInt( pageRange[0] ) + 1 ) * 8;

      pageInfo.offset = offset;
      pageInfo.length = length;

      dbExecutorContent.getPageListByIndex( connection, lang, pageInfo )
      .then( function( results ){

        pageInfo.totalListCount = ( (results)[0] ).total_count;
        pageInfo.totalPageCount = pageInfo.totalListCount % 8 == 0 ? pageInfo.totalListCount / 8 : parseInt( (pageInfo.totalListCount / 8) ) + 1 ;
        pageInfo.currentPage = pageInfo.calledPage;
        pageInfo.pageList = results;

        extractContents( pageInfo.pageList, lang )
        .then( function( parsedPageList ){
          pageInfo.pageList = parsedPageList;
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




exports.getPageListWithSearchWord = function( connection, lang, searchWord ){
  return new Promise( function(resolve, reject){
    dbExecutorContent.getPageListWithSearchWord( connection, lang, "%" + searchWord + "%" )
    .then( function( results ){

      if( results.length > 0 ){
        var totalListCount = typeof ( (results)[0] ) === "undefined" ? 0 : ( (results)[0] ).total_count;
        var totalPageCount = totalListCount % 8 == 0 ? totalListCount / 8 : parseInt( (totalListCount / 8) ) + 1 ;
        var currentPage = 1;

        var pageObject = {"pageList": results, "totalListCount": totalListCount, "totalPageCount": totalPageCount, "currentPage": currentPage};

        extractContents( pageObject.pageList, lang )
        .then( function( parsedPageList ){
          pageObject.pageList = parsedPageList;
          resolve( pageObject );
        } )
        .catch( function( _err ){
          reject( _err );
        } );

      } else{
        resolve( {"pageList": results, "totalListCount": 0, "totalPageCount": 0, "currentPage": 0} );
      }

    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.getPageListWithSearchWordByIndex = function( connection, lang, searchWord, parameter ){
  return new Promise( function(resolve, reject){
    getPagingRange( parameter )
    .then( function( pageInfo ){

      var pageRange = pageInfo.pageRange;
      var offset = ( ( parseInt( pageRange[0] ) - 1 ) * 8 );
      var length = ( parseInt( pageRange[pageRange.length-1] ) - parseInt( pageRange[0] ) + 1 ) * 8;

      pageInfo.offset = offset;
      pageInfo.length = length;

      dbExecutorContent.getPageListWithSearchWordByIndex( connection, lang, "%" + searchWord + "%", pageInfo )
      .then( function( results ){

        var totalListCount = typeof ( (results)[0] ) === "undefined" ? 0 : ( (results)[0] ).total_count;
        var totalPageCount = totalListCount % 8 == 0 ? totalListCount / 8 : parseInt( (totalListCount / 8) ) + 1 ;

        pageInfo.totalListCount = totalListCount;
        pageInfo.totalPageCount = totalPageCount;
        pageInfo.currentPage = parameter.calledPage;
        pageInfo.pageList = results;

        extractContents( pageInfo.pageList, lang )
        .then( function( parsedPageList ){
          pageInfo.pageList = parsedPageList;
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





exports.getPageListWithCategory = function( connection, lang, targetId ){
  return new Promise( function(resolve, reject){
    dbExecutorContent.getPageListWithCategory( connection, lang, targetId )
    .then( function( results ){

      var totalListCount = typeof ( (results)[0] ) === "undefined" ? 0 : ( (results)[0] ).total_count;
      var totalPageCount = totalListCount % 8 == 0 ? totalListCount / 8 : parseInt( (totalListCount / 8) ) + 1 ;
      var currentPage = 1;

      pageObject =  {"pageList": results, "totalListCount": totalListCount, "totalPageCount": totalPageCount, "currentPage": currentPage};

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

exports.getPageListWithCategoryByIndex = function( connection, lang, targetId, parameter ){
  return new Promise( function(resolve, reject){
    getPagingRange( parameter )
    .then( function( pageInfo ){

      var pageRange = pageInfo.pageRange;
      var offset = ( ( parseInt( pageRange[0] ) - 1 ) * 8 );
      var length = ( parseInt( pageRange[pageRange.length-1] ) - parseInt( pageRange[0] ) + 1 ) * 8;

      pageInfo.offset = offset;
      pageInfo.length = length;

      dbExecutorContent.getPageListWithCategoryByIndex( connection, lang, targetId, pageInfo )
      .then( function( results ){

        var totalListCount = typeof ( (results)[0] ) === "undefined" ? 0 : ( (results)[0] ).total_count;
        var totalPageCount = totalListCount % 8 == 0 ? totalListCount / 8 : parseInt( (totalListCount / 8) ) + 1 ;
        var currentPage = parameter.calledPage;

        pageInfo.totalListCount = totalListCount;
        pageInfo.totalPageCount = totalPageCount;
        pageInfo.currentPage = currentPage;
        pageInfo.pageList = results;

        extractContents( pageInfo.pageList, lang )
        .then( function( parsedPageList ){
          pageInfo.pageList = parsedPageList;
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





exports.getPageListWithWriter = function( connection, lang, targetId ){
  return new Promise( function(resolve, reject){
    dbExecutorContent.getPageListWithWriter( connection, lang, targetId )
    .then( function( results ){

      var totalListCount = typeof ( (results)[0] ) === "undefined" ? 0 : ( (results)[0] ).total_count;
      var totalPageCount = totalListCount % 8 == 0 ? totalListCount / 8 : parseInt( (totalListCount / 8) ) + 1 ;
      var currentPage = 1;

      var pageInfo = {"pageList": results, "totalListCount": totalListCount, "totalPageCount": totalPageCount, "currentPage": currentPage};

      extractContents( pageInfo.pageList, lang )
      .then( function( parsedPageList ){
        pageInfo.pageList = parsedPageList;
        resolve( pageInfo );
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

exports.getPageListWithWriterByIndex = function( connection, lang, targetId, parameter ){
  return new Promise( function(resolve, reject){
    getPagingRange( parameter )
    .then( function( pageInfo ){

      var pageRange = parameter.pageRange;
      var offset = ( ( parseInt( pageRange[0] ) - 1 ) * 8 );
      var length = ( parseInt( pageRange[pageRange.length-1] ) - parseInt( pageRange[0] ) + 1 ) * 8;

      pageInfo.offset = offset;
      pageInfo.length = length;

      dbExecutorContent.getPageListWithWriterByIndex( connection, lang, targetId, pageInfo )
      .then( function( results ){

        var totalListCount = typeof ( (results)[0] ) === "undefined" ? 0 : ( (results)[0] ).total_count;
        var totalPageCount = totalListCount % 8 == 0 ? totalListCount / 8 : parseInt( (totalListCount / 8) ) + 1 ;
        var currentPage = parameter.calledPage;

        pageInfo.totalListCount = totalListCount;
        pageInfo.totalPageCount = totalPageCount;
        pageInfo.currentPage = currentPage;
        pageInfo.pageList = results;

        extractContents( pageInfo.pageList, lang )
        .then( function( parsedPageList ){
          pageInfo.pageList = parsedPageList;
          resolve( pageInfo );
        } )
        .catch( function( _err ){
          reject( _err );
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





exports.getPageListWithHash = function( connection, lang, targetId ){
  return new Promise( function(resolve, reject){
    dbExecutorContent.getPageListWithHash( connection, lang, targetId )
    .then( function( results ){

      var totalListCount = typeof ( (results)[0] ) === "undefined" ? 0 : ( (results)[0] ).total_count;
      var totalPageCount = totalListCount % 8 == 0 ? totalListCount / 8 : parseInt( (totalListCount / 8) ) + 1 ;
      var currentPage = 1;

      var pageInfo =  {"pageList": results, "totalListCount": totalListCount, "totalPageCount": totalPageCount, "currentPage": currentPage};

      extractContents( pageInfo.pageList, lang )
      .then( function( parsedPageList ){
        pageInfo.pageList = parsedPageList;
        resolve( pageInfo );
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

exports.getPageListWithHashByIndex = function( connection, lang, targetId, parameter ){
  return new Promise( function(resolve, reject){
    getPagingRange( parameter )
    .then( function( pageInfo ){

      var pageRange = parameter.pageRange;
      var offset = ( ( parseInt( pageRange[0] ) - 1 ) * 8 );
      var length = ( parseInt( pageRange[pageRange.length-1] ) - parseInt( pageRange[0] ) + 1 ) * 8;

      pageInfo.offset = offset;
      pageInfo.length = length;

      dbExecutorContent.getPageListWithHashByIndex( connection, lang, targetId, pageInfo )
      .then( function( results ){

        var totalListCount = typeof ( (results)[0] ) === "undefined" ? 0 : ( (results)[0] ).total_count;
        var totalPageCount = totalListCount % 8 == 0 ? totalListCount / 8 : parseInt( (totalListCount / 8) ) + 1 ;
        var currentPage = parameter.calledPage;

        pageInfo.totalListCount = totalListCount;
        pageInfo.totalPageCount = totalPageCount;
        pageInfo.currentPage = currentPage;
        pageInfo.pageList = results;

        extractContents( pageInfo.pageList, lang )
        .then( function( parsedPageList ){
          pageInfo.pageList = parsedPageList;
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





exports.getAnnounceContentList = function( connection ){
  return new Promise( function(resolve, reject){
    dbExecutorContent.getAnnounceContentList( connection )
    .then( function( results ){
      resolve( {"announceContentList": results} );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}






exports.addContent = function( connection, parameter ){
  return new Promise( function(resolve, reject){

    dbExecutorContent.checkAboutContent( connection, parameter )
    .then( function( results ){
      var isAboutContent = results[0].is_about_content === 1 ? true : false;

      if( isAboutContent ){
        dbExecutorContent.addAboutContent( connection, parameter )
        .then( function(){
          resolve( {"status":"succeed", "target":"about", "contentId":"-1"} );
        } )
        .catch( function(_err){
          reject( _err );
        } );
      } else {
        dbExecutorContent.addContent( connection, parameter )
        .then( function(){

          dbExecutorContent.getInsertedContentId( connection, parameter )
          .then( function( results ){
            resolve( {"status":"succeed", "target":"content", "contentId":results[0]._ID} );
          } )
          .catch( function( __err ){
            reject( __err );
          } );
        } )
        .catch( function(_err){
          reject( _err );
        } );
      }
    } )
    .catch( function( err ){
      reject( err );
    } );


    // dbExecutorContent.checkAboutContent( connection, parameter )
    // .then( funciton( results ){
    //   var isAboutContent = results[0] === 1 ? true : false;

    //   logger.debug( "isAboutContent :", isAboutContent );

    //   if( isAboutContent ){
    //     dbExecutorContent.addAboutContent( connection, parameter )
    //     .then( function(){
    //       resolve( {"status":"succeed"} );
    //     } )
    //     .catch( function(_err){
    //       reject( _err );
    //     } );
    //   } else {
    //     dbExecutorContent.addContent( connection, parameter )
    //     .then( function(){

    //       dbExecutorContent.getInsertedContentId( connection, parameter )
    //       .then( function( results ){
    //         resolve( results[0]._ID );
    //       } )
    //       .catch( function( __err ){
    //         reject( __err );
    //       } );
    //     } )
    //     .catch( function(_err){
    //       reject( _err );
    //     } );
    //   }
    // } )
    // .catch( function(err){
    //   reject( err );
    // } )

  } );
}




exports.getModifyContentMaster = function( connection, id ){
  return new Promise( function( resolve, reject){
    dbExecutorContent.getModifyContentMaster( connection, id )
    .then( function( results ){
      resolve( {"modifyData": results[0]} );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.modifyContent = function( connection, parameter ){
  return new Promise( function(resolve, reject){

    dbExecutorContent.checkAboutContent( connection, parameter )
    .then( function( results ){
      var isAboutContent = results[0].is_about_content === 1 ? true : false;

      if( isAboutContent ){
        dbExecutorContent.modifyAboutContent( connection, parameter )
        .then( function( modifyId ){
          resolve( {"status":"succeed", "target":"about", "contentId":"-1"} );
        } )
        .catch( function(err){
          reject( err );
        } );
      } else {
        dbExecutorContent.modifyContent( connection, parameter )
        .then( function( modifyId ){
          resolve( {"status":"succeed", "target":"content", "contentId":modifyId} );
        } )
        .catch( function(err){
          reject( err );
        } );
      }

    } )
    .catch( function( err ){
      reject( err );
    } ); 

    // dbExecutorContent.checkAboutContent( connection, parameter )
    // .then( funciton( results ){
    //   var isAboutContent = results[0] === 1 ? true : false;

    //   logger.debug( "isAboutContent :", isAboutContent );

    //   if( isAboutContent ){
    //     dbExecutorContent.modifyAboutContent( connection, parameter )
    //     .then( function( modifyId ){
    //       resolve( modifyId );
    //     } )
    //     .catch( function(err){
    //       reject( err );
    //     } );
    //   } else {
    //     dbExecutorContent.modifyContent( connection, parameter )
    //     .then( function( modifyId ){
    //       resolve( modifyId );
    //     } )
    //     .catch( function(err){
    //       reject( err );
    //     } );
    //   }
    // } )
    // .catch( function( err ){
    //   reject( err );
    // } );
  } );
}




exports.getModifyAboutContentMaster = function( connection, id ){
  return new Promise( function( resolve, reject){
    dbExecutorContent.getModifyAboutContentMaster( connection, id )
    .then( function( results ){
      resolve( {"modifyData": results[0]} );
    } )
    .catch( function( err ){
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
