import * as THREE from 'three';
import Gun from './gun';
import BulletHit from './particles/bulletHit';
import PlayerController from './playerController';

export default class Player {

  constructor(game) {

    this.game = game;
    this.disabled = true;
    this.health = 100;
    this.healthBar = document.getElementById('current-health');

    this.playerGroup = new THREE.Group();
    // this.playerGroup.position.set(0, 15, 300);
    this.playerGroup.name = 'player';
    this.playerGroup.tags = ['player'];

    const geometry = new THREE.BoxGeometry(10, 30, 10);
    const meshMaterial = new THREE.MeshBasicMaterial();
    const mesh = new THREE.Mesh(geometry, meshMaterial);
    mesh.position.set(0, 0, 0);
    mesh.tags = ['player'];

    this.game.scene.add(this.playerGroup);
    
    this.reticle();
    
    this.playerController = new PlayerController(this);
    this.gun = new Gun(this.game.scene, this, this.game.camera);
    
    
    this.playerGroup.add(mesh);
  }


  enable() {
    this.disabled = false;
    this.playerController.update();
  }

  disable() {
    this.disabled = true;
  }

  

  takeDamage(amount) {
    new BulletHit(this.playerGroup, new THREE.Vector3(0, 0, -40), 0x00ff00, 2);
    this.health -= amount;
    this.healthBar.style.width = this.health + '%';

    if (this.health <= 0) {
      this.game.gameOver();
    }
  }

  reticle() {
    const x = 0.01, y = 0.01;

    const geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, y, 0));
    geometry.vertices.push(new THREE.Vector3(0, -y, 0));
    geometry.vertices.push(new THREE.Vector3(0, 0, 0));
    geometry.vertices.push(new THREE.Vector3(x, 0, 0));
    geometry.vertices.push(new THREE.Vector3(-x, 0, 0));

    const material = new THREE.LineBasicMaterial({ color: 0xffffff });
    const reticle = new THREE.Line(geometry, material);
    reticle.position.z = -1;
    reticle.name = 'reticle';

    this.playerGroup.add(reticle);

  }

  destroy() {
    // this.playerGroup.remove(gun)
    this.gun = null;
    this.playerGroup.remove(this.game.camera);
    this.game.scene.remove(this.playerGroup);
  }
}