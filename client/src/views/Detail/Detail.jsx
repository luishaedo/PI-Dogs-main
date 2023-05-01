import React, { useEffect, useState } from "react";
import styles from "./Detail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getDogById } from "../../redux/actions/actions";

const Detail = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getDogById(id)).then(() => {
      setLoading(false);
    });
  }, [id, dispatch]);

  const dog = useSelector(
    (state) =>
      state.dog.resultsId &&
      state.dog.resultsId.length > 0 &&
      state.dog.resultsId[0]
  );

  return (
    <div className={styles.detailContainer}>
      <h1>Detail of {dog?.name}</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.detailCard}>
          <div className={styles.cardImage}>
            {dog?.image ? (
              <img src={dog.image} alt={`${dog.name}`} />
            ) : (
              <p>No hay imagen disponible para esta raza</p>
            )}
          </div>
          <div className={styles.cardInfo}>
            <div className={styles.cardInfoDetails}>
              {dog?.id && (
                <p className={styles.detailInfoText}>
                  <span className={styles.infoLabel}>ID:</span> {dog.id}
                </p>
              )}
              {dog?.name && (
                <p className={styles.detailInfoText}>
                  <span className={styles.infoLabel}>Name:</span> {dog.name}
                </p>
              )}
              {dog?.height && (
                <p className={styles.detailInfoText}>
                  <span className={styles.infoLabel}>Height:</span> {dog.height}{" "}
                  cm
                </p>
              )}
              {dog?.weight?.metric && (
                <p className={styles.detailInfoText}>
                  <span className={styles.infoLabel}>Weight:</span> {dog.weight}{" "}
                  kg
                </p>
              )}
              {dog?.life_span && (
                <p className={styles.detailInfoText}>
                  <span className={styles.infoLabel}>Life span</span>{" "}
                  {dog.life_span}
                </p>
              )}
              {dog?.origin && (
                <p className={styles.detailInfoText}>
                  <span className={styles.infoLabel}>Origin:</span> {dog.origin}
                </p>
              )}
              {dog?.temperament && (
                <p className={styles.detailInfoText}>
                  <span className={styles.infoLabel}>Temperaments:</span>{" "}
                  {dog.temperament}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Detail;
