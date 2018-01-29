const dbExecutorStd = require( require("path").join( process.cwd(), "application", "model", "dbExecutor_std.js" ) );




exports.getFooterInfo = function( connection, lang, target ){
  return new Promise( function(resolve, reject){
    dbExecutorStd.getFooterInfo( connection, lang, target )
    .then( function( results ){

      extractFooterInfo( results )
      .then( function( parsedHeaderInfo ){
        resolve( parsedHeaderInfo );
      } );
    } )
    .catch( function( err ){
      reject( err )
    } )
  } );
}




function extractFooterInfo( results ){
  return new Promise( function( resolve, reject ){
    var footerTitle = results[0].display_name;
    var footerDescription = results[1].display_name;
    var footerBtnText = results[2].display_name;

    resolve( {"footerTitle":footerTitle, "footerDescription":footerDescription, "footerBtnText":footerBtnText} );
  } );
}
