import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Header from "./components/Header";
import ModalLogin from "./components/ModalLogin";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [modalLogin, setModalLogin] = useState(false);

  const setUser = (token) => {
    if (token) {
      Cookies.set("userToken", token, { expires: 7 });
      setUserToken(token);
    } else {
      Cookies.remove("userToken");
      setUserToken(null);
    }
  };
  return (
    <Router>
      <Header
        userToken={userToken}
        setUser={setUser}
        setModalLogin={setModalLogin}
      />
      <ModalLogin
        modalLogin={modalLogin}
        setModalLogin={setModalLogin}
        setUser={setUser}
      />
      <Switch>
        <Route path="/signup">
          <Signup setUser={setUser} />
        </Route>
        <Route path="/login">
          <Login setUser={setUser} />
        </Route>
        <Route path="/offer/:id">
          <Offer />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
