//window.addEventListener("load", startup);
document.addEventListener("deviceready", startup, false);

function startup() {
//alert("reached bookDetail");

$(".loader").fadeOut(1000);
$('.ui-icon-carat-l').css("background-color", "#333333");

//goback event
if (device.platform == "Android")
{
   // alert("device.platform");
    $( "#getmeback" ).hide();
}

$( "#getmeback" ).click(function() {
    //alert( "Handler for .click() called." );
    if(sessionStorage.getItem("userClick_fromsearch") == "userSaleHistory"){
    window.location = "saleHistory.html";
    }
    if(sessionStorage.getItem("userClick_fromsearch") == "userBuyHistory"){
        window.location = "saleHistory.html";
    }
    if(sessionStorage.getItem("userClick_fromsearch") == "userSearchPage"){
        window.location = "search.html";
    }
  });

//back event


//var final_url = 'http://192.168.0.19:3000/executive/populatebookDetail';

 var clickedId = sessionStorage.getItem("sessionstorage_clickedId");
//alert("from bookdetail -->" + clickedId);
 $.ajax({
     type: "POST",
     url: populatebookDetail_url,
     dataType: "json",
     //timeout: 100000,
     data: JSON.stringify( { "id": clickedId } ),
     contentType: "application/json",
     success: function(data, status){
         
         $.each(data, function(i, item) {
             var imagesrc = item.picture;
             imagesrc = "http://192.168.0.19:3000//images/"+imagesrc;
             
         //$('ul').append('<li><a href="#"><h2>' + item.bookname + '</h2><p>' + item.price + '</p></a><a href="#purchase"></a></li>');
        // $('ul').append('<li><a href="#"><h2>' + item.bookname + '</h2><p>' + item.price + '<li><img src="http://192.168.0.19:3000//images/28c7fa2701bd726000457ac7286ed926" /></li>'  + '</p></a><a href="#purchase"></a></li>');
        // $('ul').append('<li id="'+ item.id + '" class="idForBooklistView" ><a href="#"> <img src="' + imagesrc +  '" width="80px" height="80px" /> <div>' + item.bookname + ' <p>' + item.price +'</p></div></a> <a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album></a></li>');
        console.log("output from bookdetail -->"+ item.bookname);
        var imagesrc = item.picture;
        var imagesrc2 = item.picture2;
        var imagesrc3 = item.picture3;
        //imagesrc = "http://localhost:3000//images/"+imagesrc;
        imagesrc = imagesavelocation_url+imagesrc;
        //imagesrc2 = "http://192.168.0.19:3000//images/"+imagesrc2;
        imagesrc2 = imagesavelocation_url + imagesrc2;
        //imagesrc3 = "http://192.168.0.19:3000//images/"+imagesrc3;
        imagesrc3 = imagesavelocation_url + imagesrc3;
        $( "#bookName" ).html(item.bookname);
        $( "#price" ).html("$ "+item.price);
        $( "#university" ).html(item.uniName);
        $( "#smallImage" ).attr('src', imagesrc);
        $( "#smallImage2" ).attr('src', imagesrc2);
        $( "#smallImage3" ).attr('src', imagesrc3);
        $( "#user_comments").html(item.user_comments);
     });
     
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        //show error message
        navigator.notification.alert(
            server_notconnecting,  // message
            alertDismissed,         // callback
            'Backend Issues',            // title
            'Done'                  // buttonName
        );
       // alert("error is"+ errorThrown);
       // alert(XMLHttpRequest);
    }
    
});
}

function alertDismissed() {
    // do something
}