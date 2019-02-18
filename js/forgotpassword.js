document.addEventListener("deviceready", startup, false);
function startup() {
    
    $('#backtoindex').click(function() {
        window.location = "index.html";
    });

    $('#forgotpasswordsubmit').click(function() {
        sessionStorage.setItem("email", $('#email').val());
        verify_email();
    });

    
    $('#verificationbutton').click(function() {
        verify_code();
    });

    $('#changepasswordsubmit').click(function() {
        changepassword();
    });

}

function verify_email() {

$.ajax({
    type: "POST",
    url: forgotpassword_url,
    dataType: "json",
    data: JSON.stringify( { "email": $('#email').val() } ),
   //data:  JSON.stringify( { "email": "championved@gmail.com", "password": "test"} ),
    contentType: "application/json",
    success: function(response) {
        var JSONResponse = JSON.stringify(response);
            JSON.parse(JSONResponse);

         if (response.code == 560) {
            alert("Please enter the verification code sent to the email you just entered.");
               $('#verifyrandomcode').attr("type", "text");
               $('#verificationbutton').attr("type", "button");
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
})

}


function verify_code() {

    $.ajax({
        type: "POST",
        url: verifyrandomcode_url,
        dataType: "json",
        data: JSON.stringify( { "verifyrandomcode": $('#verifyrandomcode').val(), "email": sessionStorage.getItem("email") } ),
        contentType: "application/json",
        success: function(response) {
            var JSONResponse = JSON.stringify(response);
            JSON.parse(JSONResponse);

            if (response.code == 180) {
                $('#changepassword').attr("type", "text");
                $('#changepasswordsubmit').attr("type", "button");
            }else if (response.code == 190) {
                alert('The code you entered was incorrect. Please enter the correct verification code in order to be allowed to change your password.');
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
         
        }
    })
    
    }


function changepassword() {

    $.ajax({
        type: "POST",
        url: changepassword_url,
        dataType: "json",
        data: JSON.stringify( { "newpassword": $('#changepassword').val(), "email": sessionStorage.getItem("email") } ),
       //data:  JSON.stringify( { "email": "championved@gmail.com", "password": "test"} ),
        contentType: "application/json",
        success: function(response) {
           alert('Your password was changed successfully.');
              
            window.location = "index.html";
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //show error message
            navigator.notification.alert(
                'Your password could not be changed.',  // message
                alertDismissed,         // callback
                'Password Change Unsuccessful',            // title
                'Done'                  // buttonName
            );
           // alert("error is"+ errorThrown);
           // alert(XMLHttpRequest);
        }
    })
    
    }