var dbExecutorComment = require( require("path").join( __runningPath, "application", "model", "dbExecutor_comment.js" ) );




exports.addComment = function(req, lang, connection){
	return new Promise( function(resolve, reject){

		var current = new Date();
		current = ( current.toISOString() ).split("T")[0];

		var params = [];

		params.push( {"CONTENTID" : req.body.contentid} );
		if( lang === "ko" ){
			params.push( {"COMMENTEN" : ""} );
			params.push( {"COMMENTKO" : req.body.comment} );
		} else if( lang === "en" ){
			params.push( {"COMMENTEN" : req.body.comment} );
			params.push( {"COMMENTKO" : ""} );
		}
		
		params.push( {"NAME" : req.body.name} );
		params.push( {"PASSWORD" : req.body.password} );
		params.push( {"DATE" : current} );

		if( req.body.parentid === undefined ){
			params.push( {"LEVEL" : 0} );
			
			dbExecutorComment.addComment( connection, params )
			.then( function(results){
				resolve( results.insertId );
			} )
			.catch( function(err){
				reject( err );
			});

		} else{
			params.push( {"LEVEL" : 1} );
			params.push( {"PARENTID" : req.body.parentid} );

			dbExecutorComment.addComment_Comment( connection, params )
			.then( function(results){
				resolve( results.insertId );
			} )
			.catch( function(err){
				reject( err );
			});
		}
	} );
}

exports.getComment = function( connection, contentId, lang ){
	return new Promise( function(resolve, reject){

		dbExecutorComment.getComment( connection, contentId, lang )
		.then( function(results){
			resolve( {"comment" : results} );
		} )
		.catch( function(err){
			reject( err );
		} );
	} );
}

exports.deleteComment = function(req, connection ){
	return new Promise( function(resolve, reject){

		var targetIds = ( req.body.targetIds ).toString().split(",");

		confirmPassword( targetIds[0], req.body.password, connection )
		.then( function(results){
			if( results ){
				var promises = [];

				for( var i=0; i<targetIds.length; i++ ){
					promises.push( deleteCommentDelegator( targetIds[i], connection) );
				}

				Promise.all( promises )
				.then( function(){

					var argv = arguments[0];
					resolve( {"STATUS" : "SUCCEED"} );
				} )
				.catch( function(err){
					reject( err );
				} );
			} else{
				resolve( {"STATUS" : "WRONG_PASSWORD"} );
			}
		} )
		.catch( function(err){
			reject( err );
		} )
	} );
}




function confirmPassword( targetId, password, connection ){
	return new Promise( function(resolve, reject){

		dbExecutorComment.getCommentPassword( connection, targetId )
		.then( function( results ){

			if( results[0].password === password ){
				resolve( true );
			} else{
				resolve( false );
			}
		} )
		.catch( function(err){
			reject( err );
		} );
	} );
}

function deleteCommentDelegator( targetId, connection ){
	return new Promise( function(resolve, reject){
		dbExecutorComment.deleteComment( connection, targetId )
		.then( function( results ){
			resolve( {"STATUS" : "SUCCEED"} );
		} )
		.catch( function( err ){
			reject( err );
		} );
	} );
}