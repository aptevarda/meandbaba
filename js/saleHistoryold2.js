//window.addEventListener("load", startup);
document.addEventListener("deviceready", startup, false);

function startup() {
    //console.log(device.platform);
   // alert("rerached search");
   var countofUnsold = 0;

   $(".loader").fadeOut(1000);

    var sellbookbutton = $('#sellbookbutton').click(function() {
        redirect_to_postbook();
    });

    // Logout click
    $('#getmeBookList').click (function(){
        window.location= "search.html";
    });

    $("#listFor").html("Purchase history");

    

    
   //for sale history
    if(sessionStorage.getItem("userClick_fromsearch") == "userSaleHistory"){
        $("#pageTitle").html("Sale History");
        //$("#instructions").html("IMPORTANT: To ensure that you receive a payment for your item, please request the buyer at the pickup location to confirm that they have received the item. They can do this buy clicking the green check mark next to the item in the 'Books Purchased' page. If the buyer does not confirm that they have received the item, you will NOT receive a payment. For more information, visit the 'Help' page.");
        $("#instructions").html("Delete - Book removed from Sale List only if not buy <br> Cancel - Cancel the buy deal <br> $ Change - Change price after buyer negotitaion / will be only revealed to buyer" );
        // var final_url = 'http://192.168.0.19:3000/executive/populatesaleHistory';
       var allItems = '';
    $.ajax({
        type: "POST",
        url: populatesaleHistory_url,
        dataType: "json",
        timeout: 100000,
        data: JSON.stringify( { 
            "username":sessionStorage.getItem("usernameId")
                    } ),
        contentType: "application/json",
        success: function(data, status){
            $.each(data, function(i, item) {
                var imagesrc = item.picture;
                imagesrc = "http://192.168.0.19:3000//images/"+imagesrc;
                //allItems += '<li data-rowid="' + item.id + '"><a href="#"><div data-role="controlgroup" data-type="horizontal">&nbsp;<button>Delete</button><button>Cancel</button><button>Change Price</button></div>&nbsp;Item ' + item.id + ' text or description</a></li>'; 
                
                //allItems += '<li data-rowid="' + item.id + '"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.id + ')'+ item.bookname + '<br> Price: $'+ item.price +'</p><button disabled class="delist">Del</button><button class="cancelSale">Cancel</button><button class="salePriceChange">Change $</button></div></a></li>';

                
                if(item.deleted != "Y"){
                    
                    if (item.sold == "Y" && item.purchase_confirm == "" && item.priceChanged == "Y"){

                        var itemtext = "Transaction completed on ";
                        allItems += '<li data-price ='+ item.price +' data-rowid="' + item.id + '"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.id + ')'+ item.bookname + ' - Old Price: $' + item.price +'<br>' + ' - New Price: $' + item.newPrice + '<br>' + itemtext +'</p><button disabled class="delist">Del</button><button class="cancelSale">Cancel</button><button disabled class="salePriceChange">Change $</button></div></a></li>';
                    
                    }else if(item.sold == "Y" && item.purchase_confirm == "" && item.priceChanged == "") {

                        allItems += '<li data-rowid="' + item.id + '"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.id + ')'+ item.bookname + '<br> Price: $'+ item.price +'</p><button disabled class="delist">Del</button><button class="cancelSale">Cancel</button><button class="salePriceChange">Change $</button></div></a></li>';

                    }else if (item.sold == "") {

                        allItems += '<li data-price ='+ item.price +'data-rowid="' + item.id + '"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.id + ')'+ item.bookname + '<br> Price: $'+ item.price +'</p><button class="delist">Del</button><button disabled class="cancelSale">Cancel</button><button disabled class="salePriceChange">Change $</button></div></a></li>';

                    }else if (item.sold == "Y" && item.purchase_confirm == "Y" && item.priceChanged == "Y") {

                        var itemtext = "Transacation completed on ";
                        allItems += '<li data-price ='+ item.price +' data-rowid="' + item.id + '"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.id + ')'+ item.bookname + ' - Old Price: $' + item.price +'<br>' + ' - New Price: $' + item.newPrice + '<br>' + itemtext +'</p><button disabled class="delist">Del</button><button disabled class="cancelSale">Cancel</button><button disabled class="salePriceChange">Change $</button></div></a></li>';
                       
                    }else if (item.sold == "Y" && item.purchase_confirm == "Y" && item.priceChanged == "") {

                        var itemtext = "Transaction completed on ";
                        allItems += '<li data-price ='+ item.price +'data-rowid="' + item.id + '"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.id + ')'+ item.bookname + '<br> Price: $'+ item.price +'</p><button disabled class="delist">Del</button><button disabled class="cancelSale">Cancel</button><button disabled class="salePriceChange">Change $</button></div></a></li>';

                    }
                
                }
                
                
                });
              
            //appending buttons
                /*
                var allItems = '';
                for (var i=0; i< 4; i++){
                    //allItems += '<li data-rowid="' + i + '"><a href="#"><div data-role="controlgroup" data-type="horizontal"><input type="button" value="Hmm" /><input type="button" value="No" /><input type="button" value="Yes" /></div>&nbsp;Item ' + i + ' text or description</a></li>';
                    allItems += '<li data-rowid="' + i + '"><a href="#"><div data-role="controlgroup" data-type="horizontal">&nbsp;<button>Delete</button><button>Cancel</button><button>Change Price</button></div>&nbsp;Item ' + i + ' text or description</a></li>';   
                }
                */
                $("#thelist").empty().append(allItems).listview("refresh").enhanceWithin();

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
            //alert("error is"+ errorThrown);
            //alert(XMLHttpRequest);
        }
        
        });//ajax end
    } // session id sale history data

            $("#thelist").on("click", "li input", function(e){
                e.stopImmediatePropagation();        
                var rowid = $(this).parents("li").data("rowid");
                var btnText = $(this).val();
                alert("You clicked the button: " + btnText + " on row number: " + rowid);
            });
            /*
            $("#thelist").on("click", "li button", function(e){
                e.stopImmediatePropagation();        
                var rowid = $(this).parents("li").data("rowid");
                var btnText = $(this).val();
                alert("You clicked the button: " + btnText + " on row number: " + rowid);
            });
            */
           /*
            $("#thelist").on("click", ".delist", function(e){
                e.stopImmediatePropagation();        
                var rowid = $(this).parents("li").data("rowid");
                var btnText = $(this).val();
                alert("You clicked delist button: " + btnText + " on row number: " + rowid);
            });
            */
            

    //********************  for buy history  ****************************

    if(sessionStorage.getItem("userClick_fromsearch") == "userBuyHistory"){
        $("#pageTitle").html("Purchase History");
        $("#instructions").html("IMPORTANT: Please confirm that you have received the book after picking it up from the seller at the pickup location by clicking on the green check mark next to the respective item. This ensures that the seller receives your payment. For more information, visit the 'Help' page.")
        //var final_url = 'http://192.168.0.19:3000/executive/populatebuyHistory';
        var allItems = '';
        $.ajax({
            type: "POST",
            url: populatebuyHistory_url,
            dataType: "json",
            timeout: 100000,
            data: JSON.stringify( { 
                "username":sessionStorage.getItem("usernameId")
                        } ),
            contentType: "application/json",
            success: function(data, status){
                $.each(data, function(i, item) {
                    var imagesrc = item.picture;
                    imagesrc = "http://192.168.0.19:3000//images/"+imagesrc;
                    if(item.sold == "Y" && item.purchase_confirm == 'Y'){
                        var myDate = new Date(item.sold_on);

                        itemSold = ("Book purchased on " + myDate.toString());
                        //$('ul ').append('<li data-id="'+ item.id + '" class="idForSaleHistoryBooklistView" ><a href="#" class="saleHistorybookDetailItem">  <div><p class="wrap" style="color:blue;font-size:15px;">' + item.bookname + '&nbsp (Price $ ' + item.price +')</p> <p>' + itemSold +'</p></div></a> <a href="#"  class="ui-state-disabled"  data-icon="check" style="background:green;" data-rel="popup" data-position-to="window" data-transition="pop">Sold></a></li>');
                        allItems += '<li data-rowid="' + item.id + '"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.id + ')'+ item.bookname + '<br> Price :$'+ item.price +'</p><button disabled >Cancel</button><button disabled>Confirm Purchase</button></div></a></li>';
                    
                    }else if (item.sold == "Y" && item.purchase_confirm == "") {

                        itemSold = ("Book purchase is not yet confirmed" );
                        allItems += '<li data-rowid="' + item.id + '"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.id + ')'+ item.bookname + '<br> Price :$'+ item.price +'</p><button class="buyCancel">Cancel</button><button class="buyConfirm">Confirm Purchase</button></div></a></li>';

                    }
                    
                    });
                    
                
                $("#thelist").empty().append(allItems).listview("refresh").enhanceWithin();
                
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
            }
            
            });//ajax end

    }// session id end for purchasehistory data

    
    //showing bookdetail 

    $("#thelist").on("click", "li a", function(e){
        var clickedId = $(this).parents("li").data("rowid");
       // alert("You clicked the listitem withh id as "+rowid);
        sessionStorage.setItem("sessionstorage_clickedId", clickedId);
        window.location = "bookDetail.html";
    });

    //showing bookdetail

    // delisting the book
    $("#thelist").on("click", ".delist", function(e){
        e.stopImmediatePropagation();
    
     // alert("Delisting " + $(this).parents("li").data("rowid"));
      var delistId = $(this).parents("li").data("rowid");
       //var delistId = $(this).parents("li").data("id");
      // alert ("Number of unsold books are "+ countofUnsold);
       navigator.notification.confirm(
        'Would you like to delist this book?', // message
         onDelist,            // callback to invoke with index of button pressed
        'Delist',           // title
        ['Confirm','Cancel']     // buttonLabels
    );
       //var final_url = 'http://192.168.0.19:3000/executive/delist';
       function onDelist(buttonIndex){
        if(buttonIndex == 1){
        $.ajax({
            type: "POST",
            url: delist_url,
            dataType: "json",
            //timeout: 100000,
            data: JSON.stringify( { 
                "bookId": delistId,
                "countofUnsold":countofUnsold
                        } ),
            contentType: "application/json",
            success: function(response){
                console.log("--- delisting successful message from saleHistory");
                //var JSONResponse = JSON.stringify(response);
                //var jsonparse = JSON.parse(JSONResponse);
                if (response.code == 441) {
                //alert("delisting 441");
                navigator.notification.alert(
                    'Delisting was successful',  // message
                    alertDismissed,         // callback
                    'Game Over',            // title
                    'Done'                  // buttonName
                );
                //alert(response.success);
                }
                if (response.code == 442) {
                //alert("delisting 442");
                navigator.notification.alert(
                    'Delisting was unsuccessful as it may happen if Book was sold while delisting.Book cannot be delisted once sold',  // message
                    alertDismissed,         // callback
                    'Not Done',            // title
                    'Done'                  // buttonName
                );
                //alert(response.failed);
                }

                window.location ="saleHistory.html";
                
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                //show error message
                navigator.notification.alert(
                    server_notconnecting,  // message
                    alertDismissed,         // callback
                    'Backend Issues',            // title
                    'Done'                  // buttonName
                );
                //alert("There was issue in delisting your book. It may be because it might have been purchassed while you were delisting. Delisting is only possible if book is not yet purchased.");
                //alert("error is"+ errorThrown);
                //alert(XMLHttpRequest);
            }
            
            });//ajax end
        }
        }//function onDelist ends
       //sessionStorage.setItem("selectedBookIdforPurchase", $(this).parents("li").data("id"));
       
       //alert(sessionStorage.getItem("selectedBookIdforPurchase"));
    });// delisting end

    //buyconfirm start
    $("#thelist").on("click", ".buyConfirm", function(e){
        e.stopImmediatePropagation();
    //$(document).on("click", ".buyConfirm", function () {
        //alert("Approve in idForBooklistView")
        //var clickedId = $(this).attr("id");
        var buyConfirmId = $(this).parents("li").data('rowid');
       //alert(clickedId);
        //re-direct to detail page and store to sessionstorage
        sessionStorage.setItem("sessionstorage_buyConfirmId", buyConfirmId);
       // alert(sessionStorage.getItem("sessionstorage_clickedId"));

       navigator.notification.confirm(
        'Would you like to confirm the receipt of the book with id? '+$(this).parents("li").data('rowid'), // message
         onConfirm,            // callback to invoke with index of button pressed
        'Receipt Confirm',           // title
        ['Confirm','Cancel']     // buttonLabels
        );
        function onConfirm(buttonIndex){
            if(buttonIndex == 1){
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
                        //var JSONResponse = JSON.stringify(response);
                        //var jsonparse = JSON.parse(JSONResponse);
                        if (response.code == 441) {
                        //alert("delisting 441");
                        navigator.notification.alert(
                            'Book receipt confirmed',  // message
                            alertDismissed,         // callback
                            'Confirmed',            // title
                            'Done'                  // buttonName
                        );
                        //alert(response.success);
                        };
                        
                        window.location ="saleHistory.html";
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        //show error message
                        navigator.notification.alert(
                            "There was issue in confirming book receipt.",  // message
                            alertDismissed,         // callback
                            'Backend Issues',            // title
                            'Done'                  // buttonName
                        );
                       // alert("There was issue in confirming book receipt.");
                        //alert("error is"+ errorThrown);
                        //alert(XMLHttpRequest);
                    }
                    
                    });//ajax end
                }


        }
    });//buyconfirm end

    //CANCEL BUY starts


    $("#thelist").on("click", ".buyCancel", function(e){
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
        'Would you like to cancel this purchase? If confirmed , the seller will be notified about the cancellation and book will appear again for sale.', // message
        onConfirm,            // callback to invoke with index of button pressed
        'Cancel Purchase',           // title
        ['Confirm','Cancel']     // buttonLabels
        );
        function onConfirm(buttonIndex){
            if(buttonIndex == 1){
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
                        //var JSONResponse = JSON.stringify(response);
                        //var jsonparse = JSON.parse(JSONResponse);
                        if (response.code == 441) {
                        //alert("delisting 441");
                        navigator.notification.alert(
                            'Sale cancel confirmed',  // message
                            alertDismissed,         // callback
                            'Confirmed',            // title
                            'Done'                  // buttonName
                        );
                        //alert(response.success);
                        };
                        
                        window.location ="saleHistory.html";
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        //show error message
                        navigator.notification.alert(
                            "There was issue in cancelling this sale.",  // message
                            alertDismissed,         // callback
                            'Backend Issues',            // title
                            'Done'                  // buttonName
                        );
                    // alert("There was issue in confirming book receipt.");
                        //alert("error is"+ errorThrown);
                        //alert(XMLHttpRequest);
                    }
                    
                    });//ajax end
                }


        }
    });





    //CANCEL BUY ends

 //----- CANCEL SALE starts
            $("#thelist").on("click", ".cancelSale", function(e){
                e.stopImmediatePropagation();
            //$(document).on("click", ".buyConfirm", function () {
                //alert("Approve in idForBooklistView")
                //var clickedId = $(this).attr("id");
                var cancelSaleId = $(this).parents("li").data('rowid');
            alert(cancelSaleId);
                //re-direct to detail page and store to sessionstorage
                sessionStorage.setItem("sessionstorage_cancelSaleId", cancelSaleId);
            // alert(sessionStorage.getItem("sessionstorage_clickedId"));

            navigator.notification.confirm(
                'Would you like to cancel this sale? If confirmed , buyer will be notified about cancellation and book will appear again for sale.\n  If you would like to delete this from sale list, please delete after cancelling this sale', // message
                onConfirm,            // callback to invoke with index of button pressed
                'Cancel Sale ',           // title
                ['Confirm','Cancel']     // buttonLabels
                );
                function onConfirm(buttonIndex){
                    if(buttonIndex == 1){
                        $.ajax({
                            type: "POST",
                            url: cancelSale_url,
                            dataType: "json",
                            //timeout: 100000,
                            data: JSON.stringify( { 
                                "bookId": cancelSaleId,
                                        } ),
                            contentType: "application/json",
                            success: function(response){
                                console.log("--- cancelSale successful message from saleHistory");
                                //var JSONResponse = JSON.stringify(response);
                                //var jsonparse = JSON.parse(JSONResponse);
                                if (response.code == 441) {
                                //alert("delisting 441");
                                navigator.notification.alert(
                                    'Sale cancel confirmed',  // message
                                    alertDismissed,         // callback
                                    'Confirmed',            // title
                                    'Done'                  // buttonName
                                );
                                //alert(response.success);
                                };
                                
                                window.location ="saleHistory.html";
                            },
                            error: function(XMLHttpRequest, textStatus, errorThrown) {
                                //show error message
                                navigator.notification.alert(
                                    "There was issue in cancelling this sale.",  // message
                                    alertDismissed,         // callback
                                    'Backend Issues',            // title
                                    'Done'                  // buttonName
                                );
                            // alert("There was issue in confirming book receipt.");
                                //alert("error is"+ errorThrown);
                                //alert(XMLHttpRequest);
                            }
                            
                            });//ajax end
                        }


                }
            });
            

 //end CANCEL SALE 

 //SALE PRICE CHANGE
 //class="salePriceChange"
 $("#thelist").on("click", ".salePriceChange", function(e){
    e.stopImmediatePropagation();
    
    var oldPricefromli = $(this).parents("li").data('price');
    var newPriceId = $(this).parents("li").data('rowid');
    sessionStorage.setItem("sessionstorage_newPriceId", newPriceId);

    alert( " pricelist change");
    alert("from li" + oldPricefromli);

    function changePrice() {
        var newPrice;
        var newPrice = prompt("Please enter a new price:");
        var differenceInPrice = Math.abs(newPrice - oldPricefromli);
        if (newPrice == null || newPrice == "") {
          alert("The price hasn't been changed");
        } else {
            navigator.notification.confirm(
                'Are you sure you want to change the price of this book? Your current price is ' + oldPricefromli + ' and your new price is ' + newPrice + '. The difference between your new price and your old price is ' + differenceInPrice + '.', // message
                 onChangePrice,            // callback to invoke with index of button pressed
                'Change Price',           // title
                ['Change Price','Do Not Change']     // buttonLabels
            );

            function onChangePrice(buttonIndex) {
                if (buttonIndex == 1) {
                $.ajax({
                type: "POST",
                url: changePrice_url,
                dataType: "json",
                //timeout: 100000,
                data: JSON.stringify( { 
                    "newPrice": newPrice,
                    "bookId": newPriceId
                            } ),
                contentType: "application/json",
                success: function(response){
                    console.log("--- cancelSale successful message from saleHistory");
                    //var JSONResponse = JSON.stringify(response);
                    //var jsonparse = JSON.parse(JSONResponse);
                    if (response.code == 490) {
                    //alert("delisting 441");
                    navigator.notification.alert(
                        'The price of this book has been changed.',  // message
                        alertDismissed,         // callback
                        'Price Changed',            // title
                        'Done'                  // buttonName
                    );
                    //alert(response.success);
                    };
                    
                    window.location ="saleHistory.html";
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    //show error message
                    navigator.notification.alert(
                        "There was issue in changing the price.",  // message
                        alertDismissed,         // callback
                        'Backend Issues',            // title
                        'Done'                  // buttonName
                    );
                }
                
                });
            }else if (buttonIndex == 2) {
                ;
            }
            };
        }
  
      }

      changePrice();
 });

 //END SALE PRICE CHANGE
    

} // starup function ends



function redirect_to_postbook() {
    window.location = "postbook.html";
}

function alertDismissed() {
    // do something
}