export default function facebookLogout() {
    window.FB.logout((response) => {
        console.log('looged out of facebook');
        window.document.location.reload();
    })  
}