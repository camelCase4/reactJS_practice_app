import PageTitles from "../main_page/PageTitles";
import { useEffect, useState } from "react";
import jesusBg from "./verses_imgs/jesus_gif.gif";

function Verses() {
  const [verse, setVerse] = useState(
    "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
  );
  const [author, setAuthor] = useState("John 3:16");
  const [loader, setLoader] = useState(false);

  const API_BASE_URL = "https://bible-api.com/data";
  const handleBtnclick = async () => {
    setLoader(true);
    try {
      const endpoint = `${API_BASE_URL}/web/random`;
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseJson = await response.json();
      setVerse(responseJson["random_verse"]["text"]);
      setAuthor(
        responseJson["random_verse"]["book"] +
          " " +
          responseJson["random_verse"]["chapter"] +
          ":" +
          responseJson["random_verse"]["verse"],
      );
      setLoader(false);
    } catch (error) {
      setVerse(
        "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
      );
      setAuthor("John 3:16");
      setLoader(false);
    }
  };

  return (
    <>
      <div className="text-center m-5">
        <div className="container text-center">
          <PageTitles
            h3Title="Good Side!"
            h6Title="Feed your soul with verses"
          ></PageTitles>
          <div
            style={{
              position: "relative",
              display: "inline-block",
            }}
          >
            <img
              src={jesusBg}
              style={{
                maxWidth: "100%",
                borderRadius: "20px",
                display: "block",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: "0",
                left: "0",
                width: "100%",
                padding: "14px",
                color: "white",
                textAlign: "center",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0))",
                borderBottomLeftRadius: "20px",
                borderBottomRightRadius: "20px",
              }}
            >
              {loader ? (
                <div
                  className="d-flex flex-column justify-content-center align-items-center"
                  style={{ height: "100%" }}
                >
                  <div
                    className="spinner-border text-primary mb-2"
                    role="status"
                  />
                </div>
              ) : (
                <>
                  <p
                    style={{
                      margin: 0,
                      fontSize: "0.9rem",
                      lineHeight: "1.4",
                      maxWidth: "90%",
                      marginInline: "auto",
                    }}
                  >
                    {verse}
                  </p>
                  <small style={{ fontSize: "0.75rem", opacity: 0.9 }}>
                    {author}
                  </small>
                </>
              )}
            </div>
          </div>
        </div>
        <button
          className="btn btn-light"
          style={{ width: "370px" }}
          onClick={handleBtnclick}
        >
          <small>New Verse</small>
        </button>
      </div>
    </>
  );
}

export default Verses;
