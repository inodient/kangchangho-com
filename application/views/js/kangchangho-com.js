$(window).bind("pageshow", function(event) {

    if( $.cookie( "lang") != sessionStorage.getItem( ( window.location.pathname ).split("/")[1] + "-lang" ) ){
      if( "ko" == $.cookie( "lang") ){

        // alert( "언어설정을 한국어로 변경합니다." );

        // $(this).text( "en" );
        $.cookie( "lang", null );
        $.cookie( "lang", "ko", {path: "/"} );
        sessionStorage.setItem( ( window.location.pathname ).split("/")[1] + "-lang", "ko" );

      } else if( "en" == $.cookie( "lang") ){

        // alert( "Language will be changed as English." );

        $.cookie( "lang", null );
        $.cookie( "lang", "en", {path: "/"} );
        sessionStorage.setItem( ( window.location.pathname ).split("/")[1] + "-lang", "en" );
      } else {

        // alert( "언어설정을 한국어로 변경합니다." );

        // $(this).text( "en" );
        $.cookie( "lang", null );
        $.cookie( "lang", "ko", {path: "/"} );
        sessionStorage.setItem( ( window.location.pathname ).split("/")[1] + "-lang", "ko" );
      }

      location.reload();
    }
  });




$(document).ready( function(){
  $(".sns-share-icon").on( "click", function(){
    alert( $(this).children().attr( "class" ) );
  } );

  $(".header-search").on( "click", function(){
    $("#header_search_modal").modal( "show" );
  } );

  $(".modal-dismiss").on( "click", function(){
    $("#header_search_modal").modal( "hide" );
    $("#moadl_searchword").val( '' );
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
        } else if( eventFunction == "goToAbout()" ){
          $(location).attr( "href", "/about" );
        }
      }
      event.stopPropagation();
    } );

    $(".site-nav-menu-inner").on( "click", function(){
      var eventFunction = $(this).data("href");

      if( eventFunction == "goToCategory()" ){
        var id = $(this).attr( "id" );
        $(location).attr( "href", "/category/" + id );
      } else if( eventFunction == "goToAbout()" ){
        $(location).attr( "href", "/about" );
      }
    } );


  } else {

    $(".site-nav-menu, .site-nav-menu-inner").on( "click", function(){

      var eventFunction = $(this).data("href");

      if( eventFunction == "goToCategory()" ){
        var id = $(this).attr( "id" );
        $(location).attr( "href", "/category/" + id );
      } else if( eventFunction == "goToAbout()" ){
        $(location).attr( "href", "/about" );
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




  if( sessionStorage.getItem( ( window.location.pathname ).split("/")[1] + "-lang" ) === null ){
    sessionStorage.setItem( ( window.location.pathname ).split("/")[1] + "-lang", $.cookie( "lang" ) );
  }

  if( $.cookie( "lang" ).indexOf( "ko" ) > -1 ){
    $("#language-changer").text( "ko" );
  } else {
    $("#language-changer").text( "en" );
  }

  $.cookie.defaults.path = '/';

  $("#language-changer").on( "click", function(){
    if( "ko" == $.cookie( "lang") ){

      $.cookie( "lang", null );
      $.cookie( "lang", "en", {path: "/"} );
      sessionStorage.setItem( ( window.location.pathname ).split("/")[1] + "-lang", "en" );

      // removeCookie( "lang" )
      // .then( function(){
      //   $.cookie( "lang", "en", {path: "/"} );
      // } )
      // .catch( function(err){
      //   reject( err );
      // } );
    } else if( "en" == $.cookie( "lang") ){

      $.cookie( "lang", null );
      $.cookie( "lang", "ko", {path: "/"} );
      sessionStorage.setItem( ( window.location.pathname ).split("/")[1] + "-lang", "ko" );

      // removeCookie( "lang" )
      // .then( function(){
      //   $.cookie( "lang", "ko", {path: "/"} );
      // } )
      // .catch( function(err){
      //   reject( err );
      // } );
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

  $("#modal_searchword").on( "keypress", function(e){
    if( e.which == 13 ){
      var searchword = $("#modal_searchword").val();
      $(location).attr( "href", "/search/" + searchword );
    }
  } );

  $("*").on( "keypress", function(e){
    if( $(e.target) && $(e.target).attr("class") && $(e.target).attr("class").indexOf("modal-open") > -1 ){
      if( e.which == 13 ){
        var searchword = $("#modal_searchword").val();
        if( searchword === "" || searchword === undefined ) return;

        $(location).attr( "href", "/search/" + searchword );
      }
    }
  } );

  $("*").on( "click", function(e){
    if( $(e.target) && $(e.target).attr("class") && $(e.target).attr("class").indexOf( "modal-body" ) > -1 ){
      $("#header_search_modal").modal( "hide" );
      $("#modal_searchword").val( '' );
    }
  } );






  $("#subscribe_modal .modal-dialog").on( "click", function(e){
    if( $(e.target).attr( "class" ).indexOf( "modal-dialog" ) < 0 ){
      e.stopPropagation();
      return;
    }

    $("#subscribe_modal").modal( "hide" );
  } );

  $("#newsletter").submit( function(e){

    if( $("#email_addr").val() === "" ){
      return false;
    }

    $.LoadingOverlay("show", { color: "rgba(255, 255, 255, 0.8)" });

    e.preventDefault();

    $.ajax( {
      data: { "addr" : $("#email_addr").val() },
      type: "POST",
      url: "/subscribe",

      success: function( data ){
        $.LoadingOverlay("hide");

        $("#subscribe_modal .subscribe-message").html( data.message );
        $("#subscribe_modal").modal( "show" );
        $("#email_addr").blur();
        $("#email_addr").val( "" );
      },

      error: function(){
        $.LoadingOverlay("hide");
        $("#email_addr").val( "" );
      }
    } );

  } );




  $("#newsletter_select").on( "change", function(){
    $(location).attr( "href", $("#newsletter_select option:selected").data("href") );
  } );

  $(".newsletter-send").on( "click", function(){
    if( $(location).attr( "href" ).indexOf( "newsletteradmin" ) > -1 ){
      if( confirm( "Are you sure sending newsletter?" ) ){

        $.LoadingOverlay("show", { color: "rgba(255, 255, 255, 0.8)" });

        var id = $(location).attr( "href" ).split( "newsletteradmin/" )[1];

        $.ajax( {
          data: {"id":id},
          type: "POST",
          url: "/sendnewsletter",

          success: function( data ){
            $.LoadingOverlay("hide");
            alert( "SENDING NEWS LETTER SUCCEED" );
          },

          error: function(){
            $.LoadingOverlay("hide");
            alert( "SENDING NEWS LETTER FAILED" );
          }
        } );

      }
    }
  } );
} );
