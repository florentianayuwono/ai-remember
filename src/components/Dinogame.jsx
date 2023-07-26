import { dino, moon, cactus } from "../assets";
import { useState, useEffect } from "react";
import { SectionWrapper } from "../hoc";

const Dinogame = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);

  let dinoVar = null;
  let cactusVar = null;
  let scoreVar = null;
  let gameOverVar = null;
  let interval = null;
  let result = null;
  let playerScore = 0;

  const setupElements = () => {
    dinoVar = document.getElementById("dino");
    cactusVar = document.getElementById("cactus");
    scoreVar = document.getElementById("score");
    gameOverVar = document.getElementById("game-over");
  };

  const scoreCounter = () => {
    playerScore++;
    scoreVar.innerHTML = `Score <b>${playerScore}</b>`;
  };

  const handleKeyPress = (event) => {
    if (!isGameStarted) {
      startGame();
    } else if (event.key === "ArrowUp") {
      if (!dinoVar.classList.contains("dino-active")) {
        dinoVar.classList.add("dino-active");
        setTimeout(() => {
          dinoVar.classList.remove("dino-active");
        }, 500);
      }
    }
  };

  const handleTap = (event) => {
    if (!isGameStarted) {
      startGame();
    } else {
      if (!dinoVar.classList.contains("dino-active")) {
        dinoVar.classList.add("dino-active");
        setTimeout(() => {
          dinoVar.classList.remove("dino-active");
        }, 500);
      }
    }
  };

  const handleCollisionCheck = () => {
    const dinoBottom = parseInt(
      getComputedStyle(dinoVar).getPropertyValue("bottom")
    );

    const dinoLeft = parseInt(
      getComputedStyle(dinoVar).getPropertyValue("left")
    );

    const cactusLeft = parseInt(
      getComputedStyle(cactusVar).getPropertyValue("left")
    );

    if (
      isGameStarted &&
      dinoBottom <= 80 &&
      cactusLeft >= dinoLeft - 10 &&
      cactusLeft <= dinoLeft + 10
    ) {
      console.log("dino: " + dinoLeft);
      console.log("cactus: " + cactusLeft);
      endGame();
    }
  };

  const startGame = () => {
    setIsGameStarted(true);
    gameOverVar.style.display = "none";
    cactusVar.classList.add("cactus-active");
    playerScore = 0;
  };

  const endGame = () => {
    setIsGameStarted(false);
    gameOverVar.style.display = "block";
    cactusVar.classList.remove("cactus-active");
    clearInterval(interval);
    clearInterval(result);
    playerScore = 0;
  };

  useEffect(() => {
    setupElements();
    window.addEventListener("keydown", handleKeyPress);
    window.addEventListener("touchstart", handleTap);
    result = setInterval(handleCollisionCheck, 10);
    if (isGameStarted) {
      interval = setInterval(scoreCounter, 200);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      window.removeEventListener("touchstart", handleTap);
      clearInterval(interval);
      clearInterval(result);
    };
  }, [isGameStarted]);

  return (
    <div className="flex flex-col justify-center items-start mt-5">
      <div id="dinogame-container" className="dinogame-container">
        <div id="dino" className="dino">
          <img src={dino} alt="dino" className="h-[70px] w-[70px]" />
        </div>
        <div id="cactus" className="cactus">
          <img src={cactus} alt="cactus" className="h-[80px]" />
        </div>
        <div className="road w-full h-1 pink-gradient" />
        <div className="moon">
          <img src={moon} alt="moon" className="h-[80px]" />
        </div>
        <div id="score" className="score">
          Score <b>00</b>
        </div>
        <div id="game-over" className="game-over">
          Game Over
        </div>
      </div>
    </div>
  );
};

export default SectionWrapper(Dinogame, "dinogame");
