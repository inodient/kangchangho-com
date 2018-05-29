const socialInfo = {
	"faebookAppId" : "355672798282806"
}




function shareInSocial( vender ){
	if( vender.indexOf("facebook") > -1 ){
		shareFacebook( linkExtractor(), redirectExtractor() );
	} else if( vender.indexOf("twitter") > -1 ){
		shareTwitter( titleExtractor(), linkExtractor(), pressedHashExtractor() );
	} else if( vender.indexOf("linkedin") > -1 ){
		shareLinkedIn( titleExtractor(), linkExtractor(), pressedHashExtractor() );
	}
}





function linkExtractor(){
	var link = $(location).attr("href");

	return link;
}

function redirectExtractor(){
	var protocol = window.location.protocol;
	var host = window.location.host;
	var pathname = window.location.pathname;

	return protocol + "//" + host + "/sharepageclose";
}

function titleExtractor(){
	var title = $("title").text().replace( "#", "[hash]" );

	return title;
}

function plainHashExtractor(){
	var pathname = window.location.pathname;

	var hashes = '';

	if( pathname.indexOf("content") > -1 || pathname.indexOf("list") > -1
		|| pathname.indexOf("search") > -1
		|| pathname.indexOf("hash") > -1
		|| pathname.indexOf("category") > -1 )
	{
		$(".hashed-list-item").each( function(){
			hashes += $(this).children("a").text() + ", ";
		} );
	}

	hashes = hashes.substring( 0, hashes.length - 2 );

	return hashes;
}

function pressedHashExtractor(){
	var pathname = window.location.pathname;

	var hashes = '';

	if( pathname.indexOf("content") > -1 || pathname.indexOf("list") > -1
		|| pathname.indexOf("search") > -1
		|| pathname.indexOf("hash") > -1
		|| pathname.indexOf("category") > -1 )
	{
		$(".hashed-list-item").each( function(){
			hashes += $(this).children("a").text().replace("#", "") + ",";
		} );
	}

	hashes = hashes.substring( 0, hashes.length - 1 );

	return hashes;
}





function shareFacebook( link, redirect_uri ){
    let popupUrl = '';

    let appId = socialInfo.faebookAppId;

    let option = 'sharer';
    let size = 'toolbar=0, status=0, width=626, height=436';

    popupUrl = 'https://www.facebook.com/dialog/feed?app_id=' + appId + 
  				'&display=popup&amp;caption=An%20example%20caption' +  
  				'&link=' + link + 
  				'&redirect_uri=' + redirect_uri;


	window.open( popupUrl, option, size );	
	// window.open( popupUrl );
}

function shareTwitter( title, link, hashes){
  	let popupUrl = "";
    let option = 'sharer';
    let size = 'toolbar=0, status=0, width=626, height=436';

    title = title.replace( "KANGCHANGHO.COM - ", "" );

    popupUrl = 'https://twitter.com/intent/tweet?url=' + link + '&text=' + title + '&hashtags=' + hashes;

    window.open( encodeURI(popupUrl), option, size );
    // window.open( popupUrl, option );
}

function shareLinkedIn( title, link, hashes ){
	let popupUrl = "";
    let option = 'sharer';
    let size = 'toolbar=0, status=0, width=626, height=436';

    popupUrl = 
      'http://www.linkedin.com/shareArticle?mini=true' + 
      '&url=' + link + 
      '&title=' + title + 
      '&summary=' + hashes + 
      '&source=' + link 
    ;

    window.open( popupUrl, option, size );
    // window.open( popupUrl, option );
}









// // ** Facebook

// // let appId = 355672798282806;
// // let popupUrl = "";
// // let option = 'sharer';
// // let size = 'toolbar=0, status=0, width=626, height=436';


// let appId = 355672798282806;
// let popupUrl = "";
// let option = 'sharer';
// let size = 'toolbar=0, status=0, width=626, height=436';

// // let _Url = encodeURIComponent( $("meta[property='og\\:url']").attr("content") );
// // let _Title = encodeURIComponent( $("meta[property='og\\:title']").attr("content") );
// // let _Description = encodeURIComponent( $("meta[property='og\\:description']").attr("content") );
// // let _Image = encodeURIComponent( $("meta[property='og\\:image']").attr("content") );

// // popupUrl = 'https://www.facebook.com/dialog/feed?app_id=' + appId + '&link=' + _Url + '&name=' + _Title + '&caption=' + "Well Formed IT" + '&description=' + _Description + '&picture=' + _Image + '&redirect_uri=' + _Url + '';
// popupUrl = 'https://www.facebook.com/dialog/feed?app_id=' + appId + '&link=' + 'http://localhost:4001' + '&name=' + '제목' + '&description=' + '묘사' + '&redirect_uri=' + "http://localhost:4001" + '';

// // popupUrl = `
// //   https://www.facebook.com/dialog/feed?app_id=` + appId + `
// //   &link=` + _Url + `
// //   &name=` + _Title + `
// //   &caption=` + "Well Formed IT" + `
// //   &description=` + _Description + `
// //   &picture=` + _Image + `
// //   &redirect_uri=` + _Url + `
// // `;

