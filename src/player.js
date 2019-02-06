import * as THREE from 'three';

export default class Player {

  constructor(canvas) {

    this.canvas = canvas;
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
    this.camera.position.set(0, 15, 25);
    this.camera.lookAt(0, 0, 0);

    this.rotation = { x: 0, y: 0 };
    this.keyPresses = {
      up: -1,
      down: -1,
      left: -1,
      right: -1,
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);

    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
    window.addEventListener("mousemove", this.handleMouseMove);

    canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
    canvas.requestPointerLock();
  }

  update() {
    if (this.keyPresses.down === 1) this.camera.translateZ(1);
    if (this.keyPresses.up === 1) this.camera.translateZ(-1);
    if (this.keyPresses.left === 1) this.camera.translateX(-1);
    if (this.keyPresses.right === 1) this.camera.translateX(1);

    this.camera.position.y = 15;
  }
  
  handleMouseMove(event) {
    this.rotation.x -= event.movementY * Math.PI / 180 * 0.2;
    this.rotation.y -= event.movementX * Math.PI / 180 * 0.2;
    
    const euler = new THREE.Euler(0, 0, 0, 'YXZ');
    euler.x = this.rotation.x;
    euler.y = this.rotation.y;
    this.camera.quaternion.setFromEuler(euler);
  }

  handleKeyDown(event) {
    switch (event.key) {
      case "s":
        this.keyPresses.down = 1;
        if (this.keyPresses.up === 1) this.keyPresses.up = 0;
        break;
      case "w":
        this.keyPresses.up = 1;
        if (this.keyPresses.down === 1) this.keyPresses.down = 0;
        break;
      case "a":
        this.keyPresses.left = 1;
        if (this.keyPresses.right === 1) this.keyPresses.right = 0;
        break;
      case "d":
        this.keyPresses.right = 1;
        if (this.keyPresses.left === 1) this.keyPresses.left = 0;
        break;
      default:
        return;
    }

    event.preventDefault();
  }

  handleKeyUp(event) {
    switch (event.key) {
      case "s":
        this.keyPresses.down = -1;
        if (this.keyPresses.up === 0) this.keyPresses.up = 1;
        break;
      case "w":
        this.keyPresses.up = -1;
        if (this.keyPresses.down === 0) this.keyPresses.down = 1;
        break;
      case "a":
        this.keyPresses.left = -1;
        if (this.keyPresses.right === 0) this.keyPresses.right = 1;
        break;
      case "d":
        this.keyPresses.right = -1;
        if (this.keyPresses.left === 0) this.keyPresses.left = 1;
        break;
      default:
        return;
    }

    event.preventDefault();
  }
}