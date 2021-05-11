import { Redirect, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const Payment = ({ userToken, userId }) => {
  const location = useLocation();
  // const { name, price, id } = location.state;
  const name = location.state.name;
  const price = location.state.price;
  const id = location.state.id;

  console.log(name);

  const realPrice = price.toFixed(2);
  const stripePromise = loadStripe(
    "pk_test_51IpvphDqQKb3lCIT3UU1fIPnAXyyG57gLns831kNwLVGCFo1a3MtSucuiIwEijgip8fL85zUlKZKTK0a2JAhSWHt00ZWSjTErF"
  );

  return userToken ? (
    <main className="payment-main">
      <div className="payment-container">
        <div>
          <p>Résumé de la commande</p>
          <div className="payment-infos">
            <span className="payment-element">Commande</span>
            <span className="payment-element">{realPrice} €</span>
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
          <div>
            <Elements stripe={stripePromise}>
              <CheckoutForm
                userId={userId}
                price={(price + 1.2).toFixed(2)}
                offerId={id}
                userToken={userToken}
                name={name}
              />
            </Elements>
          </div>
        </div>
      </div>
    </main>
  ) : (
    <Redirect to="/login" />
  );
};

export default Payment;
