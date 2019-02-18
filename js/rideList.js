//window.addEventListener("load", startup);
document.addEventListener("deviceready", startup, false);

function startup() {
    
   // $(".ajaxmyloader").fadeOut(1000);
   if(sessionStorage.getItem("usernameId") == ""){
    //  console.log("username is empty");
     // alert("username is empty");
    window.location= "index.html";
   }
   // $(".loader").fadeOut(1000);

    $(document).bind('mobileinit', function () {
        //Loader settings
        $.mobile.loader.prototype.options.text = "Loading..";
        $.mobile.loader.prototype.options.textVisible = true;
        $.mobile.loader.prototype.options.theme = "b";
        $.mobile.loader.prototype.options.textonly = false; 
    }); 
    var interval = setInterval(function(){
        $.mobile.loading('hide');
        clearInterval(interval);
        },1); 

    console.log(moment().startOf('day'));
    $('.ui-icon-power').css("background-color", "#333333");
   $('.ui-icon-home').css("background-color", "#333333");
   $('.ui-icon-refresh').css("background-color", "#333333");

    var postridebutton = $('#postridebutton').click(function() {
        var interval = setInterval(function(){
            $.mobile.loading('show');
            clearInterval(interval);
            },1); 
        window.location = "postRide.html";
    });

    // Logout click
    $('#logmeOut').click (function(){
        sessionStorage.setItem("usernameId",'')
        //alert(sessionStorage.getItem("usernameId"));
        window.location= "index.html";
    });

    $('#home').click (function(){
        //sessionStorage.setItem("usernameId",'')
        //alert(sessionStorage.getItem("usernameId"));
        window.location= "landingpage.html";
    });

    $('#bookrideButton').click (function(){
      // alert("redirecting to bookride");
      
      checkrideStatus();
       // })
       //window.location= "buybook.html";
    });

    $('#rideownerHistory').click (function(){
        //console.log("test");
        //alert("Clicked ridesite");
        sessionStorage.setItem("userClick_forRideHistory",'rideOwnerHistory')
        window.location= "rideHistory.html";
    });

    $('#myrideHistory').click (function(){
        //console.log("test");
        //alert("Clicked ridesite");
        sessionStorage.setItem("userClick_forRideHistory",'riderHistory')
        window.location= "rideHistory.html";
    });


     $('#refresh').click(function(){
        $("#ridelist").empty();
        //alert($('#filterBasic-input').val());
         getrideList($('#filterBasic-input').val());
     });

     //$('#output').on('swipe',function(){alert("swipedown..");} );

     
        

    //alert(sessionStorage.getItem("usernameId"));
    $('.ui-icon-refresh').css("background-color", "#333333");
    $('.ui-icon-home').css("background-color", "#333333");
    $('.ui-icon-delete').css("background-color", "#333333");
    //var final_url = 'http://192.168.0.19:3000/executive/populatesearchbar';
   function getrideList(mysearch){
    //alert(mysearch);
   // $.mobile.loading('show');
    //$(".loader").show();
    var interval = setInterval(function(){
        $.mobile.loading('show');
        clearInterval(interval);
        },1);
    $.ajax({
        type: "POST",
        url: populaterideList_url,
        dataType: "json",
        //timeout: 100000,
        data: JSON.stringify( {  
            "username": sessionStorage.getItem("usernameId"), 
            "searchString":mysearch,
            //"userDate":moment().startOf('day'),
            "userDate":moment(),
            "userTime":moment().format("HH:mm:ss")
        }),
        contentType: "application/json",
        success: function(data, status){
            $.each(data, function(i, item) {
                //var imagesrc = item.picture;
                //imagesrc = "http://192.168.0.19:3000//images/"+imagesrc;
                //imagesrc = imagesavelocation_url+imagesrc;
               // alert( "rides booked are "+item.ridesBooked);
               //console.log("ride local date and time  "+ moment(item.rideDate).utc().local().format('LLLL'));
               console.log("ride local date and time  "+ item.rideDate);
               var available = item.rideSeats - item.ridesBooked;
               //alert (available);
               console.log (new Date(item.rideDate).toString());
               if(item.rideOwner == sessionStorage.getItem("usernameId"))
               {
                   //alert("case 1username is found"+item.rideOwner +item.ridesBooked);   
                   $('ul').append('<li data-id="'+ item.rideId + '" class="idForBooklistView" ><a href="#" class="rideDetail">  <p class="wrap" style="color:#FF5733;font-size:12px;font-weight:bold;">  ' + item.rideId +': ' + item.rideFrom + ' to ' + item.rideTo +'<br>Date /Time  :' + moment(item.rideDate).format('llll')  +'<br>$ ' + item.ridePrice + ' per seat ,'+ ' Booked : ' + item.ridesBooked +'  , Available : ' + available
                   +'</p></a> <a href="#purchase" class="bookRide" style="background:#333333;" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album></a></li>');
                   //other color could be #d78f3c
               }else{
                       $('ul').append('<li data-id="'+ item.rideId + '" class="idForBooklistView" ><a href="#" class="rideDetail">  <p class="wrap" style="color:black;font-size:12px;font-weight:bold;"> ' + item.rideId +': ' + item.rideFrom + ' to ' + item.rideTo +'<br>Date /Time  :' + moment(item.rideDate).format('llll')  +'<br>$ ' + item.ridePrice + ' per seat '+ ' Booked : ' + item.ridesBooked +'  , Available : ' + available
                       +'</p></a> <a href="#purchase" class="bookRide" style="background:#333333;" data-rel="popup" data-position-to="window" data-transition="pop">Purchase Ride></a></li>');
               };  
            

        
        });
             
            $('#ridelist').listview("refresh");
            //$("#thelist").empty().append(allItems).listview("refresh").enhanceWithin();
           // $.mobile.loading('hide');
            //$(".loader").fadeOut(500);
            var interval = setInterval(function(){
                $.mobile.loading('hide');
                clearInterval(interval);
                },1);
            
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //show error message
            navigator.notification.alert(
                'Not able to update book list. Please try again',  // message
                alertDismissed,         // callback
                'Backend Issues',            // title
                'Done'                  // buttonName
            );
            //alert("Not able to update book list");
            //alert("error is"+ errorThrown);
            //alert(XMLHttpRequest);
            //$.mobile.loading('hide');
            //$(".loader").fadeOut(500);
            var interval = setInterval(function(){
                $.mobile.loading('hide');
                clearInterval(interval);
                },1);
            
        }
        
    });
}
        getrideList("");

    //below code will re-direct to another page when clicked and also will identify the id so that while shping detail page , you can refer correct details data
    /*
    $('#output').delegate('li', 'click', function() {
        var clickedId = $(this).attr("id");
       // alert(clickedId);
        //re-direct to detail page and store to sessionstorage
        sessionStorage.setItem("sessionstorage_clickedId", clickedId);
       // alert(sessionStorage.getItem("sessionstorage_clickedId"));
        window.location = "bookDetail.html";
    });
    */
    $(document).on("click", ".rideDetail", function () {
        //alert("Approve in idForBooklistView")
        //var clickedId = $(this).attr("id");
        var clickedId = $(this).parents("li").data('id');
       //alert(clickedId);
        //re-direct to detail page and store to sessionstorage
        sessionStorage.setItem("sessionstorage_clickedId", clickedId);
       // alert(sessionStorage.getItem("sessionstorage_clickedId"));
       sessionStorage.setItem("userClick_fromsearch",'userSearchPage') 
       //window.location = "rideDetail.html";
    });

    $(document).on("click", ".bookRide", function () {
       //alert("Delete " + $(this).parents("li").data("id"))
       sessionStorage.setItem("selectedRidetobook", $(this).parents("li").data("id"));
       
       //alert(sessionStorage.getItem("selectedBookIdforPurchase"));
    });

    //end "detail page re-dierction"

}



