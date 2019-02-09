import * as THREE from 'three';
import OutlinedGeometry from "./outlinedGeometry";
import BulletHit from './particles/bulletHit';

var squareOutlineThick = new THREE.TextureLoader().load("src/textures/square-outline-thick.png");
squareOutlineThick.wrapS = THREE.RepeatWrapping;
squareOutlineThick.wrapT = THREE.RepeatWrapping;
squareOutlineThick.repeat.set(1, 1);

export default class Bullet {
  constructor({scene, position, direction, color, target}) {
    this.scene = scene;
    this.position = position;
    this.direction = direction;
    this.color = color;
    this.target = target;
    this.speed = 20;
    this.group = new THREE.Group();
    this.width = 8;

    const geometry = new THREE.BoxGeometry(this.width, this.width, this.width);
    this.bullet = new OutlinedGeometry({ geometry, texture: squareOutlineThick, lineColor: color, meshColor: 0xffffff, tags: ['enemy-bullet']});
    this.group.position.set(position.x, position.y, position.z);
    
    this.group.add(this.bullet);
    this.scene.add(this.group);

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
    const left = new THREE.Vector3(this.group.position.x - this.width / 2, this.group.position.y, this.group.position.z)
    const right = new THREE.Vector3(this.group.position.x + this.width / 2, this.group.position.y, this.group.position.z)
    const raycasterLeft = new THREE.Raycaster(left, this.direction, 3, 30);
    const raycasterRight = new THREE.Raycaster(right, this.direction, 3, 30);
    let intersects = raycasterLeft.intersectObjects(this.scene.children, true);
    intersects = [...intersects, ...raycasterRight.intersectObjects(this.scene.children, true)];

    // intersects = intersects.filter(obj => obj.object.tags && obj.object.tags.includes(this.target));
    intersects = intersects.filter(intersection => intersection.object.name !== 'reticle');
    if (intersects.length > 0) {
      this.onHit(intersects[0]);
    }
  }

  onHit(intersection) {
    console.log('Hit!');
    this.destroy();

    if (this.target === 'player' && intersection.object.tags && intersection.object.tags.includes(this.target)) {
      window.player.takeDamage();
      return;
    }
    const size = intersection.object.tags && intersection.object.tags.includes(this.target) ? 'large' : 'small';
    const bulletHit = new BulletHit(this.scene, intersection.point, this.color, size);
  }

  destroy() {
    this.destroyed = true;
    this.scene.remove(this.group);
  }
}