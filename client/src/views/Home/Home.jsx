import Cards from "../../components/Cards/Cards";
import styles from "./Home.module.css";
import { getDogs, setCurrentPage } from "../../redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import FilterBar from "../../components/FilterBar/Filterbar";
import Error from "../../components/Error/Error";

const Home = () => {
  const dispatch = useDispatch();

  const allDogs = useSelector((state) => state.copyResults);
  const currentPage = useSelector((state) => state.currentPage);
  const cardsPerPage = useSelector((state) => state.cardsPerPage);
  const orderBy = useSelector((state) => state.orderBy);
  const orderType = useSelector((state) => state.orderType);

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setCurrentPage(1));
  }, [orderBy, orderType, dispatch]);

  const getCardsForCurrentPage = (currentPage, cardsPerPage, allDogs) => {
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = allDogs.slice(indexOfFirstCard, indexOfLastCard);

    return currentCards.length < cardsPerPage
      ? allDogs.slice(indexOfFirstCard)
      : currentCards;
  };

  const currentCards = getCardsForCurrentPage(
    currentPage,
    cardsPerPage,
    allDogs
  );

  const handlePrevPage = () => {
    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    if (indexOfFirstCard <= 0) {
      return;
    }
    dispatch(setCurrentPage(currentPage - 1));
  };

  const handleNextPage = () => {
    const indexOfLastCard = currentPage * cardsPerPage;
    if (indexOfLastCard >= allDogs.length) {
      return;
    }
    dispatch(setCurrentPage(currentPage + 1));
  };

  const totalPages = Math.ceil(allDogs.length / cardsPerPage);
  const showNextButton = currentPage < totalPages;

  return (
    <>
      <div className={styles.homeContainer}>
        <div className={styles.filterContainer}>
          <div>{<FilterBar />}</div>
        </div>

        <div className={styles.cardsContainer}>
          <Cards dogs={currentCards} />
        </div>
      </div>
      <div className={styles.pagination}>
        {currentPage !== 1 && <button onClick={handlePrevPage}>Prev</button>}
        {showNextButton && <button onClick={handleNextPage}>Next</button>}
      </div>
    </>
  );
};

export default Home;
