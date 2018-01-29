$(document).ready( function(){
  $(".sns-share-icon").on( "click", function(){
    alert( $(this).children().attr( "class" ) );
  } );

  $(".site-title-span").on( "click", function(){
    $(location).attr( "href", "/" );
  } );

  $(".site-nav-menu, .site-nav-menu-inner").on( "click", function(){
    var eventFunction = $(this).data("href");

    if( eventFunction == "goToCategory()" ){
      var id = $(this).attr( "id" );
      $(location).attr( "href", "/category/" + id );
    }
  } );




  $(".announce-carousel figcaption *").on( "click", function(){
    if( $(this).data( "announce-id" ) ){
      $(location).attr( "href", "/announce/" + $(this).data( "announce-id" ) );
    }
  } );





  $(".hash-ranking tr, .hash-ranking tr *").on( "click", function(){
    if( $(this).is( "td" ) ){
      $(location).attr( "href", "/hash/" + $(this).data("id") );
    }
  } );

  $(".banner-list figcaption").on( "click", function(){
    $(location).attr( "href", $(this).data( "href" ) );
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




  $("#btn_search").on( "click", function(){
    var searchword = $("#searchword").val();
    $(location).attr( "href", "/search/" + searchword );
  } );

  $("#searchword").on( "keypress", function(e){
    if( e.which == 13 ){
      var searchword = $("#searchword").val();
      $(location).attr( "href", "/search/" + searchword );
    }
  } );




  // if( $.cookie( "lang" ).indexOf( "ko" ) > -1 ){
  //   $("footer .footer-heading .title").text( "뉴스레터" );
  //   $("footer .footer-heading .description").text( "강창호닷컴 뉴스레터를 구독하세요." );
  //   $("footer .footer-body button").text( "구독" );
  // } else if( $.cookie( "lang" ).indexOf( "en" ) > -1 ){
  //   $("footer .footer-heading .title").text( "News Letter" );
  //   $("footer .footer-heading .description").text( "Please subscribe Kangchangho.com News Letter." );
  //   $("footer .footer-body button").text( "Subscribe" );
  // }
} );
