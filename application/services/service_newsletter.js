const dbExecutorNewsLetter = require( require("path").join( __runningPath, "application", "model", "dbExecutor_newsletter.js" ) );




exports.getNewsLetter = function( connection, targetId, lang ){
  return new Promise( function(resolve, reject){
    var promises = [];

    promises.push( dbExecutorNewsLetter.getNewsLetterMaster( connection, targetId, lang ) );
    promises.push( dbExecutorNewsLetter.getNewsLetterContentsList( connection, targetId, lang ) );

    Promise.all( promises )
    .then( function(){
      var argv = arguments[0];

      resolve( {
        "newsLetterMaster": ( argv[0] )[0],
        "newsLetterContentsList": argv[1]
      } );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.getModifyNewsLetterMaster = function( connection, id ){
  return new Promise( function( resolve, reject){
    dbExecutorNewsLetter.getModifyNewsLetterMaster( connection, id )
    .then( function( results ){
      resolve( {"modifyData": results[0]} );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}




exports.addSubscription = function( connection, parameter, lang ){
  return new Promise( function(resolve, reject){

    dbExecutorNewsLetter.checkSubscription( connection, parameter.addr, lang )
    .then( function( results ){
      var checkResult = parseInt( results[0].checkResult );

      if( checkResult > 0 ){
        resolve( { "status":"0", "message":createMessage( lang, 0, parameter.addr ) } );
      } else{
        dbExecutorNewsLetter.addSubscription( connection, parameter.addr, lang )
        .then( function( results ){
          resolve( { "status":"1", "message":createMessage( lang, 1, parameter.addr )  } );
        } )
        .catch( function( _err ){
          reject( _err );
        } );
      }
    } )
    .catch( function( err ){
      reject( err );
    } );

  } );
}

exports.sendWelcomeMail = function( parameter, lang ){
  return new Promise( function(resolve, reject){
    var nodemailer = require('nodemailer');

    var mailInfo = getMailInfo( parameter.addr, lang );
    var transporterInfo = mailInfo.transporterInfo;
    var mailOptions = mailInfo.mailOptions;

    var transporter = nodemailer.createTransport( transporterInfo );
    transporter.sendMail( mailOptions, function( err, info ){
      if( err ){
        logger.error( err );
        reject( err );
      } else{
        resolve( {"stauts":"succeed"} );
      }
    } );

  } );
}

exports.addNewsLetter = function( connection, parameter ){
  return new Promise( function(resolve, reject){

    dbExecutorNewsLetter.addNewsLetterMaster( connection, parameter )
    .then( function(){
      dbExecutorNewsLetter.getInsertedNewsLetterId( connection, parameter )
      .then( function( results ){

        var contentList = parameter.announceContentList;
        var announceList = parameter.newsletterAnnounceList;

        var promises = [];

        for( var i=0; i<contentList.length; i++ ){
          var params = {};
          params.newsletter_id = results[0].id;
          params.seq = i;
          params.link_type = "content";
          params.link_id = contentList[i];

          promises.push( dbExecutorNewsLetter.addNewsLetterList( connection, params ) );
        }

        for( var i=0; i<announceList.length; i++ ){
          var params = {};
          params.newsletter_id = results[0].id;
          params.seq = i;
          params.link_type = "announce";
          params.link_id = announceList[i];

          promises.push( dbExecutorNewsLetter.addNewsLetterList( connection, params ) );
        }

        Promise.all( promises )
        .then( function(){
          resolve( {"newsLetterId": results[0].id } );
        } )
        .catch( function(__err){
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

exports.modifyNewsLetter = function( connection, parameter ){
  return new Promise( function(resolve, reject){

    var modifyId = parameter.modifyId;
    var promises =[];

    logger.debug( "modifyId :", modifyId );

    promises.push( dbExecutorNewsLetter.deleteNewsLetter( connection, modifyId ) );
    promises.push( dbExecutorNewsLetter.deleteNewsLetterList( connection, modifyId ) );

    Promise.all( promises )
    .then( function(){

      dbExecutorNewsLetter.addNewsLetterMaster( connection, parameter )
      .then( function(){
        dbExecutorNewsLetter.getInsertedNewsLetterId( connection, parameter )
        .then( function( results ){

          var contentList = parameter.announceContentList;
          var announceList = parameter.newsletterAnnounceList;

          var promises = [];

          for( var i=0; i<contentList.length; i++ ){
            var params = {};
            params.newsletter_id = results[0].id;
            params.seq = i;
            params.link_type = "content";
            params.link_id = contentList[i];

            promises.push( dbExecutorNewsLetter.addNewsLetterList( connection, params ) );
          }

          for( var i=0; i<announceList.length; i++ ){
            var params = {};
            params.newsletter_id = results[0].id;
            params.seq = i;
            params.link_type = "announce";
            params.link_id = announceList[i];

            promises.push( dbExecutorNewsLetter.addNewsLetterList( connection, params ) );
          }

          Promise.all( promises )
          .then( function(){
            resolve( {"newsLetterId": results[0].id } );
          } )
          .catch( function(___err){
            reject( ___err );
          } );

        } )
        .catch( function(__err){
          reject( __err );
        } );
      } )
      .catch( function(_err){
        reject( _err );
      } );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}




exports.getPageListOfNewsLetter = function( connection, lang, parameter ){
  return new Promise( function(resolve, reject){
    dbExecutorNewsLetter.getPageListOfNewsLetter( connection, lang )
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

exports.getPageListOfNewsLetterByIndex = function( connection, lang, parameter ){
  return new Promise( function(resolve, reject){
    getPagingRange( parameter )
    .then( function( pageInfo ){

      var pageRange = pageInfo.pageRange;
      var offset = ( ( parseInt( pageRange[0] ) - 1 ) * 8 );
      var length = ( parseInt( pageRange[pageRange.length-1] ) - parseInt( pageRange[0] ) + 1 ) * 8;

      pageInfo.offset = offset;
      pageInfo.length = length;

      dbExecutorNewsLetter.getPageListOfNewsLetterByIndex( connection, lang, pageInfo )
      .then( function( results ){

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

exports.getNewsLetterText = function( connection, lang ){
  return new Promise( function(resolve, reject){
    var searchText = [];

    if( lang === "en" ){
      searchText.push( {"search_text":"Last News Letter"} );
    } else if( lang === "ko" ){
      searchText.push( {"search_text":"지난 뉴스레터"} );
    }

    resolve( {"searchText":searchText} );
  } );
}




function createMessage( lang, status, addr ){
  if( lang === "en" ){

    if( status === 0 ){
      return "<b>" + addr + "is already subscribed.</b> <hr>If you want to change your information, <br>please let system adminstartor know.";
    } else if( status === 1 ){
      return "<b>Subscription request succeed. </b><hr>" + addr + " will receive kangchangho.com news letter.";
    }

  } else if( lang === "ko" ){

    if( status === 0 ){
      return "<b>이미 구독 중인 메일 주소 입니다.</b> <hr> " + addr + " 의 구독 정보를 변경하려면 <br> 시스템 운영 담당자에게 알려주세요.";
    } else if( status === 1 ){
      return "<b>구독 신청이 완료 되었습니다.</b> <hr> " + addr + " 로 <br> 정기적으로 발행되는 뉴스레터를 <br> 확인하실 수 있습니다.";
    }

  }
}

function getMailInfo( addr, lang ){
  var transporterInfo = getTransporterInfo();
  var mailOptions = getMailOptions( addr, lang );

  return { "transporterInfo":transporterInfo, "mailOptions":mailOptions };
}

function getTransporterInfo(){
  var transporterInfo = require( require("path").join( __runningPath, "application", "properties", "transporter.json" ) );
  return transporterInfo;
}

function getMailOptions( addr, lang ){
  // mailOption information
  var mailOptions = {
    from: 'inodient@gmail.com',
    to: addr,
    subject: getMailSubject( addr, lang ),
    html: getMailContent( addr, lang )
  };

  return mailOptions;
}

function getMailSubject( addr, lang ){
  if( lang === "en" ){
    return "#0 NewsLetter - kangchangho.com";
  } else if( lang === "ko" ){
    return "0번째 뉴스레터 - 강창호닷컴";
  }
}

function getMailContent( addr, lang ){
  if( lang === "en" ){
    return `
      <DOCTYPE html>
      <html>
        <head>
          <title>kangchangho.com NewsLetter #00"</title>
        </head>
        <body>
          <p>Thank you very much for subscribing kangchangho.com news letter.</p>
          <p>You will receive kangchangho.com news letter at&nbsp;<span style="font-weight: 700;">` + addr + `</span>.</p>
          <p>If we make mistake or introduce wrong knowledge, please send us that points.</p>
          <p>We will try to take many IT stories deeply.</p>
          <p><br></p><p><br></p><p style=""><br></p><p style=""><br></p>
          <hr>
          <p style=""><font color="#333333">Copyright(c) 2018 KANGCHANGHO.COM</font></p>
          <p style=""><font color="#333333">Created and Maintained by&nbsp;</font><span ">Ino Kang [Changho Kang].</span></p>
        </body>
      </html>
    `;
  } else if( lang === "ko" ){
    return `
      <DOCTYPE html>
      <html>
        <head>
          <title>kangchangho.com NewsLetter #00"</title>
        </head>
        <body>
          <p>강창호 닷컴 뉴스레터를 구독해 주셔서 감사 드립니다.</p>
          <p>앞으로 발행되는 뉴스레터를<span style="font-weight: 700;">&nbsp;` + addr + `</span>에서 받아보실 수 있습니다.</p>
          <p>틀린 부분이나 부족한 부분은 지적해 주시고, 지식을 나눌 수 있는 기회가 되었으면 합니다.</p>
          <p>여러 IT 이야기들을 깊이 있게 담을 수 있도록 노력하겠습니다.</p>
          <p><br></p><p><br></p><p style=""><br></p><p style=""><br></p>
          <hr>
          <p style=""><font color="#333333">Copyright(c) 2018 KANGCHANGHO.COM</font></p>
          <p style=""><font color="#333333">Created and Maintained by&nbsp;</font><span ">Ino Kang [Changho Kang].</span></p>
        </body>
      </html>
    `;
  }
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
