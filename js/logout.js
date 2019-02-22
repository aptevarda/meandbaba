//window.addEventListener("load", startup);
var token;
document.addEventListener("deviceready", startup, false);



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




function alertDismissed() {
    // do something
}
}