export default function facebookGetUser(userId) {
    window.FB.api(
        "/" + userId + "/",
        function (response) {
          if (response && !response.error) {
            console.log(response);
          } else {
              console.log('error retriving user info');
          }
        }
    );
}