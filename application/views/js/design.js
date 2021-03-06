var left, right;
var target, unTarget, targetDirection;
var targetHeight, targetWidth, targetInitialTop, targetInitialLeft, unTargetWidth;








$(document).ready( function(){

  var browser = getBrowser();

  modalBugFix();
  postVisible();

  if( $(window).width() >= 1024 ){
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
    $(this).parent().css( {backgroundColor: "white"} );
    $(this).parent().children().css( {color: "#000000"} );
    $(this).parent().children().css( {paddingLeft: "5px"} );
  } );




  // before silding
  $('.announce-carousel').bind('slide.bs.carousel',function(e){
      setAnnounceImageRatio();
      announceImageScroll();

      var slideFrom = $(this).find('.active').index();
      var slideTo = $(e.relatedTarget).index();

      var indicators = $(".announce-carousel-indicators .carousel-indicators li");

      $(indicators[slideFrom]).toggleClass( "active" );
      $(indicators[slideTo]).toggleClass( "active" );
  });

  // after sliding
  $('.announce-carousel').bind('slid.bs.carousel',function(e){
      setAnnounceImageRatio();
      announceImageScroll();
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
    setAnnounceImageRatio();
    announceImageScroll();
    postVisible();

    initScrollInfo();
    scrollAffix();
    tabletBannerStyle();
  });

  $(window).scroll( function( event ){
    setAnnounceImageRatio();
    announceImageScroll();
    postVisible();

    initScrollInfo();
    scrollAffix();
    tabletBannerStyle();
  } );

  $(window).on( "load", function(){
    setAnnounceImageRatio();
    announceImageScroll();
    postVisible();

    initScrollInfo();
    scrollAffix();
    tabletBannerStyle();
  } );


  wrapFigcaption();


  tableStyle();
} );







function getBrowser(){
    var userAgent = navigator.userAgent.toLowerCase();
    var browser = "";

    if( userAgent.indexOf( "chrome") > -1 ){
      browser = "chrome";
    } else if( userAgent.indexOf( "safari" ) > -1 ){
      browser = "safari";
    } else if( userAgent.indexOf( "firefox") > -1 ){
      browser = "firefox";
    } else if( userAgent.indexOf( "ms-") > -1 ){
      browser = "ie"
    }

    return browser;
}

