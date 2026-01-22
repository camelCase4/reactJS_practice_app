import { useEffect, useState } from "react";
import PageTitles from "../main_page/PageTitles";
import "./Joke.css";
import JokeLine from "./JokeLine";

function Joke() {
  const API_BASE_URL = "https://api.chucknorris.io/jokes";
  const [categories, setCategories] = useState<string[]>([]);
  const [loaderAPI, setloaderAPI] = useState(true);
  const [buttonChosen, setButtonChosen] = useState(-1);
  const [generateButton, setGenerateButton] = useState(false);
  const [showJokeLoader, setShowJokeLoader] = useState(false);
  const [chosenCategory, setChosenCategory] = useState("...");
  const [jokeText, setJokeText] = useState("...");

  const fetchJokeCategories = async () => {
    try {
      const endpoint = `${API_BASE_URL}/categories`;
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const categories: string[] = await response.json();

      return categories;
    } catch (error) {
      console.error(`Error fetching categories: ${error}`);
      return [];
    } finally {
      setloaderAPI(false);
    }
  };

  const fetchJokeByCategory = async () => {
    try {
      const endpoint = `${API_BASE_URL}/random?category=${chosenCategory}`;
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const joke = await response.json();

      return joke.value;
    } catch (error) {
      console.error(`Error fetching categories: ${error}`);
      return "";
    } finally {
      setShowJokeLoader(false);
    }
  };

  const loadCategories = async () => {
    const categs = await fetchJokeCategories();
    setCategories(categs);
  };

  const loadJoke = async () => {
    const joke = await fetchJokeByCategory();
    setJokeText(joke);
  };

  // useEffect is basically like saying, "after rendering, execute this" it is like initState in flutter
  // when specified or added paramter like [], it means run only once and not again.
  useEffect(() => {
    loadCategories();
  }, []);

  const handleButtonClick = (index: number, categ: string) => {
    setButtonChosen(index);
    setChosenCategory(categ);
    setGenerateButton(true);
    setJokeText("...");
  };

  const handleGenerateButton = () => {
    setShowJokeLoader(!showJokeLoader);
    loadJoke();
  };

  return (
    <>
      <div className="text-center m-5">
        <div className="container text-center">
          <PageTitles
            h3Title="Chuck Norris Jokes!"
            h6Title="Choose a joke category"
          ></PageTitles>
          {loaderAPI ? (
            <div className="align-items-center">
              <div
                className="spinner-border text-primary mt-5 me-3"
                role="status"
              />
              <span className="fst-italic text-white">
                Fetching Joke Categories...
              </span>
            </div>
          ) : (
            <div className="row row-cols-4 g-3 mb-4">
              {categories.map((category, index) => (
                <div key={index} className="col">
                  <div
                    className={`${
                      buttonChosen === index ? "bg-secondary" : "bg-primary"
                    } p-3 text-white text-center rounded category-box`}
                    onClick={() => handleButtonClick(index, category)}
                  >
                    {category}
                  </div>
                </div>
              ))}
            </div>
          )}
          <JokeLine
            text={jokeText}
            generateStatus={generateButton}
            showJokeLoader={showJokeLoader}
            generateButtonClick={handleGenerateButton}
            categoryChosen={chosenCategory}
          />
        </div>
      </div>
    </>
  );
}

export default Joke;
