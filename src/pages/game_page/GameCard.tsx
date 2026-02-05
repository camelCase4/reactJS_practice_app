interface GameCardProps {
  title: string;
  thumbnail: string;
  short_description: string;
  game_url: string;
  genre: string;
  platform: string;
  developer: string;
  publisher: string;
  release_date: string;
  freetogame_profile_url: string;
}

function GameCard({
  title,
  thumbnail,
  short_description,
  game_url,
  genre,
  platform,
  developer,
  publisher,
  release_date,
  freetogame_profile_url,
}: GameCardProps) {
  return (
    <>
      <div
        className="card text-white" // text-white helps contrast on dark gradients
        style={{
          width: "400px",
          height: "500px",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(90deg, #212529 95%, #6c757d 100%)", // <-- gradient here
          border: "none", // optional: remove border for clean gradient
        }}
      >
        <img
          className="card-img-top mt-4"
          src={thumbnail}
          alt="Card image"
          style={{ height: "200px", objectFit: "cover" }}
        />
        <div
          className="card-body"
          style={{ flex: 1, display: "flex", flexDirection: "column" }}
        >
          <h4 className="card-title">{title}</h4>
          <p className="card-text" style={{ flex: 1 }}>
            {short_description}
          </p>
          <a href={game_url} className="btn btn-primary mt-auto">
            Visit Site
          </a>
        </div>
      </div>
    </>
  );
}

export default GameCard;
