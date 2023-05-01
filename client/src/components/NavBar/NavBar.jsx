import styles from "./NavBar.module.css";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getDogsByName } from "../../redux/actions/actions";

const NavBar = () => {
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  function handleChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  useEffect(() => {
    if (search !== "") {
      dispatch(getDogsByName(search));
    }
  }, [search]);

  return (
    <div className={styles.navBarContainer}>
      <div className={styles.linksContainer}>
        <Link to="/dogs" className={styles.link}>
          InfoDogs
        </Link>
        <Link to="/form" className={styles.link}>
          Add Breed
        </Link>
      </div>
      <div className={styles.searchContainer}>
        <form onSubmit={handleSubmit}>
          <input
            type="search"
            placeholder="Search breed of dog"
            value={search}
            onChange={handleChange}
            className={styles.searchInput}
          />
        </form>
      </div>
    </div>
  );
};

export default NavBar;
