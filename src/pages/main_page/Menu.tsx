import "./Menu.css";
import jokeImg from "./imgs/joke_module.jpg";
import movieImg from "./imgs/movie_module.jpg";
import comingSoonImg from "./imgs/coming_soon.jpg";
import animeImg from "./imgs/anime_module.jpg";
import gameImg from "./imgs/game_module.jpg";
import triviaImg from "./imgs/trivia_module.jpeg";
import jesusImg from "./imgs/jesus_module.jpg";

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
      } else if (index === 3) {
        navigate("/verses");
      } else if (index === 4) {
        navigate("/trivia");
      }
    }, 1000);
  };

  const cardTitle = [
    "Have some laugh, don't be too serious!",
    "Find your favorite Netflix Movies!",
    "Love anime? have a look 😉",
    "Heal your soul with Jesus!",
    "Let us test your IQ! Trivia Time!",
    "Looking for some entertainment leisures?",
    "Coming Soon...",
  ];
  const cardText = [
    "A randomly generated joke to lighten up your day.",
    "A real-time search module to find Netflix movies by title.",
    "A place where anime-lovers dwell.",
    "Your daily dose of verses.",
    "Test your IQ with our trivia game!",
    "A gamer's paradise!",
    "Coming Soon...",
  ];

  const cardImages = [
    jokeImg,
    movieImg,
    animeImg,
    jesusImg,
    triviaImg,
    gameImg,
    comingSoonImg,
  ];

  const cards = cardTitle.map((title, index) => ({
    title: title,
    cardText: cardText[index],
    cardImage: cardImages[index],
    disabledIndex: index >= 5,
  }));

  return (
    <>
      <div className="text-center m-5">
        <PageTitles h3Title="Menu Page!" h6Title="Choose a Module"></PageTitles>
        <div
          className="scroll-container"
          onWheel={(e) => {
            const container = e.currentTarget;
            if (e.deltaY !== 0) {
              container.scrollLeft += e.deltaY; // scroll horizontally
              e.preventDefault(); // prevent vertical scrolling
            }
          }}
        >
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
