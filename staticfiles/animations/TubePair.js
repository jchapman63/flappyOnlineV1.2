const tube = tube_img;
class TubePair {
  constructor(gameWindow, varScrollX) {
    // param::gameWindow: The viewport of the game
    // param::varScrollX: a CSS variable determining the X position of the pair

    // game window
    this.gameWindow = gameWindow;
    this.scrollingProperty = varScrollX;

    // height of game window
    this.height = gameWindow.offsetHeight;

    // initialize tube vars
    this.tubeStartX = -15;
    this.topHeight;
    this.bottomHeight;

    // determine tube heights
    this._normalizeTubeHeights();

    // initialize tubes
    this.topTube;
    this.bottomTube;

    // create tubes
    this._generateTubes();

    // available for returning both tubes together
    this.tubes = [this.topTube, this.bottomTube];
  }

  _generateTubes() {
    // create tube elements
    this.topTube = document.createElement("img");
    this.bottomTube = document.createElement("img");

    // add image
    this.topTube.src = tube;
    this.bottomTube.src = tube;

    // add styling
    this.topTube.classList.add("tube");
    this.topTube.classList.add("tube-top");

    this.bottomTube.classList.add("tube");
    this.bottomTube.classList.add("tube-bottom");

    // home page specific style
    this.topTube.classList.add("tube-home");
    this.bottomTube.classList.add("tube-home");

    // set tube heights
    this.topTube.style.setProperty("--tube-length", this.topHeight);
    this.bottomTube.style.setProperty("--tube-length", this.bottomHeight);

    // set scrollability and initial location
    this.topTube.style.setProperty(this.scrollingProperty, this.tubeStartX);
    this.bottomTube.style.setProperty(this.scrollingProperty, this.tubeStartX);

    // adjust widths
    this.topTube.style.width = this.topHeight * 0.8;
    this.bottomTube.style.width = this.bottomHeight * 0.8;

    // add tubes to the game window
    this.gameWindow.appendChild(this.topTube);
    this.gameWindow.appendChild(this.bottomTube);
  }

  _normalizeTubeHeights() {
    // a standard gap of 100px
    if (window.screen.availWidth < 625) {
      var tubeGap = 200;
    } else {
      var tubeGap = 300;
    }

    // some height in pixels from 25px to 90% of the gameWindow height
    this.bottomHeight = Math.random() * this.height * 0.4 + 100;

    // top height with a consistent gap
    this.topHeight = this.height - (this.bottomHeight + tubeGap);
  }

  scrollTubePair(rate) {
    // change X pos by rate
    this.tubeStartX -= rate;

    // set new x pos
    this.topTube.style.setProperty(this.scrollingProperty, this.tubeStartX);
    this.bottomTube.style.setProperty(this.scrollingProperty, this.tubeStartX);
  }

  getTubes() {
    return this.tubes;
  }

  getPairX() {
    return this.tubeStartX;
  }

  removeTubes() {
    for (var i = 0; i < 2; i++) {
      this.gameWindow.removeChild(this.tubes[i]);
      this.tubes[i].remove();
    }
  }

  getRects() {
    var tubeRectsArray = [];
    for (var i = 0; i < 2; i++) {
      tubeRectsArray.push(this.tubes[i].getBoundingClientRect());
    }
    return tubeRectsArray;
  }
}

export default TubePair;

// lets try messing with tube height/length instead of position
