import { useEffect } from "react";
import Vara from "vara";

function VaraText({ text }) {
    useEffect(() => {
      var vara = new Vara(
        "#vara-container",
        "https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Satisfy/SatisfySL.json",
        [
          {
            text: text,
            fontSize: 24,
            strokeWidth: 0.7,
          },
        ]
      );
    }, []);
  
    return <div id="vara-container"></div>;
  }

  export default VaraText;