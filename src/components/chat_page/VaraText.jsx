import { useEffect } from "react";
import Vara from "vara";

function VaraText({ text }) {
    useEffect(() => {
      var vara = new Vara(
        "#vara-container",
        "https://raw.githubusercontent.com/akzhy/Vara/master/fonts/Shadows-Into-Light/shadows-into-light.json",
        [
          {
            text: text,
            fontSize: 14,
            strokeWidth: 3,
            color: '#6C584C'
          },
        ]
      );
    }, []);
  
    return <div id="vara-container"></div>;
  }

  export default VaraText;