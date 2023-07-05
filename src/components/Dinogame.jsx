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
    </div>
  )
}

export default Dinogame