import { Route, Routes } from "react-router-dom";
import Layout from "./main_layout/Layout";
import Menu from "./pages/main_page/Menu";
import Joke from "./pages/joke_page/Joke";
import Movie from "./pages/movie_page/Movie";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={8500}
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
        </Route>
      </Routes>
    </>
  );
}

export default App;
