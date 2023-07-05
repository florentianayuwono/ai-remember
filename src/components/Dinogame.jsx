import { dino, moon, cactus } from "../assets";

const Dinogame = () => {
  return (
    <div className="dinogame-container">
        <div className="dino">
            <img src={dino} alt="dino" className="h-[70px] w-[70px]" />
        </div>
        <div className="cactus">
            <img src={cactus} alt="cactus" className="h-[80px]"/>
        </div>
        <div className="road w-full h-1 green-gradient" />
        <div className="moon">
            <img src={moon} alt="moon" className="h-[80px]"/>
        </div>
        <div className="score">
            Score <b>00</b>
        </div>
        <div className="game-over">
            Game Over
        </div>
    </div>
  )
}

export default Dinogame