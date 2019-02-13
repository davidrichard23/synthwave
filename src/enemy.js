import OutlinedGeometry from "./outlinedGeometry";
import Bullet from "./bullet";

export default class Enemy {
  constructor(game) {

    this.game = game;
    this.enabled = false;
    // this.enemyGroup.position.set(0, 15, -300);
    this.playerMesh = this.game.scene.getObjectByName("player");
    this.health = 100;
    
    this.enemyGroup = new THREE.Group();
    const body = this.createMesh();
    this.enemyGroup.add(body);
    
    this.shoot = this.shoot.bind(this);
    this.update = this.update.bind(this);
    
    this.shootTimer();
  }

  shootTimer() {
    setInterval(this.shoot, 2000);
  }

  createMesh() {
    const geometry = new THREE.BoxGeometry(10, 30, 10);
    return new OutlinedGeometry({geometry, lineColor: 0xFE0C0C, tags: ['enemy']});
  }

  shoot() {
    if (!this.enabled) return;

    const dir = new THREE.Vector3();
    dir.subVectors(this.playerMesh.position, this.enemyGroup.position).normalize();
    new Bullet({ scene: this.game.scene, position: this.enemyGroup.position, direction: dir, color: 0xFE0C0C, target: 'player' });
  }

  takeDamage(amount) {
    this.health -= amount;
    // this.healthBar.style.width = this.health + '%';

    if (this.health <= 0) {
      this.game.scene.remove(this.enemyGroup);
    }
  }

  enable() {
    this.game.scene.add(this.enemyGroup);
    this.health = 100;
    this.enabled = true;
    this.update();
  }
  
  disable() {
    this.game.scene.remove(this.enemyGroup);
    this.enabled = false;
  }

  setPosition(pos) {
    this.enemyGroup.position.set(pos.x, pos.y, pos.z);
  }

  update() {
    
    // requestAnimationFrame(this.update);

  }
}