$(document).ready( function(){
  $(".sns-share-icon").on( "click", function(){
    alert( $(this).children().attr( "class" ) );
  } );

  $(".site-title-span").on( "click", function(){
    alert( $(this).html() );
  } );

  $(".site-nav-menu").on( "click", function(){
    alert( $(this).html() );
  } );





  $(".hash-ranking tr, .hash-ranking tr *").on( "click", function(){
    alert( $(this).html() );
  } );




  if( $.cookie( "lang" ).indexOf( "ko" ) > -1 ){
    $("#language-changer").text( "ko" );
  } else {
    $("#language-changer").text( "en" );
  }

  $("#language-changer").on( "click", function(){
    if( "ko" == $(this).text() ){
      $(this).text( "en" );
      $.removeCookie( "lang" );
      $.cookie( "lang", "en" );
    } else if( "en" == $(this).text() ){
      $(this).text( "ko" );
      $.removeCookie( "lang" );
      $.cookie( "lang", "ko" );
    }

    location.reload();
  } );




  // $(".thumb-image").lazy( {
  //
  //   beforeLoad: function(element) {
  //       // called before an elements gets handled
  //       // alert( "1" );
  //   },
  //   afterLoad: function(element) {
  //       // called after an element was successfully handled
  //       // alert( "2" );
  //   },
  //   onError: function(element) {
  //       // called whenever an element could not be handled
  //       // alert( "3" );
  //   },
  //   onFinishedAll: function() {
  //       // called once all elements was handled
  //       // alert( "4" );
  //   }
  // } );




  // $('.thumb-image').each( function(i, item){
  //   $(item).Lazy( {
  //     scrollDirection: 'vertical',
  //     effect: 'fadeIn',
  //     effectime: 5000,
  //     delay: 1000,
  //     visibleOnly: true,
  //     onError: function(element) {
  //         console.log('error loading ' + element.data('src'));
  //     }
  //   } );
  // } );

  // $(".thumb-image").Lazy( {
  //   effect: "show",
  //   effectTime: 1000,
  //   // threshold: 0
  // } );

} );
