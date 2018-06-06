var licenseService = require( require("path").join( __runningPath, "application", "services", "service_license.js" ) );





exports.control_get_license = function( req, res ){
	return new Promise( function(resolve, reject){

		licenseService.getLicenseInfo()
		.then( function(result){
			resolve( result );
		} )
		.catch( function(err){
			reject( err );
		} );
	} );
}