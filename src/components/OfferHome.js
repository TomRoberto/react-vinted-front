import { Link } from "react-router-dom";

const OfferHome = ({ productImg, productPrice, ownerImg, ownerName, id }) => {
  return (
    <Link to={`/offer/${id}`} className="offer">
      <div className="offer-up-part">
        <div className="div-owner-img">
          <img src={ownerImg} alt="owner" />
        </div>

        <p>{ownerName}</p>
      </div>
      <div className="offer-down-part">
        <img src={productImg} alt="product" />
      </div>
      <div>{productPrice} €</div>
    </Link>
  );
};

export default OfferHome;
