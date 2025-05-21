import React, {useEffect, useState} from "react";
import { Link } from "react-router-dom";

export const CardItem = ({ item, isFavorite, onToggleFavorite }) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(item.url);
        const json = await res.json();
        setDetails(json.result.properties);
      } catch (error) {
        console.error("failed to fetch details", item.name, error);
      }
    }
      fetchDetails();
  }, [item.url])




  return (
    <div className="col">
      <div className="card h-100">
        {/* Placeholder image until we wire real images */}
        <img
          src="https://via.placeholder.com/400x200?text=Loading..."
          className="card-img-top"
          alt={item.name}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{item.name}</h5>
          {details ?(
            <>
            <p className= "card-text">Gender:{details.gender}</p>
          <p className= "card-text">Birthyear:{details.birth_year}</p>
          </>
          ) : (
            <p className="text-muted">Loading Traits...</p>
          )}
          {/* You can expand this to list other fields */}
          <div className="mt-auto d-flex justify-content-between align-items-center">
            <Link to={`/single/${item.id}`} className="btn btn-primary">
              Learn more!
            </Link>
            <button
              className={`btn btn-outline-warning${isFavorite ? " active" : ""}`}
              onClick={() => onToggleFavorite(item)}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? "💛" : "🤍"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

