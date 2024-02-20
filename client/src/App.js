import './App.css';

import Main from "./components/Main/Main";
import Login from "./components/Login/login";

function App(props) {
  const loggedIn = props.response;
  return (
    <div className="App">
      {/* if user is logged in route them to main page 
       else route to login page */}
      {loggedIn ? <Main /> : <Login />}
    </div>
  );
}

export default App;
