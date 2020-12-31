import game from './gamestate'
const TICK_RATE = 3000;

function init() {
  //Closure, persisted time over async fn call
  let nextTimeToTick = Date.now();
  async function nextAnimationFrame() {
    const now = Date.now()
    if (nextTimeToTick <= now) {
      game.tick();
      nextTimeToTick = now + TICK_RATE;
    }
    requestAnimationFrame(nextAnimationFrame);
  }
  requestAnimationFrame(nextAnimationFrame);
}

init();
