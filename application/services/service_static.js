const langService = require( require("path").join( __runningPath, "application", "services", "service_lang.js" ) );
const menuService = require( require("path").join( __runningPath, "application", "services", "service_menu.js" ) );
const bannerService = require( require("path").join( __runningPath, "application", "services", "service_banner.js" ) );
const headerService = require( require("path").join( __runningPath, "application", "services", "service_header.js" ) );
const footerService = require( require("path").join( __runningPath, "application", "services", "service_footer.js" ) );
const dbExecutorHistory = require( require("path").join( __runningPath, "application", "model", "dbExecutor_history.js" ) );





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

          addAccessHistory( connection, req, lang )
          .then( function(){
            resolve( results );
          } )
          .catch( function( ___err ){
            reject( ___err );
          } );
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

function addAccessHistory( connection, req, lang ){
  return new Promise( function(resolve, reject){
    var history = {};

    history.lang = lang;
    history.contextPath = req.path;
    history.path = req.url;
    history.client = getClientAddress(req);

    dbExecutorHistory.addAccessHistory( connection, history )
    .then( function(results){
      resolve( results );
    } )
    .catch( function(err){
      reject( err );
    } );
  } );
}

function getClientAddress(req) {
    return (req.headers["X-Forwarded-For"] ||
            req.headers["x-forwarded-for"] ||
            '').split(',')[0] ||
           req.client.remoteAddress;
};
