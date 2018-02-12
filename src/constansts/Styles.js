import {APP_PRIMARY_COLOR} from "./AppDetail";
import MainPageBackground from "../images/mainPageBackGround.jpg"

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

export const divMainPageBackground = {
    backgroundImage: "url("+MainPageBackground+")",
    backgroundSize: "cover",
    height: window.innerHeight,
    width: window.innerWidth,
    margin: "0",
    display: "grid",
    gridTemplateColumns:"37% 30% 33%",
    gridTemplateRows: "70% 20% 10%"
};

export const mainPageButton = {
    gridColumn: "2 / 3",
    gridRow: "2 / 3",
};