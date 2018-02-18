const dbExecutorNewsLetter = require( require("path").join( __runningPath, "application", "model", "dbExecutor_newsletter.js" ) );




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
