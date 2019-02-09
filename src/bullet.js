import OutlinedGeometry from "./outlinedGeometry";

export default class Bullet {
  constructor(scene, position, direction, destroy) {
    this.scene = scene;
    this.position = position;
    this.direction = direction;
    this.speed = 20;
    this.group = new THREE.Group();

    const geometry = new THREE.BoxGeometry(3, 3, 3);
    this.bullet = new OutlinedGeometry({ geometry, lineColor: 0x00ff00, tags: ['enemy-bullet']});
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
    const raycaster = new THREE.Raycaster(this.group.position, this.direction, 3, 20);
    let intersects = raycaster.intersectObjects(this.scene.children, true);

    intersects = intersects.filter(obj => obj.object.name === 'player');
    if (intersects.length > 0) {
      console.log('Hit!');
      this.destroy();
    }
    // console.log(intersects[0])
  }

  destroy() {
    this.destroyed = true;
    this.scene.remove(this.group);
  }
}