import { Link } from "react-router-dom";

const OfferHome = ({ productImg, ownerImg, ownerName, id }) => {
  return (
    <Link to={`/offer/${id}`}>
      <div>
        <img src={ownerImg} alt="owner" />
        <p>{ownerName}</p>
      </div>
      <img src={productImg} alt="product" />
    </Link>
  );
};

export default OfferHome;
