import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import OfferHome from "../components/OfferHome";
import imgHero from "../assets/img-hero.jpg";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  });

  return (
    <div>
      <Header />
      <div className="hero">
        <div className="div-hero-img">
          <img src={imgHero} alt="" />
        </div>
        <div>
          <p>Prêts à faire du tri dans vos placards ?</p>
          <button>Commencer à vendre</button>
        </div>
      </div>
      <main className="home-main">
        {isLoading ? (
          <p>En cours de chargement</p>
        ) : (
          <div className="offers">
            {data.offers.map((offer, index) => {
              return (
                <OfferHome
                  key={offer._id}
                  id={offer._id}
                  productImg={offer.product_image.secure_url}
                  ownerImg={offer.owner.account.avatar.secure_url}
                  ownerName={offer.owner.account.username}
                />
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
