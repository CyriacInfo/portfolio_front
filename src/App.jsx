import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import Nav from "./components/menuburger/Nav";
import Portfolio from "./components/portfolio/Portfolio";
import Login from "./components/login/Login";
import Cuvi from "./components/cuvi/Cuvi";
import Article from "./components/portfolio/article/Article";
function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/article/:id" element={<Article />} />

        <Route path="/cv" element={<Cuvi />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
