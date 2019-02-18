var uninameText;
var payAmount;




document.addEventListener("deviceready", startup, false);
        


function startup() {
    //alert("platform is -->"+ device.platform);
    //alert("device.platform");
    //goback event

    $(".loader").fadeOut(1100);
    //payAmountElement= new AutoNumeric('#salePrice',{ currencySymbol : '$' });
    //$('.demo').autoNumeric('init', { currencySymbol : '$' });
    $('.ui-icon-carat-l').css("background-color", "#333333");
    

   //$("#paypalAutho").text("").append("<img  src=https://www.paypalobjects.com/webstatic/en_US/developer/docs/lipp/loginwithpaypalbutton.png  />") .button();

    
    if (device.platform == "Android")
    {
        //alert("device.platform");
        $( "#getmeback" ).hide();
    }

    $(document).bind('mobileinit', function () {
        //Loader settings
        $.mobile.loader.prototype.options.text = "Loading..";
        $.mobile.loader.prototype.options.textVisible = true;
        $.mobile.loader.prototype.options.theme = "b";
        $.mobile.loader.prototype.options.textonly = false; 
    }); 



    
    $( "#getmeback" ).click(function() {
        //alert( "Handler for .click() called." );
        window.location = "search.html";
      });

      $( "#paypalPayout" ).click(function() {
        //alert( "Payout Handler for called." );
        myPayout();
      });

    //back event
    $( "#showPaypalPayout" ).click(function() {
        alert( "Show payout called." );
        showMyPayout();
      });


 



//paypal autho code
            $('#paypalAutho').click(function() {
                $.ajax({
                    type: "POST",
                    //url: finalurl,
                    url: getpaypalAuthorize_url,
                    datatype: "json",
                    
                    data: JSON.stringify( { 
                        "username":sessionStorage.getItem("usernameId")
                                } ),
                                
                    contentType: "application/json",
                    success: function(data, textStatus, jqXHR){
                        
                            console.log('success in stripe url');
                            //if (typeof data.redirect == 'string')
                          //window.location = data.redirect
                            console.log(data);
                        // window.location = ""
                        
                    
                        //var link = "https://connect.stripe.com/oauth/authorize?response_type=code&client_id=MYCLIENTID&scope=read_write";
                        var link = data.redirect;
                       // var browserRef = window.cordova.InAppBrowser.open(link, '_blank', 'location=yes','closebuttoncaption="close"');
                        

                        var browserRef = window.cordova.InAppBrowser.open(link, '_blank', 'location=no,footer=yes,closebuttoncaption=Done,closebuttoncolor=#0000ff');
                
                        browserRef.addEventListener('loadstart', function(event) {
                        //if((event.url).indexOf('http://192.168.0.24:3000/executive/paypalAuthorize') === 0) {
                        if((event.url).indexOf('http://booksite.a2hosted.com:35001/executive/paypalAuthorize') === 0) {
                                //alert("page came back");

                                navigator.notification.alert(
                                    'Successfully completed',  // message
                                    agreeComplete,         // callback
                                    'Success',            // title
                                    'Done'                  // buttonName
                                );
                            function agreeComplete(){
                                //alert("close");
                                $(".loader").fadeOut(1100);
                                browserRef.close();
                                
                            }
                            
                            /*
                                $.ajax({
                                    type: "POST",
                                    //url: finalurl,
                                    url: validatestripeaccount_url,
                                    datatype: "json",
                                    data: JSON.stringify( { 
                                        "username":sessionStorage.getItem("usernameId")
                                                } ),
                                    contentType: "application/json",
                                    success: function(response){
                                        var JSONResponse = JSON.stringify(response);
                                        //alert(JSONResponse);
                                        var jsonparse = JSON.parse(JSONResponse);

                                        if (response.code == 400) {
                                            alert('Error: could not access server');
                                        }else if (response.code == 610) {
                                            alert('Error: could not validate stripe account');
                                        }else if (response.code == 620) {
                                            alert('Success: stripe account validated ')
                                        // $('#postbookbutton').prop("disabled", false);
                                            $('#stripeconnect').prop("disabled", true);
                                            
                                            //document.getElementById("postbookbutton").disabled = false;
                                        }     
                                        
                                },
                                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                                        //show error message
                                        navigator.notification.alert(
                                            'error in stripe account validation',  // messages
                                            alertDismissed,         // callback
                                            'Backend Issues',            // title
                                            'Done'                  // buttonName
                                        );
                                        alert("error is"+ errorThrown);
                                        alert(errorThrown.Message);
                                    }
                                })
                                */
                                }
                                });
                                
                            
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        //show error message
                        navigator.notification.alert(
                            'error in stripe url',  // message
                            alertDismissed,         // callback
                            'Backend Issues',            // title
                            'Done'                  // buttonName
                        );
                        alert("error is"+ errorThrown);
                        alert(errorThrown.Message);
                    }
                })
            });

//paypal autho code ends

    




function alertDismissed() {
    // do something
}

function myPayout(){
    $.ajax({
        type: "POST",
        //url: finalurl,
        url: singlePaypalPayout_url,
        //datatype: "json",
        //contentType: "application/json",
        success: function(data, status){
            var items="";
                console.log("success");
                console.log(data);
                $.each(data, function(i, item) {
                    console.log(item.tokenId);
                    
                        items += "<option>" + item.tokenId + "</option>";
                        //$("#myUniversityinPost").append(items);
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
            //alert("error is"+ errorThrown);
            //alert(errorThrown.Message);
        }
    })

}

function showMyPayout(){
    $.ajax({
        type: "POST",
        //url: finalurl,
        url: showPaypalPayout_url,
        //datatype: "json",
        //contentType: "application/json",
        success: function(data, status){
            var items="";
                console.log("success");
                console.log(data);
                $.each(data, function(i, item) {
                    console.log(item.tokenId);
                    
                        items += "<option>" + item.tokenId + "</option>";
                        $('ul').append('<li data-id="'+ item.rideId + '" class="idForBooklistView" ><a href="#" class="rideDetail">  <p> '+ item.paypalPayout_batch_id+'</p><</li>');
                   
                        //$("#myUniversityinPost").append(items);
                    });
                    $('#showPayoutList').listview("refresh");
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

}

}