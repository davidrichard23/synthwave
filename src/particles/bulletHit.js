import * as THREE from 'three';

var squareOutline = new THREE.TextureLoader().load("src/textures/square-outline.png");
squareOutline.wrapS = THREE.RepeatWrapping;
squareOutline.wrapT = THREE.RepeatWrapping;
squareOutline.repeat.set(1, 1);

export default class BulletHit {

  constructor(scene, point, color) {
    this.scene = scene;
    this.particleCount = 80;
    this.speed = 2;
    this.destroyed = false;

    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const directions = [];

    for (let i = 0; i < this.particleCount; i++) {
      vertices.push(point.x, point.y, point.z);
      const dir = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize();
      directions.push(dir.x, dir.y, dir.z);
    }

    geometry.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.addAttribute('direction', new THREE.Float32BufferAttribute(directions, 3));

    const material = new THREE.PointsMaterial({ size: 5, sizeAttenuation: true, color: color });
    this.particles = new THREE.Points(geometry, material);
    scene.add(this.particles);

    this.update = this.update.bind(this);
    this.destroy = this.destroy.bind(this);
    
    this.update();
    setTimeout(this.destroy, 400);
  }

  update() {
    if (this.destroyed) return;
    requestAnimationFrame(this.update);

    const positions = this.particles.geometry.attributes.position.array;
    const directions = this.particles.geometry.attributes.direction.array;

    for (let i = 0; i < this.particleCount; i++) {
      const pos = new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      const dir = new THREE.Vector3(directions[i * 3], directions[i * 3 + 1], directions[i * 3 + 2]);
      const newPos = pos.addScaledVector(dir, this.speed);
      positions[i * 3] = newPos.x;
      positions[i * 3 + 1] = newPos.y;
      positions[i * 3 + 2] = newPos.z;
      this.particles.geometry.attributes.position.needsUpdate = true;
    }
  }

  destroy() {
    this.destroyed = true;
    this.scene.remove(this.particles);
  }
}