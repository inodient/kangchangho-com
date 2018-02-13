$(document).ready( function(){
  $(".sns-share-icon").on( "click", function(){
    alert( $(this).children().attr( "class" ) );
  } );

  $(".site-title-span").on( "click", function(){
    $(location).attr( "href", "/" );
  } );






  if( $(window).width() < 1000 ){

    // Whole Menu toggle
    $('.navbar-toggle').click(function(e) {
      e.preventDefault();
      $('.site-nav').slideToggle(180, "linear");
    });

    // Menu Drop Down
    $(".site-nav .navbar-nav .navbar-item .dropdown-arrow").on( "click", function(){
      if( $(this).parent().parent().attr( "class" ).indexOf( "open" ) > -1 ){
        // dropdown - close
        $(".navbar-item").each( function(){
          $(this).removeClass( "open" );
        } );
        $(this).removeClass( "fa-angle-up" );
        $(this).addClass( "fa-angle-down" );
      } else{
      // dropdown - open
        $(".navbar-item").each( function(){
          $(this).removeClass( "open" );
          $(this).children(".site-nav-menu").children(".dropdown-arrow").removeClass( "fa-angle-up" );
          $(this).children(".site-nav-menu").children(".dropdown-arrow").addClass( "fa-angle-down" );
        } );
        $(this).parent().parent().addClass( "open" );
        $(this).removeClass( "fa-angle-down" );
        $(this).addClass( "fa-angle-up" );
      }
    } );

    // Hyperlink
    $(".site-nav-menu, .site-nav-menu *").on( "click", function(){
      if( $(this).attr( "class" ).indexOf( "dropdown-arrow" ) < 0 ){
        var eventFunction = $(this).data("href");

        if( eventFunction == "goToCategory()" ){
          var id = $(this).attr( "id" );
          $(location).attr( "href", "/category/" + id );
        }
      }
      event.stopPropagation();
    } );

    $(".site-nav-menu-inner").on( "click", function(){
      var eventFunction = $(this).data("href");

      if( eventFunction == "goToCategory()" ){
        var id = $(this).attr( "id" );
        $(location).attr( "href", "/category/" + id );
      }
    } );


  } else {

    $(".site-nav-menu, .site-nav-menu-inner").on( "click", function(){

      var eventFunction = $(this).data("href");

      if( eventFunction == "goToCategory()" ){
        var id = $(this).attr( "id" );
        $(location).attr( "href", "/category/" + id );
      }
    } );

  }




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
} );
