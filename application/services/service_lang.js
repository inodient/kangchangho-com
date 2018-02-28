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
  return connHandler.getCookie( "lang" )
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
