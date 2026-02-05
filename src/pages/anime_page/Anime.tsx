import { useState } from "react";
import PageTitles from "../main_page/PageTitles";
import noAnimeImg from "./anime_imgs/no_anime_img.jpg";

function Anime() {
  const [activeTab, setActiveTab] = useState("SFW");
  const [explicitModal, setExplicitModal] = useState(false);
  const [subCategory, setSubCategory] = useState("");
  const [generatedImg, setGeneratedImgs] = useState(noAnimeImg);
  const [imgLoader, setImgLoader] = useState(false);
  const [failedFetch, setFailedFetch] = useState(false);
  const [exclusiveCode, setExclusiveCode] = useState("");
  const [codeIncorrect, setCodeIncorrect] = useState(false);

  const EXCLUSIVE_CODE = "n0_m1n0r$";

  const API_BASE_URL = "https://api.waifu.pics";

  const sfwContents = [
    "waifu",
    "neko",
    "shinobu",
    "megumin",
    "bully",
    "cuddle",
    "cry",
    "hug",
    "awoo",
    "kiss",
    "lick",
    "pat",
    "smug",
    "bonk",
    "yeet",
    "blush",
    "smile",
    "wave",
    "highfive",
    "handhold",
    "nom",
    "bite",
    "glomp",
    "slap",
    "kill",
    "kick",
    "happy",
    "wink",
    "poke",
    "dance",
    "cringe",
  ];

  const nsfwContents = ["waifu", "neko", "trap", "blowjob"];

  const onTabSwitch = (categ: string) => {
    if (categ === "SFW") {
      setGeneratedImgs(noAnimeImg);
      setSubCategory("");
      setActiveTab("SFW");
    } else {
      setExplicitModal(true);
    }
  };

  const onModalClose = () => {
    setCodeIncorrect(false);
    setExclusiveCode("");
    setExplicitModal(false);
  };

  const onModalProceed = () => {
    if (exclusiveCode === EXCLUSIVE_CODE) {
      setSubCategory("");
      setActiveTab("NSFW");
      setExplicitModal(false);
      setGeneratedImgs(noAnimeImg);
      setCodeIncorrect(false);
      setExclusiveCode("");
    } else {
      setCodeIncorrect(true);
    }
  };

  const onClickSubCategory = (subCateg: string) => {
    setSubCategory(subCateg);
    setGeneratedImgs(noAnimeImg);
    setFailedFetch(false);
  };

  const onClickGenerate = async () => {
    try {
      const endpoint = `${API_BASE_URL}/${activeTab.toLowerCase()}/${subCategory}`;
      const response = await fetch(endpoint);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const imgUrl = await response.json();
      setGeneratedImgs(imgUrl.url);
    } catch (error) {
      setGeneratedImgs(noAnimeImg);
      setFailedFetch(true);
    } finally {
      setImgLoader(false);
    }
  };

  return (
    <>
      {explicitModal && (
        <>
          <div className="modal fade show d-block" tabIndex={-1}>
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Warning</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={onModalClose}
                  />
                </div>

                <div className="modal-body p-5 text-center">
                  <h4 className="mb-3 fw-bold">
                    You are about to view explicit content
                  </h4>
                  <h6 className="text-danger">Strictly not for under 18</h6>
                  <p className="text-muted">
                    Are you really sure you want to continue?
                  </p>
                  <span
                    className={`badge text-bg-danger ms-2 mb-2 ${codeIncorrect ? "" : "d-none"}`}
                  >
                    Code Incorrect
                  </span>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="exclusiveCode"
                      value={exclusiveCode}
                      placeholder="Exclusive Code"
                      onChange={(e) => {
                        setCodeIncorrect(false);
                        setExclusiveCode(e.target.value);
                      }}
                    />
                    <label htmlFor="floatingInput">Exlusive Code</label>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={onModalClose}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={onModalProceed}
                    className={`btn btn-success`}
                  >
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="modal-backdrop fade show"></div>
        </>
      )}
      <div className="m-5">
        <h3>
          <small>
            <span>
              Welcome to{" "}
              <span
                style={{
                  fontWeight: "bold",
                  background: "linear-gradient(90deg, #212529)", // black background
                  padding: "5px 10px 5px 10px", // some horizontal padding
                  borderRadius: "5px", // optional: slightly rounded corners
                }}
              >
                Anime
                <span
                  style={{
                    background:
                      "linear-gradient(90deg, #f7d038 0%, #f57c00 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Hub!
                </span>
              </span>
            </span>
          </small>
        </h3>

        <h6 className="mb-4">
          <small>{"Choose a category"}</small>
        </h6>

        <div className="row text-center" style={{ height: "500px" }}>
          <div className="col-4">
            <div className="row justify-content-center">
              <div
                className="bg-secondary rounded-top "
                style={{
                  height: "470px",
                  overflowY: "auto", // vertical scroll
                  overflowX: "hidden",
                }}
              >
                <ul className="nav nav-tabs mt-3">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === "SFW" ? "active" : "text-white"}`}
                      onClick={() => onTabSwitch("SFW")}
                    >
                      SFW
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === "NSFW" ? "active" : "text-white"}`}
                      onClick={() => onTabSwitch("NSFW")}
                    >
                      NSFW
                    </button>
                  </li>
                </ul>
                <div className="p-3 text-start">
                  {activeTab === "SFW"
                    ? sfwContents.map((e) => (
                        <div
                          key={e}
                          className={`col mb-2 p-3 text-start rounded category-box ${subCategory === e ? "bg-light text-dark" : "text-white"}`}
                          onClick={() => onClickSubCategory(e)}
                        >
                          {e}
                        </div>
                      ))
                    : nsfwContents.map((e) => (
                        <div
                          key={e}
                          className={`col mb-2 p-3 text-start rounded category-box ${subCategory === e ? "bg-light text-dark" : "text-white"}`}
                          onClick={() => onClickSubCategory(e)}
                        >
                          {e}
                        </div>
                      ))}
                </div>
              </div>
              <button
                className={`btn btn-warning btn-sm rounded-top-0 ${activeTab !== "" && subCategory !== "" ? "" : "disabled"}`}
                onClick={() => {
                  setImgLoader(true);
                  setFailedFetch(false);
                  setTimeout(() => {
                    onClickGenerate();
                  }, 2000);
                }}
              >
                Generate
              </button>
            </div>
          </div>
          <div className="col-8">
            <div
              className="position-relative" // TV container is relative
              style={{
                height: "500px",
                borderRadius: "15px",
                backgroundColor: "#6c757d", // bg-secondary
              }}
            >
              {/* Antenna rods */}
              <div
                style={{
                  position: "absolute",
                  top: "-120px", // move it further above the TV card
                  right: "155px",
                  width: "8px",
                  height: "140px", // make it longer
                  backgroundColor: "silver",
                  borderRadius: "2px",
                  transform: "rotate(-20deg)",
                  zIndex: 10,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "-101px",
                  right: "112px",
                  width: "8px",
                  height: "120px", // longer
                  backgroundColor: "silver",
                  borderRadius: "2px",
                  transform: "rotate(20deg)",
                  zIndex: 10,
                }}
              />

              {/* Inner content (TV screen) */}
              <div
                className="p-3 rounded"
                style={{
                  height: "100%", // fills entire container
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <small>{`CATEGORY: ${activeTab} ${subCategory === "" ? "" : "-"} ${subCategory} `}</small>
                <span
                  className={`badge text-bg-danger ms-2 ${failedFetch ? "" : "d-none"}`}
                >
                  Fetching of image Failed, Please try again later.
                </span>

                <div
                  className="mt-3"
                  style={{
                    borderRadius: "15px",
                    overflow: "hidden",
                    backgroundColor: "#212529",
                    height: "400px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {imgLoader ? (
                    <div
                      className="d-flex flex-column justify-content-center align-items-center"
                      style={{ height: "100%" }}
                    >
                      <div
                        className="spinner-border text-primary mb-2"
                        role="status"
                      />
                      <span className="fst-italic text-white">
                        Generating Image ...
                      </span>
                    </div>
                  ) : (
                    <img
                      src={generatedImg}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                        display: "block",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Anime;
