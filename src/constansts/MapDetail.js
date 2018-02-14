let gameMap = new Map();
let snakeMap = new Map();
let ladderMap = new Map();

const posStart = {x: 570, y: 698};
const pos1 = {x: 430, y: 736};
const pos2 = {x: 350, y: 755};
const pos3 = {x: 268, y: 751};
const pos4 = {x: 159, y: 707};
const pos5 = {x: 176, y: 625};
const pos6 = {x: 253, y: 581};
const pos7 = {x: 350, y: 568};
const pos8 = {x: 438, y: 568};
const pos9 = {x: 528, y: 579};
const pos10 = {x: 621, y: 595};
const pos11 = {x: 705, y: 608};
const pos12 = {x: 797, y: 612};
const pos13 = {x: 887, y: 623};
const pos14 = {x: 961, y: 623};
const pos15 = {x: 1047, y: 608};
const pos16 = {x: 1141, y: 577};
const pos17 = {x: 1177, y: 501};
const pos18 = {x: 1145, y: 430};
const pos19 = {x: 1076, y: 392};
const pos20 = {x: 998, y: 367};
const pos21 = {x: 896, y: 360};
const pos22 = {x: 809, y: 352};
const pos23 = {x: 719, y: 365};
const pos24 = {x: 642, y: 373};
const pos25 = {x: 558, y: 369};
const pos26 = {x: 486, y: 333};
const pos27 = {x: 398, y: 300};
const pos28 = {x: 312, y: 323};
const pos29 = {x: 247, y: 279};
const pos30 = {x: 300, y: 211};
const pos31 = {x: 394, y: 209};
const pos32 = {x: 495, y: 207};
const pos33 = {x: 579, y: 222};
const pos34 = {x: 654, y: 237};
const pos35 = {x: 744, y: 253};
const pos36 = {x: 826, y: 262};
const pos37 = {x: 912, y: 270};
const pos38 = {x: 990, y: 264};
const pos39 = {x: 1053, y: 239};
const pos40 = {x: 1095, y: 174};
const pos41 = {x: 1082, y: 111};
const pos42 = {x: 1034, y: 60};
const pos43 = {x: 952, y: 35};
const pos44 = {x: 849, y: 35};
const pos45 = {x: 751, y: 35};
const pos46 = {x: 625, y: 48};
const pos47 = {x: 532, y: 56};
const pos48 = {x: 436, y: 56};
const pos49 = {x: 344, y: 62};
const pos50 = {x: 256, y: 83};
const posFinish = {x: 138, y: 90};
const mapPositions = [
    posStart,
    pos1, pos2, pos3, pos4, pos5, pos6, pos7, pos8, pos9, pos10,
    pos11, pos12, pos13, pos14, pos15, pos16, pos17, pos18, pos19, pos20,
    pos21, pos22, pos23, pos24, pos25, pos26, pos27, pos28, pos29, pos30,
    pos31, pos32, pos33, pos34, pos35, pos36, pos37, pos38, pos39, pos40,
    pos41, pos42, pos43, pos44, pos45, pos46, pos47, pos48, pos49, pos50,
    posFinish
];

snakeMap.set(29, 5);
snakeMap.set(21, 13);
snakeMap.set(41, 11);
snakeMap.set(47, 34);

ladderMap.set(10, 24);
ladderMap.set(19, 39);
ladderMap.set(35, 45);

for (let i = 0; i < mapPositions.length; i++) {
    gameMap.set(i, mapPositions[i]);
}

export let mapDetail = {
    snakeMap,
    ladderMap,
    gameMap,
};