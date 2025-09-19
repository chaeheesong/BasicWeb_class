let startingPokerChips = 100;
let players = 3;
let no0fStarterCards = 2;

let playerOnePoints = startingPokerChips;
let playerTwoPoints = startingPokerChips;
let playerThreePoints = startingPokerChips;

playerOnePoints -= 50;
playerTwoPoints -= 25;
playerThreePoints += 75;

console.log(playerOnePoints, playerTwoPoints, playerThreePoints);

const STARTING_POKER_CHIPS = 100; // points
const PLAYERS = 3;
const NO_OF_STARTER_CARDS = 2;
/* 3개의 플레이어 시작 점수 할당 */
let playerOnePoints1 = STARTING_POKER_CHIPS;
let playerTwoPoints1 = STARTING_POKER_CHIPS;
let playerThreePoints1 = STARTING_POKER_CHIPS;
/* 점수 배팅 */
playerOnePoints -= 50;
playerTwoPoints -= 25;
playerThreePoints += 75;

console.log(playerOnePoints1, playerTwoPoints1, playerThreePoints1);

let myString1 = "Hello";
let myString2 = "World";
console.log(`${myString1} ${myString2}!`); //Hello World!
console.log(`${myString1}, ${myString2}!`); //Hello, World!

let age1 = 0;
let age2 = `0`;
console.log(age1 == age2);
console.log(age1 === age2);