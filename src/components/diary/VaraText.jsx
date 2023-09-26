import Vara from "vara";
import { useEffect } from "react";

const VaraText = ({ text, color, size }) => {

  useEffect(() => {
    let vara = null;

    // Function to initialize Vara
    const initializeVara = () => {
      vara = new Vara(
        "#vara-container",
        "https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json",
        [
          {
            text: text,
            fontSize: size,
            strokeWidth: 1,
            color: color,
          },
        ]
      );
    };

    // Function to clear the Vara container
    const clearVaraContainer = () => {
      const container = document.getElementById("vara-container");
      if (container) {
        container.innerHTML = "";
      }
    };

    initializeVara();
    // Clear the Vara container when the text prop changes or when the component unmounts
    return () => {
      clearVaraContainer();
    };
  }, [color, size, text]);

  return <div id="vara-container" className={`z-[20]`}></div>;
};

export default VaraText;