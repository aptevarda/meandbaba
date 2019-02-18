//window.addEventListener("load", startup);
var token;
document.addEventListener("deviceready", checkConnection, false);

function checkConnection(){

    document.addEventListener("offline", offlineCallbackFunction, false);
    startup();
    function offlineCallbackFunction(){
        window.location = "offlinePage.html";
    }
}

function startup() {
    //alert("reached startup function");
    //forgot password username
    $(".loader").fadeOut(1100);
    screen.orientation.lock('portrait');

    $(document).bind('mobileinit', function () {
        //Loader settings
        $.mobile.loader.prototype.options.text = "Loading..";
        $.mobile.loader.prototype.options.textVisible = true;
        $.mobile.loader.prototype.options.theme = "a";
        $.mobile.loader.prototype.options.textonly = false; 
    }); 

    $('#forgotUsername').click(function(){
        //alert("forgot Username");
        window.location= "forgotusername.html";
    });

    $('#forgotPassword').click(function(){
        //alert("forgot password");
        window.location = "forgotpassword.html";
    });
    //forgot pwd
    var login = $('#loginbutton').click(function() {
        if ($('#email').val() == '' || $('#password').val() == '') {
            //alert('Please enter an email and a password. To create an account, please click the Register button below.');
            navigator.notification.alert(
                'Please enter an email and a password. To create an account, please click the Register button below.',  // message
                alertDismissed,         // callback
                'Enter Credentials',            // title
                'Done'                  // buttonName
            );
            window.location = "index.html";
        }else {
            user_login();
        }
    });
    var register = $('#registerbutton').click(function() {
        user_register();
    });

    var verificationbutton = $('#verificationbutton').click(function() {
        //alert("this worked");
        verify_email();
    });

    window.FirebasePlugin.hasPermission((data) => {
        if (data.isEnabled) {
          console.log("Permission already granted");
        } else {
          window.FirebasePlugin.grantPermission(() => {
            console.log("Permission granted", data.isEnabled);
          }, (error) => {
            console.error("unable to grant permission", error);
          });
        }
      }, error => {
        console.log("hasPermission failed", error);
      });
  

    //track email input events once user completed email input , execute event
    /*
    $("#email").on('change paste input', function(){
        console.log("output is"+ $('#email').val());
        console.log("this also");
    });
    */
    //firebase code
    
        /*
        window.FirebasePlugin.onTokenRefresh(function(token) {
            // save this server-side and use it to push notifications to this device
            console.log("Refresh to get new token: " + token);
            //token = token;
            //updatePushToken(token);
            }, function(error) {
            alert(error);
            });
        */
    

    // Get notified when the user opens a notification
    window.FirebasePlugin.onNotificationOpen(function(notification) {
        console.log(JSON.stringify(notification));
        //alert(JSON.stringify(notification));
        //alert("The notification is open!");
    }, function(error) {
        console.error(error);
    });   

    //firebase code ends
    $('#testPush').click(function(){
        //alert("Testing pushnotify");
        sendPushnotofication();
    });

}
    
function user_login() {
    //alert("reached user_login function");
    
    //var final_url = 'http://192.168.0.19:3000/executive/loginvalidation';
    
    //alert($('#email').val() + "  "+$('#password').val());
    
    var interval = setInterval(function(){
        $.mobile.loading('show');
        clearInterval(interval);
        
    },1);
    
    //$(".loader").show();
    $.ajax({
        type: "POST",
        url: loginvalidation_url,
        dataType: "json",
        data: JSON.stringify( { "email": $('#email').val(), "password": $('#password').val() } ),
       //data:  JSON.stringify( { "email": "championved@gmail.com", "password": "test"} ),
        contentType: "application/json",
        success: function(response) {
           var JSONResponse = JSON.stringify(response);
           //alert(JSONResponse);

           var jsonparse = JSON.parse(JSONResponse);
           if (response.code == 200) {
               //alert("login successfull");
               sessionStorage.setItem("usernameId", $('#email').val());
              // alert(sessionStorage.getItem("usernameId"));
               //code to get push token and then redirect to next page
               updatePushToken(token);
               /*
               window.FirebasePlugin.getToken(function(token) {
                // save this server-side and use it to push notifications to this device
                 //alert("token id for "+token);
                updatePushToken(token);
                }, function(error) {
                 console.error("token error"+error);
                 updatePushToken(token);
                });
                */
               //
                
           }else if (response.code == 204) {
               //alert('Your email and pasword do not match!');
               navigator.notification.alert(
                'Your email and password do not match! Please try again.',  // message
                alertDismissed,         // callback
                'Try Again',            // title
                'Done'                  // buttonName
            );
               
               window.location = "index.html";
           }else if (response.code == 140) {
              // alert('Please enter the verification code sent to the email you entered when creating your account.');
               navigator.notification.alert(
                'Please enter the verification code sent to the email you entered when creating your account.', // message
                alertDismissed,         // callback
                'Verification',            // title
                'Done'                  // buttonName
            );
               $('#randomcode').attr("type", "text");
               $('#verificationbutton').attr("type", "button");
               //vinay add
            }else if (response.code == 150) {
                // alert('Please enter the verification code sent to the email you entered when creating your account.');
                 navigator.notification.alert(
                  'Your user id is banned.', // message
                  alertDismissed,         // callback
                  'Banned',            // title
                  'Done'                  // buttonName
              );

               //vinay add
           }else {
               //alert('The email you entered does not exist! Please try again.');
               navigator.notification.alert(
                'The email you entered does not exist! Please try again.',  // message
                alertDismissed,         // callback
                'No Success',            // title
                'Done'                  // buttonName
            );
               window.location = "index.html";
           }
             /*  
           var interval = setInterval(function(){
            $.mobile.loading('hide');
            clearInterval(interval);
            },1); 
        */
        // $(".loader").fadeOut(1100);
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
         /*  
           var interval = setInterval(function(){
            $.mobile.loading('hide');
            clearInterval(interval);
            },1); 
        */
        //$(".loader").fadeOut(1100);
        }
    });
    
}

