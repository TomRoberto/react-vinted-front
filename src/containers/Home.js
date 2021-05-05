import { Link } from "react-router-dom";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import OfferHome from "../components/OfferHome";

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
        <div>
          <p></p>
          <button></button>
        </div>
      </div>
      <main>
        {isLoading ? (
          <p>En cours de chargement</p>
        ) : (
          data.offers.map((offer, index) => {
            return (
              <OfferHome
                key={offer._id}
                id={offer._id}
                productImg={offer.product_image.secure_url}
                ownerImg={offer.owner.account.avatar.secure_url}
                ownerName={offer.owner.account.username}
              />
            );
          })
        )}
      </main>
      <p>HOME</p>
      <Link to="/offer">Go to offer</Link>
    </div>
  );
};

export default Home;
