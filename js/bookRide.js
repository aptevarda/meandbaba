//window.addEventListener("load", startup);
document.addEventListener("deviceready", startup, false);

function startup() {
//alert("reached bookDetail");

var available;
var selectedRidetobook = sessionStorage.getItem("selectedRidetobook");

$(".loader").fadeOut(1300);
//$(".ajaxloader").fadeOut(100);
//$(".myloader").fadeOut(100);
$('.ui-icon-carat-l').css("background-color", "#333333");

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


$(document).ajaxStop(function() {
   // $("#ajax_loader").hide();
    //alert("end");
    console.log("ajaxstop at"+new Date().getTime());
});
$(document).ajaxStart(function() {
  //  $("#ajax_loader").show();

    console.log("ajaxstart at"+ new Date().getTime());
});


$( "#bookMyRideButton" ).click(function() {
    //alert( "Handler for .bookmyride" );
    //alert($("#seats").val());
    
    if($("#seats").val() =="" || $("#seats").val() == 0){
        
        navigator.notification.alert(
            'Please enter number of seats.',  // message
            alertDismissed,         // callback
            'Not Available',            // title
            'Done'                  // buttonName
        );
        
        }else{
    var interval = setInterval(function(){
            $.mobile.loading('show');
            clearInterval(interval);
        },1);
    //checkmyrideStatus();
    setTimeout( function(){
    if ($("#seats").val() > available ){
            if(available == 0){
                navigator.notification.alert(
                    'It seems that somebody booked the ride while you were at this page and there is no availability on this ride.',  // message
                    alertDismissed,         // callback
                    'Not Available',            // title
                    'Done'                  // buttonName
                );
                var interval = setInterval(function(){
                    $.mobile.loading('hide');
                    clearInterval(interval);
                    },1);
                window.location = "rideList.html";
            } else {
                navigator.notification.alert(
                    'Not enough seats are available as per your request. Check availablity.',  // message
                    alertDismissed,         // callback
                    'Not Available',            // title
                    'Done'                  // buttonName
                );
                var interval = setInterval(function(){
                    $.mobile.loading('hide');
                    clearInterval(interval);
                    },1);
            }
      
    }else{
   // window.location = "search.html";
    //start bookride
                    //$(".loader").show();
                    var interval = setInterval(function(){
                        $.mobile.loading('show');
                        clearInterval(interval);
                        },1); 
                    $.ajax({
                        type: 'POST',
                        url: bookmyride_url,
                        data: {
                        "rideBookedby":sessionStorage.getItem("usernameId"),
                        "seats": $("#seats").val(),
                        "rideId": sessionStorage.getItem("selectedRidetobook")

                        }
                    
                    }).done(function(result) {
                        // Tear down the Drop-in UI
                        $(".loader").fadeOut(1300);
                      if(result.code == 421){
                        console.log("Ride sold or cancelled ");
                        navigator.notification.alert(
                            //result.message,  // message
                            "Ride is cancelled or full",
                            alertDismissed,         // callback
                            'Error',            // title
                            'Done'                  // buttonName
                        );
                        window.location = "rideList.html";

                        }else if (result.code == 422) {
                        //  $('#checkout-message').html('<h1>Success</h1><p>Your Drop-in UI is working! Check your <a href="https://sandbox.braintreegateway.com/login">sandbox Control Panel</a> for your test transactions.</p><p>Refresh to try another transaction.</p>');
                        console.log("Book Bought");
                        navigator.notification.alert(
                            'Ride booking Transaction is successful',  // message
                            alertDismissed,         // callback
                            'Buy Success',            // title
                            'Done'                  // buttonName
                        );
                        sendPushnotofication();
                        window.location = "rideList.html";
                    } else if (result.code == 423){
                        console.log(result);
                        navigator.notification.alert(
                            'Update of Buy failed',  // message
                            alertDismissed,         // callback
                            'Buy Success',            // title
                            'Done'                  // buttonName
                        );
                        window.location = "rideList.html";
                        // $('#checkout-message').html('<h1>Error</h1><p>Check your console.</p>');
                        }else{
                        navigator.notification.alert(
                            'Oops , Something went wrong while Purchase. Please contact admin',  // message
                            alertDismissed,         // callback
                            'Buy Success',            // title
                            'Done'                  // buttonName
                        );
                        window.location = "rideList.html";


                        }
                        var interval = setInterval(function(){
                            $.mobile.loading('hide');
                            clearInterval(interval);
                            },1); 
                    }).fail(function(result) {
                        var interval = setInterval(function(){
                            $.mobile.loading('hide');
                            clearInterval(interval);
                            },1); 
                            navigator.notification.alert(
                                'Oops , Something went wrong while booking the ride. Please contact admin',  // message
                                alertDismissed,         // callback
                                'Error',            // title
                                'Done'                  // buttonName
                            );

                    });


    //end bookride
    }
    }, 250)   //timeout function ends 
} // else for main if
  });
        
 
//goback event
if (device.platform == "Android")
{
   // alert("device.platform");
    $( "#getmeback" ).hide();
}


$( "#getmeback" ).click(function() {
    //alert( "Handler for .click() called." );
    window.location = "rideList.html";
  });

//back event


//var final_url = 'http://192.168.0.19:3000/executive/populatebookDetail';

 
//alert("from ridelist -->" + selectedRidetobook);
function checkmyrideStatus(){
    /*
    var interval = setInterval(function(){
        $.mobile.loading('show');
        clearInterval(interval);
        },1);  
    */
 $.ajax({
     type: "POST",
     url: checkrideStatus_url,
     dataType: "json",
     //timeout: 100000,
     data: JSON.stringify( { "rideId": selectedRidetobook } ),
     contentType: "application/json",
     success: function(data, status){
         
         $.each(data, function(i, item) {
         console.log("output from detail -->"+ item.rideId);
       
        
        $( "#myid" ).html(sessionStorage.getItem("usernameId"));
        $( "#rideId" ).html(item.rideId);
        $( "#price" ).html("$ "+item.ridePrice);
        $( "#rideFrom" ).html(item.rideFrom);
        $( "#rideTo" ).html(item.rideTo);
        $( "#date" ).html(moment(item.rideDate).format('llll'));
        //$( "#time" ).html("@"+item.rideTime);
        $('#rideSeats').html("Total : " +item.rideSeats + " seats");
        available = item.rideSeats - item.ridesBooked;
        $("#rideAvailable").html("Available : "+ available +" seats");
        $( "#vehicle" ).html(item.rideVehtype);
        $("#comments").html(item.userComments);
        //sessionStorage.setItem("rideSeats",)
        
     });  
     var interval = setInterval(function(){
        $.mobile.loading('hide');
        clearInterval(interval);
        },1);   
     
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        //show error message
        navigator.notification.alert(
            'Error - Not able to fetch relevant ride details',  // message
            alertDismissed,         // callback
            'Buy Success',            // title
            'Done'                  // buttonName
        );
        
        var interval = setInterval(function(){
            $.mobile.loading('hide');
            clearInterval(interval);
            },1); 
            
        //alert ("Error - Not able to fetch relevant book details");
        //alert("error is"+ errorThrown);
        //alert(XMLHttpRequest);
    }
    
});
}
checkmyrideStatus();

//code starts for braintree non paypal payment

var button = document.querySelector('#submit-button');

  braintree.dropin.create({
    // Insert your tokenization key here
    authorization: 'sandbox_5gz3rj7v_xbysnvxcgkmbq2sg',
    container: '#dropin-container'
  }, function (createErr, instance) {
    button.addEventListener('click', function () {
      instance.requestPaymentMethod(function (requestPaymentMethodErr, payload) {
        // When the user clicks on the 'Submit payment' button this code will send the
        // encrypted payment information in a variable called a payment method nonce
        $.ajax({
          type: 'POST',
          url: braintreeCheckout_url,
          data: {
          "paymentMethodNonce": payload.nonce,
          "bookName": sessionStorage.getItem("selectedbuyBookName"),
          "bookId": sessionStorage.getItem("selectedBookIdforPurchase"), 
          "price": sessionStorage.getItem("selectedbuyBookPrice"), 
          "purchased_by" : sessionStorage.getItem("usernameId"),
          "paymentProvider" : "Braintree"
          }
       
        }).done(function(result) {
          // Tear down the Drop-in UI
          instance.teardown(function (teardownErr) {
            if (teardownErr) {
              console.error('Could not tear down Drop-in UI!');
            } else {
              console.info('Drop-in UI has been torn down!');
              // Remove the 'Submit payment' button
              $('#submit-button').remove();
            }
          });

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
                'Buy Transaction is successful',  // message
                alertDismissed,         // callback
                'Buy Success',            // title
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
        });
      });
    });
  });

//code ends for braintree



//******* code end for non braintree paypal payment



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
        data: JSON.stringify( { "userName": username_Id } ),
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


   function alertDismissed() {
    // do something
}
  
  