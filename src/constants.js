export const TICK_RATE = 1000;
export const ICONS = ["fish", "poop", "weather"];
export const RAIN_CHANCE = 0.5;
export const SCENES = ["day", "rain"];
export const DAY_LENGTH = 40;
export const NIGHT_LENGTH = 3;
export const getHungryTime = (clock) =>
  clock + Math.floor(Math.random() * 3) + 5;
export const getDieTime = (clock) => clock + Math.floor(Math.random() * 3) + 8;
export const getPoopTime = (clock) => clock + Math.floor(Math.random() * 3) + 5;
