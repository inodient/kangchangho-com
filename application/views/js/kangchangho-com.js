$(document).ready( function(){


  $("#language_change_modal .modal-dialog").on( "click", function(e){
    if( $(e.target).attr( "class" ).indexOf( "modal-dialog" ) < 0 ){
      e.stopPropagation();
      return;
    }

    $("#language_change_modal").modal( "hide" );
  } );

  $(".modal-dismiss").on( "click", function(){
    var modal = $(this).parent().parent().parent().parent();
    modal.modal( "hide" );
  } );



  if( !$("#lanuage_change_modal").hasClass("in") ){
    if( $.cookie( "lang") != $("body").data("lang") ){

      if( $.cookie("lang") === "ko" ){

        $("#language_change_modal #language-change-message").html( 
          `<b>언어 설정 변경</b>
          <hr>
          언어 설정을 한국어로 변경합니다.`
        );
        
        $("#language_change_modal").modal("show");
   
      } else if( $.cookie("lang") === "en" ) {
        $("#language_change_modal #language-change-message").html( 
          `<b>Notification</b>
          <hr>
          Default language will be setted as English.`
        );

        $("#language_change_modal").modal("show");
      } else {
        document.cookie = "lang=" + $("body").data("lang") + ";path=/;" + ";";
      }
    }
  }

  $("#language_change_modal").on("hidden.bs.modal", function(){
    location.reload();
  } );

  if( $.cookie( "lang" ).indexOf( "ko" ) > -1 ){
    $("#language-changer").text( "ko" );
  } else {
    $("#language-changer").text( "en" );
  }

  $("#language-changer").on( "click", function(){
    if( "ko" == $.cookie( "lang") ){
      document.cookie = "lang=en;path=/;" + ";";
    } else if( "en" == $.cookie( "lang") ){
      document.cookie = "lang=ko;path=/;" + ";";
    }

    location.reload();
  } );





  $(".sns-share-icon").on( "click", function(){
    alert( $(this).children().attr( "class" ) );
  } );

  $(".header-search").on( "click", function(){
    $("#header_search_modal").modal( "show" );
  } );

  $(".modal-dismiss").on( "click", function(){

    var modal = $(this).parent().parent().parent().parent();
    modal.modal( "hide" );

    if( modal.attr("id") === "header_search_modal" ){
      $("#moadl_searchword").val( '' );
    }    
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

  $("#modal_searchword .modal-body").on( "click", function(e){
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




  $("#language_change_modal .modal-dialog").on( "click", function(e){
    if( $(e.target).attr( "class" ).indexOf( "modal-dialog" ) < 0 ){
      e.stopPropagation();
      return;
    }

    $("#language_change_modal").modal( "hide" );
  } );
} );









$(window).on( "pageshow", function(){
  if( iOSDevice() ){

    if( $.cookie("lang") === undefined ){
      // location.reload();
    }

    // if( $(window).width() < 1000 && getBrowserLang() != $("body").data("lang") ){
    //   if( getBrowserLang() === "ko" ){
    //     $("#language_change_modal #language-change-message").html( setLanguageChangeModalMessage("ko") );
    //   } else if( getBrowserLang() === "en" ){
    //     $("#language_change_modal #language-change-message").html( setLanguageChangeModalMessage("en") );
    //   }

    //   setLanguageChangeModalEvent();
    //   $("#language_change_modal").modal( "show" );
    // }
  }
} );

function iOSDevice(){
  var ua = navigator.userAgent,
  iOS = /iPad|iPhone|iPod/.test(ua),
  iOS11 = /OS 11_0_1|OS 11_0_2|OS 11_0_3|OS 11_1|OS 11_1_1|OS 11_1_2|OS 11_2|OS 11_2_1/.test(ua);

  return iOS && iOS11;
}

function getBrowserLang(){
  var userLang = navigator.language || navigator.userLanguage;
  return userLang.split("-")[0];
}

function setLanguageChangeModalEvent(){
  $("#language_change_modal .modal-dialog").on( "click", function(e){
    if( $(e.target).attr( "class" ).indexOf( "modal-dialog" ) < 0 ){
      e.stopPropagation();
      return;
    }

    $("#language_change_modal").modal( "hide" );
  } );

  $(".modal-dismiss").on( "click", function(){
    var modal = $(this).parent().parent().parent().parent();
    modal.modal( "hide" );
  } );

  $("#language_change_modal").on("hidden.bs.modal", function(){
    location.reload();
  } );
}

function setLanguageChangeModalMessage( lang ){
  if( lang === "ko" ){
    return `<b>언어 설정 변경</b>
      <hr>
      브라우저 종료 시점의 언어는 영어 입니다.<br>
      언어설정을 한국어로 변경합니다.`
  } else {
    return `<b>Notification</b>
      <hr>
      The setted language when closed browser is Korean.<br>
      Default language will be setted as English.`
  }
}
