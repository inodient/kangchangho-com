var dbExecutorImage = require( require("path").join( __runningPath, "application", "model", "dbExecutor_image.js" ) );




exports.addImage = function( req, connection ){
  return new Promise( function(resolve, reject){
    fileHandler.uploadFile( req, "image" )
    .then( function(results){

      makeThumbnail( results.savedFileName )
      .then( function( thumbnailFileName ){

        results = Object.assign( results, thumbnailFileName );

        dbExecutorImage.addImage( connection, results )
        .then( function(){
          resolve( {savedFileName: results.savedFileName} );
        } )
        .catch( function(_err){
          reject( _err );
        } );

      } )
      .catch( function( __err ){
        reject( __err );
      } )
      
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





function makeThumbnail( savedFileName ){
  return new Promise( function(resolve, reject){
    var path = require( "path" );
    var fs = require( "fs" );

    var uploadPath = path.join( require(__fileHandlerInfo)[ "default-pre-path" ], require(__fileHandlerInfo)[ "default-path" ] );

    var Thumbnail = require( "thumbnail" );
    var thumbnail = new Thumbnail( path.join(uploadPath, "image"), path.join(uploadPath, "image") );

    var thumbnailSize = 450;

    thumbnail.ensureThumbnail( savedFileName, thumbnailSize, null, function(err, filename){
      if( err ){
        reject( err );
      } else{
        var extension = require( "path" ).extname( savedFileName );
        var suffix = filename.replace( savedFileName.replace(extension, ""), "" );
        var thumbnailFileName = filename.replace( suffix, "_thumb" + extension );

        fs.renameSync( path.join(uploadPath, "image", filename), path.join(uploadPath, "image", thumbnailFileName) );

        resolve( {"thumbnailFileName":thumbnailFileName} );
      }
    } );    
  } );
}
