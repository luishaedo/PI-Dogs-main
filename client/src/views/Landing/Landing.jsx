import style from "./Landing.module.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className={style.landing}>
      <h2 className={style.h2Landing}>InfoDogs</h2>
      <h4 className={style.h3Landing}>
        Your ultimate source for information on every dog breed in the world
      </h4>
      <Link to="/dogs" className={style.btn_Entrada}>
        Go
      </Link>
    </div>
  );
};
export default Landing;
