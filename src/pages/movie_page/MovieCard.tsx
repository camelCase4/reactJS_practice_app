import { useEffect, useState } from "react";
import "./Movie.css";

interface MovieCardProps {
  movieTitle: string;
  movieDescription: string;
  movieScore: number;
  movieImg: string;
  movieID: number;
  handleBtnDelete: (id: number, btnType: number) => void;
}

function MovieCard({
  movieTitle,
  movieDescription,
  movieScore,
  movieImg,
  movieID,
  handleBtnDelete,
}: MovieCardProps) {
  const [deleteWatermark, setDeleteWatermark] = useState(false);

  return (
    <>
      <div className="col-md-3" onDoubleClick={() => {}}>
        <div className="card mb-4 watermark-card" style={{ height: "630px" }}>
          {deleteWatermark && <div className="watermark">TO BE DELETED</div>}
          <img
            src={movieImg}
            className="card-img-top"
            alt="..."
            style={{
              height: "300px",
              objectFit: "fill",
              width: "100%",
            }}
          />
          <div className="card-body d-flex flex-column justify-content-center ">
            <h5 className="card-title">{movieTitle}</h5>
            <p className="card-text">{movieDescription}</p>
          </div>
          <div className="d-flex justify-content-center align-items-center mt-auto p-2">
            <button
              className={`btn btn-danger btn-sm me-3 ${deleteWatermark ? "d-none" : ""}`}
              onClick={() => {
                setDeleteWatermark(true);
                handleBtnDelete(movieID, 1);
              }}
            >
              Delete
            </button>
            <button
              className={`btn btn-success btn-sm me-3 ${deleteWatermark ? "" : "d-none"}`}
              onClick={() => {
                setDeleteWatermark(false);
                handleBtnDelete(movieID, 2);
              }}
            >
              Restore
            </button>
            <p className="mb-0">⭐ {movieScore} - EN - MOVIE</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieCard;
