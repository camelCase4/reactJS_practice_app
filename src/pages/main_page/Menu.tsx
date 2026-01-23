import "./Menu.css";
import jokeImg from "./imgs/joke_module.jpg";
import movieImg from "./imgs/movie_module.jpg";
import comingSoonImg from "./imgs/coming_soon.jpg";
import animeImg from "./imgs/anime_module.jpg";

import { useState } from "react";
import Card from "./Card";
import PageTitles from "./PageTitles";
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();
  const [loader, showLoader] = useState(-1);

  const handleLoad = (index: number) => {
    showLoader(index);

    setTimeout(() => {
      if (index === 0) {
        navigate("/jokes");
      } else if (index === 1) {
        navigate("/movies");
      } else if (index === 2) {
        navigate("/anime");
      }
    }, 1000);
  };

  const cardTitle = [
    "Have some laugh, don't be too serious!",
    "Find your favorite Netflix Movies!",
    "Love anime? have a look ;)",
    "Coming Soon...",
  ];
  const cardText = [
    "A randomly generated joke to lighten up your day.",
    "A real-time search module to find Netflix movies by title.",
    "A place where anime-lovers dwell.",
    "Coming Soon...",
  ];

  const cardImages = [jokeImg, movieImg, animeImg, comingSoonImg];

  const cards = cardTitle.map((title, index) => ({
    title: title,
    cardText: cardText[index],
    cardImage: cardImages[index],
    disabledIndex: index === 3,
  }));

  return (
    <>
      <div className="text-center m-5">
        <PageTitles h3Title="Menu Page!" h6Title="Choose a Module"></PageTitles>
        <div className="row mt-5">
          {cards.map((card, index) => (
            <Card
              card={card}
              index={index}
              loader={loader}
              handleLoad={handleLoad}
            ></Card>
          ))}
        </div>
      </div>
    </>
  );
}

export default Menu;
