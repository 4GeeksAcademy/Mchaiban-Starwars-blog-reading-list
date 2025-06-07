// src/components/CardGrid.jsx
import React, { useEffect } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { CardItem } from "./CardItem";

export const CardGrid = ({ type }) => {
  const { store, dispatch } = useGlobalReducer();
  const items = store[type] || [];
  const favorites = store.favorites || [];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://www.swapi.tech/api/${type}`);
        const json = await res.json();
        const payload = json.results.map((item) => ({
          id: item.uid,
          name: item.name,
          type,            
          url: item.url    
        }));

        dispatch({
          type: `SET_${type.toUpperCase()}`,
          payload
        });
      } catch (error) {
        console.error("Failed fetching", type, error);
      }
    };

    fetchData();
  }, [type, dispatch]);

  const title =
    type === "people"
      ? "Characters"
      : type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div className="container my-4">
      <h2 className="text-danger text-uppercase">{title}</h2>

      {/* Horizontally scrollable carousel */}
      <div
        className="d-flex flex-row flex-nowrap overflow-auto pb-3"
        style={{ gap: "1rem" }}
      >
        {items.map((item) => (
          <div
            key={`${type}-${item.id}`}
            className="flex-shrink-0"
            style={{ minWidth: "18rem" }}
          >
            <CardItem
              item={item}
              isFavorite={favorites.some(
                (f) => f.type === type && f.id === item.id
              )}
              onToggleFavorite={() =>
                dispatch({ type: "TOGGLE_FAVORITE", payload: { ...item, type } })
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};
