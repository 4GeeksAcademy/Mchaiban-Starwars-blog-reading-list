import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const CardItem = ({ item, isFavorite, onToggleFavorite }) => {
  const [details, setDetails] = useState(null);
  const [resource, setResource] = useState();
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await fetch(item.url);
        const json = await res.json();
        setDetails(json.result.properties);
        const properties= json.result.properties
        let _resource= "people"
        if (properties.terrain) {
          _resource="planets"
        }
        if (properties.vehicle_class) {
          _resource="vehicles"
        }
        setResource(_resource)
      } catch (error) {
        console.error("failed to fetch details", item.name, error);
      }
    };
    fetchDetails();
  }, [item.url]);


  
  return (
    <div className="col">
      <div className="card h-100">
        <img
          src={`https://raw.githubusercontent.com/breatheco-de/swapi-images/refs/heads/master/public/images/${resource}/${item.id}.jpg`}
          className="card-img-top"
          alt={item.name}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{item.name}</h5>

          {details ? (
            <>
              {details.gender && (
                <>
                  <p className="card-text">Gender: {details.gender}</p>
                  <p className="card-text">Birth Year: {details.birth_year}</p>
                </>
              )}
              {details.terrain && (
                <>
                  <p className="card-text">Terrain: {details.terrain}</p>
                  <p className="card-text">Population: {details.population}</p>
                </>
              )}
              {details.vehicle_class && (
                <>
                  <p className="card-text">
                    Vehicle Class: {details.vehicle_class}
                  </p>
                  <p className="card-text">Passengers: {details.passengers}</p>
                </>
              )}

              <div className="mt-auto d-flex justify-content-between align-items-center">
                {details.gender && (
                  <Link
                    to={`/characters/${item.id}`}
                    className="btn btn-primary"
                  >
                    Learn more!
                  </Link>
                )}
                {details.terrain && (
                  <Link
                    to={`/planets/${item.id}`}
                    className="btn btn-primary"
                  >
                    Learn more!
                  </Link>
                )}
                {details.vehicle_class && (
                  <Link
                    to={`/vehicles/${item.id}`}
                    className="btn btn-primary"
                  >
                    Learn more!
                  </Link>
                )}
                <button
                  className={`btn btn-outline-warning${
                    isFavorite ? " active" : ""
                  }`}
                  onClick={() => onToggleFavorite(item)}
                  aria-label={
                    isFavorite
                      ? "Remove from favorites"
                      : "Add to favorites"
                  }
                >
                  {isFavorite ? "💛" : "🤍"}
                </button>
              </div>
            </>
          ) : (
            <p className="text-muted">Loading Traits...</p>
          )}
        </div>
      </div>
    </div>
  );
};
