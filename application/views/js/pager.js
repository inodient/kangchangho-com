function goPreviousPage(){
  var currentPage = parseInt( $(".article-list-container").data( "current-page" ) );

  if( currentPage - 1 == 1 ){
    $(".list-caption").css( "display", "block" );
  } else {
    $(".list-caption").css( "display", "none" );
  }

  goPage( currentPage - 1 );
}

function goNextPage(){
  var currentPage = parseInt( $(".article-list-container").data( "current-page" ) );

  $(".list-caption").css( "display", "none" );
  goPage( currentPage + 1 );
}

function goPage( calledPage ){

  if( calledPage == 1 ){
    $(".list-caption").css( "display", "block" );
  } else {
    $(".list-caption").css( "display", "none" );
  }

  var id = "#paging-" + calledPage;

  if( $(".article-list-container .articles-paging-block" + id).length ){
    $(".article-list-container .articles-paging-block.active").removeClass( "active" );
    $(".article-list-container .articles-paging-block" + id).addClass( "active" );

    wrapFigcaption();

    $(".article-list-container").data( "current-page", calledPage );
    pageNavigation();

    initScrollInfo();
    $('html, body').animate( {scrollTop: 0}, 300 );

  } else{
    getOtherPages( calledPage )
    .then( function(){

      $(".article-list-container .articles-paging-block.active").removeClass( "active" );
      $(".article-list-container .articles-paging-block" + id).addClass( "active" );

      wrapFigcaption();

      $(".article-list-container").data( "current-page", calledPage );
      pageNavigation();

      initScrollInfo();
      $('html, body').animate( {scrollTop: 0}, 300 );

    } )
    .catch( function(err){
      console.log( err );
      alert( "ERROR" );
    } );
  }
}

function getReleasedPage(){
  var pages = [];
  $(".articles-paging-block").each( function(){
    var id = parseInt( ( $(this).attr( "id" ) ).split("paging-")[1] );
    pages.push( id );
  } );

  return pages;
}

function getOtherPages( calledPage ){
  return new Promise( function(resolve, reject){

    var releasedPages = getReleasedPage();
    var totalPageCount = $(".article-list-container").data("total-page-count") ? $(".article-list-container").data("total-page-count") : 0;
    var currentPage = $(".article-list-container").data("current-page") ? $(".article-list-container").data("current-page") : 1;

    var urlArr = ( $(location).attr( "pathname" ) ).split("/");

    var target = urlArr[ urlArr.length - 2 ];
    var targetId = urlArr[ urlArr.length - 1 ];
    var targetText = urlArr[ urlArr.length - 1 ];

    // var target = ( $(location).attr("pathname") ).split("/")[1];
    // var targetId = ( $(location).attr("href") ).split("/")[1];
    // var targetText = ( $(location).attr("href") ).split("searchword=")[1];

    if( target === "category" ){
      url = "/getothercategorypages";
    } else if( target === "writer" ){
      url = "/getotherwriterpages";
    } else if( target === "hash" ){
      url = "/getotherhashpages";
    } else if( target === "search" ){
      url = "/getothersearchpages";
    } else if( target === "announce" ){
      url = "/getotherannouncepages";
    } else {
      url = "/getotherpages";
    }

    $.ajax( {
      data: {"target": target, "targetId": targetId, "targetText": targetText, "totalPageCount":totalPageCount,"releasedPages":releasedPages, "calledPage":calledPage, "currentPage":currentPage },
      type: "POST",
      url: url,

      success: function()
      {
        var pageInfo = arguments[0];

        createPages( pageInfo )
        .then( function(){
          resolve( pageInfo );
        } )
        .catch( function(err){
          reject( err );
        } );
      }
    } );
  } );
}

