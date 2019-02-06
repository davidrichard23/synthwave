export default class Player {

  constructor(camera) {

    this.camera = camera;
    this.keyPresses = {
      up: -1,
      down: -1,
      left: -1,
      right: -1,
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);

    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
  }

  update() {
    if (this.keyPresses.down === 1) this.camera.position.z += 1;
    if (this.keyPresses.up === 1) this.camera.position.z -= 1;
    if (this.keyPresses.left === 1) this.camera.position.x -= 1;
    if (this.keyPresses.right === 1) this.camera.position.x += 1;
  }

  handleKeyDown(event) {
    switch (event.key) {
      case "ArrowDown":
        this.keyPresses.down = 1;
        if (this.keyPresses.up === 1) this.keyPresses.up = 0;
        break;
      case "ArrowUp":
        this.keyPresses.up = 1;
        if (this.keyPresses.down === 1) this.keyPresses.down = 0;
        break;
      case "ArrowLeft":
        this.keyPresses.left = 1;
        if (this.keyPresses.right === 1) this.keyPresses.right = 0;
        break;
      case "ArrowRight":
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
      case "ArrowDown":
        this.keyPresses.down = -1;
        if (this.keyPresses.up === 0) this.keyPresses.up = 1;
        break;
      case "ArrowUp":
        this.keyPresses.up = -1;
        if (this.keyPresses.down === 0) this.keyPresses.down = 1;
        break;
      case "ArrowLeft":
        this.keyPresses.left = -1;
        if (this.keyPresses.right === 0) this.keyPresses.right = 1;
        break;
      case "ArrowRight":
        this.keyPresses.right = -1;
        if (this.keyPresses.left === 0) this.keyPresses.left = 1;
        break;
      default:
        return;
    }

    event.preventDefault();
  }
}