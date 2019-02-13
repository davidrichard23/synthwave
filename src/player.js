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
    this.playerGroup.name = 'player';
    this.playerGroup.tags = ['player'];

    const geometry = new THREE.BoxGeometry(10, 30, 10);
    const meshMaterial = new THREE.MeshBasicMaterial();
    const mesh = new THREE.Mesh(geometry, meshMaterial);
    mesh.position.set(0, 0, 0);
    mesh.tags = ['player'];

    
    this.playerController = new PlayerController(this);
    this.gun = new Gun(this.game.scene, this, this.game.camera);
    
    this.playerGroup.add(mesh);
    this.game.scene.add(this.playerGroup);
    this.reticle();
  }


  enable() {
    this.disabled = false;
    this.playerController.update();
    this.gun.show();
    this.playerGroup.add(this.reticle);
    this.health = 100;
    this.healthBar.style.width = this.health + '%';
  }
  
  disable() {
    this.disabled = true;
    this.gun.hide();
    this.playerGroup.remove(this.reticle);
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
    this.reticle = new THREE.Line(geometry, material);
    this.reticle.position.z = -1;
    this.reticle.name = 'reticle';
  }
}