function createPages( pageInfo ){
  return new Promise( function(resolve, reject){
    var articleListContainer = $(".article-list-container");
    var pageRange = pageInfo.pageRange;
    var pageList = pageInfo.pageList;
    var currentPage = pageInfo.currentPage;

    for( var i=0; i<pageRange.length; i++ ){
      if( $(".articles-paging-block #paging-" + pageRange[i] ) ){
        id = "paging-" + pageRange[i];

        var page = $("<div>").attr("id", id).addClass( "articles-paging-block" );

        var endIndex = pageList.length < (i*8) + 8 ? pageList.length : (i*8) + 8;

        for( var j=(i*8); j<endIndex; j++ ){
          var specificData = pageList[j];

          if( specificData.type === "announce" ){
            page.append(
              $("<article class='inner-announce post-hidden'>").append(
                $("<figure>").append(
                  $("<img>").attr( "src", "/" + specificData.savedFileName )
                ).append(
                  $("<figcaption data-href='/announce/" + specificData.id + "'>").append(
                    $("<div data-href='/announce/" + specificData.id + "'>").append(
                      $("<a  data-href='/announce/" + specificData.category_id + "' class='content-anchor category'>").text( specificData.category )
                    ).append(
                      $("<h3 data-href='/announce/" + specificData.id + "'>").text( specificData.title )
                    )
                  )
                )
              )
            )
          } else if( specificData.type === "content" ){
            page.append(
              $("<article class='content-summary post-hidden'>").append(
                $("<div class='row'>").append(
                  $("<div class='col-lg-4 col-md-4 col-sm-4'>").append(
                    $("<figure>").append(
                      $("<img>").attr( "src", "/" + specificData.savedFileName )
                    ).append(
                      $("<figcaption>").append(
                        $("<div>").data("href", "/content/" + specificData.id).text( "View Post" )
                      )
                    )
                  )
                ).append(
                  $("<div class='col-lg-8 col-md-8 col-sm-8'>").append(
                    $("<a href='/category/" + specificData.category_id + "' class='content-anchor category before-line'>").text( specificData.category )
                  ).append(
                    $("<h3 class='title'>").append(
                      $("<a href='/content/" + specificData.id + "' class='content-anchor title'>").text( specificData.title )
                    )
                  ).append(
                    $("<span class='date'>").text( ( specificData.create_date ).split("T")[0] )
                  ).append(
                    $("<span class='writer-text'>").text( "    BY    " )
                  ).append(
                    $("<a href='/writer/" + specificData.writer_id +  "' class='content-anchor writer'>").text( specificData.writer )
                  ).append(
                    $("<p class='summary'>").text( specificData.content )
                  ).append(
                    $("<button class='btn_important'>").attr( "onclick", "location.href='/content/" + specificData.id + "'" ).text( "VIEW POST" )
                  )
                )
              )
            )
          }
        }
      }

      articleListContainer.find(".list-pager").before( page );
      articleListContainer.data( "current-page", currentPage );
    }

    resolve( {} );

  } );

}






function pageNavigation(){
  var currentPage = $(".article-list-container").data("current-page") ? $(".article-list-container").data("current-page") : 1;
  var totalPageCount = $(".article-list-container").data("total-page-count") ? $(".article-list-container").data("total-page-count") : 0;

  if( totalPageCount > 1 ){
    var listPager = $(".list-pager");
    var navPagination = $("<div class='nav-pagination section-end'>");

    var previousPaginator = $("<a>").attr( "onclick", "goPreviousPage();return false;" ).addClass("content-anchor previous-paginator").text( "Previous" );
    var nextPaginator = $("<a>").attr( "onclick", "goNextPage(); return false;" ).addClass("content-anchor next-paginator").text( "Next" );
    var ellapsedPaginator = $("<span>").addClass( "ellapsed-paginator" ).text( "..." );


    if( currentPage > 3 ){
      navPagination.append( previousPaginator );
      navPagination.append( $("<a>").attr( "onclick", "goPage(1); return false;" ).attr("data-page", 1).addClass("content-anchor number-paginator").text( "1" ) );
    }

    if( currentPage - 3 > 1 ){
       navPagination.append( ellapsedPaginator );
     }

    for( var i=currentPage-2; i<=currentPage+2; i++ ){
      if( i > 0 && i <= totalPageCount ){
        if( i === currentPage ){
          navPagination.append(
            $("<span>").addClass( "ellapsed-paginator" ).text( i )
          )
          continue;
        }
        navPagination.append(
          $("<a>").attr( "onclick", "goPage(" + i + "); return false;" ).attr("data-page", i).addClass("content-anchor number-paginator").text( i )
        )
      }
    }

    if( currentPage + 3 < totalPageCount ) navPagination.append( ellapsedPaginator );
    if( totalPageCount > currentPage + 2 ){
      navPagination.append( $("<a>").attr( "onclick", "goPage(" + totalPageCount + "); return false;" ).attr("data-page", totalPageCount).addClass("content-anchor number-paginator").text( totalPageCount ) );
      navPagination.append( nextPaginator );
    }

    $(".nav-pagination").remove();
    listPager.append( navPagination );
  }
}


$(document).ready( function(){
  pageNavigation();
} );
