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

    if( lang != undefined && lang != "undefined" ){
      lang = ( ( ( ( ( lang.split(";") )[0] ).split(",") )[0] ).split("-") )[0];  
      return lang;
    } else {
      return "ko-KR"
    }
  } catch( err ){
    throw err;
  }
}
