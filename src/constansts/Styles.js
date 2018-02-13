import {APP_PRIMARY_COLOR} from "./AppDetail";
import MainPageBackground from "../images/mainPageBackground.jpg"
import MapPageBackground from "../images/map1.jpg"
import GamePageBackground from "../images/gamePageBackground.jpg"

export const flatButtonLabelStyle = {
    color: 'white',
    fontSize: '20px'
};

export const openGameFlatButtonLabelStyle = {
    color: 'white',
    fontSize: '20px',
};
export const flatButtonDivStyle = {
    padding: '5px'
};
export const buttonThemeColorStyle = {
    backgroundColor: APP_PRIMARY_COLOR,
};
export const mainDiv = {
    height: window.innerHeight,
    width: window.innerWidth,
};

export const divMainPage = {
    // backgroundImage: "url(" + MainPageBackground + ")",
    backgroundSize: "cover",
    height: window.innerHeight,
    width: window.innerWidth,
    margin: "0",
    display: "grid",
    gridTemplateColumns: "37% 30% 33%",
    gridTemplateRows: "70% 20% 10%"
};

export function divMainPageBlurBackground(blur) {
    return {
        backgroundImage: "url(" + MainPageBackground + ")",
        backgroundSize: "cover",
        position: "absolute",
        filter: "blur(" + blur + "px)",
        height: window.innerHeight,
        width: window.innerWidth,
        margin: "0",
        zIndex: -1,
    }
}

export const mainPageButton = {
    gridColumn: "2 / 3",
    gridRow: "2 / 3",
};

// export const divGamePageBlurBackground = {
//         backgroundImage: "url(" + GamePageBackground + ")",
//         backgroundSize: "cover",
//         position: "absolute",
//         filter: "blur(100px)",
//         height: window.innerHeight,
//         width: window.innerWidth,
//         margin: "0",
//         zIndex: -1,
// };

export const divGamePage = {
    // backgroundImage: "url(" + GamePageBackground + ")",
    backgroundSize: "cover",
    height: window.innerHeight,
    width: window.innerWidth,
    margin: "0",
    // display: "grid",
    // gridTemplateColumns: "37% 30% 33%",
    // gridTemplateRows: "70% 20% 10%"
};

export const gameMapDiv = {
    backgroundImage: "url(" + MapPageBackground + ")",
    height: window.innerHeight * 0.7,
    width: window.innerWidth * 0.8,
    backgroundSize: "cover",
    position: "relative",
    margin: "0",
    display: "inline-block"
};

export const gameDetailDiv = {
    height: window.innerHeight * 0.7,
    width: window.innerWidth * 0.2,
    backgroundSize: "cover",
    position: "relative",
    margin: "0",
    display: "inline-block",
};

export const diceDiv = {
    position: "relative",
    display: "block",
    textAlign: "center",
};