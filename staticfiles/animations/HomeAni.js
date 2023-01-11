import TubePair from "./TubePair.js";
import Queue from "../functionality/Queue.js";

class HomeAni {
  constructor() {
    this.scrollingVar = "--tube-start-x";
  }

  gameLoop() {
    let scrollRate = -1 * 0.5;
    let frames = 0;
    let tubes = [];
    // let tubeQueue = new Queue();
    // elem where ani occurs must exist
    let aniWindow = document.getElementById("ani-window");
    let scrollingVar = "--tube-start-x";
    function loop() {
      frames += 1;

      // new tubes
      if (frames % 90 === 0) {
        tubes.push(new TubePair(aniWindow, scrollingVar));
        // tubeQueue.enqueue(new TubePair(aniWindow, scrollingVar));
      }

      // // scroll them tubes
      for (var i = 0; i < tubes.length; i++) {
        tubes[i].scrollTubePair(scrollRate);
      }
      // let popped = [];
      // for (var i = 0; i < tubeQueue.length; i++) {
      //   var currentScrollee = tubeQueue.dequeue();
      //   currentScrollee.scrollTubePair(scrollRate);
      //   popped.push(currentScrollee);
      // }
      // console.log(tubeQueue.index(0));

      // clean up tubes
      if (tubes.length > 5) {
        for (var j = 0; j < 2; j++) {
          tubes[j].removeTubes();
        }
        tubes.splice(0, 2);
      }

      // if (tubeQueue.length > 5) {
      //   var removed = tubeQueue.dequeue();
      //   removed.removeTubes();
      // }
      window.requestAnimationFrame(loop);
    }
    window.requestAnimationFrame(loop);
  }
}

export default HomeAni;

var animate = new HomeAni();
animate.gameLoop();
