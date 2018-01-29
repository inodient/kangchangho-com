exports.setDefaultLang = function( req, res ){
  return new Promise( function(resolve, reject){
    var connHandler = new connectionHandler( req, res );
    connHandler.getCookie( "lang", function(result, err){
      if( err ) reject( err );

      if( result === "undefined" ){
        var lang = getBrowserDefaultLang( req );
        connHandler.setCookie( "lang", lang );
        resolve( lang );
      }

      resolve( result );
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
    lang = ( ( ( ( ( lang.split(";") )[0] ).split(",") )[0] ).split("-") )[0];
    return lang;
  } catch( err ){
    throw err;
  }
}
