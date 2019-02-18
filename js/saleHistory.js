//for payout paraneters
var trxProCharge;
var trxFixed;
var trxPayoutPrice;
var trxCommissionLowerLimit;
var trxCommissionHigherLimit; 
var trxLimit;

//window.addEventListener("load", startup);
document.addEventListener("deviceready", startup, false);

function startup() {
    //console.log(device.platform);
   // alert("rerached search");
   var countofUnsold = 0;

   //$(".loader").fadeOut(1000);
   $(document).bind('mobileinit', function () {
    //Loader settings
    $.mobile.loader.prototype.options.text = "Loading..";
    $.mobile.loader.prototype.options.textVisible = true;
    $.mobile.loader.prototype.options.theme = "b";
    $.mobile.loader.prototype.options.textonly = false; 
    }); 
    /*
    var interval = setInterval(function(){
    $.mobile.loading('hide');
    clearInterval(interval);
    },1);   
    */
   $('.ui-icon-bars').css("background-color", "#333333");
   $('.ui-icon-refresh').css("background-color", "#333333");
   $('.ui-icon-gear').css("background-color", "#333333");

       //payout calculation procedure

       $.ajax({
        type: "POST",
        //url: finalurl,
        url: getPayoutPriceParam_url,
        datatype: "json",
        contentType: "application/json",
        success: function(data, status){
           // alert( JSON.stringify(data));
             var payoutCalcParam  = JSON.stringify(data);
            var payoutCalcParamparse = JSON.parse(payoutCalcParam);
           // alert(payoutCalcParamparse.trxProCharge);
            trxProCharge = payoutCalcParamparse.trxProCharge;
            trxFixed = payoutCalcParamparse.trxFixed;
            trxPayoutPrice = payoutCalcParamparse.trxPayoutPrice;
            trxCommissionLowerLimit = payoutCalcParamparse.trxCommissionLowerLimit;
            trxCommissionHigherLimit = payoutCalcParamparse.trxCommissionHigherLimit; 
            trxLimit = payoutCalcParamparse.trxLimit;           
              
    },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //show error message
            navigator.notification.alert(
                server_notconnecting,  // message
                alertDismissed,         // callback
                'Backend Issues',            // title
                'Done'                  // buttonName
            );
            //alert("error is"+ errorThrown);
            //alert(errorThrown.Message);
        }
    })

    function calculatePayAmount(price){
        var payAmount;
            
            if(price <= 1){
             //$("#payPrice").val("$0");
             return 0;
            }else if( price <= 30 ){
             //payAmount = payAmountElement.getNumber() -   (payAmountElement.getNumber()*0.029) - 0.25 - 0.50 ;
             payAmount = price -   (price*trxProCharge) - trxFixed - trxPayoutPrice - trxCommissionLowerLimit ;
             //$("#payPrice").val("$"+ payAmount.toFixed(2));
             return payAmount.toFixed(2);
            }else{
             payAmount = price -   (price*trxProCharge) - trxFixed - trxPayoutPrice - trxCommissionHigherLimit ;
             //$("#payPrice").val("$"+ payAmount.toFixed(2));
             return payAmount.toFixed(2);
            }
    
    }
    //payout calculation procedure ends

    var sellbookbutton = $('#sellbookbutton').click(function() {
        redirect_to_postbook();
    });

    // Logout click
    $('#getmeBookList').click (function(){
        window.location= "search.html";
    });

    $('#refresh').click (function(){
        //window.location= "saleHistory.html";
        if(sessionStorage.getItem("userClick_fromsearch") == "userBuyHistory"){
            getbuyHistory();
        }
        if(sessionStorage.getItem("userClick_fromsearch") == "userSaleHistory"){
            getSaleHistory();
        }
    });

    

    $("#listFor").html("Purchase history");

    $('[data-role="page"]').on('swipedown',function(){
        alert("swipedown..");
       // window.location = "search.html";
        
        } );
      
    $('[data-role="page"]').on('swipeup',function(){
        alert("swipeup..");
       // window.location = "search.html";
        } );
