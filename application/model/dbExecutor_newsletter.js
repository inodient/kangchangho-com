exports.addSubscription = function( connection, addr, lang ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "addSubscription";

    params.push( addr );
    params.push( lang );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.checkSubscription = function( connection, addr, lang ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "checkSubscription";

    params.push( addr );
    params.push( lang );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
		} )
		.catch( function( err ){
			reject( err );
		} );

  } );
}

exports.getRecentNewsLetterList = function( connection, lang ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getRecentNewsLetterList";

    params.push( lang );
    params.push( lang );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.addNewsLetterMaster = function( connection, parameter ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "addNewsLetterMaster";

    params.push( parameter.sel_writer );
    params.push( parameter.title_ko );
    params.push( parameter.title_en );
    params.push( parameter.content_ko );
    params.push( parameter.content_en );
    params.push( parameter.imageId );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( {"status":"succeed"} );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.getInsertedNewsLetterId = function( connection, parameter ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getInsertedNewsLetterId";

    params.push( parameter.sel_writer );
    params.push( parameter.title_ko );
    params.push( parameter.title_en );
    params.push( parameter.content_ko );
    params.push( parameter.content_en );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.addNewsLetterList = function( connection, parameter ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "addNewsLetterList";

    params.push( parameter.newsletter_id );
    params.push( 0 );
    params.push( parameter.link_type );
    params.push( parameter.link_id );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( {"status":"succeed"} );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.getNewsLetterMaster = function( connection, targetId, lang ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getNewsLetterMaster";

    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( targetId );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.getNewsLetterContentsList = function( connection, targetId, lang ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getNewsLetterContentsList";

    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( targetId );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.getPageListOfNewsLetter = function( connection, lang ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getPageListOfNewsLetter";

    params.push( lang );
    params.push( lang );
    params.push( lang );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.getPageListOfNewsLetterByIndex = function( connection, lang, parameter ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getPageListOfNewsLetterByIndex";

    params.push( lang );
    params.push( lang );
    params.push( lang );
    params.push( parameter.offset );
    params.push( parameter.length );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.getModifyNewsLetterMaster = function( connection, id ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "getModifyNewsLetterMaster";

    params.push( id );
    params.push( id );
    params.push( id );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( queryResults.results );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.deleteNewsLetter = function( connection, id ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "deleteNewsLetter";

    params.push( id );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( {"status":"succeed"} );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}

exports.deleteNewsLetterList = function( connection, id ){
  return new Promise( function(resolve, reject){
    var params = [];
    var queryId = "deleteNewsLetterList";

    params.push( id );

    mysqlHandler.executeQuery( queryId, params, connection )
    .then( function( queryResults ){
      resolve( {"status":"succeed"} );
    } )
    .catch( function( err ){
      reject( err );
    } );
  } );
}
