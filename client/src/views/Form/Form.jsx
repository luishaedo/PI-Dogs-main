import styles from "./Form.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperaments, postDog } from "../../redux/actions/actions";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span_min: "",
    life_span_max: "",
    temperament: [],
  });

  const [errors, setErrors] = useState({
    name: "",
    height_min: "",
    height_max: "",
    weight_min: "",
    weight_max: "",
    life_span_min: "",
    life_span_max: "",
    temperament: "",
  });

  const [showDog, setShowDog] = useState(false);

  const [disabled, setDisable] = useState(true);

  const temperaments = useSelector((state) => state.temperaments);
  const dog = useSelector((state) => state.dog);
  const route = `/Detail/${dog.id}`;

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  useEffect(() => {
    if (showDog) navigate(route);
  }, [dog]);

  const changeHandler = (event) => {
    const property = event.target.name;
    let value = event.target.value;

    if (value.length > 2) setDisable(false);
    setForm({ ...form, [property]: value });
  };

  const handleTemperamentChange = (e) => {
    const selectedTemperament = e.target.value;
    let updatedTemperaments = [...form.temperament];

    if (updatedTemperaments.includes(selectedTemperament)) {
      updatedTemperaments = updatedTemperaments.filter(
        (temperament) => temperament !== selectedTemperament
      );
    } else {
      updatedTemperaments.push(selectedTemperament);
    }

    setForm({ ...form, temperament: updatedTemperaments });
  };

  const formatData = (form) => {
    const formattedData = {
      name: form.name,
      height: `${form.height_min} - ${form.height_max}`,
      weight: `${form.weight_min} - ${form.weight_max}`,
      life_span: `${form.life_span_min} - ${form.life_span_max}`,
      temperament: form.temperament.join(", "),
    };
    return formattedData;
  };
  const validateInput = (name, value) => {
    switch (name) {
      case "name":
        if (value.length < 3) {
          return "Name must be at least 3 characters long";
        }
        break;
      case "height_min":
      case "height_max":
      case "weight_min":
      case "weight_max":
      case "life_span_min":
      case "life_span_max":
        if (!/\d/.test(value)) {
          return "Field must contain at least one number";
        }
        break;
      case "temperament":
        if (value.length === 0) {
          return "You must select at least one temperament";
        }
        break;
      default:
        break;
    }
    return "";
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const newErrors = Object.keys(form).reduce((acc, key) => {
      const validationError = validateInput(key, form[key]);
      return {
        ...acc,
        [key]: validationError,
      };
    }, {});

    setErrors(newErrors);

    if (Object.values(newErrors).some((val) => val !== "")) {
      return;
    }
    const dog = formatData(form);
    dispatch(postDog(dog));
    setShowDog(true);
  };

  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <div>
        <label className={styles.label}>Name: </label>
        <input
          type="text"
          value={form.name}
          name="name"
          onChange={changeHandler}
          className={styles.input}
        />
        {errors.name && <p className={styles.errorMessage}>{errors.name}</p>}
      </div>
      <div>
        <label className={styles.label}>Weight min: </label>
        <input
          type="number"
          value={form.weight_min}
          name="weight_min"
          onChange={changeHandler}
          className={styles.input}
          min="1"
        />
        {errors.weight_min && (
          <p className={styles.errorMessage}>{errors.weight_min}</p>
        )}
      </div>
      <div>
        <label className={styles.label}>Weight max: </label>
        <input
          type="number"
          value={form.weight_max}
          name="weight_max"
          onChange={changeHandler}
          className={styles.input}
          min={form.weight_min}
        />
        {errors.weight_max && (
          <p className={styles.errorMessage}>{errors.weight_max}</p>
        )}
      </div>
      <div>
        <label className={styles.label}>Height min: </label>
        <input
          type="number"
          value={form.height_min}
          name="height_min"
          onChange={changeHandler}
          className={styles.input}
          min="1"
        />
        {errors.height_min && (
          <p className={styles.errorMessage}>{errors.height_min}</p>
        )}
      </div>
      <div>
        <label className={styles.label}>Height max: </label>
        <input
          type="number"
          value={form.height_max}
          name="height_max"
          onChange={changeHandler}
          className={styles.input}
          min={form.height_min}
        />
        {errors.height_max && (
          <p className={styles.errorMessage}>{errors.height_max}</p>
        )}
      </div>
      <div>
        <label className={styles.label}>Life Span min: </label>
        <input
          type="number"
          value={form.life_span_min}
          name="life_span_min"
          onChange={changeHandler}
          min="1"
          className={styles.input}
        />
        {errors.life_span_min && (
          <p className={styles.errorMessage}>{errors.life_span_min}</p>
        )}
      </div>
      <div>
        <label className={styles.label}>Life Span max: </label>
        <input
          type="number"
          value={form.life_span_max}
          name="life_span_max"
          onChange={changeHandler}
          min={form.life_span_min}
          className={styles.input}
        />
        {errors.life_span_max && (
          <p className={styles.errorMessage}>{errors.life_span_max}</p>
        )}
      </div>
      <div className={styles.temperamentContainer}>
        Select Temperaments:
        <div>
          {temperaments?.map((temperament, index) => (
            <div key={index}>
              <input
                type="checkbox"
                id={temperament.id}
                name={temperament.name}
                value={temperament.name}
                checked={form.temperament.includes(temperament.name)}
                onChange={handleTemperamentChange}
              />
              <label
                className={styles.temperamentNameLabel}
                htmlFor={`temperament_${temperament.id}`}
              >
                {temperament.name}
              </label>
            </div>
          ))}
        </div>
      </div>
      {errors.temperament && (
        <p className={styles.errorMessage}>{errors.temperament}</p>
      )}
      <div>
        <button type="submit" className={styles.button} disabled={disabled}>
          Post breef
        </button>
      </div>
    </form>
  );
};

export default Form;
