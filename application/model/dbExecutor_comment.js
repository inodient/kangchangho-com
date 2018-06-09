exports.addComment = function( connection, params ){
  return new Promise( function(resolve, reject){
    var queryId = "addComment";

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.addComment_Comment = function( connection, params ){
  return new Promise( function(resolve, reject){
    var queryId = "addComment_Comment";

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.getComment = function( connection, contentId, lang ){
  return new Promise( function( resolve, reject ){
    var queryId = "getComment";
    var params = [];

    params.push( {"CONTENTID" : contentId} );
    params.push( {"LANG" : lang} );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.getCommentPassword = function( connection, targetId ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getCommentPassword";

    params.push( {"ID" : targetId} );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.deleteComment = function( connection, targetId ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "deleteComment";

    params.push( {"ID" : targetId} );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}