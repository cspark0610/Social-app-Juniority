import './App.css';
import { Switch, Route } from "react-router-dom";
import UserProfile from './componentes/sidebarIzq/UserProfile'
import Login from "./componentes/login/Login"
import Register from "./componentes/register/Register"
import Home from "./componentes/home/Home"


function App() {
  return (
    <>
    
        <Switch>
        <Route path exact="/"><Home /></Route>
        <Route path="/login" component={Login} />
        <Route path="/userProfile" component={UserProfile} />
        <Route path="/register" component={Register} />
        </Switch>
      
    </>
  );
}

export default App;
