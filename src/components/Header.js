import logo from "../assets/logo-vinted.png";
import { Link, useHistory } from "react-router-dom";
import SuperSimple from "./ReactSlider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
        <Link to="/">
          <img src={logo} alt="logo vinted" />
        </Link>

        <div>
          <input
            className="header-input-search"
            type="text"
            placeholder="Rechercher des articles"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <div className="handle-price">
            <div
              className="asc"
              onClick={() => {
                if (priceDesc === "price-asc") {
                  setPriceDesc("price-desc");
                } else {
                  setPriceDesc("price-asc");
                }
              }}
            >
              <span className="large">
                Trier par prix{" "}
                {priceDesc === "price-asc" ? "croissant" : "décroissant"}
              </span>
              <span className="little price-little"> Prix</span>

              {/* <input
                style={{ color: "#2DB0BA" }}
                type="checkbox"
                onChange={() => {
                  if (priceDesc === "price-asc") {
                    setPriceDesc("price-desc");
                  } else {
                    setPriceDesc("price-asc");
                  }
                }}
              /> */}
              <div>
                {priceDesc === "price-asc" ? (
                  <FontAwesomeIcon
                    icon="arrow-circle-up"
                    style={{ color: "#2db0ba" }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon="arrow-circle-down"
                    style={{ color: "#2db0ba" }}
                  />
                )}
              </div>
            </div>

            <SuperSimple setPriceMin={setPriceMin} setPriceMax={setPriceMax} />
            {/* <div>
              <span>Prix minimum</span>
              <input
                className="header-input-price"
                type="text"
                onChange={(event) => {
                  setPriceMin(event.target.value);
                }}
              />
            </div>
            <div>
              <span>Prix maximum</span>
              <input
                className="header-input-price"
                type="text"
                onChange={(event) => {
                  setPriceMax(event.target.value);
                }}
              />
            </div> */}
          </div>
        </div>
        <div className="button-container">
          {userToken ? (
            <>
              <button
                className="button-log large"
                onClick={() => {
                  setUser(null, null);
                  history.push("/home");
                }}
              >
                déconnexion
              </button>
              <button
                className="button-log little red"
                onClick={() => {
                  setUser(null, null);
                  history.push("/home");
                }}
              >
                <FontAwesomeIcon icon="sign-out-alt" />
              </button>
            </>
          ) : (
            <>
              <Link to="/signup" className="link">
                <button className="button-log large">s'inscrire</button>
                <button className="button-log little">
                  <FontAwesomeIcon icon="user-plus" />
                </button>
              </Link>
              {/* REMPLACÉ PAR UNE MODAL */}
              {/* <Link to="/login">
              <button className="button-log">se connecter</button>
            </Link> */}
              <button
                onClick={() => {
                  setModalLogin(true);
                }}
                className="button-log large"
              >
                se connecter
              </button>
              <button
                onClick={() => {
                  setModalLogin(true);
                }}
                className="button-log little"
              >
                <FontAwesomeIcon icon="sign-in-alt" />
              </button>
            </>
          )}

          <button>
            <Link className="link-to-publish large" to="/publish">
              vends tes articles
            </Link>
            <Link className="link-to-publish little" to="/publish">
              <FontAwesomeIcon icon="tshirt" />
            </Link>
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
