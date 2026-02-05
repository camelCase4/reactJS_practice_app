interface CardProps {
  card: any;
  index: number;
  loader: number;
  handleLoad: (index: number) => void;
}

function Card({ card, index, loader, handleLoad }: CardProps) {
  return (
    <div
      style={{
        flex: "0 0 auto", // card only takes needed width
        maxWidth: "250px",
        width: "100%",
        margin: "5px", // 10px gap between cards (5px each side)
      }}
      key={index}
    >
      <div
        className="card h-100"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <img
          src={card.cardImage}
          className="card-img-top"
          alt={card.title}
          style={{ height: "200px", objectFit: "cover", width: "100%" }}
        />
        <div
          className="card-body d-flex flex-column justify-content-between"
          style={{ minHeight: "120px" }}
        >
          <div>
            <h5 className="card-title text-start">{card.title}</h5>
            <p
              className="card-text text-start"
              style={{
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {card.cardText}
            </p>
          </div>
          <div>
            {card.disabledIndex ? (
              <div className="d-flex justify-content-start mt-3">
                <a className="btn btn-custom-success text-white disabled">
                  <small>Enter</small>
                </a>
              </div>
            ) : loader === index ? (
              <div className="d-flex align-items-center gap-2">
                <div className="spinner-border text-primary" role="status" />
                <span className="fst-italic text-muted">
                  <small>Navigating...</small>
                </span>
              </div>
            ) : (
              <div className="d-flex justify-content-start mt-3">
                <button
                  className="btn btn-custom-success text-white"
                  onClick={() => handleLoad(index)}
                >
                  <small>Enter</small>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
