class Score {
  constructor(aniWindow) {
    this.score = 0;
    this.scoreElem = document.createElement("p");
    this.scoreElem.innerHTML = this.score;
    this.scoreElem.classList.add("score");
    this.aniWindow = aniWindow;
    this.aniWindow.appendChild(this.scoreElem);
  }

  updateScore(birdyRect, tubeRects) {
    if (this._shouldUpdate(birdyRect, tubeRects) === true) {
      this.score += 1;
      this.scoreElem.innerHTML = this.score;
      return true;
    }
  }

  _shouldUpdate(birdyRect, tubeRects) {
    return parseInt(tubeRects[0].x) <= birdyRect.x - 10;
  }

  gameOverScore(scoreCardID, scoreElem) {
    var scoreCard = document.getElementById(scoreCardID);
    var scoreElem = document.getElementById(scoreElem);

    scoreCard.style.visibility = "visible";
    scoreElem.innerHTML = this.score;
  }

  reset() {
    this.aniWindow.removeChild(this.scoreElem);
    this.score = 0;
  }

  hideCard(scoreCardID) {
    var scoreCard = document.getElementById(scoreCardID);
    scoreCard.style.visibility = "hidden";
  }

  get() {
    return this.score;
  }
}

export default Score;
