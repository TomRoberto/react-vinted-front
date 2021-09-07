import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import axios from "axios";
import { useState } from "react";

const CheckoutForm = ({ offerId, userToken, essai }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [successMessage, setSuccessMessage] = useState("");
  const name = essai.name;
  const price = Number(essai.price) + 1.2;
  const userId = essai.id;
  console.log(essai);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
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
        const deletionResponse = await axios.delete(
          "https://le-reacteur-vinted-backend.herokuapp.com/offer/delete",

          {
            headers: {
              authorization: `Bearer ${userToken}`,
            },
            data: {
              id: userId,
            },
          }
        );
        console.log(deletionResponse);
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
      <form onSubmit={handleSubmit}>
        <div>
          <p>Résumé de la commande</p>
          <div className="payment-infos">
            <span className="payment-element">Commande</span>
            <span className="payment-element">{price} €</span>
          </div>
          <div className="payment-infos">
            <span className="payment-element">Frais protection acheteurs</span>
            <span className="payment-element">0.40 €</span>
          </div>
          <div className="payment-infos">
            <span className="payment-element">Frais de port</span>
            <span className="payment-element">0.80 €</span>
          </div>
        </div>
        <div>
          <div className="payment-infos">
            <span className="payment-element payment-bold">Total</span>
            <span className="payment-element payment-bold">
              {" "}
              {(price + 1.2).toFixed(2)} €
            </span>
          </div>
          <div className="payment-paragraph">
            Il ne vous reste plus qu'une étape pour vous offrir{" "}
            <span className="payment-bold">{name}</span>. Vous allez payer{" "}
            <span className="payment-bold">{(price + 1.2).toFixed(2)} € </span>{" "}
            (frais de protection et frais de port inclus).
          </div>
        </div>
        <CardElement className="card-element" />
        <input type="submit" value="Pay" />
      </form>
      {successMessage && <div>{successMessage}</div>}
    </div>
  );
};

export default CheckoutForm;
