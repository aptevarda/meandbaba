
var uninameText ="not selected";



document.addEventListener("deviceready", startup, false);
        


function startup() {
    //alert("platform is -->"+ device.platform);
    //alert("device.platform");
    //goback event

    //$(".loader").fadeOut(1100);
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
    //console.log(moment().format('lll'));
    $('.ui-icon-carat-l').css("background-color", "#333333");

    if (device.platform == "Android")
    {
        //alert("device.platform");
        $( "#getmeback" ).hide();
    }

    $( "#getmeback" ).click(function() {
        //alert( "Handler for .click() called." );
        window.location = "rideList.html";
      });

    //back event

    // count 20 characters for rideFrom and rideTo

    $('#rideFrom').bind('keydown', function() {
        /*
        setTimeout(function() {
           count.text($('#rideFrom').val().length);
        },4);
        */
        if ($('#rideFrom').val().length > 16)
        alert("exceeded");
    });

    $('#rideTo').bind('keydown', function() {
        /*
        setTimeout(function() {
           count.text($('#rideTo').val().length);
        },4);
        */
        if ($('#rideTo').val().length > 16)
        alert("exceeded");
    });


    $('#postMyRideButton').click(function() {
        if ($("#university-input").val() == ""){
            uninameText = "not selected";
            alert('Please enter the University values in the fields to proceed!');
        
        //alert("reached postridebutton");
        //if ($('#rideFrom').val() == '' || $('rideTo').val() == '' || uninameText != "" ||$('rideDate').val() == '' || $('rideTime').val() == '' || $('ridePrice').val() == '' || $('rideSeats').val() == '' || $('rideVeh').val() == ''|| $('#myUniversityinPost option:selected').text() == "Select University") {
        }else if ($('#rideFrom').val() == '' || $('rideTo').val() == '' || uninameText == "not selected" ||$('rideDateTime').val() == '' ||  $('ridePrice').val() == '' || $('rideSeats').val() == '' || $('rideVeh').val() == '') {
              alert('Please enter the values in all the fields to proceed!' + uninameText);
            //window.location = "postbook.html";
            
            
        }else{
        //uninameText=$('#myUniversityinPost option:selected').text();

       // alert (new Date($('#rideDate').val()));
       // alert(new Date($('#rideDate').val()).toUTCString());
       postmyRide();
       //alert("in postbook");
        //postbook(capturedImage);
         }
         //alert("clivked");
    });

    

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


}  // startup ends






function postmyRide() {
    
    //var final_url = 'http://192.168.0.19:3000/executive/postbook';
    console.log("reached postmydie with--->"+ $('#rideFrom').val());
    var interval = setInterval(function(){
        $.mobile.loading('show');
        clearInterval(interval);
        },1); 
   // alert($('#userComments').val());
   // alert($('#myUniversityinPost option:selected').text());
    //alert(sessionStorage.getItem("usernameId"));
    //navigator.camera.getPicture(function(pictureHere){
    $.ajax({
        type: "POST",
        url: postmyride_url,
        dataType: "json",
        //data: JSON.stringify( { "bookname": $('#bookname').val(), "price": $('#price').val(), "picture":capturedImage } ),
        data: JSON.stringify( { 
            "rideFrom": $('#rideFrom').val(), 
            "rideTo": $('#rideTo').val(),
            "ridePrice": $('#ridePrice').val(), 
            "rideSeats": $('#rideSeats').val(), 
           // "rideDate": $('#rideDate').val(),
            "rideDate": moment($('#rideDateTime').val()),
            //"rideDate": new Date().toISOString().slice(0, 19).replace('T', ' '),
            "rideTime": $('#rideTime').val(), 
            "rideVeh": $('#rideVeh').val(), 
            "rideOwner": sessionStorage.getItem("usernameId"),
            //"rideUniname": $('#myUniversityinPost option:selected').text(),
            "rideUniname":uninameText,
            "comments":$('#usercomments').val()
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
            window.location = "rideList.html";
            }
            var interval = setInterval(function(){
                $.mobile.loading('hide');
                clearInterval(interval);
                },1); 
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            //show error message
            navigator.notification.alert(
                'Post ride failed',  // message
                alertDismissed,         // callback
                'Failure',            // title
                'Done'                  // buttonName
            );
            var interval = setInterval(function(){
                $.mobile.loading('hide');
                clearInterval(interval);
                },1); 
            //alert("Phto loading / Post book failed");
            //alert("error is"+ errorThrown);
            //alert(XMLHttpRequest);
        }
    });
   // });
}



function alertDismissed() {
    // do something
}

function momentandtime(){
    
    console.log("your date output is "+ $('#rideDate').val() + " " +moment.tz.guess(true));
    var myrideDate = moment($('#rideDateTime').val());
    var todayDate = moment().utc().format('YYYY-MM-DD HH:mm:ss');
    console.log("Today's date and time is  "+ todayDate);
   
    console.log("This is moment in UTC db string  "+myrideDate.utc().format('YYYY-MM-DD HH:mm:ss'));
    var compare = myrideDate.utc();
    console.log(compare);
    //console.log(compare.local().format('LLLL'))
   
    //console.log("Your selecetd ridedate is " + myrideDate.format('LLLL'));
    var todaydateUTC = moment.utc();
    if (compare.isAfter(todaydateUTC) ){
        console.log("you can take this ride");
        console.log("Your selecetd ridedate is " + compare);
        console.log("Today's date  " + todaydateUTC);
    }else{
        console.log("Ride is past due");
    }

    console.log("ride local date and time  "+ myrideDate.local().format('LLLL'));

    /*used below guidance
    var time = "19:00";

        var date = new Date();
        var dateString = "0" + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear() + " " + time;

        //var dateString = "0" + (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear();

        $("#d1").html(dateString);

        date = moment(dateString, "MM/DD/YYYY HH:mm a");

        $("#d2").html(date.toString());

        $("#d3").html(date.toISOString());

        date = new Date(date).toISOString();

        $("#d4").html(date);
    */ 
}



