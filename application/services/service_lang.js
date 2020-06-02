// exports.setDefaultLang = function( req, res ){
//   return new Promise( function(resolve, reject){
//     var connHandler = new connectionHandler( req, res );

//     connHandler.getSession( "lang", function(result, err){
//       if( err ) reject( err );

//       if( result === "undefined" ){
//         var lang = getBrowserDefaultLang( req );
        
//         connHandler.setSession( "lang", lang, function(){
//           resolve( lang );
//         } );

//         resolve( lang );
//       } else {
//         resolve( result );
//       }
//     } );
//   } );
// }




// exports.getLang = function( req, res ){
//   var connHandler = new connectionHandler( req, res );

//   connHandler.getSession( "lang", function(result, err){
//     return result;
//   } );
// }




// function getBrowserDefaultLang( req ){
//   try{
//     var lang = req.headers["accept-language"];

//     logger.debug( "accept-language :", lang );


//     lang = ( ( ( ( ( lang.split(";") )[0] ).split(",") )[0] ).split("-") )[0];
//     return lang;
//   } catch( err ){
//     throw err;
//   }
// }





exports.setDefaultLang = function( req, res ){
  return new Promise( function(resolve, reject){
    var connHandler = new connectionHandler( req, res );

    connHandler.getCookie( "lang", function(result, err){
      if( err ) reject( err );

      if( result === "undefined" ){
        var lang = getBrowserDefaultLang( req );
        
        connHandler.clearCookie( "lang" );
        connHandler.setCookie( "lang", lang, function(){
          resolve( lang );
        } );

        resolve( lang );
      } else {
        resolve( result );
      }
    } );
  } );
}




exports.getLang = function( req, res ){
  var connHandler = new connectionHandler( req, res );

  logger.debug( connHandler.getCookie( "lang" ) );

  return connHandler.getCookie( "lang" )
}




function getBrowserDefaultLang( req ){
  try{
    var lang = req.headers["accept-language"];

    logger.debug( "accept-language :", lang );
    logger.debug( "accept-language :", typeof(lang) );

    if( lang == undefined || lang == "undefined" ){
      logger.debug( "UNDEFINED ACCEPT LANGUAGE" );
      return "ko-KR"; //en-US
    }

    lang = ( ( ( ( ( lang.split(";") )[0] ).split(",") )[0] ).split("-") )[0];  
    return lang;

  } catch( err ){
    throw err;
  }
}
