var left, right;
var target, unTarget, targetDirection;
var targetHeight, targetWidth, targetInitialTop, targetInitialLeft, unTargetWidth;



$(document).ready( function(){
  postVisible();

  if( $(window).width() >= 1000 ){
    $(".navbar-item").on( "mouseenter", function(){

      $(".navbar-item").each( function(){
        $(this).removeClass( "open" );
      } );
      $(this).addClass( "open" );
    } );

    $(".navbar-item").on( "mouseleave", function(){
      $(".navbar-item").each( function(){
        $(this).removeClass( "open" );
      } );
    } );
  }



  $(".hash-ranking td").on("mouseenter", function(){
    $(this).parent().css( {backgroundColor: "black"} );
    $(this).parent().children().css( {color: "#ededed"} );
    $(this).parent().children().css( {paddingLeft: "+10px"} );
  } );

  $(".hash-ranking td").on("mouseleave", function(){
    $(this).parent().css( {backgroundColor: "initial"} );
    $(this).parent().children().css( {color: "#000000"} );
    $(this).parent().children().css( {paddingLeft: "5px"} );
  } );




  $('.announce-carousel').on('slide.bs.carousel',function(e){
      var slideFrom = $(this).find('.active').index();
      var slideTo = $(e.relatedTarget).index();

      var indicators = $(".announce-carousel-indicators .carousel-indicators li");

      $(indicators[slideFrom]).toggleClass( "active" );
      $(indicators[slideTo]).toggleClass( "active" );

  });

  $(".announce-carousel .figcaption").on( "click", function(){
    $(location).attr( "href", $(this).children().data("href") );
  } );




  var offset = 300;
  var duration = 500;
  $(window).scroll(function() {
      if ($(this).scrollTop() > offset) {
          $('.back-to-top').css( "opacity", "1" );
      } else {
          $('.back-to-top').css( "opacity", "0" );
      }
  });

  $('.back-to-top').click(function(event) {
      event.preventDefault();

      initScrollInfo();
      $('html, body').animate({scrollTop: 0}, duration);

      return false;
  });







  postVisible();

  initScrollInfo();
  scrollAffix();

  $(window).resize(function(){
    postVisible();

    initScrollInfo();
    scrollAffix();
  });

  $(window).scroll( function( event ){
    postVisible();

    initScrollInfo();
    scrollAffix();
  } );

  $(window).on( "popstate", function(){
    alert( "POPSTATE" );
  } );


  wrapFigcaption();
} );






function postVisible(){
  var scroll = parseInt( $(window).scrollTop() );
  var screenHeight = parseInt( $(window).innerHeight() );

  var bottomIndex = scroll + screenHeight;

  $(".post-hidden").each( function(){
    var top = parseInt( $(this).offset().top );
    var height = parseInt( $(this).height() );
    var bottom = top + height;

    if( $(this).parent().attr( "class" ).indexOf( "active" ) > - 1){
      if( screenHeight > top || ( bottomIndex - top > 0 && bottomIndex - top < 350 ) ){
        $(this).removeClass( "post-hidden" ).addClass( "post-visible" );
      }

      if( bottomIndex - bottom > 0 ){
        $(this).removeClass( "post-hidden" ).addClass( "post-visible" );
      }
    }
  } );

  wrapFigcaption();
}

function scrollAffix(){
  if( $(window).width() >= 1000 ){
    var scroll = parseInt( $(window).scrollTop() );
    var screenHeight = parseInt( $(window).innerHeight() );
    var bottomIndex = scroll + screenHeight;

    footer = $("footer");
    var footerHeight = parseInt( footer.outerHeight() );
    var footerInitialTop = parseInt( footer.position().top );

    targetHeight = parseInt( target.outerHeight() );

    if( scroll <= parseInt( target.position().top ) ){

      if( target.css( "position" ) === "absolute" ){
        target.attr( "style", "" );
        target.css( {position: 'fixed', top: 0} );
        target.css( "left", targetInitialLeft );
        target.css( "width", targetWidth );
      }
    }

    if( scroll <= parseInt( unTarget.position().top ) ){

      if( target.css( "position" ) === "fixed" ){
        target.attr( "style", "" );
        target.css( {position: 'relative'} );

        if( targetDirection == "left" ){
          unTarget.attr( "style", "" );
        }
      }
    }

    if( bottomIndex < footerInitialTop ){

      if( bottomIndex > targetHeight + targetInitialTop && target.css("position") != "absolute" ){

        target.attr( "style", "" );
        target.css( {position: 'fixed'} );
        // target.css( "top", screenHeight - targetInitialTop );
        target.css( "bottom", 0 );
        target.css( "left", targetInitialLeft );
        target.css( "width", targetWidth );

        if( targetDirection == "left" ){
          unTarget.css( "margin-left", targetWidth );
          unTarget.css( "width", unTargetWidth );
        }
      }

    } else if( bottomIndex >= footerInitialTop ){

      target.attr( "style", "" );
      target.css( {position: 'absolute'} );
      target.css( "top", footerInitialTop - targetHeight );
      target.css( "left", targetInitialLeft );
      target.css( "width", targetWidth );

      if( targetDirection == "left" ){
        unTarget.css( "margin-left", targetWidth );
        unTarget.css( "width", unTargetWidth );
      }
    }
  }
}

function initScrollInfo(){
  right = $(".banner-container");

  if( $(".article-list-container").length ){
    left = $(".article-list-container");
  } else if( $(".article-container").length ){
    left = $(".article-container");
  } else if( $(".write-container").length ){
    left = $(".write-container");
  }

  left.attr( "style", "" );
  right.attr( "style", "" );

  if( left.outerHeight()  > right.outerHeight() ){
    target = right;
    unTarget = left;
    targetDirection = "right";
  } else {
    target = left;
    unTarget = right;
    targetDirection = "left";
  }

  targetHeight = parseInt( target.outerHeight() );
  targetWidth = parseInt( target.outerWidth() );
  targetInitialTop = parseInt( target.offset().top );
  targetInitialLeft = parseInt( target.offset().left );
  unTargetWidth = parseInt( unTarget.outerWidth() );
}

function wrapFigcaption(){
  $(".announce-carousel figcaption").each( function(){
    if( $(window).width() >= 1024 ){
      // Laptop, Pad
      $(this).css( "height", "402px" );
    } else if( $(window).width() < 1024 && $(window).width() >= 768 ){
      // Laptop, Pad
      $(this).css( "height", "270px" );
    } else {
      // Mobile
      $(this).css( "height", "150px" );
    }
  } );

  $(".page-content figcaption, .banner-content figcaption").each( function(){
    if ( !$(this).parent().attr( "class" ) ){
      $(this).css( "height", parseInt( $(this).siblings("img").css("height").replace("px") ) + 2 );
    }
  } );

  $(".page-content figcaption, .banner-content figcaption").on( "click", function(){
    $(location).attr( "href", $(this).children().data("href") );
  } );
}
