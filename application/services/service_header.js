var dbExecutorStd = require( require("path").join( process.cwd(), "application", "model", "dbExecutor_std.js" ) );




exports.getHeaderInfo = function( connection, lang, target ){
  return new Promise( function(resolve, reject){
    dbExecutorStd.getHeaderInfo( connection, lang, target )
    .then( function( results ){

      extractHeaderInfo( results )
      .then( function( parsedHeaderInfo ){
        resolve( parsedHeaderInfo );
      } );
    } )
    .catch( function( err ){
      reject( err )
    } )
  } );
}




function extractHeaderInfo( results ){
  return new Promise( function(resolve, reject){

    var windowTitle = "";
    var headerTitle = [];

    for( var i=0; i<results.length; i++ ){
      if( (results[i]).type === "header_title" ){
        headerTitle.push( {"displayName":(results[i]).display_name, "event":(results[i]).event} );
      } else if( (results[i]).type === "window_title" ){
        windowTitle = (results[i]).display_name;
      }
    }

    resolve( {"windowTitle":windowTitle, "headerTitle":headerTitle} );

  } );
}
