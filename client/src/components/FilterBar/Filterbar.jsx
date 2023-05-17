import styles from "./FilterBar.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  limpiarFiltros,
  createdFilterAction,
  orderResult,
} from "../../redux/actions/actions";
import SelectedTemperaments from "../SelectedTemperaments/SelectedTemperaments.jsx";

const FilterBar = () => {
  const dispatch = useDispatch();
  const [created, setCreated] = useState("All");
  const [orderBy, setOrderBy] = useState("name");
  const [orderType, setOrderType] = useState("up");

  useEffect(() => {
    dispatch(createdFilterAction(created));
  }, [created, dispatch]);

  useEffect(() => {
    dispatch(orderResult(orderBy, orderType));
  }, [orderBy, orderType, dispatch]);

  const handleOriginChange = (e) => {
    let value = e.target.value;
    setCreated(value);
  };

  const handleLimpiarFiltro = () => {
    dispatch(limpiarFiltros());
  };

  const handleOrderByName = (e) => {
    const { value } = e.target;
    setOrderBy(value);
  };

  const handleOrderType = (e) => {
    const { value } = e.target;
    setOrderType(value);
  };

  return (
    <div className={styles.filterBar}>
      <ul>
        <div>
          Origin
          <select
            name="origin"
            id="origin"
            value={created}
            onChange={handleOriginChange}
          >
            <option value="All">ALL</option>
            <option value={false}>Dog's Api</option>
            <option value={true}>Info Dogs</option>
          </select>
        </div>
        <li className={styles.temperamentLabel}>Temperaments</li>
        <SelectedTemperaments />
      </ul>
      <div className={styles.ordenarContainer}>
        <span>Order by:</span>
        <select value={orderBy} onChange={handleOrderByName}>
          <option value="name">Name</option>
          <option value="weight">Weight</option>
        </select>
      </div>
      <div className={styles.ordenarContainer}>
        <span>Order direction:</span>
        <select value={orderType} onChange={handleOrderType}>
          <option value="up">Up</option>
          <option value="down">Down</option>
        </select>
      </div>
      <div className={styles.buttonContainer}>
        <button className={styles.clearButton} onClick={handleLimpiarFiltro}>
          CLEAN
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
