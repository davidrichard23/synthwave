import OutlinedGeometry from "./outlinedGeometry";
import Bullet from "./bullet";

export default class Enemy {
  constructor(id) {

    this.enabled = false;
    // this.enemyGroup.position.set(0, 15, -300);
    this.health = 100;
    this.script = this;
    this.id = id;
    this.speed = 1.3;
    this.gravity = 0.1;
    this.jumpVelocity = 4;
    this.nextShootTime = 0;
    this.isTransitioning = false;

    this.minDirSwitchTime = 1;
    this.lastDirSwitch = new THREE.Vector2(0,0);
    
    this.enemyGroup = new THREE.Group();
    const body = this.createMesh(id);

    this.enemyGroup.add(body);
    
    this.shoot = this.shoot.bind(this);
    this.update = this.update.bind(this);
    
    this.healthbar();
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
    dir.subVectors(game.player.playerGroup.position, this.enemyGroup.position).normalize();
    new Bullet({ position: this.enemyGroup.position, direction: dir, color: 0xFE0C0C, target: 'player' });
  }

  takeDamage(amount) {
    this.health -= amount;
    this.healthbar.material.size = 35 / (100 / this.health);

    if (this.health <= 0) {
      game.enemyManager.despawn(this.id);
      game.addObjectiveScore(1000);
    }
  }

  enable() {
    game.scene.add(this.enemyGroup);
    this.isTransitioning = true;
    this.enemyGroup.position.y = 1000;
    this.health = 100;
    this.healthbar.material.size = 35 / (100 / this.health);
    this.enabled = true;
    this.nextShootTime = game.clock.elapsedTime + Math.random() * 3;
    this.moveDirection = new THREE.Vector3(this.getRandomDirectionVal(), 0, this.getRandomDirectionVal()).normalize();
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
    if (!this.enabled) return;
    
    requestAnimationFrame(this.update);

    if (this.isTransitioning) {
      this.updateTransition();
      return;
    }
    
    this.enemyGroup.translateOnAxis(this.moveDirection, this.speed);
    
    if (this.enemyGroup.position.x < -180) this.enemyGroup.position.x = -180;
    if (this.enemyGroup.position.x > 180) this.enemyGroup.position.x = 180;
    
    if (game.clock.elapsedTime > this.nextShootTime) {
      this.nextShootTime = game.clock.elapsedTime + Math.random() * 3;
      this.shoot();
    }

    this.chooseDirection();
    // this.jump();
  }

  updateTransition() {
    if (this.enemyGroup.position.y > 25) {
      this.enemyGroup.translateY(-13);
    }
    else {
      this.isTransitioning = false;
    }
  }

  chooseDirection() {

    const shouldSwitchX = (Math.random() > 0.99 && 
                          game.clock.elapsedTime > this.lastDirSwitch.x + this.minDirSwitchTime)
    const shouldSwitchZ = (Math.random() > 0.99 && 
                          game.clock.elapsedTime > this.lastDirSwitch.y + this.minDirSwitchTime);

    if (shouldSwitchX) {
      this.lastDirSwitch.x = game.clock.elapsedTime;
      this.moveDirection.x = this.getRandomDirectionVal();
      this.moveDirection = this.moveDirection;
    }
    if (shouldSwitchZ) {
      this.lastDirSwitch.z = game.clock.elapsedTime;
      this.moveDirection.z = this.getRandomDirectionVal();
      this.moveDirection = this.moveDirection;
    }
    
    const distToPlayer = this.enemyGroup.position.distanceTo(game.player.playerGroup.position);
    if (distToPlayer > 1100) {
      const dir = new THREE.Vector3();
      this.moveDirection = dir.subVectors(game.player.playerGroup.position, this.enemyGroup.position);
    }
    if (this.enemyGroup.position.x < -179 || this.enemyGroup.position.x > 179)
      this.moveDirection.x *= -1;

    this.moveDirection = this.moveDirection.normalize();
    this.moveDirection.y = 0;
  }

  getRandomDirectionVal() {
    let val = Math.random();
    if (val < 0.5) val -= 1; // values lower than half convert to negative

    return val;
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