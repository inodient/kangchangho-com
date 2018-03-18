var dbExecutorImage = require( require("path").join( __runningPath, "application", "model", "dbExecutor_image.js" ) );




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

    if( savedFileName === "" ){
      resolve( 0 );
    } else {
      dbExecutorImage.setImageType( connection, type, savedFileName )
      .then( function(){

        dbExecutorImage.getUpdatedImageId( connection, savedFileName )
        .then( function( results ){
          resolve( ( results[0] ).ID );
        } )
        .catch( function( _err ){
          reject( _err );
        } );

      } )
      .catch( function( err ){
        reject( err );
      } );
    }
	} );
}
