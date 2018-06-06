const fs = require( "fs" );






exports.getLicenseInfo = function(){
	return new Promise( function(resolve, reject){
		var promises = [];

		promises.push( getPackageJson() );
		promises.push( getPackageLockJson() );

		Promise.all( promises )
		.then( function(){
			var argv = arguments[0];

			extractDependency( argv[1] )
			.then( function( packageLockJsonDep ){

				createTable( Object.assign( argv[0], packageLockJsonDep ) )
				.then( function( table ){
					resolve( table );
				} )
				.catch( function( __err ){
					reject( __err );
				} )
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

function getPackageJson(){
	return new Promise( function(resolve, reject){
		var packageJson = fs.readFileSync( require("path").join( process.cwd(), "package.json" ), "utf8" );
		resolve( ( JSON.parse(packageJson) ).dependencies );
	} );
}

function getPackageLockJson(){
	return new Promise( function(resolve, reject){
		var packageLockJson = fs.readFileSync( require("path").join( process.cwd(), "package-lock.json" ), "utf8" );
		resolve( ( JSON.parse(packageLockJson) ).dependencies );
	} );
}

function extractDependency( packageLockJson ){
	return new Promise( function(resolve, reject){

		var dependencies = {};

		var middlewares = Object.keys( packageLockJson );

		for( var i=0; i<middlewares.length; i++ ){
			dependencies[ middlewares[i] ] = packageLockJson[ middlewares[i] ].version;
		}

		resolve( dependencies );
	} );
}

function createTable( dependencies ){
	return new Promise( function(resolve, reject){
		var tableText = "<table class='table table-responsive'>";
		var index = 1;

		tableText += "<thead>"
		tableText += "<tr>";
		tableText += "<th>" + "INDEX";
		tableText += "</th>";
		tableText += "<th>" + "MIDDLEWARE";
		tableText += "</th>";
		tableText += "<th>" + "VERSION";
		tableText += "</th>";
		tableText += "</tr>";
		tableText += "</thead>"


		tableText += "<tbody>";
		for( var middleware in dependencies ){

			logger.debug( middleware );

			tableText += "<tr>";
			tableText += "<td>" + index++;
			tableText += "</td>";
			tableText += "<td>" + middleware;
			tableText += "</td>";
			tableText += "<td>" + dependencies[ middleware ];
			tableText += "</td>";
			tableText += "</tr>";
		}
		tableText += "</tbody>";

		tableText += "</table>";

		resolve( tableText );
	} );
}