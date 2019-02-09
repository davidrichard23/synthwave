import OutlinedGeometry from "./outlinedGeometry";
import Bullet from "./bullet";

export default class Enemy {
  constructor(scene) {

    this.scene = scene;
    this.enemyGroup = new THREE.Group();
    this.enemyGroup.position.set(0, 15, 0);
    this.playerMesh = this.scene.getObjectByName("player");
    
    const body = this.createMesh();

    scene.add(this.enemyGroup);
    this.enemyGroup.add(body);
    
    this.shoot = this.shoot.bind(this);
    this.update = this.update.bind(this);
    
    this.update();
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
    const dir = new THREE.Vector3();
    dir.subVectors(this.playerMesh.position, this.enemyGroup.position).normalize();
    new Bullet({ scene: this.scene, position: this.enemyGroup.position, direction: dir, color: 0xFE0C0C, target: 'player' });
  }

  update() {
    
    // requestAnimationFrame(this.update);

  }
}