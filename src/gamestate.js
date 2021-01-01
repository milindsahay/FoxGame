const gamestate = {
  state: "INIT",
  clock: 1,
  tick() {
    this.clock++;
    console.log(this.clock);
    return this.clock;
  },
  handleUserAction(icon) {
    console.log(icon);
  },
};
export default gamestate;
