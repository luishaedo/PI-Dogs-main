// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { setFilterOptions } from "../../redux/actions/actions";

// const Temperaments = ({ selectedTemperaments }) => {
//   const temperaments = useSelector((state) => state.temperaments);
//   const copyResults = useSelector((state) => state.copyResults);
//   const dispatch = useDispatch();

//   const handleTemperamentChange = (e) => {
//     const selectedTemperament = e.target.value;
//     let updatedTemperaments = [...selectedTemperaments];

//     // Verificar si el temperamento ya está seleccionado
//     const index = selectedTemperaments.indexOf(selectedTemperament);
//     if (index !== -1) {
//       // Si está seleccionado, lo removemos
//       updatedTemperaments.splice(index, 1);
//     } else {
//       // Si no está seleccionado, lo agregamos
//       updatedTemperaments.push(selectedTemperament);
//     }

//     dispatch(setFilterOptions("", updatedTemperaments));
//   };

//   const filterByTemperaments = () => {
//     dispatch(setFilterOptions(copyResults, selectedTemperaments));
//   };

//   return (
//     <div>
//       <label>Selecciona los temperamentos a filtrar:</label>
//       {temperaments.map((temperament) => (
//         <div key={temperament}>
//           <input
//             type="checkbox"
//             id={temperament}
//             name={temperament}
//             value={temperament}
//             checked={selectedTemperaments.includes(temperament)}
//             onChange={handleTemperamentChange}
//           />
//           <label htmlFor={temperament}>{temperament}</label>
//         </div>
//       ))}
//       <button onClick={filterByTemperaments}>Filtrar</button>
//     </div>
//   );
// };

// export default Temperaments;
