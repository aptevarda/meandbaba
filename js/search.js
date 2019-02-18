//window.addEventListener("load", startup);
document.addEventListener("deviceready", startup, false);

function startup() {
    //console.log(device.platform);
   // alert("rerached search");
  //$(".loader").fadeOut(1000);

  $(document).bind('mobileinit', function () {
    //Loader settings
    $.mobile.loader.prototype.options.text = "Loading..";
    $.mobile.loader.prototype.options.textVisible = false;
    $.mobile.loader.prototype.options.theme = "a";
    $.mobile.loader.prototype.options.textonly = ""; 
}); 

var interval = setInterval(function(){
    $.mobile.loading('hide');
    clearInterval(interval);
    },1); 

  if(sessionStorage.getItem("usernameId") == ""){
    //  console.log("username is empty");
     // alert("username is empty");
    window.location= "index.html";
   }

    var sellbookbutton = $('#sellbookbutton').click(function() {
        var interval = setInterval(function(){
            $.mobile.loading('show');
            clearInterval(interval);
            },1); 
        redirect_to_postbook();
    });

    $('.ui-icon-home').css("background-color", "#333333");
    $('.ui-icon-power').css("background-color", "#333333");
    // $('.ui-icon-search').css("background-color", "#333333");
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

    $('#buyButton').click (function(){
       // alert("redirecting to buybook");
       /*
       var interval = setInterval(function(){
        $.mobile.loading('show',{
            text: 'foo',
            textVisible: true,
            theme: 'z',
            html: "<span class='ui-bar ui-overlay-c ui-corner-all'><img src='./css/5.gif' /><h2>loading</h2></span>"
          });
    
        clearInterval(interval);
        },1); 
        */
       
      checkbookStatus();
       // })
       //window.location= "buybook.html";
    });

    $('#saleHistorybutton').click (function(){
        //alert("redirecting to Books sold");
        sessionStorage.setItem("userClick_fromsearch",'userSaleHistory')
         window.location= "saleHistory.html";
     });

     $('#purchasedBooksbutton').click (function(){
         //alert("redirecting to Books Bought");
         sessionStorage.setItem("userClick_fromsearch",'userBuyHistory')
         window.location= "saleHistory.html";
     });

     $('#refresh').click(function(){
        $("#output").empty();
        //alert($('#filterBasic-input').val());
         getbookList($('#filterBasic-input').val());
     });

     //$('#output').on('swipe',function(){alert("swipedown..");} );

     $('#output').on('swipedown',function(){
        // alert("swipedown..");
        window.location = "search.html";
        
        } );
      
    $('#output').on('swipeup',function(){
        //alert("swipeup..");
       // window.location = "search.html";
        } );
        

    //alert(sessionStorage.getItem("usernameId"));
       // $('.ui-icon-refresh').css("background-color", "red");
        $('.ui-icon-refresh').css("background-color", "#333333");
         $('.ui-icon-home').css("background-color", "#333333");
        $('.ui-icon-delete').css("background-color", "#333333");
    //var final_url = 'http://192.168.0.19:3000/executive/populatesearchbar';
   function getbookList(mysearch){
    //alert(mysearch);   
    //$.mobile.loading('show');
    var interval = setInterval(function(){
        $.mobile.loading('show');
        clearInterval(interval);
    },1);

    $.ajax({
        type: "POST",
        url: populatesearchbar_url,
        dataType: "json",
        //timeout: 100000,
        data: JSON.stringify( {  
            "username": sessionStorage.getItem("usernameId"),
            "searchString":mysearch
        
        }),
        contentType: "application/json",
        success: function(data, status){
            $.each(data, function(i, item) {
                var imagesrc = item.picture;
                //imagesrc = "http://192.168.0.19:3000//images/"+imagesrc;
                imagesrc = imagesavelocation_url+imagesrc;
            if(item.username == sessionStorage.getItem("usernameId"))
            {
               // alert("username is found"+item.username);
            
                
            //$('ul').append('<li><a href="#"><h2>' + item.bookname + '</h2><p>' + item.price + '</p></a><a href="#purchase"></a></li>');
           // $('ul').append('<li><a href="#"><h2>' + item.bookname + '</h2><p>' + item.price + '<li><img src="http://192.168.0.19:3000//images/28c7fa2701bd726000457ac7286ed926" /></li>'  + '</p></a><a href="#purchase"></a></li>');
                //$('ul').append('<li id="'+ item.id + '" class="idForBooklistView" ><a href="#"> <img src="' + imagesrc +  '" width="70px" height="70px" /> <div>' + item.bookname + ' <p>' + item.price +'</p></div></a> <a href="#purchase" class="buyItem" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album></a></li>');
           // working  $('ul').append('<li data-id="'+ item.id + '" class="idForBooklistView" ><a href="#" class="bookDetailItem"> <img src="' + imagesrc +  '" width="80px" height="100px" /> <div><h2 class="wrap" style="color:blue;font-size:15px;">' + item.bookname + '</h2> <p>Price :$' + item.price +'</p><h4>University :' + item.uniName +'</h4> </div></a> <a href="#purchase" class="buyItem" style="background:green;" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album></a></li>');
            $('ul').append('<li data-id="'+ item.id + '" class="idForBooklistView" ><a href="#" class="bookDetailItem"> <img src="' + imagesrc +  '" width="80px" height="80px" /> <p class="wrap" style="color:#FF5733;font-size:12px;font-weight:bold;"> Your Book: ' + item.bookname + '<br>Price :$' + item.price +'<br>University :' + item.uniName +'</p></a> <a href="#purchase" class="buyItem" style="background:#333333;" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album></a></li>');
            }else{
            $('ul').append('<li data-id="'+ item.id + '" class="idForBooklistView" ><a href="#" class="bookDetailItem"> <img src="' + imagesrc +  '" width="80px" height="80px" /> <p class="wrap" style="color:black;font-size:12px;font-weight:bold;">' + item.bookname + '<br>Price :$' + item.price +'<br>University :' + item.uniName +'</p></a> <a href="#purchase" class="buyItem" style="background:#333333;" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album></a></li>');
           

            }
        
        
        
        });

            $('#output').listview("refresh");
            //$("#thelist").empty().append(allItems).listview("refresh").enhanceWithin();
           // $.mobile.loading('hide');
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
            var interval = setInterval(function(){
                $.mobile.loading('hide');
                clearInterval(interval);
            },1); 
        }
        
    });
}
        getbookList("");

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
    $(document).on("click", ".bookDetailItem", function () {
        //alert("Approve in idForBooklistView")
        //var clickedId = $(this).attr("id");
        var clickedId = $(this).parents("li").data('id');
       //alert(clickedId);
        //re-direct to detail page and store to sessionstorage
        sessionStorage.setItem("sessionstorage_clickedId", clickedId);
       // alert(sessionStorage.getItem("sessionstorage_clickedId"));
       sessionStorage.setItem("userClick_fromsearch",'userSearchPage') 
       window.location = "bookDetail.html";
    });

    $(document).on("click", ".buyItem", function () {
       //alert("Delete " + $(this).parents("li").data("id"))
       sessionStorage.setItem("selectedBookIdforPurchase", $(this).parents("li").data("id"));
       
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

function checkbookStatus(){
    bookId = sessionStorage.getItem("selectedBookIdforPurchase");
    //alert(bookId);
    var check_availability
    /*
    var interval = setInterval(function(){
        $.mobile.loading('show',{
            text: 'foo',
            textVisible: true,
            theme: 'z',
            html: "<span class='ui-bar ui-overlay-c ui-corner-all'><img src='./css/5.gif' /><h2>..Page is loading</h2></span>"
          });
    
        clearInterval(interval);
        },1); 
        */
        var interval = setInterval(function(){
            $.mobile.loading('show');
            clearInterval(interval);
        },1); 
        
       //$(".loader").show();
       // $('#output').hide();
    $.ajax({
        type: "POST",
        url: checkbookStatus_url,
        dataType: "json",
        //timeout: 100000,
        data: JSON.stringify( {  "bookId": bookId }),
        contentType: "application/json",
        success: function(data, status){
            $.each(data, function(i, item) {
                
               if(item.deleted == 'Y' || item.sold == 'Y') {
               // alert("should return not available");
                check_availability ='N';
                //return "not available";
                
               }else{
               // alert("should return available");
                check_availability = 'Y';
                //return "available";
               }  
                   
           });
           if(check_availability == 'Y') 
               {
                //$(".loader").show();
                /*
                var interval = setInterval(function(){
                    $.mobile.loading('hide');
                    clearInterval(interval);
                    },1); 
                */    
                    console.log("existing Search");
                    
                  //window.location= "buybook.html";
                  setTimeout( function() {
                    window.location= "buybook.html";
                }, 20)
                   
               }else{
                navigator.notification.alert(
                    'It seems that book has been just sold',  // message
                    alertDismissed,         // callback
                    'Backend Issues',            // title
                    'Done'                  // buttonName
                );
                var interval = setInterval(function(){
                    $.mobile.loading('hide');
                    clearInterval(interval);
                    },1); 
                window.location ="search.html";
               }
            
        },
    
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //show error message
            console.log(textStatus);
            navigator.notification.alert(
                'Not able to get the status  book list. Please try again',  // message
                alertDismissed,         // callback
                'Backend Issues',            // title
                'Done'                  // buttonName
            );
           // return "not available";
           var interval = setInterval(function(){
            $.mobile.loading('hide');
            clearInterval(interval);
            },1); 
            
        }
    });
    
    
}







/*
var supportTouch = $.support.touch,
            scrollEvent = "touchmove scroll",
            touchStartEvent = supportTouch ? "touchstart" : "mousedown",
           touchStopEvent = supportTouch ? "touchend" : "mouseup",
            touchMoveEvent = supportTouch ? "touchmove" : "mousemove";
    $.event.special.swipeupdown = {
        setup: function() {
            var thisObject = this;
            var $this = $(thisObject);
            $this.bind(touchStartEvent, function(event) {
                var data = event.originalEvent.touches ?
                        event.originalEvent.touches[ 0 ] :
                        event,
                        start = {
                            time: (new Date).getTime(),
                            coords: [ data.pageX, data.pageY ],
                            origin: $(event.target)
                        },
                        stop;

                function moveHandler(event) {
                    if (!start) {
                        return;
                    }
                    var data = event.originalEvent.touches ?
                            event.originalEvent.touches[ 0 ] :
                            event;
                    stop = {
                        time: (new Date).getTime(),
                        coords: [ data.pageX, data.pageY ]
                    };

                    // prevent scrolling
                    if (Math.abs(start.coords[1] - stop.coords[1]) > 10) {
                        event.preventDefault();
                    }
                }
                $this
                        .bind(touchMoveEvent, moveHandler)
                        .one(touchStopEvent, function(event) {
                    $this.unbind(touchMoveEvent, moveHandler);
                    if (start && stop) {
                        if (stop.time - start.time < 1000 &&
                                Math.abs(start.coords[1] - stop.coords[1]) > 30 &&
                                Math.abs(start.coords[0] - stop.coords[0]) < 75) {
                            start.origin
                                    .trigger("swipeupdown")
                                    .trigger(start.coords[1] > stop.coords[1] ? "swipeup" : "swipedown");
                        }
                    }
                    start = stop = undefined;
                });
            });
        }
    };
    $.each({
        swipedown: "swipeupdown",
       swipeup: "swipeupdown"
    }, function(event, sourceEvent){
        $.event.special[event] = {
            setup: function(){
                $(this).bind(sourceEvent, $.noop);
            }
        };
    });

*/


