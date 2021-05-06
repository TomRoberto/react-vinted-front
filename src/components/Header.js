import logo from "../assets/logo-vinted.png";
import { Link } from "react-router-dom";

const Header = ({ userToken, setUser, setModalLogin }) => {
  return (
    <div className="header">
      <header className="container-header">
        <img src={logo} alt="logo vinted" />
        <input type="text" placeholder="Recherche des articles" />
        {userToken ? (
          <button
            className="button-log"
            onClick={() => {
              setUser(null);
            }}
          >
            déconnection
          </button>
        ) : (
          <>
            <Link to="/signup">
              <button className="button-log">s'inscrire</button>
            </Link>
            {/* REMPLACÉ PAR UNE MODAL */}
            {/* <Link to="/login">
              <button className="button-log">se connecter</button>
            </Link> */}
            <button
              onClick={() => {
                setModalLogin(true);
              }}
              className="button-log"
            >
              se connecter
            </button>
          </>
        )}

        <button>vends tes articles</button>
      </header>
    </div>
  );
};

export default Header;
