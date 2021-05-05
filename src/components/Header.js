import logo from "../assets/logo-vinted.png";

const Header = () => {
  return (
    <div>
      <img src={logo} alt="logo vinted" />
      <div>
        <button>s'inscrire</button>
        <button>se connecter</button>
        <button>vends tes articles</button>
      </div>
    </div>
  );
};

export default Header;
