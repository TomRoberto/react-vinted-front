import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://le-reacteur-vinted-backend.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  });

  return isLoading ? (
    <p>En cours de chargement</p>
  ) : (
    <div>
      <main className="offer-main">
        <div className="offer-container">
          <div className="offer-page-product-img">
            <img src={data.product_image.secure_url} alt="product" />
          </div>
          <div className="offer-page-informations">
            <div>
              <p className="offer-page-price">{data.product_price} €</p>
              <div className="offer-page-details">
                <div>
                  {data.product_details.map((elem, index) => {
                    if (elem.MARQUE) {
                      return <p key={index}>MARQUE</p>;
                    }
                    if (elem.TAILLE) {
                      return <p key={index}>TAILLE</p>;
                    }
                    if (elem.ÉTAT) {
                      return <p key={index}>ÉTAT</p>;
                    }
                    if (elem.COULEUR) {
                      return <p key={index}>COULEUR</p>;
                    }
                    if (elem.EMPLACEMENT) {
                      return <p key={index}>EMPLACEMENT</p>;
                    }
                  })}
                </div>
                <div>
                  {data.product_details.map((elem, index) => {
                    if (elem.MARQUE) {
                      return <p key={index}>{elem.MARQUE}</p>;
                    }
                    if (elem.TAILLE) {
                      return <p key={index}>{elem.TAILLE}</p>;
                    }
                    if (elem.ÉTAT) {
                      return <p key={index}>{elem.ÉTAT}</p>;
                    }
                    if (elem.COULEUR) {
                      return <p key={index}>{elem.COULEUR}</p>;
                    }
                    if (elem.EMPLACEMENT) {
                      return <p key={index}>{elem.EMPLACEMENT}</p>;
                    }
                  })}
                </div>

                {/* {data.product_details.length === 4 ? (
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
                )} */}
              </div>
            </div>
            <div>
              <div>
                <p className="offer-page-name">{data.product_name}</p>
                <p className="offer-page-description">
                  {data.product_description}
                </p>
                <div className="offer-page-owner-info">
                  <div className="offer-page-owner-img">
                    <img src={data.owner.account.avatar.secure_url} alt="" />
                  </div>

                  <p>{data.owner.account.username}</p>
                </div>
              </div>
              <button className="offer-page-button">Acheter</button>
            </div>
          </div>
        </div>
        {data.product_pictures.length > 1 && (
          <div className="carousel">
            <Carousel responsive={responsive}>
              {data.product_pictures.map((elem, index) => {
                return (
                  <img
                    style={{ height: "500px" }}
                    key={index}
                    src={elem.secure_url}
                    alt=""
                  />
                );
              })}
            </Carousel>
          </div>
        )}
      </main>
    </div>
  );
};

export default Offer;