// // popupUrl = `
// //   https://www.facebook.com/sharer/sharer.php?u=` + _Url + `
// // `;

// console.log( popupUrl );

// window.open( popupUrl, option, size );







// ** Twitter

//   let popupUrl = "";
//   let option = 'sharer';
//   let size = 'toolbar=0, status=0, width=626, height=436';

//   popupUrl = "https://twitter.com/share";

//   window.open( popupUrl, option, size );







// // ** Linked In
// let popupUrl = "";
// let option = 'sharer';
// let size = 'toolbar=0, status=0, width=626, height=436';

// // let _Url = encodeURIComponent( $("meta[property='og\\:url']").attr("content") );
// // let _Title = encodeURIComponent( $("meta[property='og\\:title']").attr("content") );
// // let _Description = encodeURIComponent( $("meta[property='og\\:description']").attr("content") );
// // let _Image = encodeURIComponent( $("meta[property='og\\:image']").attr("content") );
// // let _Source = encodeURIComponent( "http://www.wellformedit.com" );

// popupUrl = `
//   http://www.linkedin.com/shareArticle?mini=true` + `
//   &url=` + "http://localhost:4001/category/1" + `
//   &title=` + '제목' + `
//   &summary=` + '묘사' + `
//   &source=` + 'http://localhost:4001' + `
// `;

// // popupUrl = 'http://www.linkedin.com/shareArticle?mini=true' + '&url=' + _Url + '&title=' + _Title + '&summary=' + _Description + '&source=' + _Source;

// window.open( popupUrl, option, size );










// // ** pinterest
// let popupUrl = "";
// let option = 'sharer';
// let size = 'toolbar=0, status=0, width=626, height=436';

// // let _Url = encodeURIComponent( $("meta[property='og\\:url']").attr("content") );
// // let _Title = encodeURIComponent( $("meta[property='og\\:title']").attr("content") );
// // let _Description = encodeURIComponent( $("meta[property='og\\:description']").attr("content") );
// // let _Image = encodeURIComponent( $("meta[property='og\\:image']").attr("content") );
// // let _Source = encodeURIComponent( "http://www.wellformedit.com" );

// // popupUrl = `
// //   https://pinterest.com/pin/create/button/` + `
// //   ?url=` + "http://localhost:4001/category/1" + `
// //   &media=` + "http://localhost:4001/ayhfBHs2lSTnUHJKhL2GmGCttdKBwZSE92jr1xyYpGs2ab9Cui2UOeDykicO9anA_rikyoung.jpg" + `
// //   &description=` + "묘사" + `
// // `;


// popupUrl = `
//   https://pinterest.com/pin/create/button/` + `
//   ?url=` + "http://localhost:4001/category/1" + `
//   &media=` + "http://sports.news.naver.com/kbaseball/news/read.nhn?oid=076&aid=0003224724" + `
//   &description=` + "묘사" + `
// `;

// // popupUrl = `
// //   http://www.linkedin.com/shareArticle?mini=true` + `
// //   &url=` + "http://localhost:4001/category/1" + `
// //   &title=` + '제목' + `
// //   &summary=` + '묘사' + `
// //   &source=` + 'http://localhost:4001' + `
// // `;

// window.open( popupUrl, option, size );








// // ** tumblr
// let popupUrl = "";
// let option = 'sharer';
// let size = 'toolbar=0, status=0, width=626, height=436';

// let _Url = encodeURIComponent( $("meta[property='og\\:url']").attr("content") );
// let _Title = encodeURIComponent( $("meta[property='og\\:title']").attr("content") );
// let _Description = encodeURIComponent( $("meta[property='og\\:description']").attr("content") );
// let _Image = encodeURIComponent( $("meta[property='og\\:image']").attr("content") );
// let _Source = encodeURIComponent( "http://www.wellformedit.com" );

// popupUrl = `
//   http://www.tumblr.com/share/link` + `
//     &url=` + "http://localhost:4001/category/1" + `
//    &name=` + '제목' + `
//    &source=` + 'http://localhost:4001' + `
// `;

// window.open( popupUrl, option, size );





// // ** instagram
// let popupUrl = "";
// let option = 'sharer';
// let size = 'toolbar=0, status=0, width=626, height=436';

// let _Url = encodeURIComponent( $("meta[property='og\\:url']").attr("content") );
// let _Title = encodeURIComponent( $("meta[property='og\\:title']").attr("content") );
// let _Description = encodeURIComponent( $("meta[property='og\\:description']").attr("content") );
// let _Image = encodeURIComponent( $("meta[property='og\\:image']").attr("content") );
// let _Source = encodeURIComponent( "http://www.wellformedit.com" );

// popupUrl = `
//   https://www.linkedin.com/shareArticle?mini=true
//   &url=http://localhost:4001
//   &title=제목
//   &summary=요약
//   &source=http://localhost:4001
// `;

// window.open( popupUrl, option, size );