function user_register() {
    //alert("reached user_register function");
    window.location = "register.html";
}

var verificationbutton = $('#verificationbutton').click(function() {
   // alert("this worked");
    verify_email();
});

function verify_email() {
    //alert("reached user_login function");
    
    //var final_url = 'http://192.168.0.19:3000/executive/codevalidation';
    
    //alert($('#email').val() + "  "+$('#password').val());
    sessionStorage.getItem($('#email').val());
    $.ajax({
        type: "POST",
        url: codevalidation_url,
        dataType: "json",
        data: JSON.stringify( { "randomcode": $('#randomcode').val(), "email": $('#email').val() } ),
        contentType: "application/json",
        success: function(response) {
           var JSONResponse = JSON.stringify(response);
           //alert(JSONResponse);
           var jsonparse = JSON.parse(JSONResponse);
            
           if (response.code == 160) {
               //alert('Verification successful');
               navigator.notification.alert(
                'Verification successful',  // message
                alertDismissed,         // callback
                'Success',            // title
                'Done'                  // buttonName
            );
               
               //window.location = "search.html";
               window.location = "index.html";
               
           }else if (response.code == 180) {
               //alert('Try again. Please enter the correct code.');
               navigator.notification.alert(
                'Try again. Please enter the correct code.',  // message
                alertDismissed,         // callback
                'Failed',            // title
                'Done'                  // buttonName
            );
           }
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

function updatePushToken(token){
console.log("Reached updatepushtoken");
var newtoken;
//gettoken code
    window.FirebasePlugin.getToken(function(token) {
    // save this server-side and use it to push notifications to this device
     //alert("Device id is"+device.uuid+"token id for "+token );
     console.log("toekn is" +token);
     //window.FirebasePlugin.grantPermission()
    // var final_url = 'http://192.168.0.19:3000/executive/savePushNotifyToken';
    $.ajax({
        type: "POST",
        url: savePushNotifyToken_url,
        dataType: "json",
        data: JSON.stringify( { "userName": sessionStorage.getItem("usernameId"), "deviceId": device.uuid, "tokenId": token } ),
        //data: JSON.stringify( { "userName": "championved@gamil.com" } ),
        contentType: "application/json",
        success: function(response) {
            //window.location = "search.html";
            //below line is re-direct to landing page 
            window.location = "landingpage.html";

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //show error message
            navigator.notification.alert(
                server_notconnecting,  // message
                alertDismissed,         // callback
                'Backend Issues',            // title
                'Done'                  // buttonName
            );
            //alert("why error is"+ errorThrown);
            //alert(XMLHttpRequest);
            window.location = "search.html";
        }
    }); 


    }, function(error) {
     console.error("Push token error"+error);
     navigator.notification.alert(
        server_notconnecting,  // message
        alertDismissed,         // callback
        'Backend Issues',            // title
        'Done'                  // buttonName
    );
     window.location = "search.html";
    });
    

//end gettoken code

/*
//var final_url = 'http://localhost:3000/executive/loginvalidation';
var final_url = 'http://192.168.0.19:3000/executive/savePushNotifyToken';
  //alert(token);
console.log("device uuid:"+device.uuid);
//alert(sessionStorage.getItem("usernameId"));
var token = token;

$.ajax({
    type: "POST",
    url: final_url,
    dataType: "json",
    data: JSON.stringify( { "userName": sessionStorage.getItem("usernameId"), "deviceId": device.uuid, "tokenId": token } ),
    //data: JSON.stringify( { "userName": "championved@gamil.com" } ),
    contentType: "application/json",
    success: function(response) {
        
      window.location = "search.html";
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        //show error message
        alert("why error is"+ errorThrown);
        alert(XMLHttpRequest);
        window.location = "search.html";
    }
}); 
*/
}
/*
function sendPushnotofication(){
    alert("reached send push")
    var url = 'http://192.168.0.19:3000/executive/pushmessage';
    var xmlHttp = new XMLHttpRequest();

xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4) {
        //handle server response here if you want to
        alert("push sent maybe");
    }
}
xmlHttp.open("POST", url, true); // false for synchronous request
xmlHttp.send(null);
}
*/
function sendPushnotofication(){
    console.log("reached send push")
    //var final_url = 'http://192.168.0.19:3000/executive/pushmessage';

    $.ajax({
        type: "POST",
        url: pushmessage_url,
        dataType: "json",
        data: JSON.stringify( { "userName": "championved@gmail.com"} ),
        contentType: "application/json",
        success: function(response) {
           // alert("push send successfully");
           var JSONResponse = JSON.parse(response);
           //alert(JSONResponse);
           //var jsonparse = JSON.parse(JSONResponse);
            
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //show error message
            alert("error is"+ errorThrown);
            alert(XMLHttpRequest);
        }
    }); 

}

function alertDismissed() {
    // do something
}