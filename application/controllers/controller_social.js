const staticService = require( require("path").join( __runningPath, "application", "services", "service_static.js" ) );





exports.control_sharepageclose = function( req, res, connection ){
	return new Promise( function(resolve, reject){

	    staticService.getStaticInfo( req, res, connection )
	    .then( function( staticInfo ){
	      var lang = staticInfo.lang;
	      
	      if( lang === "en" ){
	      	resolve( {"message":"This window will be closed." } );
	      } else if( lang === "ko" ){
	      	resolve( {"message":"현재 보고 있는 창이 닫힙니다." } );
	      }
	    } )
	    .catch( function(err){
	      reject( err );
	    } );
	} );
}