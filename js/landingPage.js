//window.addEventListener("load", startup);
document.addEventListener("deviceready", startup, false);

function startup() {
    //console.log(device.platform);
   // alert("rerached search");
   //$(".loader").fadeOut(1000);
   screen.orientation.lock('portrait');

   $(document).bind('mobileinit', function () {
    //Loader settings
    $.mobile.loader.prototype.options.text = "Loading..";
    $.mobile.loader.prototype.options.textVisible = true;
    $.mobile.loader.prototype.options.theme = "a";
    $.mobile.loader.prototype.options.textonly = false; 
}); 
var interval = setInterval(function(){
    $.mobile.loading('hide');
    clearInterval(interval);
    },1); 

   $('.ui-icon-delete').css("background-color", "#333333");
   $('.ui-icon-power').css("background-color", "#333333");
   $('.ui-icon-gear').css("background-color", "#333333");

   if(sessionStorage.getItem("usernameId") == ""){
    window.location= "index.html";
   }

   window.addEventListener("orientationchange", function(){
    console.log(screen.orientation.type); // e.g. portrait
});

   $('#logmeOut').click (function(){
    sessionStorage.setItem("usernameId",'')
    //alert(sessionStorage.getItem("usernameId"));
    window.location= "index.html";
    });
   
    $('#ridesite').click (function(){
        //console.log("test");
        //alert("Clicked ridesite");
        sessionStorage.setItem("userClick_fromsearch",'userSaleHistory')
        var interval = setInterval(function(){
            $.mobile.loading('show');
            clearInterval(interval);
            },1); 
        window.location= "rideList.html";
    });

    $('#booksite').click (function(){
        //console.log("test");
        //alert("Clicked ridesite");
        window.location= "search.html";
    });

    $('#mySettings').click (function(){
        //console.log("test");
        //alert("Clicked ridesite");
        window.location= "settings.html";
    });

    $('#sellerHistory').click (function(){
        //console.log("test");
        sessionStorage.setItem("userClick_fromsearch",'userSaleHistory')
         window.location= "saleHistory.html";
    });

    $('#buyHistory').click (function(){
        //console.log("test");
        sessionStorage.setItem("userClick_fromsearch",'userBuyHistory')
        window.location= "saleHistory.html";
    });


    $('#postrideButton').click (function(){
        //console.log("test");
        //alert("Clicked ridesite");
        window.location= "postRide.html";
    });

    $('#postbookButton').click (function(){
        //console.log("test");
        //alert("Clicked ridesite");
        window.location= "postbook.html";
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

    function findBuyerPhone(tokenEmail,callback){
        //alert("tokeemail is "+tokenEmail);
        var interval = setInterval(function(){
            $.mobile.loading('show');
            clearInterval(interval);
            },1); 
        $.ajax({
            type: "POST",
            url: userDetails_url,
            dataType: "json",
            //data: JSON.stringify( { "bookname": $('#bookname').val(), "price": $('#price').val(), "picture":capturedImage } ),
            data: JSON.stringify( { 
    
                "username": tokenEmail
    
                        } ),
            contentType: "application/json",
            success: function(response) {
               // alert('Your buyeremail successfully posted!');
               var interval = setInterval(function(){
                $.mobile.loading('hide');
                clearInterval(interval);
                },1); 
                
                if(response.code == 440){
                navigator.notification.alert(
                    //'Your book was successfully posted',  // message
                    response.failed,  // message
                    alertDismissed,         // callback
                    'Error',            // title
                    'Done'                  // buttonName
                );
                callback("No Phone",0);
                //window.location = "rideList.html";
                }else{
                    $.each( response, function ( i, buyerPhone) { 
                        //alert("from ajax outout" + buyerPhone.telephone);
                        if(buyerPhone.telephone == "")
                        {
                            callback("No Phone",0);
                        }else{
                            callback(0,buyerPhone.telephone);
                        }
                        
                    })
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                //show error message
                /*
                navigator.notification.alert(
                    'Not able to get Buyer Phone name ',  // message
                    alertDismissed,         // callback
                    'Failure',            // title
                    'Done'                  // buttonName
                );
                //alert("Phto loading / Post book failed");
                //alert("error is"+ errorThrown);
                //alert(XMLHttpRequest);
                */
               callback("No Phone",0);
               var interval = setInterval(function(){
                $.mobile.loading('hide');
                clearInterval(interval);
                },1); 
            }
        });
    }
    //end find buyer phone number    
    

//salehistory details
            var allItems = '';
            var interval = setInterval(function(){
            $.mobile.loading('show');
            clearInterval(interval);
            },1);  
            //alert("this works");
            $.ajax({
            type: "POST",
            url: sellerHistory_url,
            dataType: "json",
            timeout: 100000,
            data: JSON.stringify( { 
                "username":sessionStorage.getItem("usernameId")
                        } ),
            contentType: "application/json",
            success: function(data, status){
                //alert(data);
                $.each(data, function(i, item) {
                    
                     if (item.status == 'A' && item.priceChanged == 'Y'){

                        itemtext = "Transaction id : "+ item.tokenId + ". Please contact buyer (If not done yet) to complete transaction for book ";
                        allItems += '<li data-email = "'+ item.tokenEmail +'"data-rowid="' + item.id + '"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">' + itemtext + '-'+ item.bookname + '</p><button class="findbuyerPhone">Buyer Phone</button></div></a></li>';
                        
                    }else if (item.status == 'A'){
                        //alert(item.tokenEmail);
                    
                    itemtext = "Transaction id : "+ item.tokenId + ". Please contact buyer (If not done yet) to complete transaction for book ";
                    allItems += '<li data-email = "'+ item.tokenEmail +'"data-rowid="' + item.id + '"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">' + itemtext + '-'+ item.bookname + '</p><button class="findbuyerPhone">Buyer Phone</button></div></a></li>';
                    
                     }
                    
                    });
                
                     $("#actionList").empty().append(allItems).listview("refresh").enhanceWithin();
                    //$("#actionList").empty().append("test").listview("refresh").enhanceWithin();

                //
                var interval = setInterval(function(){
                    $.mobile.loading('hide');
                    clearInterval(interval);
                    },1);  
                
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                //show error message
                //alert("There was issue in getting your sale history. Please contact or send email for resolution");
                navigator.notification.alert(
                    server_notconnecting,  // message
                    alertDismissed,         // callback
                    'Backend Issues',            // title
                    'Done'                  // buttonName
                );
                //alert("error is"+ errorThrown);
                //alert(XMLHttpRequest);
                var interval = setInterval(function(){
                    $.mobile.loading('hide');
                    clearInterval(interval);
                    },1);  
            }
            
            });//ajax end


//salehistory copy

//buyhistory 
        var allbuyItems = '';
        
        $.ajax({
            type: "POST",
            url: buyerHistory_url,
            dataType: "json",
            timeout: 100000,
            data: JSON.stringify( { 
                "username":sessionStorage.getItem("usernameId")
                        } ),
            contentType: "application/json",
            success: function(data, status){
                $.each(data, function(i, item) {
                     if (item.status == 'A' && item.revised_price > 0){
        
                        //itemtext = "Transaction id : "+ item.tokenId + ".\n You OFFERED to buy this item on "+ new Date(item.posted_on).toDateString() +"\n Seller revised price on " + new Date(item.priceRevised_on).toDateString()
                        itemtext = "Transaction id : "+ item.tokenId + " - Please confirm if you have received this book ( "+ item.bookName + " )after price revision. Seller revised price to $" + item.revised_price  +" on " + moment(item.priceRevised_on).format('llll');
                        allbuyItems += '<li data-rowid="' + item.bookId + '"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">' + itemtext  +'</p><button class="buyConfirm">Buy Confirm</button><button class="buyCancel">Cancel</button></div></a></li>';
                       
                       }else if (item.status == 'A'){
        
                        //itemtext = "Transaction id : "+ item.tokenId + ".\n You OFFERED to buy this item on " + new Date(item.posted_on).toDateString();
                        itemtext = "Transaction id : "+ item.tokenId + " - Please confirm if you have received this book ( "+ item.bookName  +" ) by clicking 'Buy Confirm.";
                        allbuyItems += '<li data-rowid="' + item.bookId + '"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">' + itemtext  +'</p><button class="buyConfirm">Buy Confirm</button><button class="buyCancel">Cancel</button></div></a></li>';
                       
                       }
         
                        });
                    
                
                $("#actionList").append(allbuyItems).listview("refresh").enhanceWithin();
                var interval = setInterval(function(){
                    $.mobile.loading('hide');
                    clearInterval(interval);
                    },1);  
                
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                //show error message
                //alert("There was issue in getting your sale history. Please contact or sned email for resolution");
                navigator.notification.alert(
                    server_notconnecting,  // message
                    alertDismissed,         // callback
                    'Backend Issues',            // title
                    'Done'                  // buttonName
                );
                //alert("error is"+ errorThrown);
                //alert(XMLHttpRequest);
                var interval = setInterval(function(){
                    $.mobile.loading('hide');
                    clearInterval(interval);
                    },1);  
            }
            
            });//ajax end

//buyhistory ends

//rideownerhistory
var allRideOwnerItems = '';
$.ajax({
    type: "POST",
    url: rideOwnerHistory_url,
    dataType: "json",
    timeout: 100000,
    data: JSON.stringify( { 
        "username":sessionStorage.getItem("usernameId")
                } ),
    contentType: "application/json",
    success: function(data, status){
        //alert(data);
        $.each(data, function(i, item) {
            //alert("before comparsion" + item.rideId)  
            var todayDate = moment();
            var rideDate = moment(item.rideDate);

                         if (  rideDate.isAfter(todayDate)  ){
                            if(item.rideStatus == ""){
                             // alert("after comparsion" + item.rideId) 
                            itemtext = "Ride id : "+ item.rideId + ".\n Nobody has BOOKED this ride yet.";
                            // allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.rideId + ')'+ item.rideId + '<br> Price: $'+ item.rideId +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p><button class="riderCancel">Cancel my ride</button></div></a></li>';
                            allRideOwnerItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">' + item.rideFrom +' to '+item.rideTo +' ( Seats:'+ item.rideSeats + ', Booked: '  + item.ridesBooked +' )'  +'<br> Ride id : '+ item.rideId + ' -  '+ moment(item.rideDate).format('llll') +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p><button class="rideOwnerCancel">Cancel this ride</button></div></a></li>';
                            }    
                         }
 
                     
 
 
                 

            });

            $("#actionList").append(allRideOwnerItems).listview("refresh").enhanceWithin();
            var interval = setInterval(function(){
                $.mobile.loading('hide');
                clearInterval(interval);
                },1); 

        //
        
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        //show error message
        //alert("There was issue in getting your sale history. Please contact or send email for resolution");
        navigator.notification.alert(
            server_notconnecting,  // message
            alertDismissed,         // callback
            'Backend Issues',            // title
            'Done'                  // buttonName
        );
        var interval = setInterval(function(){
            $.mobile.loading('hide');
            clearInterval(interval);
            },1); 
        //alert("error is"+ errorThrown);
        //alert(XMLHttpRequest);
    }
    
    });//ajax end

//rideowner list ends

//rider list
var allriderItems = '';
$.ajax({
    type: "POST",
    url: riderHistory_url,
    dataType: "json",
    timeout: 100000,
    data: JSON.stringify( { 
        "username":sessionStorage.getItem("usernameId")
                } ),
    contentType: "application/json",
    success: function(data, status){
        //alert("recahed at rider output");
        $.each(data, function(i, item) {
            compareRideDate = moment(item.rideDate).format('YYYY-MM-DD');

            var todayDate = moment();
            var rideDate = moment(item.rideDate);

            //
            if (item.ridetrxStatus == ''){
                console.log(item.rideDate);
                if (  rideDate.isAfter(todayDate)  ){
                    //alert("recahed at rider output for booked ride");
                    itemtext = "Trx id : "+ item.trxId + "\n - You Booked  this ride  on "+new Date(item.rideBookedon).toDateString() + " for "+item.seats + " seat/s @ $" + item.ridePrice  +" per seat.";
                    //allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.rideId + ')'+ item.rideId + '<br> Price: $'+ item.rideId +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p><button class="riderCancel">Cancel my ride</button></div></a></li>';
                    allriderItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">' + item.rideFrom +' to '+item.rideTo +' ( Seats:'+ item.rideSeats + ', Booked: '  + item.ridesBooked +' )'  +'<br> Ride id : '+ item.rideId + ' -  '+ moment(item.rideDate).format('llll') +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p><button class="riderCancel">Cancel my ride</button></div></a></li>';
                }
            }
 
 
                });
            
        
        $("#actionList").append(allriderItems).listview("refresh").enhanceWithin();
        var interval = setInterval(function(){
            $.mobile.loading('hide');
            clearInterval(interval);
            },1); 
        
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        //show error message
        //alert("There was issue in getting your sale history. Please contact or sned email for resolution");
        navigator.notification.alert(
            server_notconnecting,  // message
            alertDismissed,         // callback
            'Backend Issues',            // title
            'Done'                  // buttonName
        );
        var interval = setInterval(function(){
            $.mobile.loading('hide');
            clearInterval(interval);
            },1); 
        //alert("error is"+ errorThrown);
        //alert(XMLHttpRequest);
    }
    
    });//ajax end

//rider list ends

$("#actionList").on("click", ".findbuyerPhone", function(e){
    e.stopImmediatePropagation();

   var email = $(this).parents("li").data("email");
    //alert($(this).parents("li").data("rowid"));
    findBuyerPhone(email,function(err,success){
        if(err){
            navigator.notification.alert(
                "There was issue is retrieving buyer phone details. Please try again.",  // message
                alertDismissed,         // callback
                'Error',            // title
                'Done'                  // buttonName
            );
        }else{
            navigator.notification.alert(
                "Buyper phone -"+success,  // message
                alertDismissed,         // callback
                'Success',            // title
                'Done'                  // buttonName
            );

        }

    })

})
//for buyconfirm
    //buyconfirm start
    $("#actionList").on("click", ".buyConfirm", function(e){
        e.stopImmediatePropagation();
    //$(document).on("click", ".buyConfirm", function () {
        //alert("Approve in idForBooklistView")
        //var clickedId = $(this).attr("id");
        var buyConfirmId = $(this).parents("li").data('rowid');
       //alert(clickedId);
        //re-direct to detail page and store to sessionstorage
        sessionStorage.setItem("sessionstorage_buyConfirmId", buyConfirmId);
       // alert(sessionStorage.getItem("sessionstorage_clickedId"));
       //code to find if price was chnaged
                        var price_changed;
                        var price;
                        var newPrice;
                        var interval = setInterval(function(){
                            $.mobile.loading('show');
                            clearInterval(interval);
                            },1); 
                        $.ajax({
                            type: "POST",
                            url: checkbookStatus_url,
                            dataType: "json",
                            //timeout: 100000,
                            data: JSON.stringify( {  "bookId": buyConfirmId }),
                            contentType: "application/json",
                            success: function(data, status){
                                $.each(data, function(i, item) {
                                    price_changed = item.priceChanged;
                                    price = item.price;
                                    newPrice = item.newPrice;
                                           
                                });
                                var interval = setInterval(function(){
                                    $.mobile.loading('hide');
                                    clearInterval(interval);
                                    },1); 
                                //
                                //alert("price change indicator is"+price_changed+price+newPrice);
                                if(price_changed == 'Y'){
                                    navigator.notification.confirm(
                                        'The price of this book has been changed. The previous price was $'+price +'. The new price is $'+newPrice+'. Would you like to proceed?', // message
                                         onConfirm,            // callback to invoke with index of button pressed
                                        'Confirm',           // title
                                        ['Confirm','Cancel']     // buttonLabels
                                        );

                                }else{
                                    navigator.notification.confirm(
                                        'Would you like to confirm that you have received this book?', // message
                                         onConfirm,            // callback to invoke with index of button pressed
                                        'Confirm',           // title
                                        ['Confirm','Cancel']     // buttonLabels
                                        );

                                }

                                
                                
                            },
                        
                            error: function(XMLHttpRequest, textStatus, errorThrown) {
                                //show error message
                                console.log(textStatus);
                                navigator.notification.alert(
                                    'There was an issue in proceeding with the confirmation of this book. Please try again',  // message
                                    alertDismissed,         // callback
                                    'Backend Issues',            // title
                                    'Done'                  // buttonName
                                );
                                var interval = setInterval(function(){
                                    $.mobile.loading('hide');
                                    clearInterval(interval);
                                    },1); 
                            // return "not available";
                                
                            }
                        });


       //price change validation ends
        /*                
       navigator.notification.confirm(
        'Would you like to confirm the receipt of the book with id? '+$(this).parents("li").data('rowid'), // message
         onConfirm,            // callback to invoke with index of button pressed
        'Receipt Confirm',           // title
        ['Confirm','Cancel']     // buttonLabels
        );
        */
        function onConfirm(buttonIndex){
            if(buttonIndex == 1){
                var interval = setInterval(function(){
                    $.mobile.loading('show');
                    clearInterval(interval);
                    },1); 
                $.ajax({
                    type: "POST",
                    url: buyconfirm_url,
                    dataType: "json",
                    //timeout: 100000,
                    data: JSON.stringify( { 
                        "bookId": buyConfirmId,
                                } ),
                    contentType: "application/json",

                    success: function(response){
                        console.log("--- buyconfirm successful message from saleHistory");
                        console.log("json is"+JSON.stringify(response));
                        var JSONStringify = JSON.stringify(response);
                        var JSONparse = JSON.parse(JSONStringify);
                        console.log("responce is " + JSONparse.code + "other "+ JSONStringify.code);
                        //var JSONResponse = JSON.stringify(response);
                        //var jsonparse = JSON.parse(JSONResponse);
                        if (response.code == 441) {
                        //alert("delisting 441");
                        navigator.notification.alert(
                            response.success,  // message
                            alertDismissed,         // callback
                            'Confirmed',            // title
                            'Done'                  // buttonName
                        );
                        //alert(response.success);
                        };

                        if (response.code == 421) {
                            //alert("delisting 441");
                            navigator.notification.alert(
                                response.message,  // message
                                alertDismissed,         // callback
                                'Confirmed',            // title
                                'Done'                  // buttonName
                            );
                            //alert(response.success);
                            };
                        
                        if (response.code == 431) {
                                //alert("delisting 441");
                                navigator.notification.alert(
                                    response.message,  // message
                                    alertDismissed,         // callback
                                    'Error',            // title
                                    'Done'                  // buttonName
                                );
                                //alert(response.success);
                                };
                                var interval = setInterval(function(){
                                    $.mobile.loading('hide');
                                    clearInterval(interval);
                                    },1); 
                        
                        window.location ="landingpage.html";
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        //show error message
                        navigator.notification.alert(
                            "There was an issue in confirming that this book has been received.",  // message
                            alertDismissed,         // callback
                            'Backend Issues',            // title
                            'Done'                  // buttonName
                        );
                        var interval = setInterval(function(){
                            $.mobile.loading('hide');
                            clearInterval(interval);
                            },1); 
                       // alert("There was issue in confirming book receipt.");
                        //alert("error is"+ errorThrown);
                        //alert(XMLHttpRequest);
                    }
                    
                    });//ajax end
                }


        }
    });//buyconfirm end

//buycancel
    //CANCEL BUY starts
    $("#actionList").on("click", ".buyCancel", function(e){
        e.stopImmediatePropagation();
    //$(document).on("click", ".buyConfirm", function () {
        //alert("Approve in idForBooklistView")
        //var clickedId = $(this).attr("id");
        var buyCancelId = $(this).parents("li").data('rowid');
    //alert(clickedId);
        //re-direct to detail page and store to sessionstorage
        sessionStorage.setItem("sessionstorage_buyCancelId", buyCancelId);
    // alert(sessionStorage.getItem("sessionstorage_clickedId"));

    navigator.notification.confirm(
        'Would you like to cancel this purchase? If you do, the seller will be notified about the cancellation and the book will appear for sale again.', // message
        onConfirm,            // callback to invoke with index of button pressed
        'Cancel Purchase',           // title
        ['Confirm','Cancel']     // buttonLabels
        );
        function onConfirm(buttonIndex){
            if(buttonIndex == 1){
                var interval = setInterval(function(){
                    $.mobile.loading('show');
                    clearInterval(interval);
                    },1); 
                $.ajax({
                    type: "POST",
                    url: buyCancel_url,
                    dataType: "json",
                    //timeout: 100000,
                    data: JSON.stringify( { 
                        "bookId": buyCancelId,
                                } ),
                    contentType: "application/json",
                    success: function(response){
                        console.log("--- buyCancel successful message from saleHistory");
                        console.log("json is"+JSON.stringify(response));
                        var JSONStringify = JSON.stringify(response);
                        var JSONparse = JSON.parse(JSONStringify);
                        console.log("responce is " + JSONparse.code + " other "+ JSONStringify.code);
                        setTimeout(function(){
                        if (response.code == 441) {
                        //alert("delisting 441");
                        navigator.notification.alert(
                            //'Sale cancel confirmed',  // message
                            response.success,
                            alertDismissed,         // callback
                            'Confirmed',            // title
                            'Done'                  // buttonName
                        );
                        //alert(response.success);
                        //window.location ="saleHistory.html";
                        };

                        if (response.code == 440) {
                            //alert("delisting 441");
                            navigator.notification.alert(
                                //'Sale cancel confirmed',  // message
                                response.message,
                                alertDismissed,         // callback
                                'Error',            // title
                                'Done'                  // buttonName
                            );
                            //alert(response.success);
                            //window.location ="saleHistory.html";
                            };
                            var interval = setInterval(function(){
                                $.mobile.loading('show');
                                clearInterval(interval);
                                },1); 
                                window.location ="landingpage.html";
                            }, 2000);
                        //setTimeout(function(){ window.location ="saleHistory.html"; }, 2000);
                       // window.location ="landingpage.html";
                        
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        //show error message
                        navigator.notification.alert(
                            "There was an issue in cancelling this sale.",  // message
                            alertDismissed,         // callback
                            'Backend Issues',            // title
                            'Done'                  // buttonName
                        );
                        var interval = setInterval(function(){
                            $.mobile.loading('hide');
                            clearInterval(interval);
                            },1); 
                    // alert("There was issue in confirming book receipt.");
                        //alert("error is"+ errorThrown);
                        //alert(XMLHttpRequest);
                    }
                    
                    });//ajax end
                }


        }
    });

//ends buycancel



} // starup function ends





function alertDismissed() {
    // do something
}
