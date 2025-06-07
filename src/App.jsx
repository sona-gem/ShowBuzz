import "./css/App.css";
import MovieCard from "./components/MovieCard";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBAr";
import { MovieProvider } from "./contexts/MovieContext";
import MovieDetail from "./components/MovieDetail";

function App() {
  return (
    <MovieProvider>
      <NavBar></NavBar>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/favorites" element={<Favorites></Favorites>}></Route>
          <Route
            path="/movie/:id"
            element={<MovieDetail></MovieDetail>}
          ></Route>
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