//find buyer phone number
function findBuyerPhone(tokenEmail,callback){
    //alert("tokeemail is "+tokenEmail);
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
        }
    });
}
//end find buyer phone number    

    
   //for sale history
   function getSaleHistory(){
    if(sessionStorage.getItem("userClick_fromsearch") == "userSaleHistory"){
        //$("#pageTitle").html("Sale History");
        $('#pageTitle').css({ 'color': '#000000', 'font-weight':'bold'});
        $("#pageTitle").html("Sale History");
        
       // $("#instructions").html("");
       // $("#instructions").html("Delete - Book removed from Sale List  <br> Cancel - Cancel the buy deal <br> $ Change - Change price after buyer negotitaion " );
        // var final_url = 'http://192.168.0.19:3000/executive/populatesaleHistory';
       var allItems = '';
       var interval = setInterval(function(){
        $.mobile.loading('show');
        clearInterval(interval);
        },1);  
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
               // alert(item.id);
               if (item.deleted == 'Y'){

                //itemtext = "Transaction id : "+ item.tokenId + ".\n You DELETED this item on "+new Date(item.buyconfirmDate).toDateString();
                itemtext = "Transaction id : "+ item.tokenId + ".\n You DELETED this item on "+ moment(item.deleted_on).format('ll');
                allItems += '<li data-rowid="' + item.id + '"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.id + ')'+ item.bookname + '<br> Price: $'+ item.price +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p></div></a></li>';
                
               }else if (item.status == 'C'){
                //findBuyerPhone(item.tokenEmail,function (err,success){
                //alert(success);
                //itemtext = "Transaction id : "+ item.tokenId + '.\n' +"You SOLD this item on "+new Date(item.buyconfirmDate).toDateString();
                itemtext = "Transaction id : "+ item.tokenId + '.\n' +"You SOLD this item on "+ moment(item.buyconfirmDate).format('ll');
                allItems += '<li data-rowid="' + item.id + '"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.id + ')'+ item.bookname + '<br> Price: $'+ item.price +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p></div></a></li>';
                //});
               }else if (item.status == 'A' && item.priceChanged == 'Y'){
                //find buyer's phone number and provide details
                
                //var buyerPhone = findBuyerPhone(item.tokenEmail);
                //end finding phine number

                //itemtext = "Transaction id : "+ item.tokenId + ".\n Buyer offered to buy this on "+  new Date(item.offered_on).toDateString() + ".\n You changed price on "+ new Date(item.price_Changedon).toDateString();
                itemtext = "Transaction id : "+ item.tokenId + ".\n Buyer offered to buy this on "+  moment(item.offered_on).format('ll') + ".\n You changed price on "+ moment(item.price_Changedon).format('llll');
                allItems += '<li data-price= "'+item.price+'"data-rowid="' + item.id + '"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">ID:' + item.id + ' ) '+ item.bookname + '<br> Price: $'+ item.price +', Revised to: $' +item.newPrice + '<br> '+ itemtext +'</p><button disabled class="delist">Del</button><button class="cancelSale">Cancel</button><button disabled class="salePriceChange">Change $</button></div></a></li>';
               
               }else if (item.status == 'A'){

                //itemtext = "Transaction id : "+ item.tokenId + ".\n Buyer OFFERED on "+ new Date(item.offered_on).toDateString();
                itemtext = "Transaction id : "+ item.tokenId + ".\n Buyer OFFERED on "+ moment(item.offered_on).format('ll');
                allItems += '<li data-price= "'+item.price+'"data-rowid="' + item.id + '"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.id + ')'+ item.bookname + '<br> Price: $'+ item.price +'<br>'+ itemtext +'</p><button disabled class="delist">Del</button><button class="cancelSale">Cancel</button><button class="salePriceChange">Change $</button></div></a></li>';
               
                }else if(item.status == null){

                itemtext = "Book is not yet sold";
                allItems += '<li data-rowid="' + item.id + '"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.id + ')'+ item.bookname + '<br> Price: $'+ item.price +'<br>'+ itemtext +'</p><button class="delist">Del</button><button disabled class="cancelSale">Cancel</button><button disabled class="salePriceChange">Change $</button></div></a></li>';
               // allItems += '<li data-rowid="' + item.id + '"><a href="#"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.id + ')'+ item.bookname + '<br> Price: $'+ item.price +'<br>'+ itemtext +'</p><div data-role="controlgroup" data-type="horizontal"><button class="delist">Del</button><button disabled class="cancelSale">Cancel</button><button disabled class="salePriceChange">Change $</button></div></a></li>';   
               }else if(item.status == 'V'){
                
                    if (item.salecancelDate !=  '0000-00-00 00:00:00'){
 
                         //itemtext = "Transaction id : "+ item.tokenId + ".\n You CANCELLED this Transaction on " + new Date(item.salecancelDate).toDateString();
                         itemtext = "Transaction id : "+ item.tokenId + ".\n You CANCELLED this Transaction on " + moment(item.salecancelDate).format('ll');
                         allItems += '<li data-rowid="' + item.id + '"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.id + ')'+ item.bookname + '<br> Price: $'+ item.price +'<br>'+ itemtext +'</p></div></a></li>';
        
                        }else{

                         //itemtext = "Transaction id : "+ item.tokenId + ".\n Buyer CANCELLED this Transaction on " + new Date(item.buycancelDate).toDateString();
                         itemtext = "Transaction id : "+ item.tokenId + ".\n Buyer CANCELLED this Transaction on " + moment(item.buycancelDate).format('ll');
                         allItems += '<li data-rowid="' + item.id + '"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.id + ')'+ item.bookname + '<br> Price: $'+ item.price +'<br>'+ itemtext +'</p></div></a></li>';
                
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
    } // session id sale history data
}

                getSaleHistory();

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

    function getbuyHistory(){

    if(sessionStorage.getItem("userClick_fromsearch") == "userBuyHistory"){
        //$("#pageTitle").html("Purchase History");
        $('#pageTitle').css({ 'color': '#000000', 'font-weight':'bold'});
        $("#pageTitle").html("Purchase History");
       // $("#instructions").html("IMPORTANT: Please confirm that you have received the book after picking it up from the seller at the pickup location by clicking on the green check mark next to the respective item. This ensures that the seller receives your payment. For more information, visit the 'Help' page.")
       $("#instructions").html('Learn more - Buy confirm ,Canel <a href="#popupInfo" data-rel="popup" data-transition="pop" class="my-tooltip-btn ui-btn ui-alt-icon ui-nodisc-icon ui-btn-inline ui-icon-info ui-btn-icon-notext" title="Learn more">Learn more</a>'); 
       $("#popupInfo").html("Click <strong> Buy Confirm </strong> to confirm receipt of book. This is required to be done<br> Click<strong> Cancel </strong> to cancel the deal.");
       //var final_url = 'http://192.168.0.19:3000/executive/populatebuyHistory';
        var allItems = '';
        var interval = setInterval(function(){
            $.mobile.loading('show');
            clearInterval(interval);
            },1);  
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
                    if (item.status == 'C'){
                        //moment(item.buycancelDate).format('ll')
                        //itemtext = "Transaction id : "+ item.tokenId + ".\n You PURCHASED this item on "+new Date(item.buyconfirmDate).toDateString();
                        itemtext = "Transaction id : "+ item.tokenId + ".\n You PURCHASED this item on "+ moment(item.buyconfirmDate).format('ll');
                        allItems += '<li data-rowid="' + item.bookId + '"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.bookId + ')'+ item.bookName + '<br> Price: $'+ item.price +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p></div></a></li>';
                        
                       }else if (item.status == 'A' && item.revised_price > 0){
        
                        //itemtext = "Transaction id : "+ item.tokenId + ".\n You OFFERED to buy this item on "+ new Date(item.posted_on).toDateString() +"\n Seller revised price on " + new Date(item.priceRevised_on).toDateString()
                        itemtext = "Transaction id : "+ item.tokenId + ".\n You OFFERED to buy this item on "+ moment(item.posted_on).format('ll') +"\n.Seller revised price on " + moment(item.priceRevised_on).format('llll');
                        allItems += '<li data-rowid="' + item.bookId + '"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.bookId + ')'+ item.bookName + '<br> Price: $'+ item.price +', Revised Price : $'+ item.revised_price +'<br>'+ itemtext +'</p><button class="buyConfirm">Buy Confirm</button><button class="buyCancel">Cancel</button></div></a></li>';
                       
                       }else if (item.status == 'A'){
        
                        //itemtext = "Transaction id : "+ item.tokenId + ".\n You OFFERED to buy this item on " + new Date(item.posted_on).toDateString();
                        itemtext = "Transaction id : "+ item.tokenId + ".\n You OFFERED to buy this item on " + moment(item.posted_on).format('ll');
                        allItems += '<li data-rowid="' + item.bookId + '"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.bookId + ')'+ item.bookName + '<br> Price: $'+ item.price +'<br>'+ itemtext +'</p><button class="buyConfirm">Buy Confirm</button><button class="buyCancel">Cancel</button></div></a></li>';
                       
                       }else if(item.status == 'V'){
                           if (item.buycancelDate != '0000-00-00 00:00:00'){
        
                                //itemtext = "Transaction id : "+ item.tokenId + ".\n You CANCELLED this Transaction on " + new Date(item.buycancelDate).toDateString();
                                itemtext = "Transaction id : "+ item.tokenId + ".\n You CANCELLED this Transaction on " + moment(item.buycancelDate).format('ll');
                                allItems += '<li data-rowid="' + item.bookId + '"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.bookId + ')'+ item.bookName + '<br> Price: $'+ item.price +'<br>'+ itemtext +'</p></div></a></li>';
                           }else
                           {

                                //itemtext = "Transaction id : "+ item.tokenId + ".\n Seller CANCELLED this Transaction on " + new Date(item.salecancelDate).toDateString();
                                itemtext = "Transaction id : "+ item.tokenId + ".\n Seller CANCELLED this Transaction on " + moment(item.salecancelDate).format('ll');
                                allItems += '<li data-rowid="' + item.bookId + '"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.bookId + ')'+ item.bookName + '<br> Price: $'+ item.price +'<br>'+ itemtext +'</p></div></a></li>';

                           }
                      
                            }
         
                        });
                    
                
                $("#thelist").empty().append(allItems).listview("refresh").enhanceWithin();
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

    }// session id end for purchasehistory data
}
            getbuyHistory();
    
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
        'Would you like to delete this book?', // message
         onDelist,            // callback to invoke with index of button pressed
        'Delete',           // title
        ['Confirm','Cancel']     // buttonLabels
    );
       //var final_url = 'http://192.168.0.19:3000/executive/delist';
       function onDelist(buttonIndex){
        if(buttonIndex == 1){
            var interval = setInterval(function(){
                $.mobile.loading('show');
                clearInterval(interval);
                },1); 
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
                console.log("json is"+JSON.stringify(response));
                        var JSONStringify = JSON.stringify(response);
                        var JSONparse = JSON.parse(JSONStringify);
                        console.log("responce is " + JSONparse.code + "other "+ JSONStringify.code);
                //var JSONResponse = JSON.stringify(response);
                //var jsonparse = JSON.parse(JSONResponse);
                if (response.code == 441) {
                //alert("delisting 441");
                navigator.notification.alert(
                    'Your book was successfully deleted',  // message
                    alertDismissed,         // callback
                    'Success',            // title
                    'Done'                  // buttonName
                );
                //alert(response.success);
                }
                if (response.code == 442) {
                //alert("delisting 442");
                navigator.notification.alert(
                    'Your book could not be deleted as it may have been sold while you were trying to delete it. A book cannot be deleted after it has been sold. Refresh your browser to get the latest details about this book.',  // message
                    alertDismissed,         // callback
                    'Not Done',            // title
                    'Done'                  // buttonName
                );
                //alert(response.failed);
                }
                var interval = setInterval(function(){
                    $.mobile.loading('hide');
                    clearInterval(interval);
                    },1); 
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
                var interval = setInterval(function(){
                    $.mobile.loading('hide');
                    clearInterval(interval);
                    },1); 
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
                        
                        window.location ="saleHistory.html";
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

                        setTimeout(function(){ window.location ="saleHistory.html"; }, 2000);
                        
                        
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





    //CANCEL BUY ends

 //----- CANCEL SALE starts
            $("#thelist").on("click", ".cancelSale", function(e){
                e.stopImmediatePropagation();
            //$(document).on("click", ".buyConfirm", function () {
                //alert("Approve in idForBooklistView")
                //var clickedId = $(this).attr("id");
                var cancelSaleId = $(this).parents("li").data('rowid');
            //alert(cancelSaleId);
                //re-direct to detail page and store to sessionstorage
                sessionStorage.setItem("sessionstorage_cancelSaleId", cancelSaleId);
            // alert(sessionStorage.getItem("sessionstorage_clickedId"));

            navigator.notification.confirm(
                'Would you like to cancel this sale? If you do, the buyer will be notified about the cancellation and the book will appear for sale again.\n  If you would like to delete this book from your sale list, please delete it after cancelling this sale.', // message
                onConfirm,            // callback to invoke with index of button pressed
                'Cancel Sale ',           // title
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
                                console.log("json is"+JSON.stringify(response));
                                var JSONStringify = JSON.stringify(response);
                             var JSONparse = JSON.parse(JSONStringify);
                             console.log("responce is " + JSONparse.code + "other "+ JSONStringify.code);
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

                                if (response.code == 440) {
                                    //alert("delisting 441");
                                    navigator.notification.alert(
                                        //'Sale cancel confirmed',  // message
                                        response.message,
                                        alertDismissed,         // callback
                                        'Confirmed',            // title
                                        'Done'                  // buttonName
                                    );
                                    //alert(response.success);
                                    //window.location ="saleHistory.html";
                                    };
                                    var interval = setInterval(function(){
                                        $.mobile.loading('hide');
                                        clearInterval(interval);
                                        },1); 
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
            

 //end CANCEL SALE 

 //SALE PRICE CHANGE
 //class="salePriceChange"
 $("#thelist").on("click", ".salePriceChange", function(e){
    e.stopImmediatePropagation();
    var payAmount;
    var oldPricefromli = $(this).parents("li").data('price');
    var newPriceId = $(this).parents("li").data('rowid');
    sessionStorage.setItem("sessionstorage_newPriceId", newPriceId);

   // alert( " pricelist change");
    //alert("from li" + oldPricefromli + "id is" + newPriceId);

    function changePrice() {
        var newPrice;
        //var payAmount;
        var newPrice = prompt("Your current price is$ "+ oldPricefromli+".Please enter a new price:");
        var differenceInPrice = Math.abs(newPrice - oldPricefromli);
        if (newPrice == null || newPrice == "" || isNaN(newPrice) ) {
          //alert("The price hasn't been changed");
          navigator.notification.confirm(
            'You did not change price or you have not entered number. Please try again', // message
            alertDismissed,            // callback to invoke with index of button pressed
            'Change Price',           // title
            'Done'       // buttonLabels
        );
        } else if((oldPricefromli - newPrice ) < 0 ){
            navigator.notification.confirm(
                'You can only reduce price. It seems that your revised price is more that earlier quoted price. You will have to delete and re-post if you would like to increase price', // message
                alertDismissed,            // callback to invoke with index of button pressed
                'Change Price',           // title
                'Done'       // buttonLabels
            ); 
        }else {
            payAmount = calculatePayAmount(newPrice);
            //alert(payAmount);
            navigator.notification.confirm(
                'Are you sure you want to change the price of this book? Your current price is ' + oldPricefromli + ' and your new price is ' + newPrice + '. The difference between your new price and your old price is ' + differenceInPrice + ' and accordingly you will receieve payment of $'+ payAmount +'.', // message
                 onChangePrice,            // callback to invoke with index of button pressed
                'Change Price',           // title
                ['Change Price','Do Not Change']     // buttonLabels
            );

            function onChangePrice(buttonIndex) {
                if (buttonIndex == 1) {
                // alert(payAmount); 
                var interval = setInterval(function(){
                    $.mobile.loading('show');
                    clearInterval(interval);
                    },1);   
                $.ajax({
                type: "POST",
                url: changePrice_url,
                dataType: "json",
                //timeout: 100000,
                data: JSON.stringify( { 
                    "newPrice": newPrice,
                    "bookId": newPriceId,
                    "payAmount":payAmount
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

                    if (response.code == 480) {
                        //alert("delisting 441");
                        navigator.notification.alert(
                            //'The price of this book has been changed.',  // message
                            response.failed,
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
                    var interval = setInterval(function(){
                        $.mobile.loading('hide');
                        clearInterval(interval);
                        },1); 
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

