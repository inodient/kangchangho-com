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

exports.getNewsLetterToSend = function( connection, targetId, lang ){
  return new Promise( function(resolve, reject){
    var promises = [];

    promises.push( dbExecutorNewsLetter.getNewsLetterMasterToSend( connection, targetId, lang ) );
    promises.push( dbExecutorNewsLetter.getNewsLetterContentsListToSend( connection, targetId, lang ) );
    promises.push( dbExecutorNewsLetter.getReceiver( connection ) );

    Promise.all( promises )
    .then( function(){
      var argv = arguments[0];

      resolve( {
        "newsLetterMaster": ( argv[0] )[0],
        "newsLetterContentsList": argv[1],
        "receiver": argv[2]
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

        createMessage( lang, 0, parameter.addr )
        .then( function( message ){
          resolve( { "status":"0", "message":message } );
        } )
        .catch( function( __err ){
          reject( __err );
        } );

      } else{
        dbExecutorNewsLetter.addSubscription( connection, parameter.addr, lang )
        .then( function( results ){

          createMessage( lang, 1, parameter.addr )
          .then( function( message ){
            resolve( { "status":"1", "message":message } );
          } )
          .catch( function( __err ){
            reject( __err );
          } );

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

    getMailInfo( parameter.addr, lang, "welcome" )
    .then( function( mailInfo ){
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
    } )
    .catch( function( err ){
      reject( err );
    } );

  } );
}

exports.sendNewsLetterMail = function( connection, parameter ){
  return new Promise( function(resolve, reject){
    var nodemailer = require('nodemailer');

    var receiver = parameter.receiver;
    var contents = parameter.contents;

    var promises = [];

    for( var i=0; i<receiver.length; i++ ){
      promises.push(
        getMailInfo( parameter, receiver[i].lang, "newsletter", receiver[i] )
        .then( sendMail.bind( null ) )
        .catch( function( err ){
          reject( err );
        } )
      );
    }

    Promise.all( promises )
    .then( function(){
      var argv = arguments[0];
      resolve( argv );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

function sendMail( mailInfo ){
  return new Promise( function(resolve, reject){
    var nodemailer = require('nodemailer');

    var transporterInfo = mailInfo.transporterInfo;
    var mailOptions = mailInfo.mailOptions;

    var transporter = nodemailer.createTransport( transporterInfo );
    transporter.sendMail( mailOptions, function( err, info ){
      if( err ){
        logger.error( err );
        reject( err );
      }

      resolve( info );
    } );
  } );
}

exports.addNewsLetterHistory = function( connection, parameter ){

    return new Promise( function(resolve, reject){
      var receiver = parameter.receiver;
      var contents = parameter.contents;

      var promises = [];

      for( var i=0; i<receiver.length; i++ ){
        promises.push(
          new Promise( function(_resolve, _reject){
            getMailInfo( parameter, receiver[i].lang, "newsletter", receiver[i] )
            .then( function( mailInfo ){

              var mailOptions = mailInfo.mailOptions;

              dbExecutorNewsLetter.addNewsLetterHistory( connection, mailOptions )
              .then( addNewsLetterAttachmentsHistory.bind( null, connection, mailOptions ) )
              .then( function(){
                _resolve( {"status":"succeed"} );
              } )
              .catch( function( _err ){
                _reject( _err );
              } )

            } )
            .catch( function( err ){
              _reject( err );
            } )
          } )
        );
      }

      Promise.all( promises )
      .then( function(){
        resolve( {"status":"succeed"} );
      } )
      .catch( function( err ){
        reject( err );
      } );
    } );
}

function addNewsLetterAttachmentsHistory( connection, mailOptions, results ){
  return new Promise( function(resolve, reject){
    var promises = [];
    var attachList = mailOptions.attachments;

    for( var j=0; j<attachList.length; j++ ){
      var attachInfo = {};
      attachInfo.insertId = results.insertId;
      attachInfo.filename = attachList[j].filename;
      attachInfo.path = attachList[j].path;
      attachInfo.cid = attachList[j].cid;

      promises.push( dbExecutorNewsLetter.addNewsLetterAttachmentsHistory( connection, attachInfo ) );
    }

    Promise.all( promises )
    .then( function(){
      resolve( {"status":"succeed"} );
    } )
    .catch( function( err ){
      reject( err );
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
  return new Promise( function(resolve, reject){
    if( lang === "en" ){
      if( status === 0 ){
        resolve( "<b>" + addr + "is already subscribed.</b> <hr>If you want to change your information, <br>please let system adminstartor know." );
      } else if( status === 1 ){
        resolve( "<b>Subscription request succeed. </b><hr>" + addr + " will receive kangchangho.com news letter." );
      }
    } else if( lang === "ko" ){
      if( status === 0 ){
        resolve( "<b>이미 구독 중인 메일 주소 입니다.</b> <hr> " + addr + " 의 구독 정보를 변경하려면 <br> 시스템 운영 담당자에게 알려주세요." );
      } else if( status === 1 ){
        resolve( "<b>구독 신청이 완료 되었습니다.</b> <hr> " + addr + " 로 <br> 정기적으로 발행되는 뉴스레터를 <br> 확인하실 수 있습니다.");
      }
    }
  } );
}

function getMailInfo( parameter, lang, type, receiver ){
  return new Promise( function(resolve, reject){

    var promises = [];
    promises.push( getTransporterInfo() );
    promises.push( getMailOptions( parameter, lang, type, receiver ) );

    Promise.all( promises )
    .then( function(){
      var argv = arguments[0];

      var transporterInfo = argv[0];
      var mailOptions = argv[1];

      resolve( { "transporterInfo":transporterInfo, "mailOptions":mailOptions } );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

function getTransporterInfo(){
  return new Promise( function(resolve, reject){
    var transporterInfo = require( require("path").join( __runningPath, "application", "properties", "transporter.json" ) );
    resolve( transporterInfo );
  } );
}

function getMailOptions( parameter, lang, type, receiver ){
  return new Promise( function(resolve, reject){
    if( type === "welcome" ){
      getWelcomeMailOptions( parameter, lang, type )
      .then( function( mailOptions ){
        resolve( mailOptions );
      } )
      .catch( function(err){
        reject( err );
      } );
    } else if( type === "newsletter" ){
      getNewsLetterMailOptions( parameter, lang, type, receiver )
      .then( function( mailOptions ){
        resolve( mailOptions );
      } )
      .catch( function(err){
        reject( err );
      } );
    }
  } );
}

function getWelcomeMailOptions( parameter, lang, type ){
  return new Promise( function(resolve, reject){
    var promises = [];
    promises.push( getMailSubject( parameter, lang, type ) );
    promises.push( getMailContent( parameter, lang, type ) );
    promises.push( getAttachments( parameter, lang, type ) );

    Promise.all( promises )
    .then( function(){

      var argv = arguments[0];

      var mailOptions = {
        from: 'inodient@gmail.com',
        to: parameter,
        subject: argv[0],
        html: argv[1],
        attachments: argv[2]
      };

      resolve( mailOptions );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

function getNewsLetterMailOptions( parameter, lang, type, receiver ){
  return new Promise( function(resolve, reject){

    var promises = [];
    promises.push( getMailSubject( parameter, lang, type ) );
    promises.push( getMailContent( parameter, lang, type ) );
    promises.push( getAttachments( parameter, lang, type ) );

    Promise.all( promises )
    .then( function(){

      var argv = arguments[0];

      var mailOptions = {
        from: 'inodient@gmail.com',
        to: receiver.email,
        subject: argv[0],
        html: argv[1],
        attachments: argv[2]
      };

      resolve( mailOptions );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}




function getMailSubject( parameter, lang, type ){
  return new Promise( function(resolve, reject){
    if( type === "welcome" ){
      getWelcomeMailSubject( parameter, lang )
      .then( function( subject ){
        resolve( subject );
      } )
      .catch( function( err ){
        reject( err );
      } );
    } else if( type === "newsletter" ){
      getNewsLetterMailSubject( parameter, lang )
      .then( function( subject ){
        resolve( subject );
      } )
      .catch( function( err ){
        reject( err );
      } );
    }
  } );
}

function getWelcomeMailSubject( parameter, lang ){
  return new Promise( function(resolve, reject){
    if( lang === "en" ){
      resolve( "#0 NewsLetter - kangchangho.com" );
    } else if( lang === "ko" ){
      resolve( "0번째 뉴스레터 - 강창호닷컴" );
    }
  } );
}

function getNewsLetterMailSubject( parameter, lang ){
  return new Promise( function(resolve, reject){
    if( lang === "en" ){
      resolve( "KANGCHANGHO.COM - " + parameter.newsLetterMaster.title_en );
    } else if( lang === "ko" ){
      resolve( "강창호닷컴 뉴스레터 - " + parameter.newsLetterMaster.title_ko );
    }
  } );
}




function getMailContent( parameter, lang, type ){
  return new Promise( function(resolve, reject){
    if( type === "welcome" ){
      getWelcomeMailContent( parameter, lang )
      .then( function( contents ){
        resolve( contents );
      } )
      .catch( function(err){
        reject( err );
      } );
    } else if( type === "newsletter" ){
      getNewsLetterMailContent( parameter, lang )
      .then( function( contents ){
        resolve( contents );
      } )
      .catch( function(err){
        reject( err );
      } );
    }
  } );
}

function getWelcomeMailContent( parameter, lang ){
  return new Promise( function(resolve, reject){
    var html = ``;

    if( lang === "en" ){
      html =  `
        <DOCTYPE html>
        <html>
          <head>
            <title>kangchangho.com NewsLetter #00"</title>
          </head>
          <body>
            <p>Thank you very much for subscribing kangchangho.com news letter.</p>
            <p>You will receive kangchangho.com news letter at&nbsp;<span style="font-weight: 700;">` + parameter + `</span>.</p>
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
      html = `
        <DOCTYPE html>
        <html>
          <head>
            <title>kangchangho.com NewsLetter #00"</title>
          </head>
          <body>
            <p>강창호 닷컴 뉴스레터를 구독해 주셔서 감사 드립니다.</p>
            <p>앞으로 발행되는 뉴스레터를<span style="font-weight: 700;">&nbsp;` + parameter + `</span>에서 받아보실 수 있습니다.</p>
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

    resolve( html );
  } );
}

// function getNewsLetterMailContent( parameter, lang ){
//   return new Promise( function(resolve, reject){
//
//     var newsLetterMaster = parameter.newsLetterMaster;
//     var newsLetterContentsList = parameter.newsLetterContentsList;
//     var host = parameter.host;
//
//     var promises = [];
//     promises.push( designContent(newsLetterMaster.content_en) );
//     promises.push( designContent(newsLetterMaster.content_ko) );
//     promises.push( createContentThumb(newsLetterContentsList, host, "en") );
//     promises.push( createAnnounceThumb(newsLetterContentsList, host, "en") );
//     promises.push( createContentThumb(newsLetterContentsList, host, "ko") );
//     promises.push( createAnnounceThumb(newsLetterContentsList, host, "ko") );
//
//     Promise.all( promises )
//     .then( function(){
//       var argv = arguments[0];
//       var content_en = argv[0];
//       var content_ko = argv[1];
//       var contents_en = argv[2];
//       var announce_en = argv[3];
//       var contents_ko = argv[4];
//       var announce_ko = argv[5];
//
//
//       var html = ``;
//
//       if( lang === "en" ){
//         html = `
//           <!DOCTYPE html>
//           <html>
//             <head>
//
//             <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
//             <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
//             <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
//             <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
//
//             <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
//             <link href="https://fonts.googleapis.com/css?family=Roboto:italic" rel="stylesheet">
//             <link href="https://fonts.googleapis.com/css?family=Roboto:bold" rel="stylesheet">
//             <link href="https://fonts.googleapis.com/css?family=Roboto:bolditalic" rel="stylesheet">
//             <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
//
//             <link rel="stylesheet" href="http://` + host + `/kangchangho-com.css">
//
//             <script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@1.6.0/src/loadingoverlay.min.js"></script>
//             <script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@1.6.0/extras/loadingoverlay_progress/loadingoverlay_progress.min.js"></script>
//
//             <script src="http://` + host + `/kangchangho-com.js"></script>
//             <script src="http://` + host + `/design.js"></script>
//
//             <style>
//               .paragraph-end {
//                 margin-bottom: 30px;
//               }
//
//               .small-section-end {
//                 margin-bottom: 60px;
//               }
//
//               .section-end {
//                 margin-bottom: 120px;
//               }
//
//               .content-footer .writer {
//                 font-size: 16.5px;
//                 font-weight: 800;
//               }
//
//               .content-anchor {
//                 color: #111111;
//                 text-decoration: none;
//               }
//
//               .content-anchor:hover {
//                 color: #888888;
//                 text-decoration: none;
//                 cursor: pointer;
//               }
//
//               .content-anchor:focus {
//                 color: #888888;
//                 text-decoration: none;
//                 cursor: pointer;
//               }
//
//               .content-image {
//                 max-width: 100%;
//               }
//
//               .content-text {
//                 line-height: 1.65em;
//                 margin-top: 20px;
//                 color: #777777;
//               }
//
//               .date {
//                 font-size: 12px;
//                 color: #777777;
//               }
//
//               .after-line-block::after {
//                 content: '';
//                 display: block;
//                 width: 5rem;
//                 height: 2px;
//                 background: black;
//                 margin-top: 30px;
//               }
//             </style>
//
//
//
//             </head>
//             <body style="padding: 25px">
//
//
//               <article>
//                 <div class="row">
//                   <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//                     <div class="content-body section-end">
//                       <div>
//                         <h2 class="after-line-block">` + newsLetterMaster.title_en + `</h2>
//                       </div>
//
//                       <div class="paragraph-end"></div>
//
//                       <div class="small-section-end">
//                         <img class="content-image" id="` + newsLetterMaster.image_id + `" src="cid:` + newsLetterMaster.image_path + `" />
//                       </div>
//
//                       <p class="content-text small-section-end">
//                         ` + content_en + `
//                       </p>
//                     </div>
//
//                     <div class="small-section-end"></div>
//
//                     <div class="content-footer">
//                       <div class="paragraph-end content-anchor writer after-line-block">` + newsLetterMaster.writer_name_en + ` | ` + ( ( newsLetterMaster.create_date ).toISOString() ).split("T")[0] + `</div>
//                       <div>` + newsLetterMaster.writer_description_en + `</div>
//                     </div>
//
//                   </div>
//                 </div>
//               </article>
//
//               <div class="section-end"></div>
//
//               <article>
//                 <div class="row">
//                   <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//                     <h3 class="after-line-block">Post & Announce</h3>
//
//                     <table class="table table-responsive" style="border: 0">
//                       <tbody>
//                       `
//                         + contents_en +
//                       `<tr></tr>
//                       `
//                         + announce_en +
//                       `
//                       <tbody>
//                     </table>
//                   </div>
//                 </div>
//             </article>
//           </body>
//         </html>
//         `;
//       } else if( lang === "ko" ){
//         html = `
//           <!DOCTYPE html>
//           <html>
//             <head>
//
//             <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
//             <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
//             <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
//             <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
//
//             <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
//             <link href="https://fonts.googleapis.com/css?family=Roboto:italic" rel="stylesheet">
//             <link href="https://fonts.googleapis.com/css?family=Roboto:bold" rel="stylesheet">
//             <link href="https://fonts.googleapis.com/css?family=Roboto:bolditalic" rel="stylesheet">
//             <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
//
//             <link rel="stylesheet" href="http://` + host + `/kangchangho-com.css">
//
//             <script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@1.6.0/src/loadingoverlay.min.js"></script>
//             <script src="https://cdn.jsdelivr.net/npm/gasparesganga-jquery-loading-overlay@1.6.0/extras/loadingoverlay_progress/loadingoverlay_progress.min.js"></script>
//
//             <script src="http://` + host + `/kangchangho-com.js"></script>
//             <script src="http://` + host + `/design.js"></script>
//
//             <style>
//               .paragraph-end {
//                 margin-bottom: 30px;
//               }
//
//               .small-section-end {
//                 margin-bottom: 60px;
//               }
//
//               .section-end {
//                 margin-bottom: 120px;
//               }
//
//               .content-footer .writer {
//                 font-size: 16.5px;
//                 font-weight: 800;
//               }
//
//               .content-anchor {
//                 color: #111111;
//                 text-decoration: none;
//               }
//
//               .content-anchor:hover {
//                 color: #888888;
//                 text-decoration: none;
//                 cursor: pointer;
//               }
//
//               .content-anchor:focus {
//                 color: #888888;
//                 text-decoration: none;
//                 cursor: pointer;
//               }
//
//               .content-image {
//                 max-width: 100%;
//               }
//
//               .content-text {
//                 line-height: 1.65em;
//                 margin-top: 20px;
//                 color: #777777;
//               }
//
//               .date {
//                 font-size: 12px;
//                 color: #777777;
//               }
//
//               .after-line-block::after {
//                 content: '';
//                 display: block;
//                 width: 5rem;
//                 height: 2px;
//                 background: black;
//                 margin-top: 30px;
//               }
//             </style>
//
//
//             </head>
//             <body style="padding: 25px;">
//
//
//               <article>
//                 <div class="row">
//                   <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//                     <div class="content-body section-end">
//                       <div class="after-line-block">
//                         <h2>` + newsLetterMaster.title_en + `</h2>
//                       </div>
//
//                       <div class="paragraph-end"></div>
//
//                       <div class="small-section-end">
//                         <img class="content-image" id="` + newsLetterMaster.image_id + `" src="cid:` + newsLetterMaster.image_path + `" />
//                       </div>
//
//                       <p class="content-text small-section-end">
//                         ` + content_ko + `
//                       </p>
//                     </div>
//
//                     <div class="small-section-end"></div>
//
//                     <div class="content-footer">
//                       <div class="paragraph-end content-anchor writer after-line-block">` + newsLetterMaster.writer_name_ko + ` | ` + ( ( newsLetterMaster.create_date ).toISOString() ).split("T")[0] + `</div>
//                       <div>` + newsLetterMaster.writer_description_ko + `</div>
//                     </div>
//
//                   </div>
//                 </div>
//               </article>
//
//               <div class="section-end"></div>
//
//               <article>
//                 <div class="row">
//                   <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//                     <h3 class="after-line-block">Post & Announce</h3>
//
//                     <table class="table table-responsive" style="border: 0">
//                       <tbody>
//                       `
//                         + contents_ko +
//                       `<tr></tr>
//                       `
//                         + announce_ko +
//                       `
//                       <tbody>
//                     </table>
//                   </div>
//                 </div>
//             </article>
//           </body>
//         </html>
//         `;
//       }
//
//       logger.debug( "==========================" );
//       logger.debug( html );
//       logger.debug( "==========================" );
//
//       resolve( html );
//     } )
//     .catch( function(err){
//       reject( err );
//     } );
//
//   } );
// }

function getNewsLetterMailContent( parameter, lang ){
  return new Promise( function(resolve, reject){

    var newsLetterMaster = parameter.newsLetterMaster;
    var newsLetterContentsList = parameter.newsLetterContentsList;
    var host = parameter.host;

    var promises = [];
    promises.push( designContent(newsLetterMaster.content_en) );
    promises.push( designContent(newsLetterMaster.content_ko) );
    promises.push( createContentThumb(newsLetterContentsList, host, "en") );
    promises.push( createAnnounceThumb(newsLetterContentsList, host, "en") );
    promises.push( createContentThumb(newsLetterContentsList, host, "ko") );
    promises.push( createAnnounceThumb(newsLetterContentsList, host, "ko") );

    Promise.all( promises )
    .then( function(){
      var argv = arguments[0];
      var content_en = argv[0];
      var content_ko = argv[1];
      var contents_en = argv[2];
      var announce_en = argv[3];
      var contents_ko = argv[4];
      var announce_ko = argv[5];


      var html = ``;

      if( lang === "en" ){
        html = `
        <!DOCTYPE html>
        <html>
          <head>

          <style>
            body {
              font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
              line-height: 1.4rem;
              max-width: 600px;
              margin: auto;
              padding-top: 50px;
              padding-bottom: 50px;
            }

            .master-table {
              max-width: 600px;
            }

            img {
              max-width: 100%;
            }

            h2 {
              font-size:30px;
              margin: 30px 0 30px 0;
            }

            h3 {
              font-size:25px;
              margin: 30px 0 0px 0;
            }

            .table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th {
              border: 0;
              padding-top: 15px;
              padding-bottom: 15px;
            }

            .table>tbody>tr>td.td-aboveline {
              border-top: 1px solid #ddd;
            }

            .table>tbody>tr>td.td-underline {
              border-bottom: 1px solid #ddd;
              padding-top:30px;
              padding-bottom:30px;
            }

            .table>tbody>tr>td.td-inverse * {
              color: #ffffff;
              background-color: #000000;
              padding:3px;
            }

            .list-table td {
              padding: 15px 5px 15px 5px;
            }

            .text-center {
              text-align: center;
            }

            .text-right {
              text-align: right;
            }

            .big-text {
              font-size: 17.5px;
            }

            .text-embrassed {
              font-size: 17.5px;
              font-weight: 700;
            }

            .short-cut {
              padding:15px 15px 15px 15px;
              background-color: #000;
              color: #fff;
              text-decoration: none;
              display: inline-block;
            }

            .short-cut:hover {
              background-color: #666;
              color: #fff;
              text-decoration: none;
            }

            .title-anchor {
              color: #000000;
              font-size: 17px;
              text-decoration: none
            }

            .title-anchor:hover {
              color: #777777;
              font-size: 17px;
              text-decoration: none
            }

            .title-image:hover {
              pointer: cursor;
              opacity: 0.7;
            }
          </style>


          </head>
          <body>

            <table class="table table-responsive master-table">
              <tbody>
                <tr>
                  <td class="td-aboveline text-center">
                    <h2>` + newsLetterMaster.title_en + `</h2>
                  </td>
                </tr>
                <tr>
                  <td class="text-center">
                    <img class="content-image" id="` + newsLetterMaster.image_id + `" src="cid:` + newsLetterMaster.image_path + `" />
                  </td>
                </tr>
                <tr>
                  <td>
                    <div>
                      ` + content_en + `
                    </div>
                  </td>
                </tr>

                <tr>
                  <td class="td-underline">
                    <a class="short-cut" href="http://` + host + `/newsletter/` + newsLetterMaster.id + `">Read News Letter</a>
                    <a class="short-cut" href="http://` + host + `">kangchangho.com</a>
                  </td>
                </tr>

                <tr>
                  <td class="td-underline">
                    <table class="list-table table-responsive">
                      <tr>
                        <td colspan=2>
                          <h3>Posts & Announces</h3>
                        </td>
                      </tr>

                      ` + announce_en + `
                      ` + contents_en + `

                    </table>
                  </td>
                </tr>

                <tr>
                  <td class="td-inverse text-center big-text">
                    Copyright(c) 2018 KANGCHANGHO.COM <br>
                    Created and Maintained by Ino Kang [Changho Kang].
                  </td>
                </tr>

              </tbody>
            </table>

        </body>
      </html>
        `;
      } else if( lang === "ko" ){
        html = `
          <!DOCTYPE html>
          <html>
            <head>

            <style>
              body {
                font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
                line-height: 1.4rem;
                max-width: 600px;
                margin: auto;
                padding-top: 50px;
                padding-bottom: 50px;
              }

              .master-table {
                max-width: 600px;
              }

              img {
                max-width: 100%;
              }

              h2 {
                font-size:30px;
                margin: 30px 0 30px 0;
              }

              h3 {
                font-size:25px;
                margin: 30px 0 0px 0;
              }

              .table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th {
                border: 0;
                padding-top: 15px;
                padding-bottom: 15px;
              }

              .table>tbody>tr>td.td-aboveline {
                border-top: 1px solid #ddd;
              }

              .table>tbody>tr>td.td-underline {
                border-bottom: 1px solid #ddd;
                padding-top:30px;
                padding-bottom:30px;
              }

              .table>tbody>tr>td.td-inverse * {
                color: #ffffff;
                background-color: #000000;
                padding:3px;
              }

              .list-table td {
                padding: 15px 5px 15px 5px;
              }

              .text-center {
                text-align: center;
              }

              .text-right {
                text-align: right;
              }

              .big-text {
                font-size: 17.5px;
              }

              .text-embrassed {
                font-size: 17.5px;
                font-weight: 700;
              }

              .short-cut {
                padding:15px 15px 15px 15px;
                background-color: #000;
                color: #fff;
                text-decoration: none;
                display: inline-block;
              }

              .short-cut:hover {
                background-color: #666;
                color: #fff;
                text-decoration: none;
              }

              .title-anchor {
                color: #000000;
                font-size: 17px;
                text-decoration: none
              }

              .title-anchor:hover {
                color: #777777;
                font-size: 17px;
                text-decoration: none
              }

              .title-image:hover {
                pointer: cursor;
                opacity: 0.7;
              }
            </style>


            </head>
            <body>

              <table class="table table-responsive master-table">
                <tbody>
                  <tr>
                    <td class="td-aboveline text-center">
                      <h2>` + newsLetterMaster.title_ko + `</h2>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-center">
                      <img class="content-image" id="` + newsLetterMaster.image_id + `" src="cid:` + newsLetterMaster.image_path + `" />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div>
                        ` + content_ko + `
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td class="td-underline">
                      <a class="short-cut" href="http://` + host + `/newsletter/` + newsLetterMaster.id + `">뉴스레터 보기</a>
                      <a class="short-cut" href="http://` + host + `">강창호닷컴 바로가기</a>
                    </td>
                  </tr>

                  <tr>
                    <td class="td-underline">
                      <table class="list-table table-responsive">
                        <tr>
                          <td colspan=2>
                            <h3>Posts & Announces</h3>
                          </td>
                        </tr>

                          ` + announce_ko + `
                          ` + contents_ko + `

                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td class="td-inverse text-center big-text">
                      Copyright(c) 2018 KANGCHANGHO.COM <br>
                      Created and Maintained by Ino Kang [Changho Kang].
                    </td>
                  </tr>

                </tbody>
              </table>

          </body>
        </html>
        `;
      }

      logger.debug( html );

      resolve( html );
    } )
    .catch( function(err){
      reject( err );
    } );

  } );
}



function designContent( content ){
  return new Promise( function(resolve, reject){
    const cheerio = require( "cheerio" );

    try {
      const $ = cheerio.load( content );

      $("img").each( function(){
        $(this).attr( "id", "inodient" );
        $(this).css( {'width':''} );
        $(this).css( {'max-width':'100%'} );
        var orgSrc = $(this).attr( "src" );
        $(this).attr( "src", orgSrc.replace( "/", "cid:" ) );
      } );

      var html = $.html();
      html = html.replace( "<html>", "" );
      html = html.replace( "<head>", "" );
      html = html.replace( "<body>", "" );
      html = html.replace( "</body>", "" );
      html = html.replace( "</head>", "" );
      html = html.replace( "</html>", "" );

      html = "<div>" + html + "</div>";

      resolve( html );

    } catch( err ){
      reject( err );
    }
  } );
}

function createContentThumb( newsLetterContentsList, host, lang ){
  return new Promise( function(resolve, reject){
    var list = [];
    var title = "";

    for( var i=0; i<newsLetterContentsList.length; i++ ){
      if( newsLetterContentsList[i].link_type === "content" ){

        if( lang === "en" ){
          title = newsLetterContentsList[i].title_en;
        } else if( lang === "ko" ){
          title = newsLetterContentsList[i].title_ko;
        }

        list.push( `<td class="text-center">
          <a href="http://` + host + `/content/` + newsLetterContentsList[i].link_id +`"><img class="title-image" style="width: 100%" src="cid:` + newsLetterContentsList[i].image_path + `" /></a>
          <a class="title-anchor" href="http://` + host + `/content/` + newsLetterContentsList[i].link_id +`">` + title + `</a>
        </td>` );
      }
    }

    var listString = `<tr>`;

    for( var i=0; i<list.length; i++ ){
      listString += list[i];

      if( i % 2 == 1 ){
        if( i === list.length - 1 ){
          listString += `</tr>`;
        } else{
          listString += `</tr><tr>`;
        }
      } else {
        if( i === list.length - 1 ){
          listString += `
            <td>
            </td>
          `
          listString += `</tr>`;
        }
      }
    }
    resolve( listString );
  } );
}

function createAnnounceThumb( newsLetterContentsList, host, lang ){
  return new Promise( function(resolve, reject){
    var list = ``;
    var title = "";

    for( var i=0; i<newsLetterContentsList.length; i++ ){
      if( newsLetterContentsList[i].link_type === "announce" ){

        if( lang === "en" ){
          title = newsLetterContentsList[i].title_en
        } else if( lang === "ko" ){
          title = newsLetterContentsList[i].title_ko
        }

        list += `<tr>
          <td colspan=2 class="text-center">
            <a href="http://` + host + `/announce/` + newsLetterContentsList[i].link_id +`"><img class="title-image" style="width: 100%" src="cid:` + newsLetterContentsList[i].image_path + `" /></a>
            <a class="title-anchor" href="http://` + host + `/announce/` + newsLetterContentsList[i].link_id +`">` + title + `</a>
          </td>
        </tr>`;
      }
    }

    resolve( list );
  } );
}





function getAttachments( parameter, lang, type ){
  return new Promise( function(resolve, reject){
    if( type === "welcome" ){
      getWelcomeAttachments( parameter, lang )
      .then( function(attachments){
        resolve( attachments );
      } )
      .catch( function(err){
      } );
    } else if( type === "newsletter" ){
      getNewsLetterAttachments( parameter, lang )
      .then( function(attachments){
        resolve( attachments );
      } )
      .catch( function(err){
      } );
    }
  } );
}

function getWelcomeAttachments( parameter, lang ){
  return new Promise( function(resolve, reject){
    var attachments = [];
    attachments.push( {
      filename: "kangchangho-com.css",
      path: require("path").join( __runningPath, __viewsPath, "css", "kangchangho-com.css" ),
      cid: "kangchangho-com.css"
    } );

    resolve( attachments );
  } );
}

// function getNewsLetterAttachments( parameter, lang ){
//   return new Promise( function(resolve, reject){
//     var newsLetterMaster = parameter.newsLetterMaster;
//     var newsLetterContentsList = parameter.newsLetterContentsList;
//
//     var attachments = [];
//
//     try {
//       const cheerio = require( "cheerio" );
//       var $ = cheerio.load( newsLetterMaster.content_en );
//
//       $("img").each( function(){
//         attachments.push( {
//           filename: ( $(this).attr( "src" ) ).split("cid:")[1],
//           path: require("path").join( __runningPath, "upload", "image", ( $(this).attr( "src" ) ).split("cid:")[1] ),
//           cid: ( $(this).attr( "src" ) ).split("cid:")[1]
//         } );
//
//         $(this).css( {'width':'100%'} )
//       } );
//       // newsLetterMaster.content_en = $.html();
//       // parameter.newsLetterMaster = newsLetterMaster;
//
//
//       $ = cheerio.load( newsLetterMaster.content_ko );
//
//       $("img").each( function(){
//         attachments.push( {
//           filename: ( $(this).attr( "src" ) ).split("cid:")[1],
//           path: require("path").join( __runningPath, "upload", "image", ( $(this).attr( "src" ) ).split("cid:")[1] ),
//           cid: ( $(this).attr( "src" ) ).split("cid:")[1]
//         } );
//
//         $(this).css( {'width':'100%'} )
//       } );
//       // newsLetterMaster.content_ko = $.html();
//       // parameter.newsLetterMaster = newsLetterMaster;
//
//       attachments.push( {
//         filename: newsLetterMaster.image_path,
//         path: require("path").join( __runningPath, "upload", "image", newsLetterMaster.image_path ),
//         cid: newsLetterMaster.image_path
//       } );
//
//       resolve( attachments );
//
//     } catch( err ){
//       reject( err );
//     }
//   } );
// }

function getNewsLetterAttachments( parameter, lang ){
  return new Promise( function(resolve, reject){
    var newsLetterMaster = parameter.newsLetterMaster;
    var newsLetterContentsList = parameter.newsLetterContentsList;

    var attachments = [];

    var promises = [];
    promises.push( extractAttachments(newsLetterMaster.content_en) );
    promises.push( extractAttachments(newsLetterMaster.content_ko) );
    promises.push( getRelatedArticleAttachment(newsLetterContentsList) );

    Promise.all( promises )
    .then( function(){
      var argv = arguments[0];

      var content_en = argv[0];
      var content_ko = argv[1];
      var articles_attach = argv[2];

      attachments.push( {
        filename: newsLetterMaster.image_path,
        path: require("path").join( __runningPath, "upload", "image", newsLetterMaster.image_path ),
        cid: newsLetterMaster.image_path
      } );

      for( var i=0; i<argv[0].length; i++ ){
        attachments.push( (argv[0])[i] );
      }

      for( var j=0; j<argv[1].length; j++ ){
        attachments.push( (argv[1])[j] );
      }

      for( var k=0; k<argv[2].length; k++ ){
        attachments.push( (argv[2])[k] );
      }

      resolve( attachments );
    } )
    .catch( function( err ){
      reject( err );
    } );

  } );
}

function extractAttachments( content ){
  return new Promise( function(resolve, reject){
    try {
      const cheerio = require( "cheerio" );
      const $ = cheerio.load( content );

      var attachments = [];

      $("img").each( function(){

        attachments.push( {
          filename: $(this).attr( "src" ).split("/")[1],
          path: require("path").join( __runningPath, "upload", "image", $(this).attr( "src" ).split("/")[1] ),
          cid: $(this).attr( "src" ).split("/")[1]
        } );
      } );

      resolve( attachments );
    } catch( err ){
      reject( err );
    }
  } );
}

function getRelatedArticleAttachment( newsLetterContentsList ){
  return new Promise( function(resolve, reject){
    var attachments = [];

    for( var i=0; i<newsLetterContentsList.length; i++ ){
      attachments.push( {
        filename: newsLetterContentsList[i].image_path,
        path: require("path").join( __runningPath, "upload", "image", newsLetterContentsList[i].image_path ),
        cid: newsLetterContentsList[i].image_path
      } );
    }

    resolve( attachments );
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
