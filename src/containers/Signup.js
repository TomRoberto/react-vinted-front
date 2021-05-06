import { Link, useHistory } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const Signup = ({ setUser }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "https://le-reacteur-vinted-backend.herokuapp.com/user/signup",
        { username: userName, email: userEmail, password: userPassword }
      );
      setUser(response.data.token);
      history.push("/");
      alert("Account created");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <main className="signup-main">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h1>S'inscrire</h1>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          onChange={(event) => {
            setUserName(event.target.value);
          }}
        />
        <input
          type="email"
          placeholder="Email"
          onChange={(event) => {
            setUserEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          onChange={(event) => {
            setUserPassword(event.target.value);
          }}
        />
        <div>
          <input type="checkbox" />
          <span>S'inscrire à notre newsletter</span>
        </div>
        <p>
          En m'inscrivant je confirme avoir lu et accepté les Termes &
          Conditions et Politiques de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </p>
        <input type="submit" />
        <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
      </form>
    </main>
  );
};

export default Signup;
