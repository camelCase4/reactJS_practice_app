import { useNavigate } from "react-router-dom";

interface JokeLineProps {
  text?: string;
  generateStatus: boolean;
  showJokeLoader: boolean;
  generateButtonClick: () => void;
  categoryChosen: string;
}

function JokeLine({
  text,
  generateStatus,
  showJokeLoader,
  generateButtonClick,
  categoryChosen,
}: JokeLineProps) {
  const navigate = useNavigate();

  const handleLeaveBtn = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="d-flex justify-content-start align-items-center mb-2">
        <button className="btn btn-danger btn-sm me-2" onClick={handleLeaveBtn}>
          Leave
        </button>
        <p className="my-0 fs-6">
          <small>Category : {categoryChosen}</small>
        </p>
      </div>

      <div className="bg-success rounded p-5">
        {showJokeLoader ? (
          <div className="align-items-center">
            <div className="spinner-border text-primary me-3" role="status" />
            <span className="fst-italic text-white">Generating Joke ...</span>
          </div>
        ) : (
          <p className="fst-italic fw-bold fs-5">{text}</p>
        )}
      </div>
      <button
        className={`btn btn-primary w-100 fw-bold ${
          generateStatus ? "" : "disabled"
        }`}
        onClick={generateButtonClick}
      >
        GENERATE
      </button>
    </>
  );
}

export default JokeLine;
