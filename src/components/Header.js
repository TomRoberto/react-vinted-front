import logo from "../assets/logo-vinted.png";

const Header = () => {
  return (
    <div className="header">
      <header className="container-header">
        <img src={logo} alt="logo vinted" />
        <input type="text" placeholder="Recherche des articles" />
        <button>s'inscrire</button>
        <button>se connecter</button>
        <button>vends tes articles</button>
      </header>
    </div>
  );
};

export default Header;
