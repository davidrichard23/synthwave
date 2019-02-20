import * as THREE from 'three';
import OutlinedGeometry from './outlinedGeometry';
import Bullet from './bullet';

export default class Gun {

  constructor() {
    this.enabled = false;
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 3);
    this.gunMesh = new OutlinedGeometry({ geometry, name: 'gun', color: 0x00ff00});
    this.gunMesh.position.set(1, -1, -3);
    this.gunMesh.params = { tags: ['player'] };

    this.nextEnergyUpdateTime = 0.5;
    this.energy = 100;
    this.energyCost = 10;
    this.energyRegen = 5;

    this.shoot = this.shoot.bind(this);

    window.addEventListener("mousedown", this.shoot);

    this.update = this.update.bind(this);

    this.update();
  }

  update() {
    requestAnimationFrame(this.update);

    if (!this.enabled) return;

    if (game.clock.elapsedTime > this.nextEnergyUpdateTime && this.energy < 100) {
      this.energy += 5;
      this.nextEnergyUpdateTime = game.clock.elapsedTime + 0.5;
      game.ui.setGunEnergy(this.energy);
      // console.log(this.nextEnergyUpdateTime, this.energy / 100);
    }
  }

  show() {
    this.enabled = true;
    this.energy = 100;
    game.player.playerGroup.add(this.gunMesh);
  }
  
  hide() {
    this.enabled = false;
    game.player.playerGroup.remove(this.gunMesh);
  }

  shoot(e) {
    if (!this.enabled || this.energy <= 0) return;

    const cameraPos = new THREE.Vector3();
    const cameraDir = new THREE.Vector3();

    game.camera.getWorldPosition(cameraPos);
    game.camera.getWorldDirection(cameraDir);

    this.drawBullet();
    this.energy -= this.energyCost;
    game.ui.setGunEnergy(this.energy);

    e.preventDefault();
  }

  drawBullet() {
    const cameraPos = new THREE.Vector3();
    const cameraDir = new THREE.Vector3();
    const gunMeshPos = new THREE.Vector3();

    game.camera.getWorldPosition(cameraPos);
    game.camera.getWorldDirection(cameraDir);
    this.gunMesh.getWorldPosition(gunMeshPos);
    
    const centerVector = new THREE.Vector3();
    const dir = new THREE.Vector3();

    centerVector.addVectors(cameraPos, cameraDir.multiplyScalar(1000));
    dir.subVectors(centerVector, gunMeshPos).normalize();

    new Bullet({position: gunMeshPos, direction: dir, color: 0x00ff00, target: 'enemy'});
  }
}