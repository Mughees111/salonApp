import { BehaviorSubject } from 'rxjs';

const loggedInObservable = new BehaviorSubject(0);
const alertmsg = new BehaviorSubject({type:"",title:"",body:""})
const navigateToPost = new BehaviorSubject({id:0,where:"nowhere"});


const changeLoggedIn = {
    changeNow: function(t){
        loggedInObservable.next(t)
    }
}

const navigateToPostNow = {
    navigate: function(t){
        // if(t.where=="nowhere") return;
        console.log("opening with honor")
        console.log(t);
        navigateToPost.next(t)
    }
}

const showmsg = function(a,b,c){
    alertmsg.next({type:a,title:b,body:c})
}

export const allStacks = [
    { id: '1', name: 'OnBoardingTabs', parent: '0' },
    { id: '2', name: 'OnBoarding1', parent: '1' },
    { id: '3', name: 'OnBoarding2', parent: '1' },
    { id: '4', name: 'OnBoarding3', parent: '1' },
    { id: '5', name: 'AuthStack', parent: '0' },
    { id: '6', name: 'SignUp', parent: '5' },
    { id: '7', name: 'OTP', parent: '5' },
    { id: '8', name: 'SignIn', parent: '5' },
    { id: '9', name: 'ForgetPass', parent: '5' },
    { id: '10', name: 'ForgetPassOpt', parent: '5' },
    { id: '11', name: 'NewPass', parent: '5' },
    { id: '12', name: 'UserChatNavigator', parent: '0' },
    { id: '13', name: 'UserChat', parent: '12' },
    { id: '14', name: 'ChatDetails', parent: '12' },
    { id: '15', name: 'HomeStack', parent: '0' },
    { id: '17', name: 'Home', parent: '15' },
    { id: '18', name: 'ViewAll', parent: '15' },
    { id: '19', name: 'SearchScreen', parent: '15' },
    { id: '20', name: 'SalonDetails', parent: '15' },
    { id: '21', name: 'SeeAllServices', parent: '15' },
    { id: '22', name: 'AllReviews', parent: '15' },
    { id: '23', name: 'BookAppointment', parent: '15' },
    { id: '24', name: 'AppointBooked', parent: '15' },
    { id: '25', name: 'Categories', parent: '15' },
    { id: '26', name: 'Notifications', parent: '15' },
    { id: '28', name: 'PaymentMethod', parent: '15' },
    { id: '29', name: 'PaypalAccount', parent: '15' },
    { id: '30', name: 'EditPayPalDetails', parent: '15' },
    { id: '31', name: 'AddCardDetails', parent: '15' },
    { id: '32', name: 'SettingsStack', parent: '0' },
    { id: '33', name: 'UserScreen', parent: '32' },
    { id: '34', name: 'EditPaymentMethod', parent: '32' },
    { id: '35', name: 'EditProfile', parent: '32' },
    { id: '36', name: 'Settings', parent: '32' },
    { id: '37', name: 'ChangePass', parent: '32' },
    { id: '38', name: 'ForgetPassOpt', parent: '32' },
    { id: '39', name: 'NewPass', parent: '32' },
    { id: '30', name: 'NotificationSettings', parent: '32' },
  
    { id: '40', name: 'AppintmentsStack', parent: '0' },
    { id: '41', name: 'AppointSchedule', parent: '40' },
    { id: '42', name: 'SeeAllServices', parent: '40' },
    { id: '43', name: 'BookAppointment', parent: '40' },
    { id: '44', name: 'AppointBooked', parent: '40' },
    { id: '45', name: 'PaymentMethod', parent: '40' },
    { id: '46', name: 'UserChatNavigator', parent: '40' },
    
    { id: '47', name: 'ChangePass', parent: '32' },
    { id: '48', name: 'ForgetPassOpt', parent: '32' },
    { id: '49', name: 'NewPass', parent: '32' },
    { id: '40', name: 'NotificationSettings', parent: '32' },
  ]
  

export {
    loggedInObservable,
    changeLoggedIn,
    alertmsg,
    showmsg,
    navigateToPostNow,
    navigateToPost
}