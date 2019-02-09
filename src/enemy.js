import OutlinedGeometry from "./outlinedGeometry";
import Bullet from "./bullet";

export default class Enemy {
  constructor(scene) {

    this.scene = scene;
    this.bullets = {};
    this.enemyGroup = new THREE.Group();
    this.enemyGroup.position.set(0, 15, 100);
    this.enemyGroup.name = 'enemy';
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
    // setInterval(this.shoot, 200);
  }

  createMesh() {
    const geometry = new THREE.BoxGeometry(10, 30, 10);
    return new OutlinedGeometry({geometry, lineColor: 0xFE0C0C, tags: ['enemy']});
  }

  shoot() {
    const dir = new THREE.Vector3();
    dir.subVectors(this.playerMesh.position, this.enemyGroup.position).normalize();
    new Bullet(this.scene, this.enemyGroup.position, dir, this.destroy);
    // this.bullets[bullet.uuid] = bullet;
  }

  destroy(uuid) {
    delete this.bullets[uuid];
  }

  update() {
    
    requestAnimationFrame(this.update);
    // if (this.bullets.length > 0) {
    //   // Object.values(this.bullets.forEach(bullet => bullet.update()));
    // }
  }
}