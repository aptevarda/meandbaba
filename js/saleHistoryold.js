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
        $("#instructions").html("IMPORTANT: To ensure that you receive a payment for your item, please request the buyer at the pickup location to confirm that they have received the item. They can do this buy clicking the green check mark next to the item in the 'Books Purchased' page. If the buyer does not confirm that they have received the item, you will NOT receive a payment. For more information, visit the 'Help' page.");
       // var final_url = 'http://192.168.0.19:3000/executive/populatesaleHistory';
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
                /*
                if(item.sold == "Y")
                {
                    var myDate = new Date(item.sold_on);
                    

                    console.log(myDate);
                    // -> Wed Jun 09 2010 14:12:01 GMT+0100 (BST)
                    itemSold = ("Book sold on " + myDate.toString());
                    $('ul ').append('<li data-id="'+ item.id + '" class="idForSaleHistoryBooklistView" ><a href="#" class="saleHistorybookDetailItem">  <div><p class="wrap" style="color:blue;font-size:15px;">' + item.bookname + '&nbsp (Price $ ' + item.price +')</p> <p>' + itemSold +'</p></div></a> <a href="#"  class="ui-state-disabled" data-icon="check" style="background:green;" data-rel="popup" data-position-to="window" data-transition="pop">Sold></a></li>');
                }else{
                    itemSold = ("Book is not yet sold" );
                    countofUnsold++;
                    $('ul ').append('<li data-id="'+ item.id + '" class="idForSaleHistoryBooklistView" ><a href="#" class="saleHistorybookDetailItem">  <div><p class="wrap" style="color:blue;font-size:15px;">' + item.bookname + '&nbsp (Price $ ' + item.price +')</p> <p>' + itemSold +'</p></div></a> <a href="#"  class="delist" data-icon="bars" style="background:yellow;" data-rel="popup" data-position-to="window" data-transition="pop">Sold></a></li>');
                }
                */
               if(item.sold == "Y")
                {
                    var myDate = new Date(item.sold_on);
                    console.log(myDate);
                    // -> Wed Jun 09 2010 14:12:01 GMT+0100 (BST)
                    itemSold = ("Book sold on " + myDate.toString());
                    $('ul ').append('<li data-id="'+ item.id + '" class="idForSaleHistoryBooklistView" ><a href="#" class="saleHistorybookDetailItem">  <div><p class="wrap" style="color:blue;font-size:15px;">' + item.bookname + '&nbsp (Price $ ' + item.price +')</p> <p>' + itemSold +'</p></div></a> <a href="#"  class="ui-state-disabled" data-icon="check" style="background:green;" data-rel="popup" data-position-to="window" data-transition="pop">Sold></a></li>');
                } else if(item.deleted == "Y") {
                    itemSold = "Book deleted on ";
                    $('ul ').append('<li data-id="'+ item.id + '" class="idForSaleHistoryBooklistView" ><a href="#" class="saleHistorybookDetailItem">  <div><p class="wrap" style="color:blue;font-size:15px;">' + item.bookname + '&nbsp (Price $ ' + item.price +')</p> <p>' + itemSold +'</p></div></a> <a href="#"  class="ui-state-disabled" data-icon="delete" style="background:green;" data-rel="popup" data-position-to="window" data-transition="pop">Sold></a></li>');
                } else {
                    itemSold = ("Book is not yet sold" );
                    countofUnsold++;
                    $('ul ').append('<li data-id="'+ item.id + '" class="idForSaleHistoryBooklistView" ><a href="#" class="saleHistorybookDetailItem">  <div><p class="wrap" style="color:blue;font-size:15px;">' + item.bookname + '&nbsp (Price $ ' + item.price +')</p> <p>' + itemSold +'</p></div></a> <a href="#"  class="delist" data-icon="bars" style="background:yellow;" data-rel="popup" data-position-to="window" data-transition="pop">Sold></a></li>');
                }
                
                // Original change id $('ul').append('<li data-id="'+ item.id + '" class="idForBooklistView" ><a href="#" class="bookDetailItem"> <img src="' + imagesrc +  '" width="70px" height="70px" /> <div><p class="wrap" style="color:blue;font-size:10px;">' + item.bookname + '</p> <p>' + item.price +'</p></div></a> <a href="#purchase" class="buyItem" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album></a></li>');
                 // with image $('ul').append('<li data-id="'+ item.id + '" class="idForSaleHistoryBooklistView" ><a href="#" class="saleHistorybookDetailItem"> <img src="' + imagesrc +  '" width="70px" height="70px" />  <div><p class="wrap" style="color:blue;font-size:15px;">' + item.bookname + '&nbsp (Price $ ' + item.price +')</p> <p>' + itemSold +'</p></div></a> <a href="#purchase" class="buyItem" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album></a></li>');
              //   $('ul ').append('<li data-id="'+ item.id + '" class="idForSaleHistoryBooklistView" ><a href="#" class="saleHistorybookDetailItem">  <div><p class="wrap" style="color:blue;font-size:15px;">' + item.bookname + '&nbsp (Price $ ' + item.price +')</p> <p>' + itemSold +'</p></div></a> <a href="#"  class="ui-state-disabled" data-icon="check" style="background:green;" data-rel="popup" data-position-to="window" data-transition="pop">Sold></a></li>');
                });
                /*
                $(this).css("background-color", "#333333");
                $(".buyItem").unbind("click");
                $(".buyItem").attr('disabled', 'disabled');
                */
            $('#mysaleHistory').listview("refresh");
            
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
    } // session id sale history data

    //********************  for buy history  ****************************

    if(sessionStorage.getItem("userClick_fromsearch") == "userBuyHistory"){
        $("#pageTitle").html("Purchase History");
        $("#instructions").html("IMPORTANT: Please confirm that you have received the book after picking it up from the seller at the pickup location by clicking on the green check mark next to the respective item. This ensures that the seller receives your payment. For more information, visit the 'Help' page.")
        //var final_url = 'http://192.168.0.19:3000/executive/populatebuyHistory';
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
                    if(item.sold == "Y" && item.purchase_confirm == 'Y')
                    {
                        var myDate = new Date(item.sold_on);

                        itemSold = ("Book purchased on " + myDate.toString());
                        $('ul ').append('<li data-id="'+ item.id + '" class="idForSaleHistoryBooklistView" ><a href="#" class="saleHistorybookDetailItem">  <div><p class="wrap" style="color:blue;font-size:15px;">' + item.bookname + '&nbsp (Price $ ' + item.price +')</p> <p>' + itemSold +'</p></div></a> <a href="#"  class="ui-state-disabled"  data-icon="check" style="background:green;" data-rel="popup" data-position-to="window" data-transition="pop">Sold></a></li>');
                    }else{
                        itemSold = ("Book is not yet RECEIPT CONFIRMED" );
                        $('ul ').append('<li data-id="'+ item.id + '" class="idForSaleHistoryBooklistView" ><a href="#" class="saleHistorybookDetailItem">  <div><p class="wrap" style="color:blue;font-size:15px;">' + item.bookname + '&nbsp (Price $ ' + item.price +')</p> <p>' + itemSold +'</p></div></a> <a href="#" class="buyConfirm" data-icon="bars" style="background:yellow;" data-rel="popup" data-position-to="window" data-transition="pop">Sold></a></li>');
                    }
                    
                    // Original change id $('ul').append('<li data-id="'+ item.id + '" class="idForBooklistView" ><a href="#" class="bookDetailItem"> <img src="' + imagesrc +  '" width="70px" height="70px" /> <div><p class="wrap" style="color:blue;font-size:10px;">' + item.bookname + '</p> <p>' + item.price +'</p></div></a> <a href="#purchase" class="buyItem" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album></a></li>');
                     // with image $('ul').append('<li data-id="'+ item.id + '" class="idForSaleHistoryBooklistView" ><a href="#" class="saleHistorybookDetailItem"> <img src="' + imagesrc +  '" width="70px" height="70px" />  <div><p class="wrap" style="color:blue;font-size:15px;">' + item.bookname + '&nbsp (Price $ ' + item.price +')</p> <p>' + itemSold +'</p></div></a> <a href="#purchase" class="buyItem" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album></a></li>');
                  //   $('ul ').append('<li data-id="'+ item.id + '" class="idForSaleHistoryBooklistView" ><a href="#" class="saleHistorybookDetailItem">  <div><p class="wrap" style="color:blue;font-size:15px;">' + item.bookname + '&nbsp (Price $ ' + item.price +')</p> <p>' + itemSold +'</p></div></a> <a href="#"  class="ui-state-disabled" data-icon="check" style="background:green;" data-rel="popup" data-position-to="window" data-transition="pop">Sold></a></li>');
                    });
                    /*
                    $(this).css("background-color", "#333333");
                    $(".buyItem").unbind("click");
                    $(".buyItem").attr('disabled', 'disabled');
                    */
                $('#mysaleHistory').listview("refresh");
                
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
    $(document).on("click", ".saleHistorybookDetailItem", function () {
        //alert("Approve in idForBooklistView")
        //var clickedId = $(this).attr("id");
        var clickedId = $(this).parents("li").data('id');
       //alert(clickedId);
        //re-direct to detail page and store to sessionstorage
        sessionStorage.setItem("sessionstorage_clickedId", clickedId);
       // alert(sessionStorage.getItem("sessionstorage_clickedId"));
        window.location = "bookDetail.html";
    });

    // delisting the book
    $(document).on("click", ".delist", function () {
      // alert("Delisting " + $(this).parents("li").data("id"));
       var delistId = $(this).parents("li").data("id");
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
    $(document).on("click", ".buyConfirm", function () {
        //alert("Approve in idForBooklistView")
        //var clickedId = $(this).attr("id");
        var buyConfirmId = $(this).parents("li").data('id');
       //alert(clickedId);
        //re-direct to detail page and store to sessionstorage
        sessionStorage.setItem("sessionstorage_buyConfirmId", buyConfirmId);
       // alert(sessionStorage.getItem("sessionstorage_clickedId"));

       navigator.notification.confirm(
        'Would you like to confirm the receipt of the book with id? '+$(this).parents("li").data('id'), // message
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
    

} // starup function ends



function redirect_to_postbook() {
    window.location = "postbook.html";
}

function alertDismissed() {
    // do something
}