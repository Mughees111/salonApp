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

export {
    loggedInObservable,
    changeLoggedIn,
    alertmsg,
    showmsg,
    navigateToPostNow,
    navigateToPost
}