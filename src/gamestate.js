import { modFox, modScene, togglePoopBag, writeModal } from "./ui";
import {
  DAY_LENGTH,
  getDieTime,
  getHungryTime,
  getPoopTime,
  NIGHT_LENGTH,
  RAIN_CHANCE,
  SCENES,
} from "./constants";

const gamestate = {
  state: "INIT",
  clock: 1,
  wakeTime: -1,
  sleepTime: -1,
  poopTime: -1,
  hungryTime: -1,
  dieTime: -1,
  celebrateTime: -1,
  celebrateTimeEnd: -1,
  tick() {
    this.clock++;
    if (this.clock === this.wakeTime) {
      this.wake();
    } else if (this.clock === this.sleepTime) {
      this.sleep();
    } else if (this.clock === this.hungryTime) {
      this.hungry();
    } else if (this.clock === this.dieTime) {
      this.die();
    } else if (this.clock === this.celebrateTime) {
      this.celebrate();
    } else if (this.clock === this.celebrateTimeEnd) {
      this.endCelebrate();
    } else if (this.clock === this.poopTime) {
      this.poop();
    }
    console.log(this.clock);
    return this.clock;
  },
  startGame() {
    this.state = "HATCHING";
    this.wakeTime = this.clock + 3;
    modFox("egg");
    modScene("day");
  },
  clearTimes() {
    this.wakeTime = -1;
    this.sleepTime = -1;
    this.poopTime = -1;
    this.hungryTime = -1;
    this.dieTime = -1;
    this.celebrateTime = -1;
    this.celebrateTimeEnd = -1;
  },
  wake() {
    console.log("Awoke");
    this.state = "IDLING";
    this.scene = Math.random() > RAIN_CHANCE ? 0 : 1;
    modScene(SCENES[this.scene]);
    this.sleepTime = this.clock + DAY_LENGTH;
    this.hungryTime = getHungryTime(this.clock);
    this.wakeTime = -1;
    this.determineFoxState();
    writeModal();
  },
  sleep() {
    console.log("Sleeping");
    this.state = "SLEEPING";
    modFox("sleep");
    this.clearTimes();
    this.wakeTime = this.clock + NIGHT_LENGTH;
    modScene("night");
    this.sleepTime = -1;
  },
  hungry() {
    this.state = "HUNGRY";
    this.dieTime = getDieTime(this.clock);
    modFox("hungry");
    this.hungryTime = -1;
  },
  die() {
    console.log("dead");
    this.state = "DEAD";
    modFox("dead");
    modScene("dead");
    this.clearTimes();
    this.dieTime = -1;
    writeModal("The fox died :( <br> Press the middle button to start");
  },
  celebrate() {
    this.state = "CELEBRATING";
    modFox("celebrate");
    this.celebrateTime = -1;
    this.celebrateTimeEnd = this.clock + 2;
  },
  endCelebrate() {
    this.celebrateTimeEnd = -1;
    this.state = "IDLING";
    this.determineFoxState();
    togglePoopBag(false);
  },
  determineFoxState() {
    if (this.state === "IDLING") {
      if (SCENES[this.scene] === "rain") modFox("rain");
      else modFox("idling");
    }
  },
  changeWeather() {
    this.scene = (1 + this.scene) % SCENES.length;
    modScene(SCENES[this.scene]);
    this.determineFoxState();
    console.log("Change Weather");
  },
  cleanUpPoop() {
    if (this.state !== "POOPING") return;
    this.dieTime = -1;
    togglePoopBag(true);
    this.celebrate();
    this.hungryTime = getHungryTime(this.clock);
    console.log("Clean up poop");
  },
  feed() {
    if (this.state !== "HUNGRY") return;
    this.state = "FEEDING";
    modFox("eating");
    this.celebrateTime = this.clock + 2;
    this.poopTime = getPoopTime(this.clock);
    console.log("Feeding");
    this.dieTime = -1;
  },
  poop() {
    this.state = "POOPING";
    this.poopTime = -1;
    this.dieTime = getDieTime(this.clock);
    modFox("pooping");
  },
  handleUserAction(icon) {
    if (
      ["SLEEPING", "FEEDING", "CELEBRATING", "HATCHING"].includes(this.state)
    ) {
      return;
    }
    if (this.state === "INIT" || this.state === "DEAD") {
      this.startGame();
      console.log(this.state);
      return;
    }
    switch (icon) {
      case "weather":
        this.changeWeather();
        break;
      case "poop":
        this.cleanUpPoop();
        break;
      case "fish":
        this.feed();
        break;
    }
  },
};
export const handleUserAction = gamestate.handleUserAction.bind(gamestate);
export default gamestate;
