const birdyImg = birdy_img;
const birdyDownImg = birdy_down_img;
class Birdy {
  constructor(aniWindow) {
    // param::aniWindow: The window animations are occuring in
    // this.birdy = birdy;
    // this.refBirdy = document.getElementById("birdy");

    this.birdy = document.createElement("img");
    this.birdy.classList.add("birdy");
    // if (window.localStorage.getItem("login-status") === true) {
    //   this.birdy.src = window.localStorage.getItem("user-birdy-img");
    // } else {
    //   this.birdy.src = birdyImg;
    // }
    this.birdy.src = birdyImg;

    this.aniWindow = aniWindow;
    this.height = aniWindow.offsetHeight;
    this.aniWindow.appendChild(this.birdy);

    this.startHeight = getComputedStyle(this.birdy).getPropertyValue("--y");

    this.currentRotation = 0;
  }

  // get rects
  getRects() {
    return this.birdy.getBoundingClientRect();
  }

  decreaseHeight(rate, heightVar) {
    if (this.currentRotation < 50) {
      this.currentRotation += 2;
    }
    this.birdy.style.transform = "rotate(" + this.currentRotation + "deg)";
    this.startHeight -= rate;
    this.birdy.style.setProperty(heightVar, this.startHeight);
  }

  increaseHeight(heightVar) {
    if (this.currentRotation > -45) {
      this.currentRotation -= 45;
      this.birdy.src = birdyDownImg;
    }
    this.birdy.style.transform = "rotate(" + this.rotation + "deg)";
    this.startHeight -= 15;
    this.birdy.style.setProperty(heightVar, this.startHeight);
    setTimeout(() => {
      this.birdy.src = birdyImg;
    }, 100);

    // create and play flap
    var flapSound = new Audio(flap_sound);
    if (flapSound.paused) {
      flapSound.play();
    } else {
      flapSound.pause();
    }
    // this.flapSound.play();
  }

  didDie(tubeRects) {
    var birdyRect = this.getRects();
    return (
      (birdyRect.x < tubeRects[0].x + tubeRects[0].width &&
        birdyRect.x + birdyRect.width > tubeRects[0].x &&
        birdyRect.y < tubeRects[0].y + tubeRects[0].height &&
        birdyRect.y + birdyRect.height > tubeRects[0].y) ||
      (birdyRect.x < tubeRects[1].x + tubeRects[1].width &&
        birdyRect.x + birdyRect.width > tubeRects[1].x &&
        birdyRect.y < tubeRects[1].y + tubeRects[1].height &&
        birdyRect.y + birdyRect.height > tubeRects[1].y) ||
      birdyRect.y <= 0 ||
      birdyRect.y >= this.height
    );
  }

  deathAngle() {
    if (this.currentRotation < 180) {
      this.currentRotation += 5;
      this.birdy.style.transform = "rotate(" + this.currentRotation + "deg)";
    }
  }
  removeBirdy() {
    this.aniWindow.removeChild(this.birdy);
  }
}

export default Birdy;
