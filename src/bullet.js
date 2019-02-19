import * as THREE from 'three';
import OutlinedGeometry from "./outlinedGeometry";
import BulletHit from './particles/bulletHit';

var squareOutlineThick = new THREE.TextureLoader().load("src/textures/square-outline-thick.png");
squareOutlineThick.wrapS = THREE.RepeatWrapping;
squareOutlineThick.wrapT = THREE.RepeatWrapping;
squareOutlineThick.repeat.set(1, 1);

export default class Bullet {
  constructor({position, direction, color, target}) {
    this.position = position;
    this.direction = direction;
    this.color = color;
    this.target = target;
    this.speed = 20;
    this.group = new THREE.Group();
    this.width = 8;

    const geometry = new THREE.BoxGeometry(this.width, this.width, this.width);
    this.bullet = new OutlinedGeometry({ geometry, texture: squareOutlineThick, lineColor: color, meshColor: 0xffffff, params: {tags: ['bullet']}});
    this.group.position.set(position.x, position.y, position.z);
    // this.group.tags = ['bullet, enemy-bullet'];
    
    this.group.add(this.bullet);
    game.scene.add(this.group);

    this.update = this.update.bind(this);
    this.destroy = this.destroy.bind(this);

    this.update();
    setTimeout(this.destroy, 1500);
  }
  
  update() {
    if (this.destroyed) return;
    requestAnimationFrame(this.update);

    this.bullet.rotation.x += 0.2;
    this.bullet.rotation.y += 0.2;
    
    
    this.group.position.addScaledVector(this.direction, this.speed);
    this.detectHit();
    
  }
  
  detectHit() {
    const left = new THREE.Vector3(this.group.position.x - this.width / 2, this.group.position.y, this.group.position.z);
    const right = new THREE.Vector3(this.group.position.x + this.width / 2, this.group.position.y, this.group.position.z);
    const raycasterLeft = new THREE.Raycaster(left, this.direction, 3, 30);
    const raycasterRight = new THREE.Raycaster(right, this.direction, 3, 30);
    let intersects = raycasterLeft.intersectObjects(game.scene.children, true);
    intersects = [...intersects, ...raycasterRight.intersectObjects(game.scene.children, true)];

    // intersects = intersects.filter(obj => obj.object.tags && obj.object.tags.includes(this.target));
    intersects = intersects.filter(intersection => {
      const params = intersection.object.params || { tags: [] };
      params.tags = params.tags || [];
      return params.tags.includes('player') || params.tags.includes('enemy') || params.tags.includes('environment') || params.tags.includes('bullet');
    });
    if (intersects.length > 0) {
      this.onHit(intersects[0]);
    }
  }

  onHit(intersection) {

    this.destroy();
    const params = intersection.object.params || {tags: []};
    if (params.tags.includes('player')) {
      game.player.takeDamage(10);
    }
    else if (params.tags.includes('enemy') && this.target === 'enemy') {
      new BulletHit(game.scene, intersection.point, 0xFE0C0C);
      game.enemyManager.spawnedEnemies[params.id].takeDamage(34);
    }
    else {
      new BulletHit(game.scene, intersection.point, 0xffffff);
    }

    this.destroy();
  }

  destroy() {
    this.destroyed = true;
    game.scene.remove(this.group);
  }
}