function redirect_to_postbook() {
    window.location = "postbook.html";
}

function alertDismissed() {
    // do something
}

function checkrideStatus(){
    rideId = sessionStorage.getItem("selectedRidetobook");
    //alert(bookId);
    var check_availability;
    var interval = setInterval(function(){
        $.mobile.loading('show');
        clearInterval(interval);
        },10); 
    $.ajax({
        type: "POST",
        url: checkrideStatus_url,
        dataType: "json",
        //timeout: 100000,
        data: JSON.stringify( {  "rideId": rideId }),
        contentType: "application/json",
        success: function(data, status){
            $.each(data, function(i, item) {
                
               if(item.rideStatus == '') {
               // alert("should return  available");
                check_availability ='Y';
                //return "not available";
                
               }else{
              // alert("should return NOT available");
                check_availability = 'N';
                //return "available";
               }  
                   
           });
           if(check_availability == 'Y') 
               {
                window.location= "bookRide.html";
                
               }else{
                navigator.notification.alert(
                    'It seems that Ride has been just sold or cancelled',  // message
                    alertDismissed,         // callback
                    'Ride not available',            // title
                    'Done'                  // buttonName
                );
                window.location ="rideList.html";
               }
            
        },
    
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //show error message
            console.log(textStatus);
            navigator.notification.alert(
                'Not able to get the status of Ride list. Please try again',  // message
                alertDismissed,         // callback
                'Backend Issues',            // title
                'Done'                  // buttonName
            );
            var interval = setInterval(function(){
                $.mobile.loading('show');
                clearInterval(interval);
                },1); 
           // return "not available";
            
        }
    });
    
    
}









