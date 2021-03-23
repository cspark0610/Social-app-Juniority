import './App.css';
import { Switch, Route } from "react-router-dom";
import UserProfile from "./componentes/userViews/UserProfile"
import Login from "./componentes/login/Login"
import Register from "./componentes/register/Register"
import Home from "./componentes/home/Home"
import Navbar from "./componentes/commons/Navbar"
import Footer from "./componentes/commons/Footer"

function App() {
  return (
    <>
      <Navbar/>
        <Switch>
        <Route path exact="/"><Home /></Route>
        <Route path="/login" component={Login} />
        <Route path="/userProfile" component={UserProfile} />
        <Route path="/register" component={Register} />
        </Switch>
      <Footer/>
    </>
  );
}

export default App;
