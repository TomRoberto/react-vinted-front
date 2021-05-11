import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Login = ({ setUser }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://le-reacteur-vinted-backend.herokuapp.com/user/login",
        { email: userEmail, password: userPassword }
      );
      setUser(response.data.token, response.data._id);
      setErrorMessage("");
      alert("login accepted");
      history.push("/publish");
    } catch (error) {
      if (error.response.status === 401) {
        setErrorMessage("Mauvais email et/ou mot de passe");
      }
      console.log(error.message);
    }
  };

  return (
    <main className="login-main">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Se connecter</h1>
        <input
          placeholder="Adresse email"
          type="email"
          onChange={(event) => {
            setUserEmail(event.target.value);
          }}
        />
        <input
          placeholder="Mot de passe"
          type="password"
          onChange={(event) => {
            setUserPassword(event.target.value);
          }}
        />
        <input type="submit" value="Se connecter" />
        <Link to="/signup">Pas encore de compte ? inscris-toi ?</Link>
        <p>{errorMessage}</p>
      </form>
    </main>
  );
};

export default Login;
