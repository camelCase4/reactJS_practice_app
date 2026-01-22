interface CardProps {
  card: any;
  index: number;
  loader: number;
  handleLoad: (index: number) => void;
}

function Card({ card, index, loader, handleLoad }: CardProps) {
  return (
    <>
      <div className="col-md-4 mb-4" key={index}>
        <div className="card">
          <img
            src={card.cardImage}
            className="card-img-top"
            alt={card.title}
            style={{
              height: "400px",
              maxHeight: "400px",
              objectFit: "fill",
              width: "100%",
            }}
          />

          <div className="card-body text-start">
            <h5 className="card-title">{card.title}</h5>
            <p className="card-text">{card.cardText}</p>
            {card.disabledIndex ? (
              <a className="btn btn-primary disabled">Go Inside</a>
            ) : loader === index ? (
              <div className="d-flex align-items-center gap-2">
                <div className="spinner-border text-primary" role="status" />
                <span className="fst-italic text-muted">Navigating...</span>
              </div>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => handleLoad(index)}
              >
                Go Inside
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Card;
