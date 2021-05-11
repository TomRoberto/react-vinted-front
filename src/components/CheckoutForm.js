import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ userId, price, offerId, userToken, name }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const cardElements = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElements, {
        name: userId,
      });
      const stripeToken = stripeResponse.token.id;
      const response = await axios.post(
        "https://le-reacteur-vinted-backend.herokuapp.com/payment",
        {
          stripeToken: stripeToken,
          price: price,
          name: name,
        },
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (response.status === 200) {
        setSuccessMessage("Votre paiement a bien été validé");
        await axios.delete(
          "https://le-reacteur-vinted-backend.herokuapp.com/offer/delete",
          {
            id: offerId,
          },
          {
            headers: {
              authorization: `Bearer ${userToken}`,
            },
          }
        );
      } else {
        setSuccessMessage(
          "Il y a eu un problème dans la gestion de votre paiement"
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <form
        onSubmit={(event) => {
          handleSubmit();
        }}
      >
        <CardElement />
        <input type="submit" />
      </form>
      {successMessage && <div>{successMessage}</div>}
    </div>
  );
};

export default CheckoutForm;
