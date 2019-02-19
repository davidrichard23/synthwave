import * as THREE from 'three';
import Cookies from 'js-cookie';

export default class UI {

  constructor() {

    this.lastScoreUpdate = 0;

    this.startGame = this.startGame.bind(this);
    this.titleUI = document.getElementById('title-ui');
    this.hudUI = document.getElementById('hud-ui');
    this.gameScore = document.getElementById('game-score');
    this.titleScore = document.getElementById('title-score');
    this.highScore = document.getElementById('high-score');
    this.playButton = document.getElementById('play-button');
    this.playButton.addEventListener('click', this.startGame);
  }

  startGame(e) {
    e.preventDefault();
    this.playButton.disabled = true;
    game.startGameTransition();
    this.titleUI.classList.add("transparent");
  }
  
  showTitle() {
    this.playButton.disabled = false;
    this.titleUI.classList.remove("transparent");
  }
  
  showHud() {
    this.hudUI.classList.remove("transparent");
  }
  
  hideHud() {
    this.hudUI.classList.add("transparent");
  }

  updateGameScore(score) {
    if (game.clock.elapsedTime < this.lastScoreUpdate + 0.1) return;

    this.gameScore.innerHTML = `SCORE: ${Math.floor(score)}`;
    this.lastScoreUpdate = game.clock.elapsedTime;
  }

  setTitleScore(score) {
    let highScore = Cookies.get('highScore') || 0;
    if (highScore < score) {
      highScore = score;
      Cookies.set('highScore', score);
    }

    this.titleScore.innerHTML = `YOUR SCORE: ${Math.floor(score)}`;
    this.highScore.innerHTML = `HIGH SCORE: ${Math.floor(highScore)}`;
  }
}