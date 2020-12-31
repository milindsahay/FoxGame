const gamestate = {
    state : "INIT",
    clock : 1,
    tick(){
        this.clock++;
        console.log(this.clock);
        return this.clock
    }
}
export default gamestate;