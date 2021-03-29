import "./App.css";
import { Switch, Route } from "react-router-dom";
import UserProfile from "./componentes/sidebarIzq/UserProfile";
import Login from "./componentes/login/Login";
import Register from "./componentes/register/Register";
import Home from "./componentes/home/Home";
import PasswordRecovery from "./componentes/passwordRecovery/PaswordRecovery";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/login" component={Login} />
        <Route path="/userProfile" component={UserProfile} />
        <Route path="/register" component={Register} />
        <Route path="/password-recovery" component={PasswordRecovery} />
      </Switch>
    </>
  );
}

export default App;