function modalBugFix(){
  // Detect ios 11_x_x affected
  // NEED TO BE UPDATED if new versions are affected
  var ua = navigator.userAgent,
  iOS = /iPad|iPhone|iPod/.test(ua),
  iOS11 = /OS 11_0_1|OS 11_0_2|OS 11_0_3|OS 11_1|OS 11_1_1|OS 11_1_2|OS 11_2|OS 11_2_1/.test(ua);

  // ios 11 bug caret position
  if ( iOS && iOS11 ) {
      // Add CSS class to body
      $("body").addClass("iosBugFixCaret");
  }
}

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

  if( getBrowser() === "chrome" ){
    if( $(window).width() >= 992 && $(window).height() / $(window).width() < 1){
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
  $(".announce-carousel figure").each( function(){
    if( $(window).width() < 768 ){
      $(this).css( "height", $(window).width() * 2 / 3 );
    }
  } );

  $(".announce-carousel .announce-image").each( function(){
    if( $(window).width() >= 1024 ){
      // Laptop, Pad
      $(this).css( "height", "402px" );
    } else if( $(window).width() < 1024 && $(window).width() >= 768 ){
      // Laptop, Pad
      $(this).css( "height", "270px" );
    } else {
      // Mobile
      // $(this).css( "height", "150px" );
      $(this).css( "height", $(window).width() * 2 / 3 );
    }
  } );

  $(".announce-carousel figcaption").each( function(){
    if( $(window).width() >= 1024 ){
      // Laptop, Pad
      $(this).css( "height", "402px" );
    } else if( $(window).width() < 1024 && $(window).width() >= 768 ){
      // Laptop, Pad
      $(this).css( "height", "270px" );
    } else {
      // Mobile
      // $(this).css( "height", "150px" );
      $(this).css( "height", $(window).width() * 2 / 3 );
    }
  } );

  $(".inner-announce .announce-image").each( function(){
    if( $(window).width() >= 1024 ){
      // Laptop, Pad
      $(this).css( "height", "290px" );
    } else if( $(window).width() < 1024 && $(window).width() >= 768 ){
      // Laptop, Pad
      $(this).css( "height", "290px" );
    } else {
      // Mobile
      $(this).css( "height", "290px" );
    }
  } );

  $(".page-content figcaption, .banner-content figcaption").each( function(){
    if ( !$(this).parent().attr( "class" ) ){
      $(this).css( "height", $(this).parent().css("height") );
      // $(this).css( "height", parseInt( $(this).siblings("img").css("height").replace("px") ) + 2 );
    }
  } );

  $(".page-content figcaption, .banner-content figcaption").on( "click", function(){
    $(location).attr( "href", $(this).children().data("href") );
  } );
}

function tableStyle(){
  $(".content-body table").removeClass( "table" );
  $(".content-body table").removeClass( "table-bordered" );
  $(".content-body table").addClass( "table table-responsive content-table" );

  $(".content-body table tbody").each( function(){
    var trs = $(this).children();

    if( trs.length > 0 ){
      $(trs[0]).children().each( function(){
        $(this).addClass( "td-empty-top" );
      } );
      
    }
  } );
}

function tabletBannerStyle(){
  // only for tablet - col-xx-3
  if( ( $(window).width() >= 768 && $(window).width() < 992 )
    || ( $(window).height() / $(window).width() >= 1 ) )  {

    $(".banner-shortcut").append( $("#newsletter_select") );

    $(".banner-shortcut").addClass( "col-sm-6" );
    $(".banner-hashranking").addClass( "col-sm-6" );
    $(".banner-mostrecent").addClass( "col-sm-6" );
    $(".banner-mostviewed").addClass( "col-sm-6" );
    
  } else {
    $(".banner-newsletter").append( $("#newsletter_select") );

    $(".banner-shortcut").removeClass( "col-sm-6" );
    $(".banner-hashranking").removeClass( "col-sm-6" );
    $(".banner-mostrecent").removeClass( "col-sm-6" );
    $(".banner-mostviewed").removeClass( "col-sm-6" );
  }

  // // real tablet size
  // if( $(window).width() >= 992 || $(window).width() < 768
  //     || ( $(window).height() / $(window).width() < 1 ) ){

  //   $(".banner-newsletter").append( $("#newsletter_select") );
  // } else {
  //   $(".banner-shortcut").append( $("#newsletter_select") );
  // }
}

function setAnnounceImageRatio(){
  if( $(window).width() < 768 ) {
    $(".announce-image").each( function(){

      var imageDiv = $(this);
      var tmpImg = new Image();
      
      tmpImg.src= $(this).children("img").attr( "src" );
      $(tmpImg).one('load',function(){
        orgWidth = tmpImg.width;
        orgHeight = tmpImg.height;

        if( orgHeight < orgWidth * 2 / 3 ){
          var ratio = orgWidth / orgHeight;
          var renderHeight = $(window).width() * 2 / 3;
          var renderWidth = $(window).width() * 2 / 3 * ratio;
          var marginLeft = 0 - (( renderWidth - renderHeight ) / 2 );

          imageDiv.height( renderHeight );
          imageDiv.width( renderWidth );
          imageDiv.css( "margin-left", marginLeft );
        }
      });
    } );
  }
}

function announceImageScroll(){
  $(".announce-image").each( function(){

    var upperSpace = $(this).offset().top < $(window).height() ? $(this).offset().top : $(window).height();
    var lowerSpace = $(document).height() - $(this).offset().top + $(this).height() < $(window).height() ? $(document).height() - $(this).offset().top + $(this).height() : $(window).height();

    if( $(window).scrollTop() > $(this).offset().top - upperSpace
      && $(window).scrollTop() < $(this).offset().top + $(this).height() + lowerSpace ){

      var renderRange = upperSpace + $(this).height() + lowerSpace;
      var scrollInRange = $(window).scrollTop() - ( $(this).offset().top - upperSpace );
      var imageScrollRange = scrollInRange * $(this).children("img").height() / renderRange; 

      $(this).scrollTop( imageScrollRange );
    }
  } );
}
