export default class PlayerController {

  constructor(player) {
    this.player = player;
    this.speed = 2;
    this.gravity = 0.1;
    this.jumpVelocity = 4;

    this.rotation = { x: 0, y: 0 };
    this.keyPresses = {
      up: -1,
      down: -1,
      left: -1,
      right: -1,
      space: -1,
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    
    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
    window.addEventListener("mousemove", this.handleMouseMove);

    this.update = this.update.bind(this);
    this.update();
  }

  update() {
    if (!this.player.enabled) return;

    requestAnimationFrame(this.update);

    if (this.keyPresses.down === 1) this.player.playerGroup.translateZ(this.speed);
    if (this.keyPresses.up === 1) this.player.playerGroup.translateZ(-this.speed);
    if (this.keyPresses.left === 1) this.player.playerGroup.translateX(-this.speed);
    if (this.keyPresses.right === 1) this.player.playerGroup.translateX(this.speed);

    if (this.player.playerGroup.position.x < -180) this.player.playerGroup.position.x = -180;
    if (this.player.playerGroup.position.x > 180) this.player.playerGroup.position.x = 180;

    this.jump();
  }

  jump() {
    if (this.keyPresses.space === 1) {
      this.player.playerGroup.translateY(this.jumpVelocity);
      this.jumpVelocity -= this.gravity;

      if (this.player.playerGroup.position.y < 15) {
        this.keyPresses.space = -1;
        this.jumpVelocity = 4;
      }
    }
    else this.player.playerGroup.position.y = 15;
  }

  
  handleMouseMove(event) {
    if (!this.player.enabled) return;

    this.rotation.x -= event.movementY * Math.PI / 180 * 0.05;
    this.rotation.y -= event.movementX * Math.PI / 180 * 0.05;
    
    const euler = new THREE.Euler(0, 0, 0, 'YXZ');
    euler.x = this.rotation.x;
    euler.y = this.rotation.y;
    this.player.playerGroup.quaternion.setFromEuler(euler);
  }

  handleKeyDown(event) {
    switch (event.keyCode) {
      case 83:
        this.keyPresses.down = 1;
        if (this.keyPresses.up === 1) this.keyPresses.up = 0;
        break;
      case 87:
        this.keyPresses.up = 1;
        if (this.keyPresses.down === 1) this.keyPresses.down = 0;
        break;
      case 65:
        this.keyPresses.left = 1;
        if (this.keyPresses.right === 1) this.keyPresses.right = 0;
        break;
      case 68:
        this.keyPresses.right = 1;
        if (this.keyPresses.left === 1) this.keyPresses.left = 0;
        break;
      case 32:
        if (this.keyPresses.space === -1) this.keyPresses.space = 1;
        break;
      default:
        return;
    }

    event.preventDefault();
  }

  handleKeyUp(event) {
    switch (event.keyCode) {
      case 83:
        this.keyPresses.down = -1;
        if (this.keyPresses.up === 0) this.keyPresses.up = 1;
        break;
      case 87:
        this.keyPresses.up = -1;
        if (this.keyPresses.down === 0) this.keyPresses.down = 1;
        break;
      case 65:
        this.keyPresses.left = -1;
        if (this.keyPresses.right === 0) this.keyPresses.right = 1;
        break;
      case 68:
        this.keyPresses.right = -1;
        if (this.keyPresses.left === 0) this.keyPresses.left = 1;
        break;
      default:
        return;
    }

    event.preventDefault();
  }
}