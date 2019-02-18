//console.log("before entering buybook now");
//window.addEventListener("load", startup);
document.addEventListener("deviceready", startup, false);

function startup() {
//alert("reached bookDetail");
var CLIENT_AUTHORIZATION;
//for payout paraneters
var trxProCharge;
var trxFixed;
var trxPayoutPrice;
var trxCommissionLowerLimit;
var trxCommissionHigherLimit; 
var trxLimit;

$(".loader").fadeOut(1300);
$(".ajaxloader").fadeOut(1600);
//$(".myloader").fadeOut(100);

    $('.ui-icon-carat-l').css("background-color", "#333333");
   $('.ui-icon-power').css("background-color", "#333333");
   $('.ui-icon-gear').css("background-color", "#333333");

$(document).bind('mobileinit', function () {
    //Loader settings
    $.mobile.loader.prototype.options.text = "Loading..";
    $.mobile.loader.prototype.options.textVisible = false;
    $.mobile.loader.prototype.options.theme = "a";
    $.mobile.loader.prototype.options.textonly = ""; 
}); 
console.log("entering buybook now");
/*
var interval = setInterval(function(){
    $.mobile.loading('show',{
        text: 'foo',
        textVisible: true,
        theme: 'z',
        html: "<span class='ui-bar ui-overlay-c ui-corner-all'><img src='./css/5.gif' /><h2>.. Page is loading</h2></span>"
      });

    clearInterval(interval);
    },1); 
*/
$(document).ajaxStop(function() {
   // $("#ajax_loader").hide();
    //alert("end");
    console.log("ajaxstop at"+new Date().getTime());
});
$(document).ajaxStart(function() {
  //  $("#ajax_loader").show();

    console.log("ajaxstart at"+ new Date().getTime());
});

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
 
//goback event
if (device.platform == "Android")
{
   // alert("device.platform");
    $( "#getmeback" ).hide();
}
/*
$('#testPushinbuybook').click(function(){
    //alert("Testing pushnotify");
    sendPushnotofication();
});
*/

$( "#getmeback" ).click(function() {
    //alert( "Handler for .click() called." );
    window.location = "search.html";
  });

//back event


//var final_url = 'http://192.168.0.19:3000/executive/populatebookDetail';

 var selectedBookId = sessionStorage.getItem("selectedBookIdforPurchase");
//alert("from bookdetail -->" + selectedBookId);
 $.ajax({
     type: "POST",
     url: populatebookDetail_url,
     dataType: "json",
     //timeout: 100000,
     data: JSON.stringify( { "id": selectedBookId } ),
     contentType: "application/json",
     success: function(data, status){
         
         $.each(data, function(i, item) {
             var imagesrc = item.picture;
             imagesrc = "http://192.168.0.19:3000//images/"+imagesrc;
             sessionStorage.setItem("selectedbooksellername", item.username)
             
         //$('ul').append('<li><a href="#"><h2>' + item.bookname + '</h2><p>' + item.price + '</p></a><a href="#purchase"></a></li>');
        // $('ul').append('<li><a href="#"><h2>' + item.bookname + '</h2><p>' + item.price + '<li><img src="http://192.168.0.19:3000//images/28c7fa2701bd726000457ac7286ed926" /></li>'  + '</p></a><a href="#purchase"></a></li>');
        // $('ul').append('<li id="'+ item.id + '" class="idForBooklistView" ><a href="#"> <img src="' + imagesrc +  '" width="80px" height="80px" /> <div>' + item.bookname + ' <p>' + item.price +'</p></div></a> <a href="#purchase" data-rel="popup" data-position-to="window" data-transition="pop">Purchase album></a></li>');
        console.log("output from bookdetail -->"+ item.bookname);
        var imagesrc = item.picture;
        var imagesrc2 = item.picture2;
        var imagesrc3 = item.picture3;
        //imagesrc = "http://192.168.0.19:3000//images/"+imagesrc;
        imagesrc = imagesavelocation_url+imagesrc;
        //imagesrc2 = "http://192.168.0.19:3000//images/"+imagesrc2;
        imagesrc2 = imagesavelocation_url + imagesrc2;
       // imagesrc3 = "http://192.168.0.19:3000//images/"+imagesrc3;
        imagesrc3 = imagesavelocation_url + imagesrc3;
        $( "#bookName" ).html(item.bookname);
        sessionStorage.setItem("selectedbuyBookPrice",item.price);
        sessionStorage.setItem("selectedbuyBookName",item.bookname);
        $( "#bookName" ).html(item.bookname);
        $( "#price" ).html("$ "+item.price);
        $( "#university" ).html(item.uniName);
        $( "#smallImage" ).attr('src', imagesrc);
        $( "#smallImage2" ).attr('src', imagesrc2);
        $( "#smallImage3" ).attr('src', imagesrc3);
     });
     
     var interval = setInterval(function(){
        $.mobile.loading('hide');
        clearInterval(interval);
        },1); 
     
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        //show error message
        navigator.notification.alert(
            'Error - Not able to fetch relevant book details',  // message
            alertDismissed,         // callback
            'Buy Success',            // title
            'Done'                  // buttonName
        );
        //alert ("Error - Not able to fetch relevant book details");
        //alert("error is"+ errorThrown);
        //alert(XMLHttpRequest);
        var interval = setInterval(function(){
            $.mobile.loading('hide');
            clearInterval(interval);
            },1); 
    }
    
});
//code for stripe checkout

/* commnebted working code fr stripe
        $('#myForm').on('submit', function(e) { 
            // Open Checkout with further options:
            //alert("test alert");
            
            handler.open({
            name: sessionStorage.getItem("selectedbuyBookName"),
            description: sessionStorage.getItem("selectedbuyBookName"),
            zipCode: true,
            amount: sessionStorage.getItem("selectedbuyBookPrice")*100
            });
            e.preventDefault(
                //alert("Transaction update failed")
            );
        });
        
        // Close Checkout on page navigation:
        window.addEventListener('popstate', function() {
            handler.close();
        });
*/

//code ends for stripe checkout


//code starts for braintree non paypal payment

var button = document.querySelector('#submit-button');

  braintree.dropin.create({
    // Insert your tokenization key here
    authorization: 'sandbox_5gz3rj7v_xbysnvxcgkmbq2sg',
    container: '#dropin-container'
  }, function (createErr, instance) {
      //you need to add error handler here
    if(createErr)  {
        navigator.notification.alert(
            createErr,  // message
            alertDismissed,         // callback
            'Error',            // title
            'Done'                  // buttonName
        );

    }else {
    button.addEventListener('click', function () {
     
      instance.requestPaymentMethod(function (requestPaymentMethodErr, payload) {
        // When the user clicks on the 'Submit payment' button this code will send the
        // encrypted payment information in a variable called a payment method nonce
        //alert(requestPaymentMethodErr);
        if (requestPaymentMethodErr){
            navigator.notification.alert(
                //requestPaymentMethodErr.message,  // message
                "Please provide correct Credit card details. please try again. ",
                alertDismissed,         // callback
                'Error',            // title
                'Done'                  // buttonName
            );
            window.location= "buybook.html";
        } else if (payload.nonce){
            //console.log(payload.nonce);
            /*
            var interval = setInterval(function(){
                $.mobile.loading('show',{
                    text: 'foo',
                    textVisible: true,
                    theme: 'z',
                    html: "<span class='ui-bar ui-overlay-c ui-corner-all'><img src='./css/5.gif' /><h2>Your Transaction is being processed</h2></span>"
                  });
            
                clearInterval(interval);
                },1); 
                */
                var interval = setInterval(function(){
                    $.mobile.loading('show');
                    clearInterval(interval);
                    },1); 
               
       // alert ("not working");
        //var testurl =  'http://booksite.a2hosted.com:35001/executive/braintreeCheckout';


        $.ajax({
          type: 'POST',
          url: braintreeCheckout_url,
          //url : testurl,
          data: {
          "paymentMethodNonce": payload.nonce,
          "bookName": sessionStorage.getItem("selectedbuyBookName"),
          "bookId": sessionStorage.getItem("selectedBookIdforPurchase"), 
          "price": sessionStorage.getItem("selectedbuyBookPrice"), 
          "purchased_by" : sessionStorage.getItem("usernameId"),
          "paymentProvider" : "Braintree",
          "payAmount":calculatePayAmount(sessionStorage.getItem("selectedbuyBookPrice"))
          }
       
        }).done(function(result) {
          // Tear down the Drop-in UI
          instance.teardown(function (teardownErr) {
            if (teardownErr) {
              console.log('Could not tear down Drop-in UI!');
            } else {
              console.log('Drop-in UI has been torn down!');
              // Remove the 'Submit payment' button
              $('#submit-button').remove();
            }
          });
          //alert(result);
          if(result.code == 421){
            console.log("Book deleted or sold");
            navigator.notification.alert(
                //result.message,  // message
                "book is deleted etc",
                alertDismissed,         // callback
                'Buy Success',            // title
                'Done'                  // buttonName
            );
            window.location = "search.html";

          }else if (result.code == 422) {
          //  $('#checkout-message').html('<h1>Success</h1><p>Your Drop-in UI is working! Check your <a href="https://sandbox.braintreegateway.com/login">sandbox Control Panel</a> for your test transactions.</p><p>Refresh to try another transaction.</p>');
            console.log("Book Bought");
            navigator.notification.alert(
                'Your transaction was completed successfully. The seller will contact you on the phone number associated with your account to discuss a pickup location for the item.',  // message
                alertDismissed,         // callback
                'Transaction Successful',            // title
                'Done'                  // buttonName
            );
             sendPushnotofication();
             window.location = "search.html";
        } else if (result.code == 423){
            console.log(result);
            navigator.notification.alert(
                'Update of Buy failed',  // message
                alertDismissed,         // callback
                'Buy Success',            // title
                'Done'                  // buttonName
            );
            window.location = "search.html";
           // $('#checkout-message').html('<h1>Error</h1><p>Check your console.</p>');
          }else{
            navigator.notification.alert(
                'Oops , Something went wrong while Purchase. Please contact admin',  // message
                alertDismissed,         // callback
                'Buy Success',            // title
                'Done'                  // buttonName
            );
            window.location = "search.html";


          }
          var interval = setInterval(function(){
            $.mobile.loading('hide');
            clearInterval(interval);
            },1); 
        })  // done complete
        .fail(function(data) {
           /*
            if ( data.responseCode )
              console.log( data.responseCode );
            */
              navigator.notification.alert(
                'Something went wrong while completing transaction(Code: AJ Failure). Please try again'+data.responseCode,  // message
                alertDismissed,         // callback
                'Error',            // title
                'Done'                  // buttonName
            );
            var interval = setInterval(function(){
                $.mobile.loading('hide');
                clearInterval(interval);
                },1); 
            
            window.location = "search.html";
          });


        } else{  // if payment nonce turns our dud
            navigator.notification.alert(
                'Something went wrong while completing transaction. Please try again',  // message
                alertDismissed,         // callback
                'Error',            // title
                'Done'                  // buttonName
            );
            var interval = setInterval(function(){
                $.mobile.loading('hide');
                clearInterval(interval);
                },1); 
            window.location = "search.html";    

        } //end if else statment for instance paymethod
      }); // instance requestpaymethod ends
    });//button click event ends
    }  //if else for button creation error ends
}//button creation function ends
);

//code ends for braintree

//****** code for braintree paypal payment ******

                // Be sure to have PayPal's checkout.js library loaded on your page.
                // <script src="https://www.paypalobjects.com/api/checkout.js" data-version-4></script>
                //generate token
                var CLIENT_AUTHORIZATION;
                /*
                $.ajax({
                    type: "POST",
                    //url: finalurl,
                    url: populatePaypalToken_url,
                    datatype: "json",
                    contentType: "application/json",
                    success: function(data, status){
                        
                            console.log("Output is"+data);
                            //alert("data output is "+data);
                            //CLIENT_AUTHORIZATION = data;
                                
                          
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
                */
                // Create a client. I am doing this using tokenization
                braintree.client.create({
                    authorization: 'sandbox_5gz3rj7v_xbysnvxcgkmbq2sg'
                   // authorization: CLIENT_AUTHORIZATION
                    
                    
                }, function (clientErr, clientInstance) {
                
                    // Stop if there was a problem creating the client.
                    // This could happen if there is a network error or if the authorization
                    // is invalid.
                    if (clientErr) {
                    console.error('Error creating client:', clientErr);
                    return;
                    }
                
                    // Create a PayPal Checkout component.
                    braintree.paypalCheckout.create({
                    client: clientInstance
                    }, function (paypalCheckoutErr, paypalCheckoutInstance) {
                
                    // Stop if there was a problem creating PayPal Checkout.
                    // This could happen if there was a network error or if it's incorrectly
                    // configured.
                    if (paypalCheckoutErr) {
                        console.error('Error creating PayPal Checkout:', paypalCheckoutErr);
                        return;
                    }
                
                    // Set up PayPal with the checkout.js library
                    paypal.Button.render({
                        //env: 'production', // Or 'sandbox'
                        env:  'sandbox',
                        commit: true, // This will add the transaction amount to the PayPal button
                
                        payment: function () {
                        return paypalCheckoutInstance.createPayment({
                            flow: 'checkout', // Required
                            amount: sessionStorage.getItem("selectedbuyBookPrice"), // Required
                            currency: 'USD' // Required
                            /*
                            enableShippingAddress: true,
                            shippingAddressEditable: false,
                            shippingAddressOverride: {
                            recipientName: 'Scruff McGruff',
                            line1: '1234 Main St.',
                            line2: 'Unit 1',
                            city: 'Chicago',
                            countryCode: 'US',
                            postalCode: '60652',
                            state: 'IL',
                            phone: '123.456.7890'
                            
                            }
                            */
                        });
                        },
                        
                        onAuthorize: function (data, actions) {
                           // $.mobile.loading('show');
                           var interval = setInterval(function(){
                            $.mobile.loading('show',{
                                text: 'foo',
                                textVisible: true,
                                theme: 'z',
                                html: "<span class='ui-bar ui-overlay-c ui-corner-all'><img src='./css/5.gif' /><h2>Your Transaction is being processed</h2></span>"
                              });
                        
                            clearInterval(interval);
                            },1); 
                           // $(".ajaxloader").show();
                        return paypalCheckoutInstance.tokenizePayment(data, function (err, payload) {
                          // alert("buy by papal complete"+payload.nonce+payload.details.email+""+payload.details.payerId +"-");
                           // window.location = "search.html";
                            //submit details to server to post sale transactions
                            
                            
                           // $.mobile.loading('show');
                            //$(".ajaxloader").show();
                            //$(".myloader").show();
                            $.ajax({
                                type: "POST",
                                //url: finalurl,
                                url: updateBraintreePaypalBuyTransaction_url,
                                datatype: "json",
                                data: JSON.stringify({
                                    "paymentMethodNonce": payload.nonce,
                                    "bookName": sessionStorage.getItem("selectedbuyBookName"),
                                    "bookId": sessionStorage.getItem("selectedBookIdforPurchase"), 
                                    "price": sessionStorage.getItem("selectedbuyBookPrice"), 
                                    "purchased_by" : sessionStorage.getItem("usernameId"),
                                    "paymentProvider" : "Paypal_Braintree",
                                    "payAmount":calculatePayAmount(sessionStorage.getItem("selectedbuyBookPrice"))
                                   
                                    }),
                                contentType: "application/json",
                                success: function(data, status){
                                      // $.mobile.loading('hide');
                                       
                                       //$(".ajaxloader").fadeOut(300);
                                       var interval = setInterval(function(){
                                        $.mobile.loading('hide')
                                    
                                        clearInterval(interval);
                                        },1); 
                                       //$(".myloader").fadeOut(300);
                                        console.log("Output is"+data);
                                        //alert("Book has been purchased  is ");
                                        if(data.code == 443)
                                        {
                                           // alert("Transaction successful");
                                            navigator.notification.alert(
                                                //'Buy Transaction is successful',  // message
                                                data.success,
                                                alertDismissed,         // callback
                                                'Buy Success',            // title
                                                'Done'                  // buttonName
                                            );
                                            sendPushnotofication();
                                        }
                                        if(data.code == 442)
                                        {
                                            navigator.notification.alert(
                                                //'Buy Transaction is successful',  // message
                                                data.error,
                                                alertDismissed,         // callback
                                                'Buy Error',            // title
                                                'Done'                  // buttonName
                                            );
                                            //alert("Transaction failed "+ data.error);
                                        }

                                        if(data.code == 445)
                                        {
                                            navigator.notification.alert(
                                                //'Buy Transaction is successful',  // message
                                                data.error,
                                                alertDismissed,         // callback
                                                'Buy Error',            // title
                                                'Done'                  // buttonName
                                            );
                                            //alert("Transaction failed "+ data.error);
                                        }
                                        
                                        
                                        //CLIENT_AUTHORIZATION = data;
                                        window.location = "search.html";
                                            
                                      
                            },
                                error: function(XMLHttpRequest, textStatus, errorThrown) {
                                    //show error message
                                    //$(".myloader").fadeOut(100);
                                    //$(".ajaxloader").fadeOut(300);
                                    var interval = setInterval(function(){
                                        $.mobile.loading('hide')
                                    
                                        clearInterval(interval);
                                        },1); 
                                    navigator.notification.alert(
                                        server_notconnecting,  // message
                                        alertDismissed,         // callback
                                        'Backend Issues',            // title
                                        'Done'                  // buttonName
                                    );
                                    //alert("error is"+ errorThrown);
                                    //alert(errorThrown.Message);
                                }


                            // Submit `payload.nonce` to your server
                        });
                    });
                        },
                
                        onCancel: function (data) {
                        console.log('checkout.js payment cancelled', JSON.stringify(data, 0, 2));
                        },
                
                        onError: function (err) {
                        console.error('checkout.js error', err);
                        }
                    }, '#paypal-button').then(function () {
                        // The PayPal button will be rendered in an html element with the id
                        // `paypal-button`. This function will be called when the PayPal button
                        // is set up and ready to be used.
                    });
                
                    });
                
                });


//******* code end for non braintree paypal payment

//****************************************paypal checkout ************** */
/*
                paypal.Button.render({
                    // Configure environment
                    env: 'sandbox',
                    client: {
                    sandbox: 'AUrUkOIbK1wpMzJQuGPS46DYDW8PgKMgbyHy_W_eagFErhyBXECEDwS3DBhM3hn17YOSA-X6tVfcb2X7',
                    //production: 'demo_production_client_id'
                    },
                    // Customize button (optional)
                    locale: 'en_US',
                    style: {
                    size: 'small',
                    color: 'gold',
                    shape: 'pill',
                    },

                    // Enable Pay Now checkout flow (optional)
                    commit: true,

                    // Set up a payment
                    payment: function(data, actions) {
                    return actions.payment.create({
                        transactions: [{
                        amount: {
                            total: '0.01',
                            currency: 'USD'
                        }
                        }]
                    });
                    },
                    // Execute the payment
                    onAuthorize: function(data, actions) {
                    return actions.payment.execute().then(function(data) {
                        // Show a confirmation message to the buyer
                        
                        //var dataOutput = JSON.parse(data);
                        console.log(data);
                        alert("buy  papal complete");
                            window.location = "search.html";
                       // window.alert('Thank you for your purchase!');
                    });
                    }
                }, '#paypal-button');
*/

 //*****************************paypal checkout ends */

}// end startup

