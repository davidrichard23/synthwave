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
    this.moveDirection = new THREE.Vector3(Math.random() > 0.5 ? 1 : -1, 0, Math.random() > 0.5 ? 1 : -1);
    this.speed = 1;
    this.gravity = 0.1;
    this.jumpVelocity = 4;
    this.nextShootTime = game.clock.elapsedTime + Math.random() * 3;

    this.minDirSwitchTime = 1;
    this.lastDirSwitch = new THREE.Vector2(0,0);
    
    this.enemyGroup = new THREE.Group();
    const body = this.createMesh(id);

    this.enemyGroup.add(body);
    
    this.shoot = this.shoot.bind(this);
    this.update = this.update.bind(this);
    
    this.healthbar();
    this.update();
  }

  createMesh(id) {
    const geometry = new THREE.BoxGeometry(20, 50, 20);
    return new OutlinedGeometry({geometry, lineColor: 0xFE0C0C, params: {tags: ['enemy'], id: id}});
  }

  healthbar() {
    const loader = new THREE.TextureLoader();
    const backgroundTexture = loader.load('src/textures/enemy-healthbar-background.png');
    const foregroundTexture = loader.load('src/textures/enemy-healthbar-foreground.png');
    const backgroundMaterial = new THREE.PointsMaterial({ size: 40, sizeAttenuation: true, map: backgroundTexture, alphaTest: 0.1, transparent: true, color: 0xFE0C0C });
    const foregroundMaterial = new THREE.PointsMaterial({ size: 40, sizeAttenuation: true, map: foregroundTexture, alphaTest: 0.1, transparent: true, color: 0xFE0C0C });
    const backgroundGeometry = new THREE.BufferGeometry();
    const foregroundGeometry = new THREE.BufferGeometry();
    const verticies = [0, 35, 0];
    backgroundGeometry.addAttribute('position', new THREE.Float32BufferAttribute(verticies, 3));
    foregroundGeometry.addAttribute('position', new THREE.Float32BufferAttribute(verticies, 3));

    const background = new THREE.Points(backgroundGeometry, backgroundMaterial);
    this.healthbar = new THREE.Points(foregroundGeometry, foregroundMaterial);
    this.enemyGroup.add(background);
    this.enemyGroup.add(this.healthbar);
  }

  shoot() {
    if (!this.enabled) return;

    const dir = new THREE.Vector3();
    dir.subVectors(this.playerMesh.position, this.enemyGroup.position).normalize();
    new Bullet({ position: this.enemyGroup.position, direction: dir, color: 0xFE0C0C, target: 'player' });
  }

  takeDamage(amount) {
    this.health -= amount;
    this.healthbar.material.size = 35 / (100 / this.health);

    if (this.health <= 0) {
      game.enemyManager.despawn(this.id);
    }
  }

  enable() {
    game.scene.add(this.enemyGroup);
    this.health = 100;
    this.healthbar.material.size = 35 / (100 / this.health);
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
    
    requestAnimationFrame(this.update);
    
    this.enemyGroup.translateOnAxis(this.moveDirection, this.speed);
    // if (this.keyPresses.up === 1) this.player.playerGroup.translateZ(-this.speed);
    // if (this.keyPresses.left === 1) this.player.playerGroup.translateX(-this.speed);
    // if (this.keyPresses.right === 1) this.player.playerGroup.translateX(this.speed);
    
    if (this.enemyGroup.position.x < -180) this.enemyGroup.position.x = -180;
    if (this.enemyGroup.position.x > 180) this.enemyGroup.position.x = 180;
    
    if (game.clock.elapsedTime > this.nextShootTime) {
      this.nextShootTime = game.clock.elapsedTime + Math.random() * 3;
      this.shoot();
    }

    this.chooseDirection();
    this.jump();
  }

  chooseDirection() {

    const shouldSwitchX = (Math.random() > 0.99 && 
                          game.clock.elapsedTime > this.lastDirSwitch.x + this.minDirSwitchTime) || 
                          this.enemyGroup.position.x < -179 || 
                          this.enemyGroup.position.x > 179;
    const shouldSwitchZ = (Math.random() > 0.99 && 
                          game.clock.elapsedTime > this.lastDirSwitch.y + this.minDirSwitchTime)

    if (shouldSwitchX) {
      this.lastDirSwitch.x = game.clock.elapsedTime;
      this.moveDirection.x *= -1;
    }
    if (shouldSwitchZ) {
      this.lastDirSwitch.z = game.clock.elapsedTime;
      this.moveDirection.z *= -1;
    }

    this.moveDirection = this.moveDirection.normalize();
  }

  jump() {
    if (false) {
      this.enemyGroup.translateY(this.jumpVelocity);
      this.jumpVelocity -= this.gravity;

      if (this.enemyGroup.position.y < 15) {
        this.keyPresses.space = -1;
        this.jumpVelocity = 4;
      }
    }
    else this.enemyGroup.position.y = 25;
  }
}