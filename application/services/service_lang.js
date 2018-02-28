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
        // connHandler.clearCookie( "lang" );
        // connHandler.setCookie( "lang", result, function(){
        //   resolve( result );
        // } );
        resolve( result );
      }
    } );
  } );
}




exports.getLang = function( req, res ){
  var connHandler = new connectionHandler( req, res );
  return connHandler.getCookie( "lang" )
  // connHandler.getSession( "lang", function(result, err){
  //   if( err ) return err;
  //   return result;
  // } );
}




function getBrowserDefaultLang( req ){
  try{
    var lang = req.headers["accept-language"];

    logger.debug( "accept-language :", lang );


    lang = ( ( ( ( ( lang.split(";") )[0] ).split(",") )[0] ).split("-") )[0];
    return lang;
  } catch( err ){
    throw err;
  }
}
