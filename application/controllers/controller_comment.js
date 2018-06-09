var commentService = require( require("path").join( __runningPath, "application", "services", "service_comment.js" ) );
var langService = require( require("path").join( __runningPath, "application", "services", "service_lang.js" ) );




exports.control_add_comment = function( req, res, connection ){
	return new Promise( function(resolve, reject){
		langService.setDefaultLang( req, res )
    	.then( function( lang ){
    		commentService.addComment( req, lang, connection )
			.then( function(results){

				resolve( {"insertId" : results} );
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

exports.control_del_comment = function( req, res, connection ){
	return new Promise( function(resolve, reject){

		commentService.deleteComment( req, connection )
		.then( function(results){

			logger.debug( results );

			resolve( results );
		} )
		.catch( function(err){
			reject( err );
		} );
	} );
}