import { useEffect, useState } from "react";
import PageTitles from "../main_page/PageTitles";
import MovieCard from "./MovieCard";
import MovieComponent from "./MovieComponent";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Movie.css";

function Movie() {
  const navigate = useNavigate();
  const [movieLoader, setMovieLoader] = useState(true);
  const [movies, setMovies] = useState<MovieComponent[]>([]);
  const [allMovies, setAllMovies] = useState<MovieComponent[]>([]);
  const [searchText, setSearhText] = useState("");
  const [errorMessage, showErrorMessage] = useState(false);
  const [modal, showModal] = useState(false);
  const [saveLoader, showSaveLoader] = useState(false);
  const [opFailed, showOpFailed] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteQueue, setDeleteQueue] = useState<number[]>([]);
  const [actionType, setActionType] = useState<number>(-1);

  // modal input
  const [movieTitle, setMovieTitle] = useState("");
  const [movieID, setmMovieID] = useState<number>(-1);
  const [movieScore, setMovieScore] = useState<number | "">("");
  const [moviePoster, setMoviePoster] = useState("");
  const [movieDescription, setmovieDescription] = useState("");
  const [urlWarning, showUrlWarning] = useState(false);
  const [scoreMaxWarning, showScoreMaxWarning] = useState(false);

  const API_BASE_MOVIE_URL = "https://localhost:7211/api/movie";

  // const handleLeaveBtn = () => {
  //   navigate(-1);
  // };

  const fetchMovies = async () => {
    try {
      const endpoint = `${API_BASE_MOVIE_URL}/getMovies`;
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const movie = await response.json();

      return movie;
    } catch (error) {
      console.error(`Error fetching movies: ${error}`);
      showErrorMessage(true);
      return [];
    } finally {
      setMovieLoader(false);
    }
  };

  const handleInserBtnClick = async () => {
    var failed = false;

    var payload: MovieComponent = {
      movieName: movieTitle,
      movieDescription: movieDescription,
      starScore: movieScore === "" ? 1 : movieScore,
      moviePoster: moviePoster,
    };
    showSaveLoader(true);
    setTimeout(async () => {
      try {
        const endpoint = `${API_BASE_MOVIE_URL}/saveMovies`;
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          failed = true;
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Movie saved successfully");
        loadMovies();
      } catch (error) {
        failed = true;
        console.error(`Error fetching movies: ${error}`);
        showOpFailed(true);
      } finally {
        setMovieTitle("");
        setMovieScore("");
        setMoviePoster("");
        setmovieDescription("");
        showSaveLoader(false);
        if (!failed) {
          showModal(false);
        }
      }
    }, 1000);
  };

  const handleUpdateBtnClick = async () => {
    var failed = false;

    var payload: MovieComponent = {
      movieID: movieID,
      movieName: movieTitle,
      movieDescription: movieDescription,
      starScore: movieScore === "" ? 1 : movieScore,
      moviePoster: moviePoster,
    };
    showSaveLoader(true);
    setTimeout(async () => {
      try {
        const endpoint = `${API_BASE_MOVIE_URL}/updateMovies`;
        const response = await fetch(endpoint, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          failed = true;
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Movie updated successfully");
        loadMovies();
      } catch (error) {
        failed = true;
        console.error(`Error fetching movies: ${error}`);
        showOpFailed(true);
      } finally {
        setMovieTitle("");
        setMovieScore("");
        setMoviePoster("");
        setmovieDescription("");
        showSaveLoader(false);
        if (!failed) {
          showModal(false);
        }
      }
    }, 1000);
  };

  const handleDeleteBtnClick = async () => {
    var failed = false;

    showSaveLoader(true);
    setTimeout(async () => {
      try {
        const endpoint = `${API_BASE_MOVIE_URL}/deleteMovies`;
        const response = await fetch(endpoint, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(deleteQueue),
        });

        if (!response.ok) {
          failed = true;
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log("Movie/s deleted successfully");
        loadMovies();
      } catch (error) {
        failed = true;
        console.error(`Error fetching movies: ${error}`);
        showOpFailed(true);
      } finally {
        setDeleteQueue([]);
        showSaveLoader(false);
        if (!failed) {
          setDeleteConfirmation(false);
        }
      }
    }, 1000);
  };

  const loadMovies = async () => {
    const movies = await fetchMovies();
    setMovies(movies);
    setAllMovies(movies);
  };

  var showOnce = 0;
  useEffect(() => {
    if (showOnce == 0) {
      showOnce = 1;
      loadMovies();
      toast.success(
        "TIP: You can edit movie details by double clicking the movie card.",
      );
    }
  }, []);

  const handleTextOnChange = (txt: string) => {
    setSearhText(txt);

    const filteredMovies =
      txt === ""
        ? allMovies
        : allMovies.filter((movie) =>
            movie.movieName.toLowerCase().includes(txt.toLowerCase()),
          );

    setMovies(filteredMovies);
  };

  const handleSearchBtnClick = (searchTxt: string) => {
    const filteredMovies =
      searchTxt === ""
        ? allMovies
        : allMovies.filter((movie) =>
            movie.movieName.toLowerCase().includes(searchTxt.toLowerCase()),
          );

    setMovies(filteredMovies);
  };

  const handleAddBtn = (action: number, movieComp?: MovieComponent) => {
    // 1 = adding, 2 = updating
    if (action === 1) {
      setActionType(1);
      showModal(true);
    } else {
      setActionType(2);
      setmMovieID(movieComp!.movieID!);
      setMovieTitle(movieComp!.movieName);
      setMovieScore(movieComp!.starScore);
      setMoviePoster(movieComp!.moviePoster);
      setmovieDescription(movieComp!.movieDescription);
      showModal(true);
    }
  };
  const handleDeleteBtn = () => {
    setDeleteConfirmation(true);
  };

  const handleMoviePosterInput = (urlStr: string) => {
    setMoviePoster(urlStr); // always update input

    // Regex for imgur image URL (https://i.imgur.com/XXXXXXX.extension)
    const imgurRegex =
      /^https:\/\/i\.imgur\.com\/[a-zA-Z0-9]+(\.jpeg|\.jpg|\.png|\.gif)$/i;

    if (!imgurRegex.test(urlStr) && urlStr != "") {
      showUrlWarning(true); // invalid URL
    } else {
      showUrlWarning(false); // valid URL
    }
  };

  const handleMovieScoreInput = (score: string) => {
    if (score.trim() === "") {
      setMovieScore("");
    } else {
      const num = parseFloat(score);
      setMovieScore(num);
      showScoreMaxWarning(num > 10);
    }
  };

  const inputChecker = () => {
    if (
      movieTitle !== "" &&
      typeof movieScore === "number" && // ensure it's a number
      !isNaN(movieScore) &&
      moviePoster !== "" &&
      movieDescription !== ""
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handoleBtnModalClose = () => {
    setMovieTitle("");
    setMovieScore("");
    setMoviePoster("");
    setmovieDescription("");
    showOpFailed(false);
    showModal(false);
    showUrlWarning(false);
    showScoreMaxWarning(false);
  };

  const handleDeleteMovieBtn = (id: number, btnType: number) => {
    //1 deleting, 2 restoring
    if (btnType === 1) {
      setDeleteQueue((prev) => [...prev, id]);
    } else {
      setDeleteQueue((prev) => prev.filter((num) => num !== id));
    }
  };

  return (
    <>
      {modal && (
        <>
          <div className="modal fade show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Movie Details</h5>
                  <span
                    className={`badge text-bg-danger ms-2 ${opFailed ? "" : "d-none"}`}
                  >
                    Operation Failed, Please try again later.
                  </span>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handoleBtnModalClose}
                  />
                </div>

                <div className="modal-body p-5">
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="movieTitle"
                      value={movieTitle}
                      placeholder="Marvels"
                      onChange={(e) => {
                        showOpFailed(false);
                        setMovieTitle(e.target.value);
                      }}
                    />
                    <label htmlFor="floatingInput">Movie Title</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="number"
                      className="form-control"
                      id="movieScore"
                      placeholder="9.0"
                      min="1"
                      max="10"
                      value={movieScore}
                      onChange={(e) => handleMovieScoreInput(e.target.value)}
                    />
                    <label htmlFor="floatingInput">Movie Score</label>
                    {!scoreMaxWarning ? (
                      ""
                    ) : (
                      <small className="text-danger ms-1">
                        SCORE PROVIDED SHOULD NOT EXCEED 10
                      </small>
                    )}
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="movieUrl"
                      value={moviePoster}
                      onChange={(e) => handleMoviePosterInput(e.target.value)}
                      placeholder="https://i.imgur.com/aVqJ12H.jpeg"
                    />
                    <label htmlFor="floatingInput">Movie Poster URL</label>
                    {!urlWarning ? (
                      ""
                    ) : (
                      <small className="text-danger ms-1">
                        URL PROVIDED IS NOT VALID
                      </small>
                    )}
                  </div>
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      placeholder="Leave a comment here"
                      id="movieDesc"
                      value={movieDescription}
                      onChange={(e) => setmovieDescription(e.target.value)}
                      style={{ height: "100px" }}
                    ></textarea>
                    <label htmlFor="floatingTextarea2">Movie Description</label>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className={`btn btn-secondary ${saveLoader ? "d-none" : ""}`}
                    onClick={() => {
                      showOpFailed(false);
                      showModal(false);
                      handoleBtnModalClose();
                    }}
                  >
                    Close
                  </button>
                  {saveLoader ? (
                    <div className="d-flex align-items-center">
                      <div
                        className="spinner-border text-primary me-3"
                        role="status"
                      />
                      <span className="fst-italic text-black">Saving</span>
                    </div>
                  ) : actionType === 1 ? (
                    <button
                      type="button"
                      onClick={handleInserBtnClick}
                      className={`btn btn-primary ${!urlWarning && !scoreMaxWarning && inputChecker() ? "" : "disabled"}`}
                    >
                      Save movie
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={handleUpdateBtnClick}
                      className={`btn btn-primary ${!urlWarning && !scoreMaxWarning && inputChecker() ? "" : "disabled"}`}
                    >
                      Update movie
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="modal-backdrop fade show"></div>
        </>
      )}
      {deleteConfirmation && (
        <>
          <div className="modal fade show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirmation</h5>
                  <span
                    className={`badge text-bg-danger ms-2 ${opFailed ? "" : "d-none"}`}
                  >
                    Operation Failed, Please try again later.
                  </span>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setDeleteConfirmation(false)}
                  />
                </div>

                <div className="modal-body p-5 text-center">
                  <h4 className="mb-3 fw-bold">
                    Are you sure you want to delete{" "}
                    <span className="text-danger">{deleteQueue.length}</span>{" "}
                    movie
                    {deleteQueue.length > 1 ? "s" : ""}?
                  </h4>
                  <p className="text-muted">
                    This action <strong>cannot be undone</strong>. Make sure you
                    really want to remove these movie
                    {deleteQueue.length > 1 ? "s" : ""}.
                  </p>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className={`btn btn-secondary ${saveLoader ? "d-none" : ""}`}
                    onClick={() => {
                      showOpFailed(false);
                      setDeleteConfirmation(false);
                    }}
                  >
                    Cancel
                  </button>
                  {saveLoader ? (
                    <div className="d-flex align-items-center">
                      <div
                        className="spinner-border text-primary me-3"
                        role="status"
                      />
                      <span className="fst-italic text-black">Deleting</span>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleDeleteBtnClick}
                      className={`btn btn-success`}
                    >
                      Proceed
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="modal-backdrop fade show"></div>
        </>
      )}

      <div className="m-5">
        <div className="container ">
          <PageTitles
            h3Title={"Movies Lounge"}
            h6Title={"Entertainment at its finest!"}
          />
          <div className="row mb-4 align-items-center">
            <div className="col-12 col-md-8 mb-2 mb-md-0">
              <div className="input-group">
                {/* <button
                  className="btn btn-danger btn-sm me-2"
                  onClick={handleLeaveBtn}
                >
                  ← Leave
                </button> */}
                <input
                  type="text"
                  className="form-control"
                  placeholder="find your favorite movie"
                  value={searchText}
                  onChange={(e) => handleTextOnChange(e.target.value)}
                  aria-label="Example text with button addon"
                  aria-describedby="button-addon1"
                />
                <button
                  className="btn btn-primary"
                  type="button"
                  id="button-addon1"
                  onClick={() => handleSearchBtnClick(searchText)}
                >
                  Search
                </button>
                <button
                  className="btn btn-success btn-sm ms-2"
                  onClick={() => handleAddBtn(1)}
                >
                  Add Movie
                </button>
              </div>
            </div>

            {deleteQueue.length != 0 && (
              <div className="col-12 col-md-4 mb-2 mb-md-0">
                <div className="input-group">
                  {/* wrap in input-group to match height */}
                  <button
                    className="btn btn-danger"
                    onClick={handleDeleteBtn}
                    style={{ flex: 1 }} // optional: make it stretch full width of col
                  >
                    Confirm Delete
                  </button>
                  <span className="input-group-text bg-white">
                    <small>{deleteQueue.length + " movie/s"}</small>
                  </span>
                </div>
              </div>
            )}
          </div>

          <h5 className={errorMessage ? "text-warning" : "d-none"}>
            Apologies for the inconvenience but the server is currently down!
          </h5>
          <div className="row">
            {movieLoader ? (
              <div className="align-items-center">
                <div
                  className="spinner-border text-primary mt-5 me-3"
                  role="status"
                />
                <span className="fst-italic text-white">
                  Fetching Movies...
                </span>
              </div>
            ) : (
              movies.map((movie, index) => (
                <MovieCard
                  key={movie.movieID}
                  movieTitle={movie.movieName}
                  movieDescription={movie.movieDescription}
                  movieScore={movie.starScore}
                  movieImg={movie.moviePoster}
                  movieID={movie.movieID!}
                  handleBtnDelete={handleDeleteMovieBtn}
                  handleDoubleClick={() => handleAddBtn(2, { ...movie })}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Movie;
