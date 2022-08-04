import { useState, useEffect } from "react";
import axios from "axios";
import Card from "./Card";
import Loader from "./Loader";

const ENDPOINTS = [
  "https://api.factoryfour.com/accounts/health/status",
  "https://api.factoryfour.com/assets/health/status",
  "https://api.factoryfour.com/customers/health/status",
  "https://api.factoryfour.com/datapoints/health/status",
  "https://api.factoryfour.com/devices/health/status",
  "https://api.factoryfour.com/documents/health/status",
  "https://api.factoryfour.com/forms/health/status",
  "https://api.factoryfour.com/invites/health/status",
  "https://api.factoryfour.com/media/health/status",
  "https://api.factoryfour.com/messages/health/status",
  "https://api.factoryfour.com/namespaces/health/status",
  "https://api.factoryfour.com/orders/health/status",
  "https://api.factoryfour.com/patients/health/status",
  "https://api.factoryfour.com/relationships/health/status",
  "https://api.factoryfour.com/rules/health/status",
  "https://api.factoryfour.com/templates/health/status",
  "https://api.factoryfour.com/users/health/status",
  "https://api.factoryfour.com/workflows/health/status",
];

const CardsList = () => {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCardsData = async () => {
    ENDPOINTS.map((endpoint) =>
      axios
        .get(endpoint)
        .then((data) => {
          setCardsData((prevState) => [
            ...prevState,
            { data: data.data, error: null, url: data.config.url },
          ]);
        })
        .catch((err) => {
          setCardsData((prevState) => [
            ...prevState,
            { data: null, error: err.message, url: err.config.url },
          ]);
        })
    );
  };

  useEffect(() => {
    setLoading(true)

    setTimeout(() => {
      getCardsData();
      setLoading(false)
    }, 500)

    const updateCardsData = setInterval(() => {
      setCardsData([]); /* clean cards data */
      getCardsData(); /* update cards data */
    }, 15000);

    return () => {
      clearInterval(updateCardsData);
    };
  }, []);
  return (
    <div>
        { loading && (
            <Loader />
          )
        }
        {
          !loading && (
            <div className="cards-list-grid">
              {cardsData.map((cardData, i) => (
                <Card
                  key={i}
                  data={cardData.data}
                  error={cardData.error}
                  url={cardData.url}
                />
              ))}
            </div>
          )
        }
    </div>
  );
};

export default CardsList;
