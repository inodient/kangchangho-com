$(document).ready( function(){
  // meta tag setting - start
  // let url = $(location).attr("href");
  // let title = getTitle();
  // let summary = getDescription();
  // let media = getTitleImageUrl();
  //
  // $("meta[property='og\\:url']").attr("content", url);
  // $("meta[property='og\\:title']").attr("content", title);
  // $("meta[property='og\\:description']").attr("content", summary);
  // $("meta[property='og\\:image']").attr("content", media);
  //
  // function getTitle(){
  //   if( $("h1").length ){
  //     return $("h1").text();
  //   }
  //   if( $("h2").length ){
  //
  //     if( ( $("h2").text() ).split( $("h2 small").text() )[0] == "" ){
  //       return $("h2 small").text();
  //     }
  //
  //     return ( $("h2").text() ).split( $("h2 small").text() )[0];
  //   }
  //   if( $(".doc-description").length ){
  //     return "Well Formed IT 's " + $(".doc-description h3").text();
  //   }
  //
  //   return "Well Formed IT";
  // }
  //
  // function getDescription(){
  //   if( $("h2 small").length ){
  //     return $("h2 small").text();
  //   }
  //   if( $(".doc-description-content").length ){
  //     return $(".doc-description-content").text();
  //   }
  //
  //   return "Divide specifically, Build well-formedly";
  // }
  //
  // function getTitleImageUrl(){
  //   let mediaWidth = 0;
  //   let mediaFileName = "http://www.wellformedit.com/wellformedit_logo_large.png";
  //
  //   $("img").each( function(){
  //
  //     if( ( $(this)[0] ).clientWidth > mediaWidth && ( $(this)[0] ).clientWidth > 480 ){
  //       mediaFileName = ( $(this)[0] ).currentSrc;
  //       mediaWidth = ( $(this)[0] ).clientWidth;
  //     }
  //   } );
  //
  //   return mediaFileName;
  // }
  // meta tag setting - end





  $(".sns_button").on( "mouseenter", function(){
    $("#" + arguments[0].currentTarget.id).css("color", "gray" );
  } );

  $(".sns_button").on( "mouseleave", function(){
    $("#" + arguments[0].currentTarget.id).css("color", "black" );
  } );





  $(".sns_button").on( "click", function(){
    if( $(this).attr("id") == "sns_facebook" ){
      shareOnFacebook();
    } else if( $(this).attr("id") == "sns_twitter" ){
      shareOnTwitter();
    } else if( $(this).attr("id") == "sns_linkedin" ){
      shareOnLinkedIn();
    } else if( $(this).attr("id") == "sns_pinterest" ){
      shareOnPinterest();
    } else if( $(this).attr("id") == "sns_tumblr" ){
      shareOnTumblr();
    }
  } );
} );

function shareOnFacebook(){
  let appId = 355672798282806;
  let popupUrl = "";
  let option = 'sharer';
  let size = 'toolbar=0, status=0, width=626, height=436';

  let _Url = encodeURIComponent( $("meta[property='og\\:url']").attr("content") );
  let _Title = encodeURIComponent( $("meta[property='og\\:title']").attr("content") );
  let _Description = encodeURIComponent( $("meta[property='og\\:description']").attr("content") );
  let _Image = encodeURIComponent( $("meta[property='og\\:image']").attr("content") );

  // popupUrl = 'https://www.facebook.com/dialog/feed?app_id=' + appId + '&link=' + _Url + '&name=' + _Title + '&caption=' + "Well Formed IT" + '&description=' + _Description + '&picture=' + _Image + '&redirect_uri=' + _Url + '';
  popupUrl = 'https://www.facebook.com/dialog/feed?app_id=' + appId + '&link=' + _Url + '&name=' + _Title + '&description=' + _Description + '&redirect_uri=' + _Url + '';

  // popupUrl = `
  //   https://www.facebook.com/dialog/feed?app_id=` + appId + `
  //   &link=` + _Url + `
  //   &name=` + _Title + `
  //   &caption=` + "Well Formed IT" + `
  //   &description=` + _Description + `
  //   &picture=` + _Image + `
  //   &redirect_uri=` + _Url + `
  // `;

  // popupUrl = `
  //   https://www.facebook.com/sharer/sharer.php?u=` + _Url + `
  // `;

  console.log( popupUrl );

  window.open( popupUrl, option, size );
}

function shareOnTwitter(){
  let popupUrl = "";
  let option = 'sharer';
  let size = 'toolbar=0, status=0, width=626, height=436';

  popupUrl = "https://twitter.com/share";

  window.open( popupUrl, option, size );
}

function shareOnLinkedIn(){
  let popupUrl = "";
  let option = 'sharer';
  let size = 'toolbar=0, status=0, width=626, height=436';

  let _Url = encodeURIComponent( $("meta[property='og\\:url']").attr("content") );
  let _Title = encodeURIComponent( $("meta[property='og\\:title']").attr("content") );
  let _Description = encodeURIComponent( $("meta[property='og\\:description']").attr("content") );
  let _Image = encodeURIComponent( $("meta[property='og\\:image']").attr("content") );
  let _Source = encodeURIComponent( "http://www.wellformedit.com" );

  popupUrl = `
    http://www.linkedin.com/shareArticle?mini=true` + `
    &url=` + _Url + `
    &title=` + _Title + `
    &summary=` + _Description + `
    &source=` + _Source + `
  `;

  // popupUrl = 'http://www.linkedin.com/shareArticle?mini=true' + '&url=' + _Url + '&title=' + _Title + '&summary=' + _Description + '&source=' + _Source;

  window.open( popupUrl, option, size );
}

function shareOnPinterest(){
  let popupUrl = "";
  let option = 'sharer';
  let size = 'toolbar=0, status=0, width=626, height=436';

  let _Url = encodeURIComponent( $("meta[property='og\\:url']").attr("content") );
  let _Title = encodeURIComponent( $("meta[property='og\\:title']").attr("content") );
  let _Description = encodeURIComponent( $("meta[property='og\\:description']").attr("content") );
  let _Image = encodeURIComponent( $("meta[property='og\\:image']").attr("content") );
  let _Source = encodeURIComponent( "http://www.wellformedit.com" );

  popupUrl = `
    https://pinterest.com/pin/create/button/` + `
    ?url=` + _Url + `
    &media=` + _Image + `
    &description=` + _Description + `
  `;

  window.open( popupUrl, option, size );
}

function shareOnTumblr(){
  let popupUrl = "";
  let option = 'sharer';
  let size = 'toolbar=0, status=0, width=626, height=436';

  let _Url = encodeURIComponent( $("meta[property='og\\:url']").attr("content") );
  let _Title = encodeURIComponent( $("meta[property='og\\:title']").attr("content") );
  let _Description = encodeURIComponent( $("meta[property='og\\:description']").attr("content") );
  let _Image = encodeURIComponent( $("meta[property='og\\:image']").attr("content") );
  let _Source = encodeURIComponent( "http://www.wellformedit.com" );

  popupUrl = `
    http://www.tumblr.com/share/link` + `
    ?url=` + _Url + `
    &name=` + _Title + `
    &description=` + _Description + `
  `;

  window.open( popupUrl, option, size );
}
