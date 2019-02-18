var capturedImage='';
var capturedImage2='';
var capturedImage3='';
var capturetakeimagebuttonId;
var capturechangeimagebuttonId;
var wincounter=0;
var returnFilename;
var returnFilename2;
var returnFilename3;
//var uninameText;
var payAmount;
var payAmountElement;
var uninameText ="not selected";

//for payout paraneters
var trxProCharge;
var trxFixed;
var trxPayoutPrice;
var trxCommissionLowerLimit;
var trxCommissionHigherLimit; 
var trxLimit;



document.addEventListener("deviceready", startup, false);
        
//window.addEventListener("load", startup);
//var capturedImage;
//declare variable to copy filename
 //   var capturedfilename;
/*
function startup() {
    
    var postbookbutton = $('#postbookbutton').click(function() {
        if ($('#bookname').val() == '') {
            alert('Please enter the name of a book.');
            window.location = "postbook.html";
        }else if ($('#price').val() == '') {
            alert('Please enter a price.');
            window.location = "postbook.html";
        } else if ($('#bookname').val() == '' && $('#price').val() == '') {
            alert('Please enter a book name and a price before posting your book.');
            window.location = "postbook.html";
        }else {
            postbook();
        }
    });
}
*/

function startup() {
    //alert("platform is -->"+ device.platform);
    //alert("device.platform");
    //goback event

    //$(".loader").fadeOut(1100);
    payAmountElement= new AutoNumeric('#salePrice',{ currencySymbol : '$' });
    //$('.demo').autoNumeric('init', { currencySymbol : '$' });
    $('.ui-icon-carat-l').css("background-color", "#333333");
    

    $("#paypalAutho").text("").append("<img  src=https://www.paypalobjects.com/webstatic/en_US/developer/docs/lipp/loginwithpaypalbutton.png  />") .button();

    
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
    var interval = setInterval(function(){
        $.mobile.loading('hide');
        clearInterval(interval);
        },1); 

    $('#salePrice').bind('keydown', function() {
        //alert("this is test");
        console.log(trxProCharge + " " +trxFixed +" " +trxPayoutPrice +" " +trxCommissionLowerLimit + " " +trxCommissionHigherLimit + "  " +trxLimit );
        
       // var payAmount;
        setTimeout(function() {
           //$("#payPrice").val($('#salePrice').val());
           //console.log($('#salePrice').val());
           console.log(payAmountElement.getNumber()*2);
           //$("#payPrice").val("$"+anElement.getNumber()*2);
           
           if(payAmountElement.getNumber() <= 1){
            $("#payPrice").val("$0");
           }else if( payAmountElement.getNumber() <= 30 ){
            //payAmount = payAmountElement.getNumber() -   (payAmountElement.getNumber()*0.029) - 0.25 - 0.50 ;
            payAmount = payAmountElement.getNumber() -   (payAmountElement.getNumber()*trxProCharge) - trxFixed - trxPayoutPrice - trxCommissionLowerLimit ;
            $("#payPrice").val("$"+ payAmount.toFixed(2));
           }else{
            payAmount = payAmountElement.getNumber() -   (payAmountElement.getNumber()*trxProCharge) - trxFixed - trxPayoutPrice - trxCommissionHigherLimit ;
            $("#payPrice").val("$"+ payAmount.toFixed(2));
           }
        },4);
        
        
    });

    //payout calculation procedure

    $.ajax({
        type: "POST",
        //url: finalurl,
        url: getPayoutPriceParam_url,
        datatype: "json",
        contentType: "application/json",
        success: function(data, status){
            //alert( JSON.stringify(data));
             var payoutCalcParam  = JSON.stringify(data);
            var payoutCalcParamparse = JSON.parse(payoutCalcParam);
            //alert(payoutCalcParamparse.trxProCharge);
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


    //payout calculation procedure ends
    
    $( "#getmeback" ).click(function() {
        //alert( "Handler for .click() called." );
        window.location = "search.html";
      });
      /*
      $( "#paypalPayout" ).click(function() {
        alert( "Payout Handler for called." );
        myPayout();
      });
      */
    //back event

    //set the initial set up
    $("#camerachangepicture").hide();
    $("#camerachangepicture2").hide();
    $("#camerachangepicture3").hide();
    
    
    //alert("test");
    //$('#postbookPage').attr("data-add-back-btn", "true");
    $('#cameratakepicture,#camerachangepicture').click(function()  {
        capturetakeimagebuttonId=this.id;
        //alert(capturetakeimagebuttonId);
        cameratakepicture();
    });
    $('#cameratakepicture2,#camerachangepicture2').click(function() {
        capturetakeimagebuttonId=this.id;
        //alert(capturetakeimagebuttonId);
        cameratakepicture();
    });
    $('#cameratakepicture3,#camerachangepicture3').click(function() {
        capturetakeimagebuttonId=this.id;
       // alert(capturetakeimagebuttonId);
        cameratakepicture();
    });

    $('#postbookbutton').click(function() {
       // alert("what");
        if ($("#university-input").val() == ""){
            uninameText = "not selected";
            alert('Please enter the University values in the fields to proceed!');
        
        //alert("reached postridebutton");
        //if ($('#rideFrom').val() == '' || $('rideTo').val() == '' || uninameText != "" ||$('rideDate').val() == '' || $('rideTime').val() == '' || $('ridePrice').val() == '' || $('rideSeats').val() == '' || $('rideVeh').val() == ''|| $('#myUniversityinPost option:selected').text() == "Select University") {
       
        //if ($('#bookname').val() == '' ||  capturedImage =='' || payAmountElement.getNumber() < '3' || capturedImage2 =='' || capturedImage3 =='' || $('#myUniversityinPost option:selected').text() == "Select University" || !$("#paymentpolicyAgree").is(':checked')) {
        } else if ($('#bookname').val() == '' ||  capturedImage =='' || payAmountElement.getNumber() < '3' || uninameText == "not selected" || capturedImage2 =='' || capturedImage3 =='' || !$("#paymentpolicyAgree").is(':checked')) {    
            //alert('Please enter the name of a book , price ,select University and capture all image!');
            //alert("what1");
            navigator.notification.alert(
                'Please enter the name of a book , price ,select University and capture all image!'+uninameText,  // message
                alertDismissed,         // callback
                'Try Again',            // title
                'Done'                  // buttonName
            );
            
            //window.location = "postbook.html";
        }else{
       // uninameText=$('#myUniversityinPost option:selected').text();
       imagetoserver("imagedata");
       //alert("in postbook");
        //postbook(capturedImage);
         }
         //alert("clivked");
    });

    //$('#postbookbutton').prop("disabled", false);
    //document.getElementById("postbookbutton").disabled = false;
/* working code oauth flow
    $('#stripeconnect').click(function() {
        $.ajax({
            type: "POST",
            //url: finalurl,
            url: sellerstripeauthorize_url,
            datatype: "json",
            
            data: JSON.stringify( { 
                "username":sessionStorage.getItem("usernameId")
                        } ),
                        
            contentType: "application/json",
            success: function(data, textStatus, jqXHR){
                
                    console.log('success in stripe url');
                    //if (typeof data.redirect == 'string')
                   // window.location = data.redirect
                    console.log(data);
                   // window.location = ""
                   
              
                   //var link = "https://connect.stripe.com/oauth/authorize?response_type=code&client_id=MYCLIENTID&scope=read_write";
                   var link = data.redirect;
                   var browserRef = window.cordova.InAppBrowser.open(link, '_blank', 'location=no');

                   browserRef.addEventListener('loadstart', function(event) {
                   if((event.url).indexOf('http://127.0.0.1:3000/executive/stripeoauthCallback') === 0) {
                        alert("page came back");
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
working code for stripe oauth */ 

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

//Univeristy population
//Initially get the user's university from id and update field with it by default. User can go ans change it if needed
    
        $.ajax({
            type: "POST",
            url: userDetails_url,
            dataType: "json",
            //data: JSON.stringify( { "bookname": $('#bookname').val(), "price": $('#price').val(), "picture":capturedImage } ),
            data: JSON.stringify( { 

                "username": sessionStorage.getItem("usernameId"), 

                        } ),
            contentType: "application/json",
            success: function(response) {
                //alert('Your book was successfully posted!');
                
                if(response.code == 440){
                navigator.notification.alert(
                    //'Your book was successfully posted',  // message
                    response.failed,  // message
                    alertDismissed,         // callback
                    'Error',            // title
                    'Done'                  // buttonName
                );
                //window.location = "rideList.html";
                }else{
                    $.each( response, function ( i, uninamefromUser) { 
                        $("#university-input").val(uninamefromUser.university);
                        uninameText = uninamefromUser.university;
                    })
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) {
                //show error message
                navigator.notification.alert(
                    'Not able to get default University name ',  // message
                    alertDismissed,         // callback
                    'Failure',            // title
                    'Done'                  // buttonName
                );
                //alert("Phto loading / Post book failed");
                //alert("error is"+ errorThrown);
                //alert(XMLHttpRequest);
            }
        });

        //end population of user's default university


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



//Univeristy population

    
//old code for uni population using combo box
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
                    //$("#myUniversityinPost").append(items);
                });

                $("#myUniversityinPost").append(items);
              
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
//old unipopulation code for combox box 

}

/* DestinationType is DATA_URL
function cameratakepicture() {
    //alert("reached cameratakepicture function");
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: navigator.camera.DestinationType.DATA_URL
        //sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    });
*/


//DestinationType is FILE_URI
function cameratakepicture() {
    
    
    navigator.camera.getPicture(onSuccess, onFail, {
        quality: 50,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth:300,
        targetHeight:300,
        sourceType: navigator.camera.PictureSourceType.CAMERA,
        correctOrientation : true
    })
}

function onSuccess(imageData) {
    // Uncomment to view the base64 encoded image data
            console.log(imageData);

            
            
            //below code was used to check if image element is captured or not and can be commented
            $('.optional').each(function () {
                //if (this.src.length == 0) {
                    if (this.src.id== 'smallImage') {
                    console.log("image has no source");
                    //this.attr('src', "data:image/jpg;base64," + imageData);
                }else
                {
                    console.log("image has source");
                }
            });
            //below statement updates image
            /*
            $('.optional').css({'display' : 'block'});
            $('.optional').attr('src', imageData);
            capturedImage=imageData;
            $("#cameratakepicture").hide();
            $("#camerachangepicture").show();
            */
           // buttonhide();

           if (capturetakeimagebuttonId == "cameratakepicture" || capturetakeimagebuttonId == "camerachangepicture")
           {
            //alert("its button 1");
            $('.optional').css({'display' : 'block'});
            $('.optional').attr('src', imageData);
            capturedImage=imageData;
            //alert(capturedImage);
            $("#cameratakepicture").hide();
            $("#camerachangepicture").show();
            }

           // if(capturetakeimagebuttonId == "cameratakepicture2")
           if (capturetakeimagebuttonId == "cameratakepicture2" || capturetakeimagebuttonId == "camerachangepicture2")
           {
            //alert("its button 2");
            $('.optional2').css({'display' : 'block'});
            $('.optional2').attr('src', imageData);
            capturedImage2=imageData;
            //alert(capturedImage2);
            $("#cameratakepicture2").hide();
            $("#camerachangepicture2").show();
            }

            //if(capturetakeimagebuttonId == "cameratakepicture3")
            if (capturetakeimagebuttonId == "cameratakepicture3" || capturetakeimagebuttonId == "camerachangepicture3")
           {
            //alert("its button 3");
            $('.optional3').css({'display' : 'block'});
            $('.optional3').attr('src', imageData);
            capturedImage3=imageData;
            //alert(capturedImage3);
            $("#cameratakepicture3").hide();
            $("#camerachangepicture3").show();
            }
            
        
}

function onFail() { 
    setTimeout(function() {
        //alert("reached onfail function");
        navigator.notification.alert(
            'error in capturing phto.Please try again',  // message
            alertDismissed,         // callback
            'Error',            // title
            'Done'                  // buttonName
        );
    }, 40);
    console.log("fail");
    
}

function imagetoserver(imagedata){


    //assign global variable of  capturedimage
    imagedata = capturedImage;
    console.log("reached corodva imagetoserver--- "+imagedata);

    var win = function (r) {
        //alert("*** 1st file uploaded successfully ***");
        console.log("*** 1st file uploaded successfully ***");
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
        var outputfile = JSON.parse(r.response);
        returnFilename = outputfile.filename;
        console.log("filename is -->"+ returnFilename);
      // ft.upload(capturedImage2, encodeURI("http://192.168.0.19:3000/executive/imagetoserver"), win1, fail, options);
       ft.upload(capturedImage2, encodeURI(imagetoserver_url), win1, fail, options);
    }
    var win1 = function (r) {
        //alert("*** 2nd file uploaded successfully ***");
        console.log("*** 2nd file uploaded successfully ***");
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
        var outputfile = JSON.parse(r.response);
        returnFilename2 = outputfile.filename;
        console.log("filename is -->"+ returnFilename2);
      // ft.upload(capturedImage3, encodeURI("http://192.168.0.19:3000/executive/imagetoserver"), win2, fail, options);
       ft.upload(capturedImage3, encodeURI(imagetoserver_url), win2, fail, options);
    }

    var win2 = function (r) {
        //alert("*** 3rd file uploaded successfully ***");
        console.log("*** 3rd file uploaded successfully ***");
        console.log("Code = " + r.responseCode);
        console.log("Response = " + r.response);
        console.log("Sent = " + r.bytesSent);
        var outputfile = JSON.parse(r.response);
        returnFilename3 = outputfile.filename;
        console.log("filename is -->"+ returnFilename3);
       postbook(capturedImage);
    }
    
    var fail = function (error) {
       // alert("An error has occurred: Code = " + error.code);
        navigator.notification.alert(
            'Error occured while uploading images',  // message
            alertDismissed,         // callback
            'Backend Issues',            // title
            'Done'                  // buttonName
        );
        console.log("upload error source " + error.source);
        console.log("upload error target " + error.target);
    }
    
    var options = new FileUploadOptions();
    options.fileKey = "file";
    //options.fileName = imagedata.substr(imagedata.lastIndexOf('/') + 1);
    options.fileName = capturedImage.substr(capturedImage.lastIndexOf('/') + 1);
    //comment below
    //capturedfilename = options.fileName;
    //options.mimeType = "text/plain";
    options.mimeType = "image/jpeg";
    
    var params = {};
    params.value1 = "test";
    params.value2 = "param";
    
    options.params = params;
    
    var ft = new FileTransfer();
    
    var capturedImageArray = [capturedImage, capturedImage2, capturedImage3];
    
    //ft.upload(capturedImage, encodeURI("http://192.168.0.19:3000/executive/imagetoserver"), win, fail, options);
    ft.upload(capturedImage, encodeURI(imagetoserver_url), win, fail, options);
    
    
    
    
}




function postbook(capturedImage) {
    
    //var final_url = 'http://192.168.0.19:3000/executive/postbook';
    console.log("reached postbook with--->"+capturedImage);
   // alert($('#userComments').val());
   // alert($('#myUniversityinPost option:selected').text());
    //alert(sessionStorage.getItem("usernameId"));
    //navigator.camera.getPicture(function(pictureHere){
 
        var interval = setInterval(function(){
            $.mobile.loading('show',{
                text: 'foo',
                textVisible: true,
                theme: 'z',
                html: "<span class='ui-bar ui-overlay-c ui-corner-all'><img src='./css/5.gif' /><h2>loading</h2></span>"
              });
        
            clearInterval(interval);
            },1);  
    $.ajax({
        type: "POST",
        url: postbook_url,
        dataType: "json",
        //data: JSON.stringify( { "bookname": $('#bookname').val(), "price": $('#price').val(), "picture":capturedImage } ),
        data: JSON.stringify( { 
            "bookname": $('#bookname').val(), 
            "price": payAmountElement.getNumber(), 
            "picture":returnFilename, 
            "picture2":returnFilename2, 
            "picture3":returnFilename3,
            "username":sessionStorage.getItem("usernameId"),
            "uniName" :uninameText,
            "user_comments" :$('#userComments').val(),
            "payAmount":payAmount
                    } ),
        contentType: "application/json",
        success: function(response) {
            //alert('Your book was successfully posted!');
            if(response.code == 441){
            navigator.notification.alert(
                //'Your book was successfully posted',  // message
                response.success,  // message
                alertDismissed,         // callback
                'Success',            // title
                'Done'                  // buttonName
            );
            window.location = "search.html";
            }
            var interval = setInterval(function(){
                $.mobile.loading('hide');
                clearInterval(interval);
                },1);  
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //show error message
            navigator.notification.alert(
                'Phto loading / Post book failed',  // message
                alertDismissed,         // callback
                'Backend Issues',            // title
                'Done'                  // buttonName
            );
            //alert("Phto loading / Post book failed");
            //alert("error is"+ errorThrown);
            //alert(XMLHttpRequest);
            var interval = setInterval(function(){
                $.mobile.loading('hide');
                clearInterval(interval);
                },1);  
        }
    });
   // });
}

/*
function postbook() {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(function(pictureHere){
      
        $.ajax({
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        url: url,
        data: JSON.stringify({ "data": date_str, "PICTUREHERE":pictureHere}),
        success: function (output) {
          //my stuff
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
          //my error stuff
        }
        });
        
      }, function (message) {
        Alert("Error", "error");
      }, {
        quality: 50,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
      }
    );
  }
*/
function buttonhide(){
    alert("in buttonhide");
    $("#cameratakepicture").hide();
    $("#camerachangepicture").show();
}

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
            
                console.log("success");
                
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