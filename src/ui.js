import * as THREE from 'three';

export default class UI {

  constructor() {

    this.startGame = this.startGame.bind(this);
    this.titleUI = document.getElementById('title-ui');
    this.hudUI = document.getElementById('hud-ui');
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
}