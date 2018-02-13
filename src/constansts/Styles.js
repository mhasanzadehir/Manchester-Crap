import {APP_PRIMARY_COLOR} from "./AppDetail";
import MainPageBackground from "../images/mainPageBackGround.jpg"
import MapPageBackground from "../images/map1.jpg"

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
export const gameMapDiv = {
    backgroundImage: "url(" + MapPageBackground + ")",
    height: window.innerHeight * 0.7,
    width: window.innerWidth * 0.8,
    backgroundSize: "cover",
    margin: "0",
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
        filter: "blur("+blur+"px)",
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