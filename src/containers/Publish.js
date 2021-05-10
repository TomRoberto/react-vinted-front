import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Publish = ({ userToken }) => {
  const [picture, setPicture] = useState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");

  const history = useHistory();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("condition", state);
      formData.append("city", city);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("title", title);
      formData.append("color", color);
      formData.append("picture", picture);
      const response = await axios.post(
        "https://le-reacteur-vinted-backend.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        }
      );
      console.log(response.data);
      history.push(`/offer/${response.data._id}`);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <main className="main-publish">
      <div className="publish-container">
        <h1>Vends ton article</h1>
        <form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <div>
            <div>
              <input
                type="file"
                onChange={(event) => {
                  setPicture(event.target.files[0]);
                  console.log(picture);
                }}
              />
            </div>
          </div>
          <div className="title-description">
            <div>
              <p>Titre</p>
              <input
                type="text"
                placeholder="ex: Chemise Sézane verte"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
              />
            </div>
            <div>
              <p>Décris ton article</p>
              <input
                type="text"
                placeholder="ex: porté quelquefois, taille correctement"
                onChange={(event) => {
                  setDescription(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="brand-size-etc">
            <div>
              <p>Marque</p>
              <input
                type="text"
                placeholder="ex: Zara"
                onChange={(event) => {
                  setBrand(event.target.value);
                }}
              />
            </div>
            <div>
              <p>Taille</p>
              <input
                type="text"
                placeholder="ex: L/40/12"
                onChange={(event) => {
                  setSize(event.target.value);
                }}
              />
            </div>
            <div>
              <p>Couleur</p>
              <input
                type="text"
                placeholder="ex: Fushia"
                onChange={(event) => {
                  setColor(event.target.value);
                }}
              />
            </div>
            <div>
              <p>Etat</p>
              <input
                type="text"
                placeholder="Neuf avec étiquette"
                onChange={(event) => {
                  setState(event.target.value);
                }}
              />
            </div>
            <div>
              <p>Lieu</p>
              <input
                type="text"
                placeholder="ex: Paris"
                onChange={(event) => {
                  setCity(event.target.value);
                }}
              />
            </div>
          </div>
          <div className="price-checkbox">
            <div>
              <p>Prix</p>
              <input
                type="text"
                placeholder="0,00 €"
                onChange={(event) => {
                  setPrice(event.target.value);
                }}
              />
            </div>
            <div>
              <input type="checkbox" />
              <span>Je suis intéressé(e) par les échanges</span>
            </div>
          </div>
          <p className="publish-input-p">
            <input className="publish-input" type="submit" value="Ajouter" />
          </p>
        </form>
      </div>
    </main>
  );
};

export default Publish;
