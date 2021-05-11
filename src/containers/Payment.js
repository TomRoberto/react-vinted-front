import { Redirect, useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";

const Payment = ({ userToken, userId }) => {
  const location = useLocation();
  const { name, price, id } = location.state;
  const realPrice = price.toFixed(2);
  const stripePromise = loadStripe(
    "pk_test_51IpvphDqQKb3lCIT3UU1fIPnAXyyG57gLns831kNwLVGCFo1a3MtSucuiIwEijgip8fL85zUlKZKTK0a2JAhSWHt00ZWSjTErF"
  );

  return userToken ? (
    <main className="payment-main">
      <div className="payment-container">
        <div>
          <p></p>
          <div>
            <span>Commande</span>
            <span>{realPrice} €</span>
          </div>
          <div>
            <span>Frais protection acheteurs</span>
            <span>0.40 €</span>
          </div>
          <div>
            <span>Frais de port</span>
            <span>0.80 €</span>
          </div>
        </div>
        <div>
          <div>
            <span>Total</span>
            <span> {(price + 1.2).toFixed(2)} €</span>
          </div>
          <div>
            Il ne vous reste plus qu'une étape pour vous offrir {name}. Vous
            allez payer {(price + 1.2).toFixed(2)} € (frais de protection et
            frais de port inclus).
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
