import { oAuthLogin } from "./users";

//window is a global space
window.fbAsyncInit = function() {

    //initialization function
    FB.init({
      appId      : '2527396037288741',
      cookie     : true,
      xfbml      : true,
      version    : 'v3.2'
    });
      
    FB.AppEvents.logPageView();
  };

  //defining function
  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     //below script calls FBasync
     js.src = "https://connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
   //function immediately called


//FB login function
   export function Login(){
       //promise has 1 paramater: a function with one parameter: the resolve function, with the login() function in body
       return new Promise( (resolve, reject) => {
           FB.login(function(response) {
               console.log(response);
               if (response.status === "connected"){
                   FB.api("me?fields=id,name,email", response2 => {
                    oAuthLogin(response.authResponse.accessToken, response2.id)
                    .then(x=> resolve({ x, response2 }))
                   })
               }else{
                   reject(Error("User did not log in"));
               }
            },
            //scope is list of data that app is requesting from FB
            {scope: 'public_profile,email'});
       })
   }