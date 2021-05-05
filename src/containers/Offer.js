import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  });
  // if (!isLoading) {
  //   if (data.product_details.length === 5) {
  //     const marque = data.product.details[0].MARQUE;
  //   }
  // }

  return isLoading ? (
    <p>En cours de chargement</p>
  ) : (
    <div>
      <Header />
      <main>
        <div>
          <div>
            <img src={data.product_image.secure_url} alt="product" />
          </div>
          <div>
            <div>
              <p>{data.product_price} €</p>
              <div>
                {data.product_details.length === 4 ? (
                  <div>
                    <p>MARQUE</p>
                    <p>ÉTAT</p>
                    <p>COULEUR</p>
                    <p>EMPLACEMENT</p>
                  </div>
                ) : (
                  <div>
                    <p>MARQUE</p>
                    <p>TAILLE</p>
                    <p>ÉTAT</p>
                    <p>COULEUR</p>
                    <p>EMPLACEMENT</p>
                  </div>
                )}
                {data.product_details.length === 4 ? (
                  <div>
                    <p>{data.product_details[0].MARQUE}</p>
                    <p>{data.product_details[1].ÉTAT}</p>
                    <p>{data.product_details[2].COULEUR}</p>
                    <p>{data.product_details[3].EMPLACEMENT}</p>
                  </div>
                ) : (
                  <div>
                    <p>{data.product_details[0].MARQUE}</p>
                    <p>{data.product_details[1].TAILLE}</p>
                    <p>{data.product_details[2].ÉTAT}</p>
                    <p>{data.product_details[3].COULEUR}</p>
                    <p>{data.product_details[4].EMPLACEMENT}</p>
                  </div>
                )}
              </div>
            </div>
            <div>
              <div>
                <p>{data.product_name}</p>
                <p>{data.product_description}</p>
                <div>
                  <img src={data.owner.account.avatar.secure_url} alt="" />
                  <p>{data.owner.account.username}</p>
                </div>
              </div>
              <button>Acheter</button>
            </div>
          </div>
        </div>
      </main>
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Offer;
