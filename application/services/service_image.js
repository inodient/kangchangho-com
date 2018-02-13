const dbExecutorImage = require( require("path").join( __runningPath, "application", "model", "dbExecutor_image.js" ) );




exports.addImage = function( req, connection ){
  return new Promise( function(resolve, reject){
    fileHandler.uploadFile( req, "image" )
    .then( function(results){
      dbExecutorImage.addImage( connection, results )
      .then( function(){
        resolve( {savedFileName: results.savedFileName} );
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

exports.setImageType = function( connection, type, savedFileName ){
  return new Promise( function(resolve, reject){

    dbExecutorImage.setImageType( connection, type, savedFileName )
    .then( function(){

      dbExecutorImage.getUpdatedImageId( connection, savedFileName )
      .then( function( results ){
        resolve( 60 );
      } )
      .catch( function( _err ){
        reject( _err );
      } );

    } )
    .catch( function( err ){
      reject( err );
    } );

		// var params = [];
		// var queryId = "setImageType";
    //
		// params.push( type );
		// params.push( savedFileName );
    //
		// mysqlHandler.executeQuery( queryId, params, connection )
		// .then( function(queryResults){
    //
		// 	getUpdatedImageId( connection, savedFileName )
		// 	.then( function( _queryResults ){
		// 		resolve( _queryResults );
		// 	} )
		// 	.catch( function(_err){
		// 		reject( _err );
		// 	} );
    //
		// } )
		// .catch( function(err){
		// 	reject( err );
		// } );
	} );
}
