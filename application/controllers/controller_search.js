const staticService = require( require("path").join( __runningPath, "application", "services", "service_static.js" ) );
const contentService = require( require("path").join( __runningPath, "application", "services", "service_content.js" ) );
const hashService = require( require("path").join( __runningPath, "application", "services", "service_hash.js" ) );
const announceService = require( require("path").join( __runningPath, "application", "services", "service_announce.js" ) );
const langService = require( require("path").join( __runningPath, "application", "services", "service_lang.js" ) );
const menuService = require( require("path").join( __runningPath, "application", "services", "service_menu.js" ) );
const writerService = require( require("path").join( __runningPath, "application", "services", "service_writer.js" ) );




// SEARCH ANNOUNCE - START
exports.control_search_announce = function( req, res, connection ){
  return new Promise( function(resolve, reject){

    var targetId = req.params.id;

    staticService.getStaticInfo( req, res, connection, targetId )
    .then( function( staticInfo ){
      var lang = staticInfo.lang;
      var promises = [];

      promises.push( announceService.getPageListOfAnnounce( connection, lang, targetId ) );
      promises.push( announceService.getAnnounceText( connection, lang, targetId ) );
      promises.push( hashService.getAnnounceHashes( connection, lang, targetId ) );

      Promise.all( promises )
      .then( function(){
        var argv = arguments[0];

        resolve( Object.assign( staticInfo, argv[0], argv[1], argv[2] ) );

      } )
      .catch( function( _err ){
        reject( _err );
      } )

    } )
    .catch( function( err ){
      reject( err );
    } );
	} );
}

exports.control_other_announce_pages = function( req, res, connection ){
  return new Promise( function(resolve, reject){

    langService.setDefaultLang( req, res )
    .then( function( lang ){

      var targetId = req.body.targetId;

      announceService.getPageListOfAnnounceByIndex( connection, lang, targetId, req.body )
      .then( function(results){
        resolve( results );
      } )
      .catch( function(err){
        reject( err );
      } );
    } );
  } );
}
// SEARCH ANNOUNCE - END




// SEARCH WORD - START
exports.control_search_word = function( req, res, connection ){
  return new Promise( function(resolve, reject){

    var searchWord = req.params.searchword;

    staticService.getStaticInfo( req, res, connection )
    .then( function( staticInfo ){
      var lang = staticInfo.lang;
      var promises = [];

      promises.push( contentService.getPageListWithSearchWord( connection, lang, searchWord ) );
      promises.push( hashService.getSearchHashes( connection, lang, searchWord ) );

      Promise.all( promises )
      .then( function(){
        var argv = arguments[0];

        resolve( Object.assign( staticInfo, argv[0], argv[1], {"searchText":[{"search_text":searchWord}]} ) );

      } )
      .catch( function( _err ){
        reject( _err );
      } )

    } )
    .catch( function( err ){
      reject( err );
    } );
	} );
}

exports.control_other_search_pages = function( req, res, connection ){
  return new Promise( function(resolve, reject){

    langService.setDefaultLang( req, res )
    .then( function( lang ){

      var searchWord = decodeURI( req.body.targetText );

      contentService.getPageListWithSearchWordByIndex( connection, lang, searchWord, req.body )
      .then( function(results){
        resolve( results );
      } )
      .catch( function(err){
        reject( err );
      } );
    } );
  } );
}
// SEARCH WORD - END




// SEARCH CATEGORY - START
exports.control_search_category = function( req, res, connection ){
  return new Promise( function(resolve, reject){

    var targetId = req.params.id;

    staticService.getStaticInfo( req, res, connection, targetId )
    .then( function( staticInfo ){
      var lang = staticInfo.lang;
      var promises = [];

      promises.push( contentService.getPageListWithCategory( connection, lang, targetId ) );
      promises.push( menuService.getCategoryText( connection, lang, targetId ) );
      promises.push( hashService.getCategoryHashes( connection, targetId ) );

      Promise.all( promises )
      .then( function(){
        var argv = arguments[0];
        resolve( Object.assign( staticInfo, argv[0], argv[1], argv[2] ) );
      } )
      .catch( function( _err ){
        reject( _err );
      } )

    } )
    .catch( function( err ){
      reject( err );
    } );
	} );
}

exports.control_other_category_pages = function( req, res, connection ){
  return new Promise( function(resolve, reject){

    langService.setDefaultLang( req, res )
    .then( function( lang ){

      var targetId = req.body.targetId;

      contentService.getPageListWithCategoryByIndex( connection, lang, targetId, req.body )
      .then( function(results){
        resolve( results );
      } )
      .catch( function(err){
        reject( err );
      } );
    } );
  } );
}
// SEARCH CATEGORY - END





// SEARCH WRITER - START
exports.control_search_writer = function( req, res, connection ){
  return new Promise( function(resolve, reject){

    var targetId = req.params.id;

    staticService.getStaticInfo( req, res, connection, targetId )
    .then( function( staticInfo ){
      var lang = staticInfo.lang;
      var promises = [];

      promises.push( contentService.getPageListWithWriter( connection, lang, targetId ) );
      promises.push( writerService.getWriterText( connection, lang, targetId ) );
      promises.push( hashService.getWriterHashes( connection, targetId ) );

      Promise.all( promises )
      .then( function(){
        var argv = arguments[0];
        resolve( Object.assign( staticInfo, argv[0], argv[1], argv[2] ) );
      } )
      .catch( function( _err ){
        reject( _err );
      } )

    } )
    .catch( function( err ){
      reject( err );
    } );
	} );
}

exports.control_other_writer_pages = function( req, res, connection ){
  return new Promise( function(resolve, reject){

    langService.setDefaultLang( req, res )
    .then( function( lang ){

      var targetId = req.body.targetId;

      contentService.getPageListWithWriterByIndex( connection, lang, targetId, req.body )
      .then( function(results){
        resolve( results );
      } )
      .catch( function(err){
        reject( err );
      } );
    } );
  } );
}
// SEARCH WRITER - END





// SEARCH HASH - START
exports.control_search_hash = function( req, res, connection ){
  return new Promise( function(resolve, reject){

    var targetId = req.params.id;

    staticService.getStaticInfo( req, res, connection, targetId )
    .then( function( staticInfo ){
      var lang = staticInfo.lang;
      var promises = [];

      promises.push( contentService.getPageListWithHash( connection, lang, targetId ) );
      promises.push( hashService.getHashText( connection, lang, targetId ) );
      promises.push( hashService.getHashHashes( connection, targetId ) );
      promises.push( hashService.increaseHashHitCount( connection, targetId ) );

      Promise.all( promises )
      .then( function(){
        var argv = arguments[0];
        resolve( Object.assign( staticInfo, argv[0], argv[1], argv[2] ) );
      } )
      .catch( function( _err ){
        reject( _err );
      } )

    } )
    .catch( function( err ){
      reject( err );
    } );
	} );
}

exports.control_other_hash_pages = function( req, res, connection ){
  return new Promise( function(resolve, reject){

    langService.setDefaultLang( req, res )
    .then( function( lang ){

      var targetId = req.body.targetId;

      contentService.getPageListWithHashByIndex( connection, lang, targetId, req.body )
      .then( function(results){
        resolve( results );
      } )
      .catch( function(err){
        reject( err );
      } );
    } );
  } );
}
// SEARCH HASH - END
