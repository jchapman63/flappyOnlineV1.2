import TubePair from "./TubePair.js";
import Birdy from "./Birdy.js";
import Score from "./Score.js";
import Queue from "../functionality/Queue.js";
// import { Howl } from "howler";

class GameAni {
  constructor() {
    this.scrollingVar = "--tube-start-x";
    // tube scroll rate
    this.scrollRate = -1 * 0.5;

    this.fallRate = -1 * 0.6;

    // initial tubes
    this.tubes = [];

    // count game flaps
    this.flaps = 0;

    // queue of tubes for scoring (may update game to only use queue for all tube logic)
    this.tubesQueue = new Queue();

    // elem where ani occurs must exist
    this.aniWindow = document.getElementById("ani-window");

    // scrolling property of tube
    this.scrollingVar = "--tube-start-x";

    // define birdy
    this.birdy = new Birdy(this.aniWindow);

    // define score
    this.score = new Score(this.aniWindow);

    // define height var
    this.heightVar = "--y";

    // initialize animation request
    this.reqAni;

    // initialize frames
    this.frames = 0;

    this.eventListeners();

    this.gameOver = false;

    this.deathSound = new Audio(death_sound);
  }

  reset() {
    // set scroll rate
    this.scrollRate = -1 * 0.5;

    // set fall rate
    this.fallRate = -1 * 0.6;

    // empty tubes
    this.tubes.map((tubePair) => {
      tubePair.removeTubes();
    });
    this.tubes = [];

    // new queue
    this.tubesQueue = new Queue();

    // new birdy
    this.birdy.removeBirdy();
    this.birdy = new Birdy(this.aniWindow);

    // new score
    this.score.reset();
    this.score = new Score(this.aniWindow);

    // reset frames
    this.frames = 0;

    this.gameOver = false;

    this.eventListeners();

    this.deathSound = new Audio(death_sound);
  }

  newGame() {
    this.reset();
    this.gameLoop();
  }

  gameLoop() {
    let loop = () => {
      this.frames += 1;

      if (this.reqAni) {
        window.cancelAnimationFrame(this.reqAni);
      }

      // new tubes
      this.newTubes();

      // scroll tubes
      this.scrollTubes();

      // clean up tubes
      this.cleanTubes();

      // birdy falling
      this.birdy.decreaseHeight(this.fallRate, this.heightVar);

      // check birdy score
      this.didBirdyScore();

      // check birdy collision
      var didDie = this.birdyHit();

      if (didDie) {
        var deathAniDone = this._birdyDeath();
        this.scrollRate = 0;
        this.fallRate = -1 * 1.2;
        if (deathAniDone) {
          document.body.onclick = null;
          this.showGameOver();
        }
      }

      deathAniDone
        ? window.cancelAnimationFrame(this.reqAni)
        : (this.reqAni = window.requestAnimationFrame(loop));
      return;
    };
    this.reqAni = window.requestAnimationFrame(loop);
    // return;
  }

  eventListeners() {
    // flap dat birdy
    const flapEvent = (e) => {
      if (e.key === " " || e.code === "Space" || e.key === 32) {
        e.preventDefault();
        this.birdy.increaseHeight(this.heightVar);
        this.flaps++;
      }
    };
    document.body.onkeydown = flapEvent;
    window.onkeydown = null;

    // for mobile
    const flapEventClick = (e) => {
      e.preventDefault();
      this.birdy.increaseHeight(this.heightVar);
      this.flaps++;
    };
    document.body.onclick = flapEventClick;
  }

  newTubes() {
    if (window.screen.availWidth < 625) {
      if (this.frames % 125 === 0) {
        var newTube = new TubePair(this.aniWindow, this.scrollingVar);
        this.tubes.push(newTube);
        this.tubesQueue.enqueue(newTube);
      }
    } else {
      if (this.frames % 90 === 0) {
        var newTube = new TubePair(this.aniWindow, this.scrollingVar);
        this.tubes.push(newTube);
        this.tubesQueue.enqueue(newTube);
      }
    }
  }

  scrollTubes() {
    // scroll them tubes
    for (var i = 0; i < this.tubes.length; i++) {
      this.tubes[i].scrollTubePair(this.scrollRate);
    }
  }

  cleanTubes() {
    if (this.tubes.length > 5) {
      for (var j = 0; j < 2; j++) {
        this.tubes[j].removeTubes();
      }
      this.tubes.splice(0, 2);
    }
  }

  didBirdyScore() {
    // check if birdy scored
    if (this.tubesQueue.length > 0) {
      var didUpdate = this.score.updateScore(
        this.birdy.getRects(),
        this.tubesQueue.peek().getRects()
      );
      if (didUpdate == true) {
        this.tubesQueue.dequeue();
        var scoreSound = new Audio(score_sound);
        scoreSound.play();
      }
    }
  }

  _birdyDeath() {
    // make birdy fall on collision
    var birdyRect = this.birdy.getRects();
    this.birdy.deathAngle();
    if (birdyRect.y >= this.aniWindow.getBoundingClientRect().height + 100) {
      return true;
    }
    return false;
  }

  birdyHit() {
    // check if birdy hit tubes
    var tubeHit = false;
    if (this.tubes.length > 0) {
      this.tubes.map((tubePair) => {
        var tubeRects = tubePair.getRects();
        if (this.birdy.didDie(tubeRects)) {
          this.gameOver = true;
          document.body.onkeydown = null;
          tubeHit = true;
        }
      });
    }

    if (tubeHit === true) {
      if (this.deathSound.played.length > 1) {
        this.deathSound.pause();
      } else {
        this.deathSound.play();
      }

      return true;
    }

    return false;
  }

  submitGame() {
    // grab form
    var form = document.getElementById("end-game-form");

    // grab form inputs
    var scoreElem = document.getElementById("score-input");
    var flapsElem = document.getElementById("flaps-input");

    // set values
    scoreElem.setAttribute("value", this.score.get());
    flapsElem.setAttribute("value", this.flaps);
    // submit form
    form.submit();
  }

  showGameOver() {
    var activeUser = window.localStorage.getItem("user-active");
    if (JSON.parse(activeUser) !== false) {
      this.submitGame();
    }

    this.score.gameOverScore("game-over", "score-elem");
    document.getElementById("reset").addEventListener("click", (e) => {
      e.preventDefault();

      this.score.hideCard("game-over");
      this.newGame();
    });
    window.onkeydown = function (event) {
      if (event.keyCode === 32) {
        event.preventDefault();
        document.getElementById("reset").click();
      }
    };
  }

  gameOverState() {
    return this.gameOver;
  }
}

export default GameAni;

var animate = new GameAni();
animate.gameLoop();
