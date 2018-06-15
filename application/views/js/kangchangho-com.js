$(document).ready( function(){

  // language_change_modal event setting - before showing modal - START
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
  // language_change_modal event setting - before showing modal - END


  if( !$("#lanuage_change_modal").hasClass("in") ){
    if( $.cookie( "lang") != $("body").data("lang") ){

      if( $.cookie("lang") === "ko" ){

        $("#language_change_modal #language-change-message").html( 
          '<b>언어 설정 변경</b>' + 
          '<hr>' + 
          '언어 설정을 한국어로 변경합니다.'
        );
        
        $("#language_change_modal").modal("show");
   
      } else if( $.cookie("lang") === "en" ) {
        $("#language_change_modal #language-change-message").html( 
          '<b>Notification</b>' + 
          '<hr>' + 
          'Default language will be setted as English.'
        );

        $("#language_change_modal").modal("show");
      } else {
        document.cookie = "lang=" + $("body").data("lang") + ";path=/;" + ";";
      }
    }
  }

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

  // if( !$("#lanuage_change_modal").hasClass("in") ){
  //   if( $.cookie( "lang") != $("body").data("lang") ){

  //     if( $.cookie("lang") === "ko" ){

  //       $("#language_change_modal #language-change-message").html( 
  //         '<b>언어 설정 변경</b>' + 
  //         '<hr>' + 
  //         '언어 설정을 한국어로 변경합니다.'
  //       );
        
  //       $("#language_change_modal").modal("show");
   
  //     } else if( $.cookie("lang") === "en" ) {
  //       $("#language_change_modal #language-change-message").html( 
  //         '<b>Notification</b>' + 
  //         '<hr>' + 
  //         'Default language will be setted as English.'
  //       );

  //       $("#language_change_modal").modal("show");
  //     } else {
  //       document.cookie = "lang=" + $("body").data("lang") + ";path=/;" + ";";
  //     }
  //   }
  // }

  // if( $.cookie( "lang" ).indexOf( "ko" ) > -1 ){
  //   $("#language-changer").text( "ko" );
  // } else {
  //   $("#language-changer").text( "en" );
  // }

  // $("#language-changer").on( "click", function(){
  //   if( "ko" == $.cookie( "lang") ){
  //     document.cookie = "lang=en;path=/;" + ";";
  //   } else if( "en" == $.cookie( "lang") ){
  //     document.cookie = "lang=ko;path=/;" + ";";
  //   }

  //   location.reload();
  // } );





  $(".sns-share-icon").on( "click", function(){
    shareInSocial( $(this).children().attr( "class" ) );
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
    $(".site-nav .navbar-nav .navbar-item").on( "click", function(){

      if( $(this).attr( "class" ).indexOf( "open" ) > -1 ){

        // dropdown - close
        $(".navbar-item").each( function(){
          $(this).removeClass( "open" );
        } );
        $(this).children(".site-nav-menu").children(".dropdown-arrow").removeClass( "fa-angle-up" );
        $(this).children(".site-nav-menu").children(".dropdown-arrow").addClass( "fa-angle-down" );
      } else{

        // dropdown - open
        $(".navbar-item").each( function(){
          $(this).removeClass( "open" );
          $(this).children(".site-nav-menu").children(".dropdown-arrow").removeClass( "fa-angle-up" );
          $(this).children(".site-nav-menu").children(".dropdown-arrow").addClass( "fa-angle-down" );
        } );

        $(this).addClass( "open" );
        $(this).children(".site-nav-menu").children(".dropdown-arrow").removeClass( "fa-angle-down" );
        $(this).children(".site-nav-menu").children(".dropdown-arrow").addClass( "fa-angle-up" );
      }
    } );


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







  // Comment - Start
  $(".user-comment-assign #comment").focus( function(){
    $(this).attr( "rows", "6" );
    $(this).siblings(".comment-submit").fadeIn( "fast" );
  } );

  $(".user-comment-submitted p").on( "click", function(){
    $(this).siblings( ".comment-submit" ).toggle();
  } );

  $(".comment-submit-btn").on( "click", function(){

    $.LoadingOverlay("show", { color: "rgba(255, 255, 255, 0.8)" });

    if( !mandatoryValidator(this) ){
      $.LoadingOverlay("hide");
      return;
    }

    var comment = $(this).parent().siblings( "textarea" ).val();
    var name = $(this).siblings( ".ip_name" ).val();
    var password = $(this).siblings( ".ip_pw" ).val();

    var contentId = $(location).attr( "href" ).split("/content/")[1];
    var parentId = $(this).parent().parent().parent().parent().parent().attr( "id" );

    var data = {
      "comment" : comment,
      "name" : name,
      "password" : password,
      "contentid" : contentId,
      "parentid" : parentId
    };

    $.ajax( {
      data: data,
      type: "POST",
      url: "/comment",

      success: function(){
        data.insertId = arguments[0].insertId;

        if( parentId === undefined ){
          $( getCommentHtml(data) ).insertAfter(".user-comment-assign");
        } else {
          $(".user-comment-submitted").each( function(){
            if( $(this).attr( "id" ) === parentId ){
              $( getCommentHtml(data) ).insertAfter( $(this) );
            }
          } );
        }

        $( ".user-comment textarea" ).val( "" );
        $( ".user-comment .ip_name" ).val( "" );
        $( ".user-comment .ip_pw" ).val( "" );

        $( ".user-comment .user-comment-submitted .comment-submit" ).css( "display", "none" );

        addDeleteEventHandler();

        var commentCountStr = ( $(".comment-count").text() ).split("comment")[0];
        commentCountStr = commentCountStr.replace( " ", "" );

        $(".comment-count").text("");

        commentCount = ( parseInt( commentCountStr ) ) + 1;
        if( commentCount == 1 ){
          $(".comment-count").append( '<i class="fa fa-thumbs-up"></i>' + commentCount + " comment" );
        } else {
          $(".comment-count").append( '<i class="fa fa-thumbs-up"></i>' + commentCount + " comments" );
        }

        $.LoadingOverlay("hide");
      },
      error: function(){
        $.LoadingOverlay("hide");
        alert( "An erro occured when submitting comments. Please contact adminstrator.");
      }
    } );
  } );

  $(".del-btn").on( "click", function(){

    var targetIds = [];

    if( $(this).parent().parent().parent().attr( "class" ).indexOf( "user-comment-submitted") > -1 ){
      var targetId = $(this).parent().parent().parent().attr( "id" );

      targetIds.push( targetId );

      $(".user-comment-reply").each( function(){
        if( targetId == $(this).data( "parent") ){
          targetIds.push( $(this).attr( "id" ) );
        }
      } );

    } else if( $(this).parent().parent().attr( "class" ).indexOf( "user-comment-reply" ) > -1 ){
      targetIds.push( $(this).parent().parent().attr( "id" ) );
    }

    $("#password_modal").data( "target", targetIds );
    $("#password_modal").modal("show");
  } );

  $("#password_modal #confirm").on( "click", function(){

    $.ajax( {
      data: { "targetIds" : $("#password_modal").data("target"), "password" : $(this).parent().siblings("#pw").val() },
      type: "POST",
      url: "/delcomment",

      success: function(results){
        if( results.STATUS === "WRONG_PASSWORD" ){
          alert( "Password is incorrect." );
        } else if( results.STATUS === "SUCCEED" ){
          var targetIds = ( $("#password_modal").data("target") ).toString().split(",");

          for( var i=0; i<targetIds.length; i++ ){
            $(".user-comment-submitted").each( function(){
              if( $(this).attr( "id" ) === targetIds[i] ) $(this).remove();
            } );
            $(".user-comment-reply").each( function(){
              if( $(this).attr( "id" ) === targetIds[i] ) $(this).remove();
            } );
          }

          var commentCountStr = ( $(".comment-count").text() ).split("comment")[0];
          commentCountStr = commentCountStr.replace( " ", "" );

          $(".comment-count").text("");

          commentCount = ( parseInt( commentCountStr ) ) - 1;
          if( commentCount == 1 ){
            $(".comment-count").append( '<i class="fa fa-thumbs-up"></i>' + commentCount + " comment" );
          } else {
            $(".comment-count").append( '<i class="fa fa-thumbs-up"></i>' + commentCount + " comments" );
          }
        }
      },
      error: function(){
        alert( "An error occured when deleting comments. Please contact adminstrator.");
      }
    } );

    $(this).parent().siblings("input").val("");
    $(this).parent().parent().parent().parent().parent().attr("data-target", "");
    $(this).parent().parent().parent().parent().parent().modal("hide");
  } );

  $("#password_modal #cancel").on( "click", function(){
    $(this).parent().siblings("input").val("");
    $(this).parent().parent().parent().parent().parent().attr("data-target", "");
    $(this).parent().parent().parent().parent().parent().modal("hide");
  } );
  // Comment - End

  // like Count - Start
  $(".like-count").on( "click", function(){

    var likeCountStr = ( $(this).text() ).split("like")[0];
    likeCountStr = likeCountStr.replace( " ", "" );
    
    var likeCount = ( parseInt( likeCountStr ) ) + 1;
    
    if( likeCount == 1 ){
      likeCountStr = likeCount + " like";
    } else{
      likeCountStr = likeCount + " likes";
    }

    $(this).text( "" );
    $(this).append( '<i class="fa fa-thumbs-up"></i>' + likeCountStr );

    var contentId = $(location).attr( "href" ).split("/content/")[1];

    $.ajax( {
      data: { "contentid" : contentId },
      type: "POST",
      url: "/increasecontentlikecount",

      success: function(){
        alert( "Thank you very much!\nYour click is just added in like counts!" );
      },
      error: function(){
        alert( "An error occured when adding like. Please contact adminstrator.");
      }
    } );

  } );
  // like Count - End

} );









$(window).on( "pageshow", function(){
  if( iOSDevice() ){
    if( $.cookie("lang") != $("body").data("lang") ){
      document.cookie = "lang=" + $("body").data("lang") + ";path=/;" + ";";
      location.reload();
    }
  }
} );

function iOSDevice(){
  var ua = navigator.userAgent,
  iOS = /iPad|iPhone|iPod/.test(ua),
  iOS11 = /OS 11_0_1|OS 11_0_2|OS 11_0_3|OS 11_1|OS 11_1_1|OS 11_1_2|OS 11_2|OS 11_2_1/.test(ua);

  return iOS && iOS11;
}




function getLicenseInfo(){

  if( $("#license_modal .modal-body table").length === 0 ){
    $.ajax( {
      type: "GET",
      url: "/license",

      success: function(){
        var table = arguments[0];

        $("#license_modal .modal-body").append( table );
        $("#license_modal").modal( "show" );
      }
    } );
  } else {
    $("#license_modal").modal( "show" );
  }
}

function mandatoryValidator( target ){
  if( $(target).parent().siblings( "#comment" ).val() === "" ){
    alert( "PLEASE INSERT YOUR COMMENTS." );
    return false;
  }
  if( $(target).siblings( ".ip_name" ).val() === "" ){
    alert( "PLEASE INSERT YOUR NAME." );
    return false;
  }
  if( $(target).siblings( ".ip_pw" ).val() === "" ){
    alert( "PLEASE SET PASSWORD OF YOUR COMMENT." );
    return false;
  }
  return true;
}

function getCommentHtml( comment ){

  var commentStr = "";

  comment.comment = comment.comment.replace( /\n/g, "<br />" );

  if( comment.parentid === undefined ){
    commentStr = 
      '<div class="row user-comment-submitted" id="' + comment.insertId + '">'
        + '<div class="col-lg-2 col-md-2 col-sm-2 user-comment-image mobile-hidden">'
        + '<img src="/comment_default.png" />'
        + '</div>'
        + '<div class="col-lg-10 col-md-10 col-sm-10 comment-content">'
          + '<div class="comment-title">'
              + '<span class="writer">' + comment.name + '</span>'
              + '<span class="spent-date">' + 'now' + '</span>'
              + '<button class="btn_important del-btn">DEL</button>'
          + '</div>'
          + '<div class="comment-body">'
            + '<p>' + comment.comment + '</p>'
            + '<div class="comment-submit form-group">'
              + '<textarea class="form-control" rows="3" id="comment"></textarea>'
              + '<div>'
                + '<input class="input_important ip_name" type=text placeholder="NAME"  required />'
                + '<input class="input_important ip_pw" type=password placeholder="PASSWORD" required />'
                + '<button class="btn_important comment-submit-btn">SUBMIT</button>'
              + '</div>'
            + '</div>'
          + '</div>'
        + '</div>'
      + '</div>';
  } else {
    commentStr = 
      '<div class="row user-comment-reply" id="' + comment.insertId + '" data-parent="' + comment.parentid + '">'
        + '<div class="col-lg-2 col-md-2 col-sm-2 col-xs-1">'
        + '</div>'
        + '<div class="col-lg-10 col-md-10 col-sm-10 col-xs-11">'
          + '<hr class="comment-divider">'
          + '<i class="fa fa-reply" aria-hidden="true"></i>'
          + '<span class="writer">' + comment.name + '</span>'
          + '<span class="spent-date">' + 'NOW' + '</span>'
          + '<button class="btn_important del-btn">DEL</button>'
          + '<p>' + comment.comment + '</p>'
        + '</div>'
      + '</div>';
  }

  return commentStr;
}

function addDeleteEventHandler(){
  $(".del-btn").on( "click", function(){

    var targetIds = [];

    if( $(this).parent().parent().parent().attr( "class" ).indexOf( "user-comment-submitted") > -1 ){
      var targetId = $(this).parent().parent().parent().attr( "id" );

      targetIds.push( targetId );

      $(".user-comment-reply").each( function(){
        if( targetId == $(this).data( "parent") ){
          targetIds.push( $(this).attr( "id" ) );
        }
      } );

    } else if( $(this).parent().parent().attr( "class" ).indexOf( "user-comment-reply" ) > -1 ){
      targetIds.push( $(this).parent().parent().attr( "id" ) );
    }

    $("#password_modal").data( "target", targetIds );
    $("#password_modal").modal("show");

  } );
}
