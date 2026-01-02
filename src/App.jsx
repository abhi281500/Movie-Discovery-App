import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MovieDetails from "./pages/MovieDetails";
import './App.css'
import Search from "./pages/Search";
import Navbar from "./components/Navbar";
import WatchList from "./pages/WatchList"


function App() {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/search" element={<Search/>} />
        <Route  path="/watchlist" element={<WatchList/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
