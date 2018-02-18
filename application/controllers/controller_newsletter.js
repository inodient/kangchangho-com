const staticService = require( require("path").join( __runningPath, "application", "services", "service_static.js" ) );
const newsletterService = require( require("path").join( __runningPath, "application", "services", "service_newsletter.js" ) );




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