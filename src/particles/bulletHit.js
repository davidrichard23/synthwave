import * as THREE from 'three';

var circleFade = new THREE.TextureLoader().load("src/textures/circle-fade.png");
circleFade.wrapS = THREE.RepeatWrapping;
circleFade.wrapT = THREE.RepeatWrapping;
circleFade.repeat.set(1, 1);

export default class BulletHit {

  constructor(parent, point, color, size=10, lifetime=2000) {
    this.particleCount = 280;
    this.speed = 2;
    this.lifetime = lifetime;
    this.destroyed = false;

    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const directions = [];
    const speeds = [];

    for (let i = 0; i < this.particleCount; i++) {
      const dir = new THREE.Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize();
      directions.push(dir.x, dir.y, dir.z);
      vertices.push(point.x, point.y, point.z);
      speeds.push(this.speed * Math.random());
    }

    geometry.addAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.addAttribute('direction', new THREE.Float32BufferAttribute(directions, 3));
    geometry.addAttribute('speed', new THREE.Float32BufferAttribute(speeds, 1));

    const material = new THREE.PointsMaterial({ 
      map: circleFade,
      size: size, 
      sizeAttenuation: false, 
      color: color, 
      opacity: 1,
      // blending: THREE.MultiplyBlending,
      transparent: true,
      alphaTest: 0.3,
    });
    this.particles = new THREE.Points(geometry, material);
    parent.add(this.particles);

    this.update = this.update.bind(this);
    this.destroy = this.destroy.bind(this);
    
    this.update();
    setTimeout(this.destroy, this.lifetime);
  }

  update() {
    if (this.destroyed) return;
    requestAnimationFrame(this.update);

    const positions = this.particles.geometry.attributes.position.array;
    const directions = this.particles.geometry.attributes.direction.array;
    const speeds = this.particles.geometry.attributes.speed.array;

    const msPerFrame = 1 / (60 / 1000);
    const steps = this.lifetime / msPerFrame;
    this.particles.material.opacity -= 1 / steps;
    this.particles.material.size -= steps * 0.001;

    for (let i = 0; i < this.particleCount; i++) {
      const pos = new THREE.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
      const dir = new THREE.Vector3(directions[i * 3], directions[i * 3 + 1], directions[i * 3 + 2]);
      const speed = speeds[i];
      
      const newPos = pos.addScaledVector(dir, speed);
      const newDir = dir.addScaledVector(new THREE.Vector3(0,-1,0), 0.06).normalize();

      positions[i * 3] = newPos.x;
      positions[i * 3 + 1] = newPos.y;
      positions[i * 3 + 2] = newPos.z;

      directions[i * 3] = newDir.x;
      directions[i * 3 + 1] = newDir.y;
      directions[i * 3 + 2] = newDir.z;

      this.particles.geometry.attributes.position.needsUpdate = true;
      this.particles.geometry.attributes.direction.needsUpdate = true;
    }
  }

  destroy() {
    this.destroyed = true;
    game.scene.remove(this.particles);
    this.particles = null;
  }
}