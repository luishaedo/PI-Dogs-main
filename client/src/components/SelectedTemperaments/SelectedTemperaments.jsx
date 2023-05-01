import React, { useEffect } from "react";
import styles from "./SelectedTemperaments.module.css";
import {
  getTemperaments,
  temperamentsFilter,
} from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

const SelectedTemperaments = () => {
  const dispatch = useDispatch();

  const temperaments = useSelector((state) => state.temperaments);
  const [selectTemperaments, setSelectTemperaments] = useState([]);

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  useEffect(() => {
    dispatch(temperamentsFilter(selectTemperaments));
  }, [selectTemperaments, dispatch]);

  const handleTemperamentChange = (e) => {
    const selectedTemperament = e.target.value;
    const updatedTemperaments = [...selectTemperaments];
    const index = updatedTemperaments.indexOf(selectedTemperament);
    if (index !== -1) {
      updatedTemperaments.splice(index, 1);
    } else {
      updatedTemperaments.push(selectedTemperament);
    }
    setSelectTemperaments(updatedTemperaments);
  };

  return (
    <>
      <div className={styles.temperamentContainer}>
        {temperaments?.map((temperament, index) => (
          <div key={index}>
            <input
              type="checkbox"
              id={`selected_temperament_${temperament.id}`}
              name={temperament.name}
              value={temperament.name}
              checked={selectTemperaments?.includes(temperament.name)}
              onChange={handleTemperamentChange}
            />
            <label
              className={styles.temperamentNameLabel}
              htmlFor={`selected_temperament_${temperament.id}`}
            >
              {temperament.name}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default SelectedTemperaments;
