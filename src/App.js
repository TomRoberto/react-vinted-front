import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useState } from "react";
import Cookies from "js-cookie";
import Home from "./containers/Home";
import Offer from "./containers/Offer";
import Signup from "./containers/Signup";
import Login from "./containers/Login";
import Header from "./components/Header";
import ModalLogin from "./components/ModalLogin";
import Publish from "./containers/Publish";

function App() {
  const [userToken, setUserToken] = useState(Cookies.get("userToken") || null);
  const [modalLogin, setModalLogin] = useState(false);
  const [title, setTitle] = useState("");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(500);
  const [priceDesc, setPriceDesc] = useState("price-asc");

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
    <div className="app">
      <Router>
        <Header
          userToken={userToken}
          setUser={setUser}
          setModalLogin={setModalLogin}
          setTitle={setTitle}
          priceDesc={priceDesc}
          setPriceDesc={setPriceDesc}
          setPriceMin={setPriceMin}
          setPriceMax={setPriceMax}
        />
        <ModalLogin
          modalLogin={modalLogin}
          setModalLogin={setModalLogin}
          setUser={setUser}
        />
        <Switch>
          <Route path="/publish">
            {userToken ? (
              <Publish userToken={userToken} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
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
            <Home
              title={title}
              priceDesc={priceDesc}
              priceMin={priceMin}
              priceMax={priceMax}
            />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
