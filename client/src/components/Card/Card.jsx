import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Card.module.css";

const Card = (props) => {
  const cardStyle = {
    backgroundImage: `url(${props.image})`,
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail/${props.id}`);
  };

  return (
    <div onClick={handleClick} className={styles.cardLink}>
      <div className={styles.cardContainer}>
        {props.image && (
          <div className={styles.cardImage} style={cardStyle}></div>
        )}
        <div className={styles.cardInfo}>
          <p>ID: {props.id}</p>
          <p>{props.name}</p>
          <p>Height: {props.height} cm</p>
          <p>Weight: {props.weight} kg</p>
          <p>Life Span: {props.life_span}</p>
          <p>Temperament: {props.temperament}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
