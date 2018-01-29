const langService = require( require("path").join( __runningPath, "application", "services", "service_lang.js" ) );
const menuService = require( require("path").join( __runningPath, "application", "services", "service_menu.js" ) );
const bannerService = require( require("path").join( __runningPath, "application", "services", "service_banner.js" ) );
const headerService = require( require("path").join( __runningPath, "application", "services", "service_header.js" ) );
const footerService = require( require("path").join( __runningPath, "application", "services", "service_footer.js" ) );





exports.getStaticInfo = function( req, res, connection, targetId ){
  return new Promise( function(resolve, reject){
    langService.setDefaultLang( req, res )
    .then( function( lang ){

      var promises = [];

      promises.push( headerService.getHeaderInfo( connection, lang ) );
      promises.push( menuService.getMenuListByLang( connection, "", lang, targetId ) );
      promises.push( bannerService.getBanner( connection, lang ) );
      promises.push( footerService.getFooterInfo( connection, lang ) );

      Promise.all( promises )
      .then( function(){
        var argv = arguments[0];

        setStaticInfoObject( lang, argv )
        .then( function(results){
          resolve( results );
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




function setStaticInfoObject( lang, argv ){
  return new Promise( function(resolve, reject){
    var objLang = {"lang":lang};
    var staticInfo = Object.assign( objLang, argv[0], argv[1], argv[2], argv[3] );

    resolve( staticInfo );
  } );
}
