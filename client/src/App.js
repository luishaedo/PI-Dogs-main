import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Detail, Form, Home, Landing } from "./views";
// import Error from "./components/Error/Error";
import NavBar from "./components/NavBar/NavBar";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}

      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/dogs" element={<Home />} />
        <Route exact path="/form" element={<Form />} />
        <Route exact path="/detail/:id" Component={Detail} />
        {/* <Route path="*" component={<Error />} /> */}
      </Routes>
    </div>
  );
}

export default App;