function sendPushnotofication(){
    console.log("reached send push")
   // var final_url = 'http://192.168.0.19:3000/executive/pushmessage';
    username_Id = sessionStorage.getItem("selectedbooksellername");
   // alert(username_Id);
    $.ajax({
        type: "POST",
        url: pushmessage_url,
        dataType: "json",
        //data: JSON.stringify( { "userName": "championved@gmail.com"} ),
        data: JSON.stringify( { 
            "userName": username_Id, 
            "bookName": sessionStorage.getItem("selectedbuyBookName"),
            "bookId": sessionStorage.getItem("selectedBookIdforPurchase")
        } ),
        contentType: "application/json",
        success: function(response) {
           // alert("push send successfully");
           var JSONResponse = JSON.parse(response);
           //alert(JSONResponse);
           //var jsonparse = JSON.parse(JSONResponse);
            
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //show error message
            //alert("error from sendpushnotification");
            //alert("error is"+ errorThrown);
            //alert(XMLHttpRequest);
        }
    }); 

}

/* commented working code for strip
var handler = StripeCheckout.configure({
    // key: 'pk_test_N8XbXnvwxfe3KQPDmrq8pobu',
     key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
     image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
     locale: 'auto',
     token: function(token) {
       //ajax request to send data to executive.js and then siteController in the backend
       // You can access the token ID with `token.id`.
       // Get the token ID to your server-side code for use.
                 //var final_url = 'http://192.168.0.19:3000/executive/updateStripeBuyTransaction';
                 console.log(token.id + token.email);

                 $.ajax({
                     type: "POST",
                     url: updateStripeBuyTransaction_url,
                     dataType: "json",
                     data: JSON.stringify( 
                         { "bookName": sessionStorage.getItem("selectedbuyBookName"),
                          "bookId": sessionStorage.getItem("selectedBookIdforPurchase"), 
                          "price": sessionStorage.getItem("selectedbuyBookPrice"), 
                          "stripeTokenId": token.id, 
                          "stripeTokenEmail": token.email,
                          "purchased_by" : sessionStorage.getItem("usernameId"),
                          "paymentProvider" : "Stripe"
                         } ),
                     contentType: "application/json",
                     success: function(response) {
                         var JSONResponse = JSON.stringify(response);
                         //alert("Buy Transaction is successful");
                         navigator.notification.alert(
                            'Buy Transaction is successful',  // message
                            alertDismissed,         // callback
                            'Buy Success',            // title
                            'Done'                  // buttonName
                        );
                         sendPushnotofication();
                         window.location = "search.html";
                         
                     },
                     error: function(XMLHttpRequest, textStatus, errorThrown) {
                         //show error message
                         navigator.notification.alert(
                            'Update of Buy failed',  // message
                            alertDismissed,         // callback
                            'Buy Success',            // title
                            'Done'                  // buttonName
                        );
                         //alert("Update of Token id failed");
                         //alert("error is"+ errorThrown);
                         //alert(errorThrown.Message);
                     }
                 });     
     }
   });//end
*/
   function alertDismissed() {
    // do something
}
  
  