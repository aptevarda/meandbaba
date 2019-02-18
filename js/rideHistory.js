//window.addEventListener("load", startup);
document.addEventListener("deviceready", startup, false);

function startup() {
    //console.log(device.platform);
   // alert("rerached search");
   var countofUnsold = 0;
   $('.ui-icon-power').css("background-color", "#333333");
   $('.ui-icon-bars').css("background-color", "#333333");
   $('.ui-icon-refresh').css("background-color", "#333333");

   //$(".loader").fadeOut(1000);
   $(document).bind('mobileinit', function () {
    //Loader settings
    $.mobile.loader.prototype.options.text = "Loading..";
    $.mobile.loader.prototype.options.textVisible = true;
    $.mobile.loader.prototype.options.theme = "b";
    $.mobile.loader.prototype.options.textonly = false; 
    }); 
   

    var sellbookbutton = $('#sellbookbutton').click(function() {
        redirect_to_postbook();
    });

    // Logout click
    $('#getmerideList').click (function(){
        window.location= "rideList.html";
    });

    $('#refresh').click (function(){
        //window.location= "saleHistory.html";
        if(sessionStorage.getItem("userClick_forRideHistory") == "rideOwnerHistory"){
            getRideOwnerHistory();
        }
        if(sessionStorage.getItem("userClick_forRideHistory") == "riderHistory"){
            getriderHistory();
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

    

    
   //************  for Ride Owner history  ****************/
   function getRideOwnerHistory(){

    var rideDateInUTCfromapp = moment(moment().startOf('day')).utc();
    console.log(rideDateInUTCfromapp);
    rideDateInUTCfromapp.set({
    hour:   7,
    minute: 0,
    second: 0
    });
    var rideDateInUTC = rideDateInUTCfromapp.format('YYYY-MM-DD');
    console.log(rideDateInUTC);
    var compareTime = moment().format("HH:mm:ss");

    if(sessionStorage.getItem("userClick_forRideHistory") == "rideOwnerHistory"){
        //$("#pageTitle").html("Sale History");
        $('#pageTitle').css({ 'color': '#000000', 'font-weight':'bold'});
        $("#pageTitle").html("Ride Owner History");
        var interval = setInterval(function(){
            $.mobile.loading('show');
            clearInterval(interval);
            },1); 
        
       // $("#instructions").html("");
       // $("#instructions").html("Delete - Book removed from Sale List  <br> Cancel - Cancel the buy deal <br> $ Change - Change price after buyer negotitaion " );
        // var final_url = 'http://192.168.0.19:3000/executive/populatesaleHistory';
       var allItems = '';
    $.ajax({
        type: "POST",
        url: rideOwnerHistory_url,
        dataType: "json",
        timeout: 100000,
        data: JSON.stringify( { 
            "username":sessionStorage.getItem("usernameId")
                    } ),
        contentType: "application/json",
        success: function(data, status){
            //alert(data);
            $.each(data, function(i, item) {
                //test
                var compareRideDate = moment(item.rideDate).format('YYYY-MM-DD');
                if (  (item.rideTime > compareTime && compareRideDate == rideDateInUTC) || ( compareRideDate > rideDateInUTC )  ) {
                
                    console.log( "Success -- "+item.rideId+" ride date is "+item.rideDate +" and ridetime is " +item.rideTime + "compare date and time are " + rideDateInUTC +"_"+compareTime)
                }else{
                    console.log( "failed -- "+item.rideId +" ride date is "+item.rideDate +" and ridetime is " +item.rideTime + "compare date and time are " + rideDateInUTC +"_"+compareTime)
                }
                //test
                //Another check routine
                var todayDate = moment();
                var rideDate = moment(item.rideDate);
                if (rideDate.isAfter(todayDate)){
                   // alert("we are in the game"+item.rideId);
                }else{
                   // alert("Not sure why we are not in the game"+item.rideId);
                }
                //above routine is only for checking
                if ( item.trxId ){
                    // alert("In rideowner history"+item.trxId);
                     if(item.rideStatus == 'V'){
                             //alert("rideStatus is V");
                             itemtext = "Trx id : "+ item.trxId + "\n - You CANCELLED this ride  on "+new Date(item.cancelledbyOwnerOn).toDateString() + " for "+item.seats + " seat/s.";
                             //allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.rideId + ')'+ item.rideFrom +' to '+item.rideTo + '<br> Seats:'+ item.rideSeats + ' Booked: '  + item.ridesBooked +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p><button class="riderCancel">Cancel my ride</button></div></a></li>';
                             allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#">   <p class="wrap" style="color:black;font-size:12px;font-weight:bold;">' + item.rideFrom +' to '+item.rideTo +' ( Seats:'+ item.rideSeats + ', Booked: '  + item.ridesBooked +' )'  +'<br> Ride id : '+ item.rideId + ' -  '+ moment(item.rideDate).format('llll') +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p></div></a></li>';
                    }else if (  rideDate.isAfter(todayDate)  ){   
                        if (item.ridetrxStatus == 'V'){

                            itemtext = "Trx id : "+ item.trxId + "\n - Rider cancelled  this ride  on "+new Date(item.cancelledbyriderOn).toDateString() + " for "+item.seats + " seat/s.";
                            //allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.rideId + ')'+ item.rideId + '<br> Price: $'+ item.rideId +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p><button class="riderCancel">Cancel my ride</button></div></a></li>';
                            allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">' + item.rideFrom +' to '+item.rideTo +' ( Seats:'+ item.rideSeats + ', Booked: '  + item.ridesBooked +' )'  +'<br> Ride id : '+ item.rideId + ' -  '+ moment(item.rideDate).format('llll') +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p><button class="rideOwnerCancel">Cancel this ride</button></div></a></li>';
                        
                        }else{

                            itemtext = "Trx id : "+ item.trxId + "\n - Rider booked  this ride  on "+new Date(item.rideBookedon).toDateString() + " for "+item.seats + " seat/s.";
                            //allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.rideId + ')'+ item.rideId + '<br> Price: $'+ item.rideId +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p><button class="riderCancel">Cancel my ride</button></div></a></li>';
                            allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">' + item.rideFrom +' to '+item.rideTo +' ( Seats:'+ item.rideSeats + ', Booked: '  + item.ridesBooked +' )'  +'<br> Ride id : '+ item.rideId + ' -  '+ moment(item.rideDate).format('llll') +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p><button class="rideOwnerCancel">Cancel this ride</button></div></a></li>';
                        
                        }
                    } else {
                        // past due
                        if (item.ridetrxStatus == 'V'){

                            itemtext = "Trx id : "+ item.trxId + "\n - Rider cancelled  this ride  on "+new Date(item.cancelledbyriderOn).toDateString() + " for "+item.seats + " seat/s. This ride is PAST due.";
                            //allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.rideId + ')'+ item.rideId + '<br> Price: $'+ item.rideId +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p><button class="riderCancel">Cancel my ride</button></div></a></li>';
                            allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">' + item.rideFrom +' to '+item.rideTo +' ( Seats:'+ item.rideSeats + ', Booked: '  + item.ridesBooked +' )'  +'<br> Ride id : '+ item.rideId + ' -  '+ moment(item.rideDate).format('llll') +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p></div></a></li>';
                        
                        }else{

                            itemtext = "Trx id : "+ item.trxId + "\n - Rider booked  this ride  on "+new Date(item.rideBookedon).toDateString() + " for "+item.seats + " seat/s. This ride is PAST due.";
                            //allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.rideId + ')'+ item.rideId + '<br> Price: $'+ item.rideId +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p><button class="riderCancel">Cancel my ride</button></div></a></li>';
                            allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">' + item.rideFrom +' to '+item.rideTo +' ( Seats:'+ item.rideSeats + ', Booked: '  + item.ridesBooked +' )'  +'<br> Ride id : '+ item.rideId + ' -  '+ moment(item.rideDate).format('llll') +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p></div></a></li>';
                        
                        }

                     }
                    }else{
                        // alert("In rideowner history"+item.trxId + item.rideId);
                         if(item.rideStatus == 'V'){
     
                             itemtext = "You CANCELLED this ride on "+ new Date(item.rideCancelledOn).toDateString() + " for "+item.seats + " seat/s.";
                             //allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.rideId + ')'+ item.rideFrom +' to '+item.rideTo + '<br> Seats:'+ item.rideSeats + ' Booked: '  + item.ridesBooked +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p><button class="riderCancel">Cancel my ride</button></div></a></li>';
                             allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">' + item.rideFrom +' to '+item.rideTo +' ( Seats:'+ item.rideSeats + ', Booked: '  + item.ridesBooked +' )'  +'<br> Ride id : '+ item.rideId + ' -  '+ moment(item.rideDate).format('llll')+ item.rideTime +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p></div></a></li>';
                     
                         }else {
                             //check if this is past due
                             if (  rideDate.isAfter(todayDate)  ){
                              //not past due   
                             itemtext = "Ride id : "+ item.rideId + ".\n Nobody has BOOKED this ride yet.";
                             // allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.rideId + ')'+ item.rideId + '<br> Price: $'+ item.rideId +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p><button class="riderCancel">Cancel my ride</button></div></a></li>';
                             allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">' + item.rideFrom +' to '+item.rideTo +' ( Seats:'+ item.rideSeats + ', Booked: '  + item.ridesBooked +' )'  +'<br> Ride id : '+ item.rideId + ' -  '+ moment(item.rideDate).format('llll') +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p><button class="rideOwnerCancel">Cancel this ride</button></div></a></li>';
                             
                             }else{
                             //past due
                             itemtext = "Ride id : "+ item.rideId + ".\n Nobody has BOOKED this ride yet. This ride is PAST due.";
                             // allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.rideId + ')'+ item.rideId + '<br> Price: $'+ item.rideId +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p><button class="riderCancel">Cancel my ride</button></div></a></li>';
                             allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">' + item.rideFrom +' to '+item.rideTo +' ( Seats:'+ item.rideSeats + ', Booked: '  + item.ridesBooked +' )'  +'<br> Ride id : '+ item.rideId + ' -  '+ moment(item.rideDate).format('llll') + '<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p></div></a></li>';
                             }
     
                         }
     
     
                     }

                //end check routine code
                /*     
                if ( item.trxId ){
                   // alert("In rideowner history"+item.trxId);
                    if(item.rideStatus == 'V'){
                            //alert("rideStatus is V");
                            itemtext = "Trx id : "+ item.trxId + "\n - You CANCELLED this ride  on "+new Date(item.cancelledbyOwnerOn).toDateString() + " for "+item.seats + " seat/s.";
                            //allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.rideId + ')'+ item.rideFrom +' to '+item.rideTo + '<br> Seats:'+ item.rideSeats + ' Booked: '  + item.ridesBooked +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p><button class="riderCancel">Cancel my ride</button></div></a></li>';
                            allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#">   <p class="wrap" style="color:black;font-size:12px;font-weight:bold;">' + item.rideFrom +' to '+item.rideTo +' ( Seats:'+ item.rideSeats + ', Booked: '  + item.ridesBooked +' )'  +'<br> Ride id : '+ item.rideId + ' -  '+ new Date(item.rideDate).toDateString() + ' @ ' + item.rideTime +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p></div></a></li>';
                    //check that date is not pst due
                    }else if (  (item.rideTime > compareTime && compareRideDate == rideDateInUTC) || ( compareRideDate > rideDateInUTC )  ){
                    // not past due
                        if (item.ridetrxStatus == 'V'){

                            itemtext = "Trx id : "+ item.trxId + "\n - Rider cancelled  this ride  on "+new Date(item.cancelledbyriderOn).toDateString() + " for "+item.seats + " seat/s.";
                            //allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.rideId + ')'+ item.rideId + '<br> Price: $'+ item.rideId +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p><button class="riderCancel">Cancel my ride</button></div></a></li>';
                            allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">' + item.rideFrom +' to '+item.rideTo +' ( Seats:'+ item.rideSeats + ', Booked: '  + item.ridesBooked +' )'  +'<br> Ride id : '+ item.rideId + ' -  '+ new Date(item.rideDate).toDateString() + ' @ ' + item.rideTime +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p><button class="rideOwnerCancel">Cancel this ride</button></div></a></li>';
                        
                        }else{

                            itemtext = "Trx id : "+ item.trxId + "\n - Rider booked  this ride  on "+new Date(item.rideBookedon).toDateString() + " for "+item.seats + " seat/s.";
                            //allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.rideId + ')'+ item.rideId + '<br> Price: $'+ item.rideId +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p><button class="riderCancel">Cancel my ride</button></div></a></li>';
                            allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">' + item.rideFrom +' to '+item.rideTo +' ( Seats:'+ item.rideSeats + ', Booked: '  + item.ridesBooked +' )'  +'<br> Ride id : '+ item.rideId + ' -  '+ new Date(item.rideDate).toDateString() + ' @ ' + item.rideTime +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p><button class="rideOwnerCancel">Cancel this ride</button></div></a></li>';
                        
                        }
                    } else {
                        // past due
                        if (item.ridetrxStatus == 'V'){

                            itemtext = "Trx id : "+ item.trxId + "\n - Rider cancelled  this ride  on "+new Date(item.cancelledbyriderOn).toDateString() + " for "+item.seats + " seat/s. This ride is PAST due.";
                            //allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.rideId + ')'+ item.rideId + '<br> Price: $'+ item.rideId +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p><button class="riderCancel">Cancel my ride</button></div></a></li>';
                            allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">' + item.rideFrom +' to '+item.rideTo +' ( Seats:'+ item.rideSeats + ', Booked: '  + item.ridesBooked +' )'  +'<br> Ride id : '+ item.rideId + ' -  '+ new Date(item.rideDate).toDateString() + ' @ ' + item.rideTime +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p></div></a></li>';
                        
                        }else{

                            itemtext = "Trx id : "+ item.trxId + "\n - Rider booked  this ride  on "+new Date(item.rideBookedon).toDateString() + " for "+item.seats + " seat/s. This ride is PAST due.";
                            //allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.rideId + ')'+ item.rideId + '<br> Price: $'+ item.rideId +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p><button class="riderCancel">Cancel my ride</button></div></a></li>';
                            allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">' + item.rideFrom +' to '+item.rideTo +' ( Seats:'+ item.rideSeats + ', Booked: '  + item.ridesBooked +' )'  +'<br> Ride id : '+ item.rideId + ' -  '+ new Date(item.rideDate).toDateString() + ' @ ' + item.rideTime +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p></div></a></li>';
                        
                        }

                     }

                }else{
                   // alert("In rideowner history"+item.trxId + item.rideId);
                    if(item.rideStatus == 'V'){

                        itemtext = "You CANCELLED this ride on "+ new Date(item.rideCancelledOn).toDateString() + " for "+item.seats + " seat/s.";
                        //allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.rideId + ')'+ item.rideFrom +' to '+item.rideTo + '<br> Seats:'+ item.rideSeats + ' Booked: '  + item.ridesBooked +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p><button class="riderCancel">Cancel my ride</button></div></a></li>';
                        allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">' + item.rideFrom +' to '+item.rideTo +' ( Seats:'+ item.rideSeats + ', Booked: '  + item.ridesBooked +' )'  +'<br> Ride id : '+ item.rideId + ' -  '+ new Date(item.rideDate).toDateString() + ' @ ' + item.rideTime +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p></div></a></li>';
                
                    }else {
                        //check if this is past due
                        if (  (item.rideTime > compareTime && compareRideDate == rideDateInUTC) || ( compareRideDate > rideDateInUTC )  ){
                         //not past due   
                        itemtext = "Ride id : "+ item.rideId + ".\n Nobody has BOOKED this ride yet.";
                        // allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.rideId + ')'+ item.rideId + '<br> Price: $'+ item.rideId +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p><button class="riderCancel">Cancel my ride</button></div></a></li>';
                        allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">' + item.rideFrom +' to '+item.rideTo +' ( Seats:'+ item.rideSeats + ', Booked: '  + item.ridesBooked +' )'  +'<br> Ride id : '+ item.rideId + ' -  '+ new Date(item.rideDate).toDateString() + ' @ ' + item.rideTime +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p><button class="rideOwnerCancel">Cancel this ride</button></div></a></li>';
                        
                        }else{
                        //past due
                        itemtext = "Ride id : "+ item.rideId + ".\n Nobody has BOOKED this ride yet. This ride is PAST due.";
                        // allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.rideId + ')'+ item.rideId + '<br> Price: $'+ item.rideId +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p><button class="riderCancel">Cancel my ride</button></div></a></li>';
                        allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">' + item.rideFrom +' to '+item.rideTo +' ( Seats:'+ item.rideSeats + ', Booked: '  + item.ridesBooked +' )'  +'<br> Ride id : '+ item.rideId + ' -  '+ new Date(item.rideDate).toDateString() + ' @ ' + item.rideTime +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p></div></a></li>';
                        }

                    }


                }
                */
                
 

                });
              
            //appending buttons
                /*
                var allItems = '';
                for (var i=0; i< 4; i++){
                    //allItems += '<li data-rowid="' + i + '"><a href="#"><div data-role="controlgroup" data-type="horizontal"><input type="button" value="Hmm" /><input type="button" value="No" /><input type="button" value="Yes" /></div>&nbsp;Item ' + i + ' text or description</a></li>';
                    allItems += '<li data-rowid="' + i + '"><a href="#"><div data-role="controlgroup" data-type="horizontal">&nbsp;<button>Delete</button><button>Cancel</button><button>Change Price</button></div>&nbsp;Item ' + i + ' text or description</a></li>';   
                }
                */
                $("#ridelist").empty().append(allItems).listview("refresh").enhanceWithin();
                var interval = setInterval(function(){
                    $.mobile.loading('hide');
                    clearInterval(interval);
                    },1); 

            //
            
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
            var interval = setInterval(function(){
                $.mobile.loading('hide');
                clearInterval(interval);
                },1); 
            //alert("error is"+ errorThrown);
            //alert(XMLHttpRequest);
        }
        
        });//ajax end
    } // session id sale history data
}

            getRideOwnerHistory();

            $("#ridelist").on("click", "li input", function(e){
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
            

    //********************  for rider history  ****************************

    function getriderHistory(){
        /*
        console.log(moment().startOf('day'));
        console.log(moment());
        console.log(moment().format("HH:mm:ss"));
        */
        var rideDateInUTCfromapp = moment(moment().startOf('day')).utc();
        console.log(rideDateInUTCfromapp);
        rideDateInUTCfromapp.set({
        hour:   7,
        minute: 0,
        second: 0
        });
        var rideDateInUTC = rideDateInUTCfromapp.format('YYYY-MM-DD HH:mm:ss')
        console.log(rideDateInUTC);
        var compareTime = moment().format("HH:mm:ss");
        

        if(sessionStorage.getItem("userClick_forRideHistory") == "riderHistory"){
        //$("#pageTitle").html("Purchase History");
        $('#pageTitle').css({ 'color': '#000000', 'font-weight':'bold'});
        $("#pageTitle").html("Rider History");
        var interval = setInterval(function(){
            $.mobile.loading('show');
            clearInterval(interval);
            },1); 
       //$("#instructions").html('Learn more - Buy confirm ,Canel <a href="#popupInfo" data-rel="popup" data-transition="pop" class="my-tooltip-btn ui-btn ui-alt-icon ui-nodisc-icon ui-btn-inline ui-icon-info ui-btn-icon-notext" title="Learn more">Learn more</a>'); 
       //$("#popupInfo").html("Click <strong> Buy Confirm </strong> to confirm receipt of book. This is required to be done<br> Click<strong> Cancel </strong> to cancel the deal.");
       //var final_url = 'http://192.168.0.19:3000/executive/populatebuyHistory';
        var allItems = '';
        $.ajax({
            type: "POST",
            url: riderHistory_url,
            dataType: "json",
            timeout: 100000,
            data: JSON.stringify( { 
                "username":sessionStorage.getItem("usernameId")
                        } ),
            contentType: "application/json",
            success: function(data, status){
                //alert("recahed at rider output");
                $.each(data, function(i, item) {
                    compareRideDate = moment(item.rideDate).format('YYYY-MM-DD');

                    var todayDate = moment();
                    var rideDate = moment(item.rideDate);

                    //
                    if (item.ridetrxStatus == ''){
                        console.log(item.rideDate);
                        if (  rideDate.isAfter(todayDate)  ){
                            //alert("recahed at rider output for booked ride");
                            itemtext = "Trx id : "+ item.trxId + "\n - You Booked  this ride  on "+new Date(item.rideBookedon).toDateString() + " for "+item.seats + " seat/s @ $" + item.ridePrice  +" per seat.";
                            //allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.rideId + ')'+ item.rideId + '<br> Price: $'+ item.rideId +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p><button class="riderCancel">Cancel my ride</button></div></a></li>';
                            allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">' + item.rideFrom +' to '+item.rideTo +' ( Seats:'+ item.rideSeats + ', Booked: '  + item.ridesBooked +' )'  +'<br> Ride id : '+ item.rideId + ' -  '+ moment(item.rideDate).format('llll') +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p><button class="riderCancel">Cancel my ride</button></div></a></li>';
                        }else{
                            itemtext = "Trx id : "+ item.trxId + "\n - You Booked  this ride  on "+new Date(item.rideBookedon).toDateString() + " for "+item.seats + " seat/s @ $" + item.ridePrice  +" per seat. Ride is PAST Due. ";
                            //allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.rideId + ')'+ item.rideId + '<br> Price: $'+ item.rideId +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p><button class="riderCancel">Cancel my ride</button></div></a></li>';
                            allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">' + item.rideFrom +' to '+item.rideTo +' ( Seats:'+ item.rideSeats + ', Booked: '  + item.ridesBooked +' )'  +'<br> Ride id : '+ item.rideId + ' -  '+ moment(item.rideDate).format('llll')+'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p></div></a></li>';    

                        }
                    }else if (item.ridetrxStatus == 'V'){
                        if (item.cancelledbyriderOn != '0000-00-00 00:00:00'){

                            itemtext = "Trx id : "+ item.trxId + ".\n You CANCELLED this Transaction on " + new Date(item.cancelledbyriderOn).toDateString();
                           // allItems += '<li data-rowid="' + item.rideId + '"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.bookId + ')'+ item.bookName + '<br> Price: $'+ item.price +'<br>'+ itemtext +'</p></div></a></li>';
                            allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">' + item.rideFrom +' to '+item.rideTo +' ( Seats:'+ item.rideSeats + ', Booked: '  + item.ridesBooked +' )'  +'<br> Ride id : '+ item.rideId + ' -  '+ moment(item.rideDate).format('llll') +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p></div></a></li>';
                    
                        }else
                       {
    
                            itemtext = "Trx id : "+ item.trxId + ".\n Ride owner CANCELLED this Transaction on " + new Date(item.cancelledbyOwnerOn).toDateString();
                            //allItems += '<li data-rowid="' + item.rideId + '"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.bookId + ')'+ item.bookName + '<br> Price: $'+ item.price +'<br>'+ itemtext +'</p></div></a></li>';
                            allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">' + item.rideFrom +' to '+item.rideTo +' ( Seats:'+ item.rideSeats + ', Booked: '  + item.ridesBooked +' )'  +'<br> Ride id : '+ item.rideId + ' -  '+ moment(item.rideDate).format('llll') +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p></div></a></li>';
                    
                       }

                      }
                    //
                    /*  
                    if (item.ridetrxStatus == ''){
                        console.log(item.rideDate);
                        if (  (item.rideTime > compareTime && compareRideDate == rideDateInUTC) || ( compareRideDate > rideDateInUTC )  ){
                            //alert("recahed at rider output for booked ride");
                            itemtext = "Trx id : "+ item.trxId + "\n - You Booked  this ride  on "+new Date(item.rideBookedon).toDateString() + " for "+item.seats + " seat/s @ $" + item.ridePrice  +" per seat.";
                            //allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.rideId + ')'+ item.rideId + '<br> Price: $'+ item.rideId +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p><button class="riderCancel">Cancel my ride</button></div></a></li>';
                            allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">' + item.rideFrom +' to '+item.rideTo +' ( Seats:'+ item.rideSeats + ', Booked: '  + item.ridesBooked +' )'  +'<br> Ride id : '+ item.rideId + ' -  '+ new Date(item.rideDate).toDateString() + ' @ ' + item.rideTime +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p><button class="riderCancel">Cancel my ride</button></div></a></li>';
                        }else{
                            itemtext = "Trx id : "+ item.trxId + "\n - You Booked  this ride  on "+new Date(item.rideBookedon).toDateString() + " for "+item.seats + " seat/s @ $" + item.ridePrice  +" per seat. Ride is PAST Due. ";
                            //allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.rideId + ')'+ item.rideId + '<br> Price: $'+ item.rideId +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p><button class="riderCancel">Cancel my ride</button></div></a></li>';
                            allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">' + item.rideFrom +' to '+item.rideTo +' ( Seats:'+ item.rideSeats + ', Booked: '  + item.ridesBooked +' )'  +'<br> Ride id : '+ item.rideId + ' -  '+ new Date(item.rideDate).toDateString() + ' @ ' + item.rideTime +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p></div></a></li>';    

                        }
                    }else if (item.ridetrxStatus == 'V'){
                        if (item.cancelledbyriderOn != '0000-00-00 00:00:00'){

                            itemtext = "Trx id : "+ item.trxId + ".\n You CANCELLED this Transaction on " + new Date(item.cancelledbyriderOn).toDateString();
                           // allItems += '<li data-rowid="' + item.rideId + '"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.bookId + ')'+ item.bookName + '<br> Price: $'+ item.price +'<br>'+ itemtext +'</p></div></a></li>';
                            allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">' + item.rideFrom +' to '+item.rideTo +' ( Seats:'+ item.rideSeats + ', Booked: '  + item.ridesBooked +' )'  +'<br> Ride id : '+ item.rideId + ' -  '+ new Date(item.rideDate).toDateString() + ' @ ' + item.rideTime +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p></div></a></li>';
                    
                        }else
                       {
    
                            itemtext = "Trx id : "+ item.trxId + ".\n Ride owner CANCELLED this Transaction on " + new Date(item.cancelledbyOwnerOn).toDateString();
                            //allItems += '<li data-rowid="' + item.rideId + '"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">(' + item.bookId + ')'+ item.bookName + '<br> Price: $'+ item.price +'<br>'+ itemtext +'</p></div></a></li>';
                            allItems += '<li data-trx="' + item.trxId + '" data-rowid="' + item.rideId + '"data-seats="'+ item.seats +'"><a href="#"><div data-role="controlgroup" data-type="horizontal"><p class="wrap" style="color:black;font-size:12px;font-weight:bold;">' + item.rideFrom +' to '+item.rideTo +' ( Seats:'+ item.rideSeats + ', Booked: '  + item.ridesBooked +' )'  +'<br> Ride id : '+ item.rideId + ' -  '+ new Date(item.rideDate).toDateString() + ' @ ' + item.rideTime +'<br style="color:blue;font-size:12px;font-weight:bold;">'+ itemtext +'</br></p></div></a></li>';
                    
                       }

                      }
                    */
         
                        });
                    
                
                $("#ridelist").empty().append(allItems).listview("refresh").enhanceWithin();
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
                var interval = setInterval(function(){
                    $.mobile.loading('hide');
                    clearInterval(interval);
                    },1); 
                //alert("error is"+ errorThrown);
                //alert(XMLHttpRequest);
            }
            
            });//ajax end

    }// session id end for purchasehistory data
}
            getriderHistory();
    
    //showing bookdetail 

    $("#ridelist").on("click", "li a", function(e){
        var clickedId = $(this).parents("li").data("rowid");
       // alert("You clicked the listitem withh id as "+rowid);
        sessionStorage.setItem("sessionstorage_clickedId", clickedId);
        window.location = "rideDetail.html";
    });

    //showing bookdetail

    // delisting the book
    $("#ridelist").on("click", ".delist", function(e){
        e.stopImmediatePropagation();
    
     // alert("Delisting " + $(this).parents("li").data("rowid"));
      var delistId = $(this).parents("li").data("rowid");
       //var delistId = $(this).parents("li").data("id");
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



    //CANCEL BUY starts


    $("#ridelist").on("click", ".riderCancel", function(e){
        e.stopImmediatePropagation();
    //$(document).on("click", ".buyConfirm", function () {
        //alert("Approve in riderCancel");
        //var clickedId = $(this).attr("id");
        var riderCancelId = $(this).parents("li").data('rowid');
        var riderCancelTrxId = $(this).parents("li").data('trx');
        var seats = $(this).parents("li").data('seats');
    //alert(clickedId);
        //re-direct to detail page and store to sessionstorage
        sessionStorage.setItem("sessionstorage_riderCancelId", riderCancelId);
     //alert(sessionStorage.getItem("sessionstorage_riderCancelId"));
     //alert("Transaction id "+riderCancelTrxId);
     //alert($(this).parents("li").data('trx'));
     //alert("seats booked are "+ $(this).parents("li").data('seats'));
        
    navigator.notification.confirm(
        'Would you like to cancel this ride? If confirmed , the rideowner will be notified about the cancellation.', // message
        onConfirm,            // callback to invoke with index of button pressed
        'Cancel Ride',           // title
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
                    url: riderCancel_url,
                    //url: "http://booksite.a2hosted.com:35001/rideshare/riderCancel",
                    dataType: "json",
                    //timeout: 100000,
                    data: JSON.stringify( { 
                        "rideId": riderCancelId,
                        "seats": seats,
                        "trxId": riderCancelTrxId
                                } ),
                    contentType: "application/json",
                    success: function(response){
                        console.log("--- riderCancel successful message from rideHistory");
                        console.log("json is"+JSON.stringify(response));
                        var JSONStringify = JSON.stringify(response);
                        var JSONparse = JSON.parse(JSONStringify);
                        console.log("responce is " + JSONparse.code + " other "+ JSONStringify.code);
                        if (response.code == 441) {
                        //alert("delisting 441");
                        navigator.notification.alert(
                            //'Sale cancel confirmed',  // message
                            response.message,
                            alertDismissed,         // callback
                            'Confirmed',            // title
                            'Done'                  // buttonName
                        );
                        //alert(response.success);
                        sendPushnotofication(riderCancelId,"rideCancelbyrider" );
                        window.location ="rideHistory.html";
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
                            window.location ="rideHistory.html";
                            };
                            var interval = setInterval(function(){
                                $.mobile.loading('hide');
                                clearInterval(interval);
                                },1); 

                       // setTimeout(function(){ window.location ="rideHistory.html"; }, 5000);
                        
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) {
                        //show error message
                        //alert(errorThrown+textStatus);
                        navigator.notification.alert(
                            "There was issue in cancelling this ride.",  // message
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


    //CANCEL rider ends

    //CANCEL RideOwner starts


        $("#ridelist").on("click", ".rideOwnerCancel", function(e){
            e.stopImmediatePropagation();
        //$(document).on("click", ".buyConfirm", function () {
            //alert("Approve in rideOwnerCancel");
            //var clickedId = $(this).attr("id");
            var rideOwnerCancelId = $(this).parents("li").data('rowid');
            var rideOwnerCancelTrxId = $(this).parents("li").data('trx');
            var seats = $(this).parents("li").data('seats');
        //alert(clickedId);
            //re-direct to detail page and store to sessionstorage
            sessionStorage.setItem("sessionstorage_rideOwnerCancelId", rideOwnerCancelId);
         //alert(sessionStorage.getItem("sessionstorage_riderCancelId"));
         //alert("Transaction id "+riderCancelTrxId);
         //alert($(this).parents("li").data('trx'));
         //alert("seats booked are "+ $(this).parents("li").data('seats'));
            
        navigator.notification.confirm(
            'Would you like to cancel this ride? If confirmed , the riders will be notified about the cancellation.', // message
            onConfirm,            // callback to invoke with index of button pressed
            'Cancel Ride',           // title
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
                        url: rideOwnerCancel_url,
                        //url: "http://booksite.a2hosted.com:35001/rideshare/riderCancel",
                        dataType: "json",
                        //timeout: 100000,
                        data: JSON.stringify( { 
                            "rideId": rideOwnerCancelId,
                            "seats": seats,
                            "trxId": rideOwnerCancelTrxId
                                    } ),
                        contentType: "application/json",
                        success: function(response){
                            console.log("--- rideOwnerCancel successful message from rideHistory");
                            console.log("json is"+JSON.stringify(response));
                            var JSONStringify = JSON.stringify(response);
                            var JSONparse = JSON.parse(JSONStringify);
                            console.log("responce is " + JSONparse.code + " other "+ JSONStringify.code);
                            if (response.code == 441) {
                            //alert("delisting 441");
                            navigator.notification.alert(
                                //'Sale cancel confirmed',  // message
                                response.message,
                                alertDismissed,         // callback
                                'Confirmed',            // title
                                'Done'                  // buttonName
                            );
                            //alert(response.success);
                            sendPushnotofication(rideOwnerCancelId,"rideCancelbyrideOwner" );
                            window.location ="rideHistory.html";
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
                                //sendPushnotofication();
                                window.location ="rideHistory.html";
                                };
                                var interval = setInterval(function(){
                                    $.mobile.loading('hide');
                                    clearInterval(interval);
                                    },1); 
    
                           // setTimeout(function(){ window.location ="rideHistory.html"; }, 5000);
                            
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            //show error message
                            //alert(errorThrown+textStatus);
                            navigator.notification.alert(
                                "RideOwner - There was issue in cancelling this ride.",  // message
                                alertDismissed,         // callback
                                'Error',            // title
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
    
    
//CANCEL RideOwner  ends
 

} // starup function ends



function redirect_to_postbook() {
    window.location = "postbook.html";
}

function alertDismissed() {
    // do something
}
function sendPushnotofication(rideId,messagetype){
    console.log("reached send push")
   // var final_url = 'http://192.168.0.19:3000/executive/pushmessage';
    username_Id = sessionStorage.getItem("usernameId");
   // alert(username_Id);
    $.ajax({
        type: "POST",
        url: pushmessageforRider_url,
        dataType: "json",
        //data: JSON.stringify( { "userName": "championved@gmail.com"} ),
        data: JSON.stringify( { 
            "userName": username_Id,
            "messagetype":messagetype,
            "rideId":rideId
        }),
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

