import logo from "../assets/logo-vinted.png";
import { Link, useHistory } from "react-router-dom";

const Header = ({
  userToken,
  setUser,
  setModalLogin,
  setTitle,
  priceDesc,
  setPriceDesc,
  setPriceMin,
  setPriceMax,
}) => {
  let history = useHistory();
  return (
    <div className="header">
      <header className="container-header">
        <img src={logo} alt="logo vinted" />
        <div>
          <input
            className="header-input-search"
            type="text"
            placeholder="Recherche des articles"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <div className="handle-price">
            <div>
              <span>Trier par prix décroissant</span>
              <input
                type="checkbox"
                onChange={() => {
                  if (priceDesc === "price-asc") {
                    setPriceDesc("price-desc");
                  } else {
                    setPriceDesc("price-asc");
                  }
                }}
              />
            </div>
            <div>
              <span>Prix minimum</span>
              <input
                type="text"
                onChange={(event) => {
                  setPriceMin(event.target.value);
                }}
              />
            </div>
            <div>
              <span>Prix maximum</span>
              <input
                type="text"
                onChange={(event) => {
                  setPriceMax(event.target.value);
                }}
              />
            </div>
          </div>
        </div>

        {userToken ? (
          <button
            className="button-log"
            onClick={() => {
              setUser(null);
              history.push("/home");
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

        <button>
          <Link className="link-to-publish" to="/publish">
            vends tes articles
          </Link>
        </button>
      </header>
    </div>
  );
};

export default Header;
