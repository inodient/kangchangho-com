$(document).ready(function() {

  var writeMode = "";

  /************************************************************************************************************/
  // INSERT - START
  writeMode = "insert";

  // 00. Editor Setting , Editor Image Upload ajaxSetting
  $('#editor-content-ko').summernote( {height: "450px",
    callbacks : {
      onImageUpload: function( files, editor, welEditable ){
        editorImageUpload( files, editor, welEditable, "editor-content-ko" );
      }
    }
  } );
  $('#editor-content-en').summernote( {height: "450px",
    callbacks : {
      onImageUpload: function( files, editor, welEditable ){
        editorImageUpload( files, editor, welEditable, "editor-content-en" );
      }
    }
  } );

  $('#editor-comment-ko').summernote( {height: "300px",
    callbacks : {
      onImageUpload: function( files, editor, welEditable ){
        editorImageUpload( files, editor, welEditable, "editor-comment-ko" );
      }
    }
  } );
  $('#editor-comment-en').summernote( {height: "300px",
    callbacks : {
      onImageUpload: function( files, editor, welEditable ){
        editorImageUpload( files, editor, welEditable, "editor-comment-en" );
      }
    }
  } );

  function editorImageUpload( files, editor, welEditable, editorName ){
    // Only 1 file allowed to upload
    var data = new FormData();
    data.append( "file", files[0] );

    imageUploadAjax( data )
    .then( function( results ){
      alert( results ); // show response from the php script.
      $('#' + editorName).summernote( "insertImage", "/" + results, "/" + results );

    } )
    .catch( function( err ){
      throw err;
    } );
  }


  // 01. write type
  var writeType = "";

  changeWriteType( $('input:radio[name="write-type"]:checked').val() );

  $("input[type='radio'][name='write-type']").change( function(){
    changeWriteType( $(this).val() );
  } );

  function changeWriteType( type ){
    if( type === "announce" ){
      $(".for-content").css( "display", "none" );
      $(".for-newsletter").css( "display", "none" );
      $(".for-announce").css( "display", "block" );
    } else if( type === "content" ){
      $(".for-announce").css( "display", "none" );
      $(".for-newsletter").css( "display", "none" );
      $(".for-content").css( "display", "block" );
    } else if( type === "newsletter" ){
      $(".for-announce").css( "display", "none" );
      $(".for-content").css( "display", "none" );
      $(".for-newsletter").css( "display", "block" );
    }

    writeType = type;
  }

  // 02. sub properties - category, writer, list, search-type
  $("#btn_add_category").on( "click", function(){
    var parent_id = $("#selected_category_modal option:selected").val();
    var category_en = $("#id_input_add_category_en").val();
    var category_ko = $("#id_input_add_category_ko").val();
    var category_href = $("#id_input_add_category_href").val();

    var parameter = {};
    parameter.parent_id = parent_id;
    parameter.category_en = category_en;
    parameter.category_ko = category_ko;
    parameter.category_href = category_href;

    $.ajax( {
      data: parameter,
      type: "POST",
      url: "/addcategory",

      success: function(){
        var results = arguments[0];

        $("#selected_category").append( $("<option>", {
          value: results.lastId,
          text: category_en + " | " + category_ko
        } ) );

        $("#selected_category").val( results.lastId );

        $("#add_category_modal").modal("hide");
      }
    } );
  } );

  $("#btn_add_writer").on( "click", function(){
    var writer_en = $("#id_input_add_writer_en").val();
    var writer_ko = $("#id_input_add_writer_ko").val();
    var email = $("#id_input_add_writer_email").val();
    var description_en = $("#id_input_add_writer_description_en").val();
    var description_ko = $("#id_input_add_writer_description_ko").val();

    var parameter = {};
    parameter.writer_en = writer_en;
    parameter.writer_ko = writer_ko;
    parameter.email = email;
    parameter.description_en = description_en;
    parameter.description_ko = description_ko;

    $.ajax( {
      data: parameter,
      type: "POST",
      url: "/addwriter",

      success: function(){
        var results = arguments[0];

        $("#selected_writer").append( $("<option>", {
          value: results.lastId,
          text: writer_en + " | " + writer_ko
        } ) );

        $("#selected_writer").val( results.lastId );

        $("#add_writer_modal").modal("hide");
      }
    } );
  } );

  $("#selected_content_modal").change( function(){
    $("#span_id").text( $("#selected_content_modal option:selected").val() );
    $("#span_title_ko").text( $("#selected_content_modal option:selected").data( "title-ko" ) );
    $("#span_title_en").text( $("#selected_content_modal option:selected").data( "title-en" ) );
    $("#span_category_id").text( $("#selected_content_modal option:selected").data( "category-id" ) );
    $("#span_category_ko").text( $("#selected_content_modal option:selected").data( "category-ko" ) );
    $("#span_category_en").text( $("#selected_content_modal option:selected").data( "category-en" ) );
    $("#span_hashes").text( $("#selected_content_modal option:selected").data( "hashes" ) );
    $("#span_create_date").text( $("#selected_content_modal option:selected").data( "create-date" ) );
    $("#selected_content_image_carousel").css( "width", "100%" );
    $("#selected_content_image_carousel").attr( "src", "/" + $("#selected_content_modal option:selected").data( "savedfilename" ) );
  } );

  $("#btn_add_content").on( "click", function(){
    $("#table_add_content tbody").append(
      $("<tr>").append(
        $("<td id='content_id'>").text( $("#selected_content_modal option:selected").val() )
      )
      .append(
        $("<td>").append(
          $("<span>").append( $("#selected_content_modal option:selected").data( "title-ko" ) )
          .append( "<br>" )
          .append( $("#selected_content_modal option:selected").data( "title-en" ) )
        )
      )
      .append(
        $("<td id='category_id'>").text( $("#selected_content_modal option:selected").data( "category-id" ) )
      )
      .append(
        $("<td>").append(
          $("<span>").append( $("#selected_content_modal option:selected").data( "category-ko" ) )
          .append( "<br>" )
          .append( $("#selected_content_modal option:selected").data( "category-en" ) )
        )
      )
      .append(
        $("<td>").text( $("#selected_content_modal option:selected").data( "create-date" ) )
      )
    );

    deleteRowEventHandler();
  } );


  $("#selected_announce_modal").change( function(){
    $("#span_announce_id").text( $("#selected_announce_modal option:selected").val() );
    $("#span_announce_title_ko").text( $("#selected_announce_modal option:selected").data( "title-ko" ) );
    $("#span_announce_title_en").text( $("#selected_announce_modal option:selected").data( "title-en" ) );
    $("#span_announce_category_id").text( $("#selected_announce_modal option:selected").data( "category-id" ) );
    $("#span_announce_category_ko").text( $("#selected_announce_modal option:selected").data( "category-ko" ) );
    $("#span_announce_category_en").text( $("#selected_announce_modal option:selected").data( "category-en" ) );
    $("#span_announce_create_date").text( $("#selected_announce_modal option:selected").data( "create-date" ) );
    $("#selected_announce_image_carousel").css( "width", "100%" );
    $("#selected_announce_image_carousel").attr( "src", $("#selected_announce_modal option:selected").data( "savedfilename" ) );
  } );

  $("#btn_add_announce").on( "click", function(){
    $("#table_add_announce tbody").append(
      $("<tr>").append(
        $("<td id='content_id'>").text( $("#selected_announce_modal option:selected").val() )
      )
      .append(
        $("<td>").append(
          $("<span>").append( $("#selected_announce_modal option:selected").data( "title-ko" ) )
          .append( "<br>" )
          .append( $("#selected_announce_modal option:selected").data( "title-en" ) )
        )
      )
      .append(
        $("<td id='category_id'>").text( $("#selected_announce_modal option:selected").data( "category-id" ) )
      )
      .append(
        $("<td>").append(
          $("<span>").append( $("#selected_announce_modal option:selected").data( "category-ko" ) )
          .append( "<br>" )
          .append( $("#selected_announce_modal option:selected").data( "category-en" ) )
        )
      )
      .append(
        $("<td>").text( $("#selected_announce_modal option:selected").data( "create-date" ) )
      )
    );

    deleteRowEventHandler();
  } );


  deleteRowEventHandler();
  // delete row event
  function deleteRowEventHandler(){
    $("#table_add_content tbody tr, #table_add_announce tr").on( "click", function(){
      if( confirm( "Are you sure removing this content?" ) ){
        $(this).remove();
        return false;
      } else {
        return;
      }
    } );
  }



  $("#btn_add_search_condition").on( "click", function(){
    $("#table_add_search_condition tbody").append(
      $("<tr>").append(
        $("<td id='announce_category_id'>").append( $("#selected_search_condition_modal option:selected").val() )
      ).append(
        $("<td>").append( $("#selected_search_condition_modal option:selected").text() )
      ).append(
        $("<td id='announce_search_condition'>").append( $("#id_input_add_search_condition").val() )
      ).append(
        $("<td id='announce_search_text'>").append( $("#id_input_add_search_text").val() )
      )
    )
  } );



  // 03. image saver
  $(document).on('change', ':file', function() {
    var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');

    input.trigger('fileselect', [numFiles, label]);
  });

  $(':file').on('fileselect', function(event, numFiles, label) {

    var input = $(this).parents('.input-group').find(':text'),
        log = numFiles > 1 ? numFiles + ' files selected' : label;

    if( input.length ) {
        input.val(log);

        if( $(this).parent().attr( "id" ).indexOf( "main" ) > -1 ){
          mainImageFormSubmit();
        } else if( $(this).parent().attr( "id" ).indexOf( "carousel" ) > -1 ){
          carouselImageFormSubmit();
        }
    } else {
        if( log ) alert(log);
    }
  });

  function mainImageFormSubmit(){
    var data = new FormData();
    jQuery.each(jQuery("#id_save_main_image input[type=file]")[0].files, function(i, file) {
      data.append('file-'+i, file);
    });

    imageUploadAjax( data )
    .then( function( results ){
      alert( results );
      $("#id_temp_main_image").attr( "src", "/" + results );
      $("#id_temp_main_image_name").val( results );
    } )
    .catch( function( err ){
      throw err;
    } );
  }

  function carouselImageFormSubmit(){
    var data = new FormData();
    jQuery.each(jQuery("#id_save_carousel_image input[type=file]")[0].files, function(i, file) {
      data.append('file-'+i, file);
    });

    imageUploadAjax( data )
    .then( function( results ){
      alert( results );
      $("#id_temp_carousel_image").attr( "src", "/" + results );
      $("#id_temp_carousel_image_name").val( results );
    } )
    .catch( function( err ){
      throw err;
    } );
  }

  function imageUploadAjax( data ){
    return new Promise( function(resolve, reject){
      var opts = {
        type: "POST",
        url: "/uploadimage",
        data: data,

        cache: false,
        contentType: false,
        processData: false,

        success: function( data )
        {
          resolve(data.savedFileName); // show response from the php script.
        }
      }

      if( data.fake ){
        opts.xhr = function() { var xhr = jQuery.ajaxSettings.xhr(); xhr.send = xhr.sendAsBinary; return xhr; }
        opts.contentType = "multipart/form-data; boundary="+data.boundary;
        opts.data = data.toString();
      }

      $.ajax( opts );
    } );
  }


  // 04. extract doc docData
  function extractData(){
    return new Promise( function(resolve, reject){
      if( writeType === "announce" ){
        extractAnnounceData()
        .then( function( docData ){
          resolve( docData );
        } )
        .catch( function(err){
          reject( err );
        } );
      } else if( writeType === "content" ){
        extractWriteContentData()
        .then( function( docData ){
          resolve( docData );
        } )
        .catch( function(err){
          reject( err );
        } );
      } else if( writeType === "newsletter" ){
        extractWriteNewsLetterData()
        .then( function( docData ){
          resolve( docData );
        } )
        .catch( function(err){
          reject( err );
        } );
      }
    } );
  }

  function extractAnnounceData(){

    return new Promise( function(resolve, reject){
      var docData = {};

      var image_carousel = $("#id_temp_carousel_image_name").val();
      image_carousel = $("#id_temp_carousel_image_name").val() == "" ? "default_horizontal.png" : $("#id_temp_carousel_image_name").val()

      var sel_category = $("#selected_category option:selected").val();
      var sel_writer = $("#selected_writer option:selected").val();

      var sel_category_text = $("#selected_category option:selected").text();
      var sel_writer_text = $("#selected_writer option:selected").text();

      var sel_writer_description_en = $("#selected_writer option:selected").data( "description-en");
      var sel_writer_description_ko = $("#selected_writer option:selected").data( "description-ko" );

      var title_ko = $("#id_title_ko").val();
      var title_en = $("#id_title_en").val();

      var announceType = $("#selected_announce_type option:selected").val();

      var _announceContentList = $("#table_add_content tbody tr #content_id");
      var _announceContentCategoryList = $("#table_add_content tbody tr #category_id");

      var announceContentList = [];
      var announceContentCategoryList = [];

      $(_announceContentList).each( function(){
        announceContentList.push( $(this).text() );
      } );

      $(_announceContentCategoryList).each( function(){
        announceContentCategoryList.push( $(this).text() );
      } );

      var _announceCategoryList = $("#table_add_search_condition tbody tr #announce_category_id");
      var _announceCategoryCondition = $("#table_add_search_condition tbody tr #announce_search_condition");
      var _announceCategoryText = $("#table_add_search_condition tbody tr #announce_search_text");

      var announceCategoryList = [];
      var announceCategoryCondition = [];
      var announceCategoryText = [];

      $(_announceCategoryList).each( function(){
        announceCategoryList.push( $(this).text() );
      } );

      $(_announceCategoryCondition).each( function(){
        announceCategoryCondition.push( $(this).text() );
      } );

      $(_announceCategoryText).each( function(){
        announceCategoryText.push( $(this).text() );
      } );


      docData.sel_category = sel_category;
      docData.sel_writer = sel_writer;
      docData.sel_category_text = sel_category_text;
      docData.sel_writer_text = sel_writer_text;
      docData.sel_writer_description_en = sel_writer_description_en;
      docData.sel_writer_description_ko = sel_writer_description_ko;
      docData.title_ko = title_ko;
      docData.title_en = title_en;
      docData.image_carousel = image_carousel;
      docData.announceType = announceType;
      docData.announceContentList = announceContentList;
      docData.announceContentCategoryList = announceContentCategoryList;
      docData.announceCategoryList = announceCategoryList;
      docData.announceCategoryCondition = announceCategoryCondition;
      docData.announceCategoryText = announceCategoryText;

      resolve( docData );
    } );
  }

  function extractWriteContentData(){

    return new Promise( function(resolve, reject){
      var docData = {};

      var sel_category = $("#selected_category option:selected").val();
      var sel_writer = $("#selected_writer option:selected").val();

      var sel_category_text = $("#selected_category option:selected").text();
      var sel_writer_text = $("#selected_writer option:selected").text();

      var sel_writer_description_en = $("#selected_writer option:selected").data( "description-en");
      var sel_writer_description_ko = $("#selected_writer option:selected").data( "description-ko" );

      var title_ko = $("#id_title_ko").val();
      var title_en = $("#id_title_en").val();

      var image_main = $("#id_temp_main_image_name").val();
      image_main = $("#id_temp_main_image_name").val() == "" ? "default_vertical.png" : $("#id_temp_main_image_name").val();

      var image_carousel = $("#id_temp_carousel_image_name").val();
      image_carousel = $("#id_temp_carousel_image_name").val() == "" ? "default_horizontal.png" : $("#id_temp_carousel_image_name").val()

      var content_ko =  $("#editor-content-ko" ).summernote( "code" );
      var content_en =  $("#editor-content-en" ).summernote( "code" );

      var comment_ko =  $("#editor-comment-ko" ).summernote( "code" );
      var comment_en =  $("#editor-comment-en" ).summernote( "code" );

      var hashes = $("#id_hashes").val();
      var hashesList = extractHashes( hashes );




      docData.sel_category = sel_category;
      docData.sel_writer = sel_writer;
      docData.sel_category_text = sel_category_text;
      docData.sel_writer_text = sel_writer_text;
      docData.sel_writer_description_en = sel_writer_description_en;
      docData.sel_writer_description_ko = sel_writer_description_ko;
      docData.title_ko = title_ko;
      docData.title_en = title_en;
      docData.image_main = image_main;
      docData.image_carousel = image_carousel;
      docData.content_ko = content_ko;
      docData.content_en = content_en;
      docData.comment_ko = comment_ko;
      docData.comment_en = comment_en;
      docData.hashes = hashes;
      docData.hashesList = hashesList;

      resolve( docData );
    } );
  }

  function extractWriteNewsLetterData(){

    return new Promise( function(resolve, reject){
      var docData = {};

      var image_main = $("#id_temp_main_image_name").val();
      image_main = $("#id_temp_main_image_name").val() == "" ? "default_vertical.png" : $("#id_temp_main_image_name").val();

      var sel_writer = $("#selected_writer option:selected").val();
      var sel_writer_text = $("#selected_writer option:selected").text();

      var sel_writer_description_en = $("#selected_writer option:selected").data( "description-en");
      var sel_writer_description_ko = $("#selected_writer option:selected").data( "description-ko" );

      var title_ko = $("#id_title_ko").val();
      var title_en = $("#id_title_en").val();

      var _announceContentList = $("#table_add_content tbody tr #content_id");
      var _announceContentCategoryList = $("#table_add_content tbody tr #category_id");

      var announceContentList = [];
      var announceContentCategoryList = [];

      $(_announceContentList).each( function(){
        announceContentList.push( $(this).text() );
      } );

      $(_announceContentCategoryList).each( function(){
        announceContentCategoryList.push( $(this).text() );
      } );

      var _newsletterAnnounceList = $("#table_add_announce tbody tr #content_id");
      var _newsletterAnnounceCategoryList = $("#table_add_announce tbody tr #category_id");

      var newsletterAnnounceList = [];
      var newsletterAnnounceCategoryList = [];

      $(_newsletterAnnounceList).each( function(){
        newsletterAnnounceList.push( $(this).text() );
      } );

      $(_newsletterAnnounceCategoryList).each( function(){
        newsletterAnnounceCategoryList.push( $(this).text() );
      } );



      var content_ko =  $("#editor-content-ko" ).summernote( "code" );
      var content_en =  $("#editor-content-en" ).summernote( "code" );

      docData.image_main = image_main;
      docData.sel_writer = sel_writer;
      docData.sel_writer_text = sel_writer_text;
      docData.sel_writer_description_en = sel_writer_description_en;
      docData.sel_writer_description_ko = sel_writer_description_ko;
      docData.title_ko = title_ko;
      docData.title_en = title_en;
      docData.announceContentList = announceContentList;
      docData.announceContentCategoryList = announceContentCategoryList;
      docData.newsletterAnnounceList = newsletterAnnounceList;
      docData.newsletterAnnounceCategoryList = newsletterAnnounceCategoryList;
      docData.content_ko = content_ko;
      docData.content_en = content_en;

      resolve( docData );
    } );
  }

  function extractHashes( hashes ){
    var hashesList = hashes.split( "," );

    $(hashesList).each( function(i, item){
      hashesList[i] = $.trim( item );
    } );

    return hashesList;
  }


  // 05. preview
  $("#btn_preview").on( "click", function(){
    if( writeType === "content" ){
      extractData()
      .then( function(docData){
        setContentPreview( docData );
        $("#preview_content_modal").modal();
      } )
      .catch( function(err){
        alert( err );
      } );
    } else if( writeType === "announce" ){
      extractData()
      .then( function( docData ){
        setAnnouncePreview( docData )
        .then( function(){
          $("#preview_announce_modal").modal();

          $("#preview_announce_modal").on( "shown.bs.modal", function(){
            $(".inner-announce figcaption").each( function(){
              $(this).css( "height", parseInt( $(this).siblings("img").css("height").replace("px") ) + 2 );
            } );
          } );
        } );
      } )
      .catch( function(err){
        alert( err );
      } );
    } else if( writeType === "newsletter" ){
      extractData()
      .then( function( docData ){
        setNewsLetterPreview( docData );
        $("#preview_newsletter_modal").modal();
      } )
      .catch( function(err){
        alert( err );
      } );
    }
  } );

  function setAnnouncePreview( docData ){
    return new Promise( function(resolve, reject){
      $("#preview_carousel_image").attr( "src", "/" + docData.image_carousel );
      $("#preview_announce_title_ko").text( docData.title_ko );
      $("#preview_announce_title_en").text( docData.title_en );
      $("#preview_announce_category_ko").text( docData.sel_category_text );
      $("#preview_announce_category_en").text( docData.sel_category_text );

      resolve( {} );
    } );
  }

  function setContentPreview( docData ){
    var content = docData.content_ko + "<hr>" + docData.content_en;
    var comment = docData.comment_ko + "<hr>" + docData.comment_en;

    $("#preview_title").text( docData.title_en + " | " + docData.title_ko );
    $("#preview_content").html( content );
    $("#preview_comment").html( comment );
    $("#preview_writer").text( docData.sel_writer_text );
    $("#preview_category").text( docData.sel_category_text );
    $("#preview_writer_description").text( docData.sel_writer_description_en + " | " + docData.sel_writer_description_ko );
    $("#preview_date").text( (( (new Date()).toISOString() ).split("T"))[0] );
    $("#preview_main_image").attr( "src", "/" + docData.image_main );
    $("#preview_carousel_image").attr( "src", "/" + docData.image_carousel );

    setPreviewHashes( docData.hashesList );
  }

  function setNewsLetterPreview( docData ){
    var content = docData.content_ko + "<hr>" + docData.content_en;

    $("#preview_newsletter_title").text( docData.title_en + " | " + docData.title_ko );
    $("#preview_newsletter_content").html( content );
    $("#preview_newsletter_writer").text( docData.sel_writer_text );
    $("#preview_newsletter_writer_description").text( docData.sel_writer_description_en + " | " + docData.sel_writer_description_ko );
    $("#preview_newsletter_date").text( (( (new Date()).toISOString() ).split("T"))[0] );
    $("#preview_newsletter_main_image").attr( "src", "/" + docData.image_main );
  }

  function setPreviewHashes( hashesList ){
    var index = 0;

    for( var i=0; i<hashesList.length; i++ ){
      if( i % 5 == 0 ){
        index = i * 5;

        $("#preview_hashed_list").append(
          $("<ul>").attr( "id", index ).attr( "class", "hashed-list" ).append(
            $('<li>').attr("class", "hashed-list-item").append(
              $('<a>').attr('href','/').attr("class","content-anchor-reverse").append( "#" + $.trim(hashesList[i]) )
            )
          )
        );
      } else {
        $("#" + index).append(
          $('<li>').attr("class", "hashed-list-item").append(
            $('<a>').attr('href','/').attr("class","content-anchor-reverse").append( "#" + $.trim(hashesList[i]) )
        ) );
      }
    }
  }

  // 06. save
  $("#btn_save").on( "click", function(){

    extractData()
    .then( function(docData){
      save( docData );
    } )
    .catch( function(err){
    } );

  } );

  function save( docData ){
    if( writeType === "content" ){
      saveContent( docData );
    } else if( writeType === "announce" ){
      saveAnnounce( docData );
    } else if( writeType === "newsletter" ){
      saveNewsLetter( docData );
    }
  }

  function saveContent( docData ){

    extractWriteContentData()
    .then( function( docData ){
      docData.writeMode = writeMode;
      docData.modifyId = modifyId;

      $.ajax( {
        data: docData,
        type: "POST",
        url: "/uploadcontent",

        success: function()
        {
          var results = arguments[0]

          // about
          if( results.contentId === "-1" ){
            alert( "success save about" + results.contentId );
            $(location).attr( "href", "/about" );
          } else {
            alert( "success " + results.contentId ); // show response from the php script.
            $(location).attr( "href", "/content/" + results.contentId );
          }
        }
      } );

    } )
    .catch( function(err){
      alert( err );
    } );

  }

  function saveAnnounce( docData ){

    extractAnnounceData()
    .then( function( docData ){
      docData.writeMode = writeMode;
      docData.modifyId = modifyId;

      $.ajax( {
        data: docData,
        type: "POST",
        url: "/uploadannounce",

        success: function()
        {
          var announceId = arguments[0].announceId;
          alert( "success " + announceId ); // show response from the php script.
          $(location).attr( "href", "/announce/" + announceId );
        }
      } );

    } )
    .catch( function(err){
      alert( err );
    } );
  }

  function saveNewsLetter( docData ){

    extractWriteNewsLetterData()
    .then( function( docData ){
      docData.writeMode = writeMode;
      docData.modifyId = modifyId;

      $.ajax( {
        data: docData,
        type: "POST",
        url: "/uploadnewsletter",

        success: function()
        {
          var newsLetterId = arguments[0].newsLetterId;
          alert( "success " + newsLetterId ); // show response from the php script.
          $(location).attr( "href", "/newsletter/" + newsLetterId );
        }
      } );

    } )
    .catch( function(err){
      alert( err );
    } );
  }


  // 07. exit
  $('#add_category_modal').on('hidden.bs.modal', function(){
    $('#id_input_add_category_en').val( "" );
    $('#id_input_add_category_ko').val( "" );
  } );

  $('#add_writer_modal').on('hidden.bs.modal', function(){
    $('#id_input_add_writer_en').val( "" );
    $('#id_input_add_writer_ko').val( "" );
    $('#id_input_add_writer_email').val( "" );
    $('#id_input_add_writer_description_en').val( "" );
    $('#id_input_add_writer_description_ko').val( "" );
  } );

  $('#preview_modal').on('hidden.bs.modal', function(){
    $('#preview_hashed_list').empty();
  } );
  // INSERT - END
  /************************************************************************************************************/








  /************************************************************************************************************/
  // MODIFY - START
  var url = $(location).attr( "href" );
  var modifyMode = "";
  var modifyId = "";

  if( url.indexOf( "/modify" ) > -1 ){

    writeMode = "modify";

    if( url.indexOf( "/content" ) > -1 ){
      modifyMode = "content";
      modifyId = url.split( "/content/" )[1];
    } else if( url.indexOf( "/announce" ) > -1 ){
      modifyMode = "announce";
      modifyId = url.split( "/announce/" )[1];
    } else if( url.indexOf( "/newsletter" ) > -1 ){
      modifyMode = "newsletter";
      modifyId = url.split( "/newsletter/" )[1];
    }
  }

  // 1. SET TYPE
  if( writeMode === "modify" && modifyMode === "content" ){
    $('input:radio[name="write-type"][value=content]').prop( "checked", true );
    $('input:radio[name="write-type"]').attr( "disabled", true );
  } else if( writeMode === "modify" && modifyMode === "announce" ){
    $('input:radio[name="write-type"][value=announce]').prop( "checked", true );
    $('input:radio[name="write-type"]').attr( "disabled", true );
  } else if( writeMode === "modify" && modifyMode === "newsletter" ){
     $('input:radio[name="write-type"][value=newsletter]').prop( "checked", true );
     $('input:radio[name="write-type"]').attr( "disabled", true );
   }
  changeWriteType( $('input:radio[name="write-type"]:checked').val() );

  // 2. SET IMAGES

  // 3. SET CATEGORY, WRITER

  // 4. SET TITLE (ko, en)

  // 5-1. if CONTENT : SET CONTENT

  // 5-2. if CONTENT : SET COMMENT

  // 5-3. if CONTENT : HASHES

  // 6-1. if ANNOUNCE : ANNOUNCE TYPE

  // 6-2. if ANNOUNCE : ANNOUNCE CONTENTS



  // MODIFY - END
  /************************************************************************************************************/
});
