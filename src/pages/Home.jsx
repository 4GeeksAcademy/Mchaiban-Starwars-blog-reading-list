import React from "react";
import { CardGrid } from "../components/CardGrid";

export const Home = () => {
  return (
    <>
      {/* Characters */}
      <CardGrid type="people" />

      {/* Vehicles */}
      <CardGrid type="vehicles" />

      {/* Planets */}
      <CardGrid type="planets" />
    </>
  );
};
