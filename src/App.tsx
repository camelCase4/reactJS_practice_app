import { Route, Routes } from "react-router-dom";
import Layout from "./main_layout/Layout";
import Menu from "./pages/main_page/Menu";
import Joke from "./pages/joke_page/Joke";
import Movie from "./pages/movie_page/Movie";
import Anime from "./pages/anime_page/Anime";
import Verses from "./pages/verses_page/Verses";
import { ToastContainer } from "react-toastify";
import Trivia from "./pages/trivia_page/Trivia";
import Games from "./pages/game_page/Games";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={6500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        limit={1} // only 1 toast at a time
        theme="colored"
      />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Menu />} />
          <Route path="/jokes" element={<Joke />} />
          <Route path="/movies" element={<Movie />} />
          <Route path="/anime" element={<Anime />} />
          <Route path="/verses" element={<Verses />} />
          <Route path="/trivia" element={<Trivia />} />
          <Route path="/games" element={<Games />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
