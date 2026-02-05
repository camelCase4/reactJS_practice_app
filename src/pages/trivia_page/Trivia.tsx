import { useEffect, useRef, useState } from "react";
import PageTitles from "../main_page/PageTitles";
import TriviaCategoryComponent from "./TriviaCategoryComponent";
import "./Trivia.css";
import TriviaQuestionComponent from "./TriviaQuestionComponent";
import { toast } from "react-toastify";
import Confetti from "react-confetti";

function Trivia() {
  const [category, setCategory] = useState(0);
  const [questionNum, setQuestionNum] = useState(10);
  const [difficulty, setDifficulty] = useState("");
  const [type, setType] = useState("");
  const [categoryList, setCategoryList] = useState<TriviaCategoryComponent[]>(
    [],
  );
  const [categoryLoader, setCategoryLoader] = useState(true);
  const [questionLoader, setQuestionLoader] = useState(false);

  const [tags, setTags] = useState("UNSET");
  const [categoryText, setCategoryText] = useState("");
  const [opFailed, setOpFailed] = useState(false);
  const [questionsList, setQuestionsList] = useState<TriviaQuestionComponent[]>(
    [],
  );
  const [answeredQuestions, setAnsweredQuestions] = useState<
    Map<number, number>
  >(new Map());

  const [completeBtnClick, setCompleteBtnClick] = useState(false);
  const [lockComponents, setLockComponents] = useState(false);
  const [overAllScore, setOverAllScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  const hasCombinedRef = useRef(false); // It’s explicitly meant for this kind of “did this already happen?” logic

  const API_BASE_URL = "https://opentdb.com";
  const loadCategories = async () => {
    try {
      const endpoint = `${API_BASE_URL}/api_category.php`;
      const response = await fetch(endpoint);
      const data = await response.json();
      const categories = data.trivia_categories;
      setCategoryList(categories);
      setCategoryLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleQuestionNum = (num: number) => {
    if (num > 50) {
      num = 50;
    } else if (num < 10) {
      num = 10;
    }
    setQuestionNum(num);
  };

  const lowercaseFirstWord = (word: string) => {
    let newWord = word.charAt(0).toLowerCase() + word.slice(1);
    return newWord;
  };

  const handleCompleteBtn = (quit?: number) => {
    toast.dismiss();
    if (completeBtnClick || quit === 2) {
      setCompleteBtnClick(false);
      setOverAllScore(0);
      setLockComponents(false);
      setQuestionsList([]);
      setAnsweredQuestions(new Map());
    } else {
      setShowConfetti(true);
      // start fade-out after 4.5 seconds
      setTimeout(() => setFadeOut(true), 8500);
      setTimeout(() => setShowConfetti(false), 9000);
      const correctScore = [...answeredQuestions.values()].reduce(
        (a, b) => a + b,
        0,
      );
      setCompleteBtnClick(true);
      setOverAllScore(correctScore);
    }
  };

  function decodeHtml(html: string) {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }

  const handleFetchQuestion = async () => {
    hasCombinedRef.current = false;
    setQuestionsList([]);
    setQuestionLoader(true);
    try {
      const endpoint = `${API_BASE_URL}/api.php?amount=${questionNum}&category=${category}&difficulty=${lowercaseFirstWord(difficulty)}&type=${type === "Multiple Choice" ? "multiple" : "boolean"}`;

      const response = await fetch(endpoint);
      const data = await response.json();
      const questions = data.results;
      setQuestionLoader(false);

      if (data.response_code !== 0) {
        setOpFailed(true);
      } else {
        toast.success("Tags are locked & set. Good luck! No cheating!");

        setLockComponents(true);
        setOpFailed(false);
        setQuestionsList(questions);
        // combineCorrectAndIncorrect();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!hasCombinedRef.current && questionsList.length > 0) {
      hasCombinedRef.current = true;
      combineCorrectAndIncorrect();
    }
  }, [questionsList]);

  const handleScore = (
    key: number,
    correct_answer: string,
    chosen_answer: string,
  ) => {
    const newMap = new Map(answeredQuestions);

    if (correct_answer === chosen_answer) {
      newMap.set(key, 1);
    } else {
      newMap.set(key, 0);
    }

    console.log(newMap);
    setAnsweredQuestions(newMap);
  };

  const combineCorrectAndIncorrect = () => {
    const updatedList = [...questionsList]; // copy array

    for (let i = 0; i < updatedList.length; i++) {
      let question = { ...updatedList[i] }; // copy object
      let randomIndex =
        Math.floor(
          Math.random() * (question.incorrect_answers.length + 1 - 1 + 1) + 1,
        ) - 1;
      question.incorrect_answers = [...question.incorrect_answers]; // copy array
      question.incorrect_answers.splice(
        randomIndex,
        0,
        question.correct_answer,
      );
      updatedList[i] = question; // replace updated question
    }

    setQuestionsList(updatedList); // set new array reference
  };

  return (
    <>
      {showConfetti && (
        <div
          className={`confetti-wrapper container ${fadeOut ? "fade-out" : ""}`}
        >
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={200}
          />
        </div>
      )}
      <div className="container my-5">
        <PageTitles
          h3Title="Trivia Land!"
          h6Title="Test your IQ with our trivia questions!"
        />

        <div className="row gx-4">
          {/* Category List */}
          <div className="col-12 col-sm-6 col-md-4 mb-4">
            <div className="text-start">
              <small
                className="rounded-pill bg-primary text-white px-3 py-1 d-inline-block mb-2"
                style={{
                  background:
                    "linear-gradient(90deg, #212529 55%, #6c757d 100%)", // dark → light
                }}
              >
                Select a category
              </small>
            </div>
            <div
              className="list-group"
              style={{ height: "500px", overflowY: "auto" }}
            >
              {categoryLoader ? (
                <div className="align-items-center">
                  <div
                    className="spinner-border text-primary mt-5 me-3"
                    role="status"
                  />
                  <span className="fst-italic text-white">
                    <small> Fetching Categories...</small>
                  </span>
                </div>
              ) : (
                categoryList.map((c) => (
                  <button
                    type="button"
                    className={`list-group-item list-group-item-action ${c.id === category ? "bg-secondary text-white" : ""} ${lockComponents ? "disabled" : ""}`}
                    key={c.id}
                    onClick={() => {
                      setCategoryText(c.name);
                      setCategory(c.id);
                      setTags(
                        `[${c.name}] ${questionNum} ${difficulty === "" ? "" : difficulty} ${type === "" ? "" : type} questions.`,
                      );
                    }}
                  >
                    {c.name}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Number of Questions & Difficulty */}
          <div className="col-12 col-sm-6 col-md-4 mb-4">
            <div className="text-start">
              <small
                className="rounded-pill bg-primary text-white px-3 py-1 d-inline-block mb-2 me-2"
                style={{
                  background:
                    "linear-gradient(90deg, #212529 55%, #6c757d 100%)", // dark → light
                }}
              >
                Number of questions
              </small>
              <small style={{ fontSize: "0.7rem" }}>Min: 10, Max: 50</small>
            </div>
            <div className="mb-3">
              <input
                type="number"
                className="form-control"
                min={10}
                max={50}
                placeholder="Enter number"
                value={questionNum}
                disabled={lockComponents ? true : false}
                onChange={(e) => {
                  handleQuestionNum(parseInt(e.target.value));
                  setTags(
                    `[${category === 0 ? "EMPTY" : categoryText}] ${parseInt(e.target.value) > 50 ? 50 : parseInt(e.target.value) < 10 ? 10 : parseInt(e.target.value)} ${difficulty === "" ? "EMPTY" : difficulty} ${type === "" ? "EMPTY" : type} questions.`,
                  );
                }}
              />
            </div>

            <div className="text-start mt-4">
              <small
                className="rounded-pill bg-primary text-white px-3 py-1 d-inline-block mb-2"
                style={{
                  background:
                    "linear-gradient(90deg, #212529 55%, #6c757d 100%)", // dark → light
                }}
              >
                Select difficulty
              </small>
            </div>
            <div
              className="list-group"
              style={{ height: "150px", overflowY: "auto" }}
            >
              <button
                type="button"
                className={`list-group-item list-group-item-action ${difficulty === "Easy" ? "bg-secondary text-white" : ""} ${lockComponents ? "disabled" : ""}`}
                aria-current="true"
                onClick={() => {
                  setDifficulty("Easy");
                  setTags(
                    `[${category === 0 ? "EMPTY" : categoryText}] ${questionNum} Easy ${type === "" ? "EMPTY" : type} questions.`,
                  );
                }}
              >
                Easy
              </button>
              <button
                type="button"
                className={`list-group-item list-group-item-action ${difficulty === "Medium" ? "bg-secondary text-white" : ""} ${lockComponents ? "disabled" : ""}`}
                onClick={() => {
                  setDifficulty("Medium");
                  setTags(
                    `[${category === 0 ? "EMPTY" : categoryText}] ${questionNum} Medium ${type === "" ? "EMPTY" : type} questions.`,
                  );
                }}
              >
                Medium
              </button>
              <button
                type="button"
                className={`list-group-item list-group-item-action ${difficulty === "Hard" ? "bg-secondary text-white" : ""} ${lockComponents ? "disabled" : ""}`}
                onClick={() => {
                  setDifficulty("Hard");
                  setTags(
                    `[${category === 0 ? "EMPTY" : categoryText}] ${questionNum} Hard ${type === "" ? "EMPTY" : type} questions.`,
                  );
                }}
              >
                Hard
              </button>
            </div>

            <div className="text-start">
              <small
                className="rounded-pill bg-primary text-white px-3 py-1 d-inline-block mb-2"
                style={{
                  background:
                    "linear-gradient(90deg, #212529 55%, #6c757d 100%)", // dark → light
                }}
              >
                Trivia type
              </small>
            </div>
            <div
              className="list-group"
              style={{ height: "100px", overflowY: "auto" }}
            >
              <button
                type="button"
                className={`list-group-item list-group-item-action ${type === "Multiple Choice" ? "bg-secondary text-white" : ""} ${lockComponents ? "disabled" : ""}`}
                onClick={() => {
                  setType("Multiple Choice");
                  setTags(
                    `[${category === 0 ? "EMPTY" : categoryText}] ${questionNum} ${difficulty === "" ? "EMPTY" : difficulty} Multiple Choice questions.`,
                  );
                }}
              >
                Multiple Choice
              </button>
              <button
                type="button"
                className={`list-group-item list-group-item-action ${type === "True / False" ? "bg-secondary text-white" : ""} ${lockComponents ? "disabled" : ""}`}
                onClick={() => {
                  setType("True / False");

                  setTags(
                    `[${category === 0 ? "EMPTY" : categoryText}] ${questionNum} ${difficulty === "" ? "EMPTY" : difficulty} True / False questions.`,
                  );
                }}
              >
                True / False
              </button>
            </div>
            <div className="text-center">
              <button
                className={`btn btn-gradient mt-3 text-white w-100 w-md-auto ${
                  answeredQuestions.size === questionNum ? "" : "disabled"
                }`}
                onClick={() => handleCompleteBtn()}
              >
                {completeBtnClick ? "New Trivia" : "Complete"}
              </button>
            </div>

            <div className="text-center">
              <button
                className={`btn btn-gradient mt-3 text-white w-100 w-md-auto ${
                  questionsList.length !== 0 && !completeBtnClick
                    ? ""
                    : "disabled"
                }`}
                onClick={() => handleCompleteBtn(2)}
              >
                Quit
              </button>
            </div>
          </div>

          {/* Questions Box */}
          <div className="col-12 col-sm-6 col-md-4 mb-4">
            <div className="text-start">
              <small
                className="rounded-pill bg-primary text-white px-3 py-1 d-inline-block mb-2 me-2"
                style={{
                  background:
                    "linear-gradient(90deg, #212529 55%, #6c757d 100%)", // dark → light
                }}
              >
                Questions
              </small>

              <small style={{ fontSize: "0.7rem" }}>
                Make sure to set tags
              </small>
              <span
                className={`badge text-bg-success ms-2 ${completeBtnClick ? "" : "d-none"}`}
              >
                Score: {overAllScore}
              </span>
            </div>

            <div
              className="border rounded p-3"
              style={{
                height: "500px",
                overflowY: "auto",
                backgroundColor: "#f8f9fa",
              }}
            >
              <small
                style={{ fontSize: "0.7rem", color: "#6c757d" }}
                className={`${category === 0 || difficulty === "" || type === "" ? "text-danger" : "text-success me-2"}`}
              >
                Tags: {tags}
              </small>

              <small
                style={{ fontSize: "0.7rem", color: "#6c757d" }}
                className={`${category === 0 || difficulty === "" || type === "" ? "d-none" : ""}`}
              >
                <button
                  type="button"
                  onClick={handleFetchQuestion}
                  className={lockComponents ? "d-none" : ""}
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    margin: 0,
                    color: "#0d6efd", // bootstrap link color
                    textDecoration: "underline",
                    cursor: "pointer",
                    font: "inherit",
                  }}
                >
                  Click when ready
                </button>
              </small>
              <hr
                style={{
                  border: "none",
                  height: "1px",
                  backgroundColor: "#212529",
                }}
              />

              {questionLoader ? (
                <div className="align-items-center">
                  <div
                    className="spinner-border text-primary mt-3 me-3"
                    role="status"
                  />
                  <span className="fst-italic text-dark">
                    <small> Fetching Questions...</small>
                  </span>
                </div>
              ) : opFailed ? (
                <div className="text-dark my-2">
                  <span className={`badge text-bg-danger ms-2`}>
                    Exernal API Connection Failed, Please try again.
                  </span>
                </div>
              ) : (
                questionsList.map((q, index) => (
                  <div
                    key={index}
                    className={`card mb-3 mt-3 ${completeBtnClick ? (answeredQuestions.get(index) === 1 ? "bg-success text-white" : "bg-danger text-white") : ""}`}
                  >
                    <div className="card-body">
                      <p className="card-text">
                        {index + 1}. {decodeHtml(q.question)}
                      </p>

                      {q.incorrect_answers.map((a, index2) => (
                        <div className="form-check" key={index2}>
                          <input
                            className="form-check-input"
                            type="radio"
                            name={`radioDefault${index}`}
                            onClick={() => {
                              handleScore(index, q.correct_answer, a);
                            }}
                          />
                          <label className="form-check-label">
                            {decodeHtml(a) +
                              " " +
                              (q.correct_answer === a &&
                              completeBtnClick &&
                              answeredQuestions.get(index) === 0
                                ? "✔️"
                                : "")}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Trivia;
