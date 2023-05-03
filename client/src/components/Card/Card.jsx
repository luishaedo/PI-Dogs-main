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
          <p className={styles.pName}>{props.name}</p>
          <p className={styles.cardInfo}>ID: {props.id}</p>
          <p className={styles.cardInfo}>Height: {props.height} cm</p>
          <p className={styles.cardInfo}>Weight: {props.weight} kg</p>
          <p className={styles.cardInfo}>Life Span: {props.life_span}</p>
          {props.temperament && (
            <p className={styles.cardInfo}>Temperament: {props.temperament}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
