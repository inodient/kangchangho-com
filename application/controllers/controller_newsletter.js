// const staticService = require( require("path").join( __runningPath, "application", "services", "service_static.js" ) );
const newsletterService = require( require("path").join( __runningPath, "application", "services", "service_newsletter.js" ) );




exports.control = function( req, res, connection ){
  return new Promise( function(resolve, reject){
    staticService.getStaticInfo( req, res, connection )
    .then( function( staticInfo ){
      var lang = staticInfo.lang;
      var targetId = req.params.id;
      var promises = [];

      newsletterService.getNewsLetter( connection, targetId, lang )
      .then( function( newsLetterInfo ){
        resolve( Object.assign( staticInfo, newsLetterInfo ) );
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




exports.control_subscribe = function( req, res, connection ){
  return new Promise( function(resolve, reject){

    staticService.getStaticInfo( req, res, connection )
    .then( function( staticInfo ){
      var lang = staticInfo.lang;

      newsletterService.addSubscription( connection, req.body, lang )
      .then( function( results ){

        // new subscription
        if( results.status === "1" ){

          newsletterService.sendWelcomeMail( req.body, lang )
          .then( function( res ){
            resolve( results );
          } )
          .catch( function( __err ){
            reject( __err );
          } );

        } else {
          // already existed mail address
          resolve( results );
        }

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




exports.control_send_newsletter = function( req, res, connection ){
  return new Promise( function(resolve, reject){

    staticService.getStaticInfo( req, res, connection )
    .then( function( staticInfo ){
      var lang = staticInfo.lang;
      var targetId = req.body.id;
      var promises = [];

      newsletterService.getNewsLetterToSend( connection, targetId, lang )
      .then( function( newsLetterInfo ){

        newsLetterInfo.host = req.headers.host;

        newsletterService.sendNewsLetterMail( connection, newsLetterInfo )
        .then( function(info){

          newsletterService.addNewsLetterHistory( connection, newsLetterInfo )
          .then( function(_results){

            resolve( _results );
          } )
          .catch( function(___err){
            reject(___err);
          } );

        } )
        .catch( function( __err ){
          reject( __err );
        } )
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
