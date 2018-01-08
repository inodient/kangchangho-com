$(document).ready( function(){
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




  $(".page-content figcaption, .banner-content figcaption").each( function(){
    if ( !$(this).parent().attr( "class" ) ){
      $(this).css( "height", parseInt( $(this).siblings("img").css("height").replace("px") ) + 2 );
    }
  } );

  $(".page-content figcaption, .banner-content figcaption").on( "click", function(){
    $(location).attr( "href", $(this).children().data("href") );
  } );
} );
