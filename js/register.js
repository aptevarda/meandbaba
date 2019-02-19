var uninameText ="not selected";
//window.addEventListener("load", startup);
document.addEventListener("deviceready", startup, false);
function startup() {
   //alert("Test");

   $(".loader").fadeOut(1000);
    //goback event

    $('.ui-icon-carat-l').css("background-color", "#333333");

    document.getElementById("pbrowser_adduser").addEventListener("click", openBrowser_adduser);	
	
	document.getElementById("pbrowsertos_adduser").addEventListener("click", openBrowsertos_adduser);

if (device.platform == "Android")
{
   // alert("device.platform");
    $( "#getmeback" ).hide();
}

$("#getmeback").click(function() {
    //alert( "Handler for .click() called." );
    window.location = "index.html";
  });
    var submitbutton = $('#submitbutton').click(function() {
        if ($("#university-input").val() == ""){
            uninameText = "not selected";
            alert('Please enter the University values in the fields to proceed!');
        //}else if ($('#firstName').val() == '' || $('#lastName').val() == ''|| uninameText == "not selected" || $('#email').val() == '' || $('#telephone').val() == '' || $('#password').val() == '' || $('#university').val() == '' || $('#myUniversity option:selected').text() == "Select University" || !$('#agree_terms').prop('checked')) {
        }else if ($('#firstName').val() == '' || $('#lastName').val() == ''|| uninameText == "not selected" || $('#email').val() == '' || $('#telephone').val() == '' || $('#password').val() == '' || !$('#agree_terms').prop('checked')) {    
            alert('Please fill in all the fields before registering, then select your university from the drop down list, and select "I agree" for reveiwing and agreeing to our terms and policies.');
            window.location = "register.html";
        }else {
            register_user();
        } 
    });

//populate uni names

    var myuni = $("#myUniversity");
    var items="";
   // var finalurl = 'http://192.168.0.19:3000/executive/populateuniName';

    $.ajax({
        type: "POST",
        //url: finalurl,
        url: populateuniName_url,
        datatype: "json",
        contentType: "application/json",
        success: function(data, status){
            $.each(data, function(i, item) {
                console.log(item.uniName);
                
                    items += "<option>" + item.uniName + "</option>";
                    //$("#myUniversity").append(items);
                });

                $("#myUniversity").append(items);
              
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

//autocomplete ul
//foo complete
$( "#university" ).on( "filterablebeforefilter", function ( e, data ) {
    var $ul = $( this ),
        $input = $( data.input ),
        value = $input.val(),
        html = "";
    $ul.html( "" );
    uninameText == "not selected";
    if ( value && value.length > 4 ) {
        $ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
        $ul.listview( "refresh" );
        $('#university-input').blur();
        //alert($input.val())
        $.ajax({
            type: "POST",
            //url: "http://gd.geobytes.com/AutoCompleteCity",
            url: populateuniName_url,
            //dataType: "jsonp",
            dataType: "json",
            crossDomain: true
            /*
            data: {
                q: $input.val()
            }
            */
        })
        .then( function ( response ) {
        // alert(response);
            $.each( response, function ( i, val ) {
            html += "<li id = '"+ val.uniName + "'>" + val.uniName + "</li>";
            // html += "<li>" + val.uniName + "</li>";
            });
            $ul.html( html );
            //alert(html);
            $ul.listview( "refresh" );
            $ul.trigger( "updatelayout");
        });
    }
});

$( "#university" ).on( "click","li",function() {
    // do stuff when user clicks on item in list
    //alert('Doing stuff!');    
    //alert($(this).parents('li')); 
    var id = this.id;
    //alert(id);
     /* selected option */
     //var text = $("a", this).text();
     //console.log(text);
     /* update input with selected option */
     $("#university-input").val(id);
     /* hide all options */
     $(this).siblings().addBack().addClass("ui-screen-hidden");
     uninameText = id;
 });

 $( "#university-input" ).on( "click",function(event) {
    console.log("button clicked again"+event);
    uninameText = "not selected";
    console.log("output is" + $("#university-input").val());
    if ($("#university-input").val() == ""){
        uninameText = "not selected";
        console.log("output is empty also"+uninameText);
    }

 });

 $( "#university-input" ).on("keydown", function() {
    //console.log("button cancel keydown clicked again");
    uninameText = "not selected";
 });
 $( "#university-input" ).on("keyup", function() {
   // console.log("button cancel keyup clicked again");
    uninameText = "not selected";
 });



//foo complete
    
    
}

function register_user() {
    //console.log("reached");
    //alert("reached");
    //alert($('#firstName').val());
    //alert($('#lastName').val());
    //alert($('#myUniversity option:selected').text());
    //var final_url = 'http://localhost:3000/executive/create';
    //var final_url = 'http://192.168.0.19:3000/executive/create';
    //var final_url = 'http://192.168.0.19:3000/executive/create';
    $.ajax({
        type: "POST",
        url: create_url,
        dataType: "json",
        //data: JSON.stringify( { "firstName": $('#firstName').val(), "lastName": $('#lastName').val(), "email": $('#email').val(), "password": $('#password').val(), "university": $('#university').val() } ),
        data: JSON.stringify( { 
            "firstName": $('#firstName').val(), 
            "lastName": $('#lastName').val(), 
            "email": $('#email').val(), 
            "password": $('#password').val(), 
            "screenName": $('#screenName').val(),
            "telephone": $('#telephone').val(),
            "university": uninameText
        }),
        contentType: "application/json",
        success: function(response) {
            var JSONResponse = JSON.stringify(response);
           //alert(JSONResponse);
            var jsonparse = JSON.parse(JSONResponse);
            if (response.code == 250) {
                navigator.notification.alert(
                    response.success, //"The email address you have entered is already associated with another account. Please use another email address.", 
                    alertDismissed,         // callback
                    'Use another email',            // title
                    'Done'                  // buttonName
                );  
                //alert("The email address you have entered is already associated with another account. Please use another email address.");
                window.location = "register.html";
            }else if (response.code == 290) {
                navigator.notification.alert(
                    response.success,//"Your account is created successfully and email has been send with further instruction to verify your account."
                    alertDismissed,         // callback
                    'Success',            // title
                    'Done'                  // buttonName
                );   
            //alert("Your account was created successfully!");
            window.location = "index.html";
            }else if (response.code == 300) {
            navigator.notification.alert(
                response.error,  // "Someting went wrong ( User Registration ). please contact site administrator."
                alertDismissed,         // callback
                'Success',            // title
                'Done'                  // buttonName
            );   
        //alert("Your account was created successfully!");
            window.location = "index.html";
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
            //alert("error is"+ errorThrown);
            //alert(errorThrown.Message);
        }
    });
    
}

function alertDismissed() {
    // do something
}
//terms of service 

function openBrowser_adduser(){
    //alert("test in openbrowser");
    //var ref = cordova.InAppBrowser.open('http://apache.org', '_blank', 'location=yes');
    
       //var url = 'https://quizeek.wordpress.com/privacy-policy/';
       
       var target = '_blank';
       var options = "location = yes"
       var ref = cordova.InAppBrowser.open(url_privacy_policy, target, options);
       
       ref.addEventListener('loadstart', loadstartCallback);
       ref.addEventListener('loadstop', loadstopCallback);
       ref.addEventListener('loadloaderror', loaderrorCallback);
       ref.addEventListener('exit', exitCallback);
    
       function loadstartCallback(event) {
          console.log('Loading started: '  + event.url)
       }
    
       function loadstopCallback(event) {
          console.log('Loading finished: ' + event.url)
       }
    
       function loaderrorCallback(error) {
          //console.log('Loading error: ' + error.message)
          navigator.notification.alert(
                            'Oops,Cancelled, something went wrong',  // message
                                   alertDismissed,         // callback
                                'Message',            // title
                                'Ok'                  // buttonName
                                        );
       }
    
       function exitCallback() {
          console.log('Browser is closed...')
       }
       
    }
    
    function openBrowsertos_adduser(){
    //alert("test in openbrowser");
    //var ref = cordova.InAppBrowser.open('http://apache.org', '_blank', 'location=yes');
    
       //var url = 'https://quizeek.wordpress.com/privacy-policy/';
       
       var target = '_blank';
       var options = "location = yes"
       var ref = cordova.InAppBrowser.open(url_terms_of_use, target, options);
       
       ref.addEventListener('loadstart', loadstartCallback);
       ref.addEventListener('loadstop', loadstopCallback);
       ref.addEventListener('loadloaderror', loaderrorCallback);
       ref.addEventListener('exit', exitCallback);
    
       function loadstartCallback(event) {
          console.log('Loading started: '  + event.url)
       }
    
       function loadstopCallback(event) {
          console.log('Loading finished: ' + event.url)
       }
    
       function loaderrorCallback(error) {
          //console.log('Loading error: ' + error.message)
          navigator.notification.alert(
                            'Oops,Cancelled, something went wrong',  // message
                                   alertDismissed,         // callback
                                'Message',            // title
                                'Ok'                  // buttonName
                                        );
       }
    
       function exitCallback() {
          console.log('Browser is closed...')
       }
    }