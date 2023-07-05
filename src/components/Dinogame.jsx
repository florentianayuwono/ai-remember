import { dino, moon, cactus } from "../assets";
import React, { useState, useEffect} from 'react';

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
        console.log(playerScore);
    };
    
    const handleKeyPress = (event) => {
        if (!isGameStarted && event.code === "Space") {
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
    
    const handleCollisionCheck = () => {
        const dinoBottom = parseInt(
          getComputedStyle(dinoVar).getPropertyValue("bottom")
        );
        const cactusLeft = parseInt(
          getComputedStyle(cactusVar).getPropertyValue("left")
        );
    
        if (
          isGameStarted &&
          dinoBottom <= 80 &&
          cactusLeft >= 0 &&
          cactusLeft <= 20
        ) {
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
        result = setInterval(handleCollisionCheck, 10);
        if (isGameStarted) {
            interval = setInterval(scoreCounter, 200);
        }
    
        return () => {
          window.removeEventListener("keydown", handleKeyPress);
          clearInterval(interval);
          clearInterval(result);
        };
    }, [isGameStarted]);

  return (
    <div id="dinogame-container" className="dinogame-container">
        <div id="dino" className="dino">
            <img src={dino} alt="dino" className="h-[70px] w-[70px]" />
        </div>
        <div id="cactus" className="cactus">
            <img src={cactus} alt="cactus" className="h-[80px]"/>
        </div>
        <div className="road w-full h-1 green-gradient" />
        <div className="moon">
            <img src={moon} alt="moon" className="h-[80px]"/>
        </div>
        <div id="score" className="score">
            Score <b>00</b>
        </div>
        <div id="game-over" className="game-over">
            Game Over
        </div>
    </div>
  )
}

export default Dinogame