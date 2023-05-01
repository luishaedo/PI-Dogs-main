import React from "react";
import styles from "./Cards.module.css";
import Card from "../Card/Card";
//import { useSelector } from "react-redux";

const Cards = ({ dogs }) => {
  // const dogs = useSelector((state) => state.results);

  return (
    <div className={styles.cardsContainer}>
      {dogs?.map((dog) => (
        <Card
          key={dog.id}
          id={dog.id}
          name={dog.name}
          image={dog.image}
          origin={dog.origin}
          height={dog.height}
          weight={dog.weight}
          life_span={dog.life_span}
          temperament={dog.temperament}
        />
      ))}
    </div>
  );
};

// id={dog.id}
// name={dog.name}
// image={dog.image ? dog.image : ""}
// origin={dog.origin ? dog.origin : ""}
// height={dog.image ? dog.image : ""}
// weight={dog.weight ? dog.weight : ""}
// life_span={dog.life_span ? dog.life_span : ""}
// temperament={dog.temperament ? dog.temperament : ""}
export default Cards;
