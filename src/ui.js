import * as THREE from 'three';
import Cookies from 'js-cookie';

export default class UI {

  constructor() {

    this.lastScoreUpdate = 0;
    this.muted = Cookies.get('muted') ? JSON.parse(Cookies.get('muted')) : false;
    this.setMuteIcon();

    this.titleUI = document.getElementById('title-ui');
    this.hudUI = document.getElementById('hud-ui');
    this.directionsUI = document.getElementById('directions-ui');
    this.overlay = document.getElementById('overlay');
    this.directionsButton = document.getElementById('directions-button');
    this.directionsDismissButton = document.getElementById('directions-dismiss-button');
    this.gameScore = document.getElementById('game-score');
    this.titleScore = document.getElementById('title-score');
    this.highScore = document.getElementById('high-score');
    this.playButton = document.getElementById('play-button');
    this.gunEnergyBar = document.getElementById('current-gun-energy');
    this.muteButton = document.getElementById('mute-button');

    this.startGame = this.startGame.bind(this);
    this.hideDirections = this.hideDirections.bind(this);
    this.showDirections = this.showDirections.bind(this);
    this.toggleMute = this.toggleMute.bind(this);

    this.playButton.addEventListener('click', this.startGame);
    this.directionsButton.addEventListener('click', this.showDirections);
    this.directionsDismissButton.addEventListener('click', this.hideDirections);
    this.muteButton.addEventListener('click', this.toggleMute);
  }

  startGame(e) {
    e.preventDefault();
    this.playButton.disabled = true;
    game.startGameTransition();
    this.hideTitle();
    this.hideOverlay();
  }
  
  showTitle() {
    this.playButton.disabled = false;
    this.titleUI.classList.remove("transparent");
    this.showOverlay();
  }

  hideTitle() {
    this.titleUI.classList.add("transparent");
  }
  
  showHud() {
    this.hudUI.classList.remove("transparent");
  }
  
  hideHud() {
    this.hudUI.classList.add("transparent");
  }
  
  showOverlay() {
    this.overlay.classList.remove("transparent");
  }
  
  hideOverlay() {
    this.overlay.classList.add("transparent");
  }

  showDirections() {
    this.directionsUI.classList.remove("transparent");
    this.directionsUI.style.zIndex = 10;
    this.hideTitle();
  }
  
  hideDirections() {
    this.directionsUI.classList.add("transparent");
    this.directionsUI.style.zIndex = 0;
    this.showTitle();
  }

  toggleMute() {
    this.muted = !this.muted;
    Cookies.set('muted', this.muted);
    game.music.mute(this.muted);
    game.impactSound.mute(this.muted);
    game.startSound.mute(this.muted);
    game.endSound.mute(this.muted);
    this.setMuteIcon();
  }
  
  setMuteIcon() {
    if (this.muted)
      document.getElementById('mute-img').src = 'src/icons/muted.png';
    else
      document.getElementById('mute-img').src = 'src/icons/unmuted.png';
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

    this.titleScore.innerHTML = `YOUR SCORE: <br/>${Math.floor(score)}`;
    this.highScore.innerHTML = `HIGH SCORE: <br/>${Math.floor(highScore)}`;
  }

  setGunEnergy(percent) {
    this.gunEnergyBar.style.width = percent + '%';
  }
}