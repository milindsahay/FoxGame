import game from "./gamestate";
import { TICK_RATE } from "./constants";
import initButtons from "./buttons";

function init() {
  console.log("Starting game....");
  initButtons(game.handleUserAction);
  //Closure, persisted time over async fn call
  let nextTimeToTick = Date.now();
  async function nextAnimationFrame() {
    const now = Date.now();
    if (nextTimeToTick <= now) {
      game.tick();
      nextTimeToTick = now + TICK_RATE;
    }
    requestAnimationFrame(nextAnimationFrame);
  }
  requestAnimationFrame(nextAnimationFrame);
}

init();
