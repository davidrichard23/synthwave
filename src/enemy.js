import OutlinedGeometry from "./outlinedGeometry";
import Bullet from "./bullet";

export default class Enemy {
  constructor(id) {

    this.enabled = false;
    // this.enemyGroup.position.set(0, 15, -300);
    this.playerMesh = game.scene.getObjectByName("player");
    this.health = 100;
    this.script = this;
    this.id = id;
    
    this.enemyGroup = new THREE.Group();
    const body = this.createMesh(id);

    this.enemyGroup.add(body);
    
    this.shoot = this.shoot.bind(this);
    this.update = this.update.bind(this);
    
    this.healthbar();
    this.shootTimer();
  }

  createMesh(id) {
    const geometry = new THREE.BoxGeometry(10, 30, 10);
    return new OutlinedGeometry({geometry, lineColor: 0xFE0C0C, params: {tags: ['enemy'], id: id}});
  }

  healthbar() {
    const loader = new THREE.TextureLoader();
    const backgroundTexture = loader.load('src/textures/enemy-healthbar-background.png');
    const foregroundTexture = loader.load('src/textures/enemy-healthbar-foreground.png');
    const backgroundMaterial = new THREE.PointsMaterial({ size: 20, sizeAttenuation: true, map: backgroundTexture, alphaTest: 0.1, transparent: true, color: 0xFE0C0C });
    const foregroundMaterial = new THREE.PointsMaterial({ size: 20, sizeAttenuation: true, map: foregroundTexture, alphaTest: 0.1, transparent: true, color: 0xFE0C0C });
    const backgroundGeometry = new THREE.BufferGeometry();
    const foregroundGeometry = new THREE.BufferGeometry();
    const verticies = [0, 20, 0];
    backgroundGeometry.addAttribute('position', new THREE.Float32BufferAttribute(verticies, 3));
    foregroundGeometry.addAttribute('position', new THREE.Float32BufferAttribute(verticies, 3));

    const background = new THREE.Points(backgroundGeometry, backgroundMaterial);
    this.healthbar = new THREE.Points(foregroundGeometry, foregroundMaterial);
    this.enemyGroup.add(background);
    this.enemyGroup.add(this.healthbar);
  }

  shootTimer() {
    setInterval(this.shoot, 2000);
  }

  shoot() {
    if (!this.enabled) return;

    const dir = new THREE.Vector3();
    dir.subVectors(this.playerMesh.position, this.enemyGroup.position).normalize();
    new Bullet({ position: this.enemyGroup.position, direction: dir, color: 0xFE0C0C, target: 'player' });
  }

  takeDamage(amount) {
    this.health -= amount;
    this.healthbar.material.size = 20 / (100 / this.health);

    if (this.health <= 0) {
      game.enemyManager.despawn(this.id);
    }
  }

  enable() {
    game.scene.add(this.enemyGroup);
    this.health = 100;
    this.healthbar.material.size = 20 / (100 / this.health);
    this.enabled = true;
    this.update();
  }
  
  disable() {
    game.scene.remove(this.enemyGroup);
    this.enabled = false;
  }

  setPosition(pos) {
    this.enemyGroup.position.set(pos.x, pos.y, pos.z);
  }

  update() {
    
    // requestAnimationFrame(this.update);

  }
}