import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Detail, Form, Home, Landing } from "./views";
import NavBar from "./components/NavBar/NavBar";
import Error from "./components/Error/Error";

function App() {
  const location = useLocation();
  const error = useSelector((state) => state.error);

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      {error ? (
        <Error />
      ) : (
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/dogs" element={<Home />} />
          <Route exact path="/form" element={<Form />} />
          <Route exact path="/detail/:id" Component={Detail} />
        </Routes>
      )}
    </div>
  );
}

export default App;
