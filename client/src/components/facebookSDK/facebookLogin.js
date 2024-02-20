export default function facebookLogin() {
    window.FB.login((response) => {

        window.document.location.reload();
    }, {
        scope: 'public_profile',
    })
}