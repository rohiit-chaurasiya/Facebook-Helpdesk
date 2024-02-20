export default function facebookInit() {
    return new Promise(resolve => {
        // wait for facebook sdk to initialize before starting the react app
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: '245923788601526',
                cookie: true,
                xfbml: true,
                version: 'v19.0'
            });

            // auto authenticate with the api if already logged in with facebook
            window.FB.getLoginStatus((resp) => {
                console.log(resp);
                resolve(resp.authResponse);
            });
        };

        // Load the SDK asynchronously
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));   
    });
}