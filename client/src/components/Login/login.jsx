import logo from "../logo/facebook.svg";
import "./Login.css";

import facebookLogin from "../facebookSDK/facebookLogin";

export default function Login() {
    return (
        <div className='login-box'>
            {/* <div id="fb-root"></div>
            <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v19.0&appId=245923788601526" nonce="DG2tZvY6"></script>  
            <div class="fb-login-button" data-width="" data-size="" data-button-type="" data-layout="" data-auto-logout-link="true" data-use-continue-as="true"></div> */}
            
            <h1 className='login-heading'>Welcome to Facebook helpdesk</h1>
            <table className='login-button' onClick={facebookLogin}>
                <tbody>
                    <tr>
                        <td><img className='logo' src={logo}></img></td>
                        <td><div className='button-text'>Login with Facebook</div></td></tr>
                </tbody>
            </table>
        </div>
    );
}
