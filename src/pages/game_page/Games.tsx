import { useEffect, useState } from "react";
import PageTitles from "../main_page/PageTitles";
import GameCard from "./GameCard";
import GameComponent from "./GameComponent";

function Games() {
  const [gameList, setGameList] = useState<GameComponent[]>([]);
  const [chosenCategory, setChosenCategory] = useState("all");
  const API_BASE_URL = "https://www.freetogame.com/api/games";

  const fetchGames = async (chosenCategory2: string) => {
    try {
      const response = await fetch(
        `http://localhost:3001/api/games?platform=${chosenCategory2}`,
      );
      if (!response.ok) throw new Error("Failed to fetch games");
      const data = await response.json();
      setGameList(data); // set state
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchGames("all");
  }, []);

  const handlCategoryChnge = (categ: string) => {
    fetchGames(categ);
    setChosenCategory(categ);
  };

  return (
    <>
      <div className="my-5 mx-4">
        <PageTitles h3Title="Game Hub!" h6Title="Explore the world of games!" />

        {/* Pills row */}
        <div className="d-flex justify-content-start gap-2 mt-4 flex-wrap mb-4">
          <span
            className={`badge text-bg-${chosenCategory === "pc" ? "info" : "light"}`}
            onClick={() => handlCategoryChnge("pc")}
            style={{ cursor: "pointer" }}
          >
            PC
          </span>
          <span
            className={`badge text-bg-${chosenCategory === "browser" ? "info" : "light"} ms-2`}
            onClick={() => handlCategoryChnge("browser")}
            style={{ cursor: "pointer" }}
          >
            BROWSER
          </span>
          <span
            className={`badge text-bg-${chosenCategory === "all" ? "info" : "light"} ms-2`}
            onClick={() => handlCategoryChnge("all")}
            style={{ cursor: "pointer" }}
          >
            ALL
          </span>
        </div>
        <div className="row gap-2 justify-content-start mx-1">
          {gameList.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              thumbnail={game.thumbnail}
              short_description={game.short_description}
              game_url={game.game_url}
              genre={game.genre}
              platform={game.platform}
              developer={game.developer}
              publisher={game.publisher}
              release_date={game.release_date}
              freetogame_profile_url={game.freetogame_profile_url}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Games;
