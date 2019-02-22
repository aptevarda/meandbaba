/*
urlexecutive_name = 'http://192.168.0.24:3000/executive/';
urlimageserver = 'http://192.168.0.24:3000/';
*/
//using a2hosting links

urlexecutive_name = 'http://booksite.a2hosted.com:35001/executive/';

urlimageserver = 'http://booksite.a2hosted.com:35001/';

urlrideshare_name = 'http://booksite.a2hosted.com:35001/rideshare/';

urluserCrud_name = 'http://booksite.a2hosted.com:35001/userCrud/';



// my laptop

//register.js
//var populateuniName_url = 'http://192.168.0.24:3000/executive/populateuniName';
var populateuniName_url = urlexecutive_name+'populateuniName';
//var create_url = 'http://192.168.0.24:3000/executive/create';
var create_url = urluserCrud_name + 'create';

//index.js

//var loginvalidation_url = urlexecutive_name + 'loginvalidation';
var loginvalidation_url = urluserCrud_name + 'loginvalidation';

//var codevalidation_url = 'http://192.168.0.24:3000/executive/codevalidation';
var codevalidation_url = urluserCrud_name + 'codevalidation';
//var savePushNotifyToken_url = 'http://192.168.0.24:3000/executive/savePushNotifyToken';
var savePushNotifyToken_url = urlexecutive_name + 'savePushNotifyToken';


//index.js buybook.js
//var pushmessage_url = 'http://192.168.0.24:3000/executive/pushmessage';
var pushmessage_url = urlexecutive_name + 'pushmessage';


//forgotpassword.js
//var forgotpassword_url = 'http://192.168.0.24:3000/executive/forgotpassword';
var forgotpassword_url = urluserCrud_name + 'forgotpassword';
var verifyrandomcode_url = urluserCrud_name + 'verifyrandomcode';
var changepassword_url = urluserCrud_name + 'changepassword';

//settings.html
var saveMySettings_url = urluserCrud_name + 'saveMySettings';


//search.js
var populatesearchbar_url = urlexecutive_name + 'populatesearchbar';
var imagesavelocation_url = urlimageserver + '/images/'
var sellerstripeauthorize_url = urlexecutive_name + 'authorize';
var checkbookStatus_url = urlexecutive_name + 'checkbookStatus';

//postbook
var postbook_url = urlexecutive_name + 'postbook';
var imagetoserver_url = urlexecutive_name + 'imagetoserver';
var validatestripeaccount_url = urlexecutive_name + 'validatestripeaccount';
var getpaypalAuthorize_url = urlexecutive_name + 'getpaypalAuthorize';
var getPayoutPriceParam_url = urlexecutive_name + 'getPayoutPriceParam';

//bookdetail , buybook
var populatebookDetail_url = urlexecutive_name + 'populatebookDetail';
var braintreeCheckout_url = urlexecutive_name + 'braintreeCheckout';

//salehistory
var populatesaleHistory_url = urlexecutive_name + 'populatesaleHistory';
var populatebuyHistory_url = urlexecutive_name + 'populatebuyHistory';
var delist_url = urlexecutive_name + 'delist';
var buyconfirm_url = urlexecutive_name + 'buyconfirm';
var cancelSale_url = urlexecutive_name + 'cancelSale';
var buyCancel_url = urlexecutive_name + 'buyCancel';
var changePrice_url = urlexecutive_name + 'changePrice';
var sellerHistory_url = urlexecutive_name + 'sellerHistory';
var buyerHistory_url = urlexecutive_name + 'buyerHistory';
//var getUserDetails_url = urluserCrud_name + 'getUserDetails'

//buybook
var updateStripeBuyTransaction_url = urlexecutive_name + 'updateStripeBuyTransaction';
var populatePaypalToken_url = urlexecutive_name + 'populatePaypalToken';
var updateBraintreePaypalBuyTransaction_url = urlexecutive_name + 'updateBraintreePaypalBuyTransaction';
var braintreeCheckout_url = urlexecutive_name + 'braintreeCheckout';

//paypalPayout
var showPaypalPayout_url = urlexecutive_name +'showPaypalPayout';
var singlePaypalPayout_url= urlexecutive_name + 'singlePaypalPayout';

//rideshare List
var populaterideList_url = urlrideshare_name +'populaterideList';
var checkrideStatus_url = urlrideshare_name + 'checkrideStatus';

//bookride
var bookmyride_url = urlrideshare_name +'bookmyride';

//postmyride
var postmyride_url = urlrideshare_name +'postmyride';

var userDetails_url = urluserCrud_name + 'userDetails';

//ridehistory
var riderHistory_url = urlrideshare_name +'riderHistory';
var rideOwnerHistory_url = urlrideshare_name +'rideOwnerHistory';
var riderCancel_url = urlrideshare_name +'riderCancel';
var rideOwnerCancel_url = urlrideshare_name +'rideOwnerCancel';
var pushmessageforRider_url = urlrideshare_name +'pushmessageforRider';

//landingpage

var populaterideownerHistory_url = urlrideshare_name +'populaterideownerHistory';


//privacy polict / TOS
var url_privacy_policy = 'https://quizeek.wordpress.com/privacy-policy/';
var url_terms_of_use = 'https://quizeek.wordpress.com/terms-of-use-2/';

//my laptop



//alert messages
var server_notconnecting ="There is a issue in getting details. Please try again later";
/*
function calculatePayAmount(price){
    var payAmount;
    if(price <= 1){
        return 0;
       }else if( price <= 30 ){
        payAmount = price -   (price*0.029) - 0.25 - 0.50 ;
        return payAmount;
       }else{
        payAmount = price -   (price*0.029)- 0.25 - 1 ;
        return payAmount;
       }

}
*/


/* all session storage

sessionstorage_buyConfirmId  - buy conform click from saleHistory
usernameId - capturing logged in user id

pwd - VovpszcZ#jT5UyCFmFMi


*/


//comment to test github push and clone