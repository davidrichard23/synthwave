import * as THREE from 'three';
import Gun from './gun';
import BulletHit from './particles/bulletHit';

export default class Player {

  constructor(scene, canvas, camera) {

    this.canvas = canvas;
    this.scene = scene;
    this.camera = camera;
    this.speed = 2;

    this.playerGroup = new THREE.Group();
    this.playerGroup.position.set(0, 15, 300);
    this.playerGroup.name = 'player';
    this.playerGroup.tags = ['player'];

    const geometry = new THREE.BoxGeometry(10, 30, 10);
    const meshMaterial = new THREE.MeshBasicMaterial();
    const mesh = new THREE.Mesh(geometry, meshMaterial);
    mesh.position.set(0, 0, 0);
    mesh.tags = ['player'];

    scene.add(this.playerGroup);
    
    // this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 10000);
    // this.camera.lookAt(0, 0, 0);

    // var light = new THREE.PointLight(0xffffff, 19, 10000, 4);
    // light.position.set(0, 0, 0);
    // this.playerGroup.add(light);
    
    this.reticle();
    
    this.gun = new Gun(scene, this.playerGroup, this.camera);
    
    
    // this.scene.remove(camera);
    this.playerGroup.add(camera);
    this.playerGroup.add(mesh);
    
    // scene.add(mesh);

    this.rotation = { x: 0, y: 0 };
    this.keyPresses = {
      up: -1,
      down: -1,
      left: -1,
      right: -1,
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);

    window.addEventListener("keydown", this.handleKeyDown);
    window.addEventListener("keyup", this.handleKeyUp);
    window.addEventListener("mousemove", this.handleMouseMove);

    canvas.requestPointerLock = canvas.requestPointerLock || canvas.mozRequestPointerLock;
    canvas.requestPointerLock();

    this.update = this.update.bind(this);
    this.update();
  }

  update() {
    requestAnimationFrame(this.update);

    if (this.keyPresses.down === 1) this.playerGroup.translateZ(this.speed);
    if (this.keyPresses.up === 1) this.playerGroup.translateZ(-this.speed);
    if (this.keyPresses.left === 1) this.playerGroup.translateX(-this.speed);
    if (this.keyPresses.right === 1) this.playerGroup.translateX(this.speed);

    if (this.playerGroup.position.x < -180) this.playerGroup.position.x = -180;
    if (this.playerGroup.position.x > 180) this.playerGroup.position.x = 180;

    this.playerGroup.position.y = 15;
  }

  takeDamage() {
    const bulletHit = new BulletHit(this.playerGroup, new THREE.Vector3(0, 0, -40), 0x00ff00, 2);
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
  
  handleMouseMove(event) {
    this.rotation.x -= event.movementY * Math.PI / 180 * 0.1;
    this.rotation.y -= event.movementX * Math.PI / 180 * 0.1;
    
    const euler = new THREE.Euler(0, 0, 0, 'YXZ');
    euler.x = this.rotation.x;
    euler.y = this.rotation.y;
    this.playerGroup.quaternion.setFromEuler(euler);
  }

  handleKeyDown(event) {
    switch (event.key) {
      case "s":
        this.keyPresses.down = 1;
        if (this.keyPresses.up === 1) this.keyPresses.up = 0;
        break;
      case "w":
        this.keyPresses.up = 1;
        if (this.keyPresses.down === 1) this.keyPresses.down = 0;
        break;
      case "a":
        this.keyPresses.left = 1;
        if (this.keyPresses.right === 1) this.keyPresses.right = 0;
        break;
      case "d":
        this.keyPresses.right = 1;
        if (this.keyPresses.left === 1) this.keyPresses.left = 0;
        break;
      default:
        return;
    }

    event.preventDefault();
  }

  handleKeyUp(event) {
    switch (event.key) {
      case "s":
        this.keyPresses.down = -1;
        if (this.keyPresses.up === 0) this.keyPresses.up = 1;
        break;
      case "w":
        this.keyPresses.up = -1;
        if (this.keyPresses.down === 0) this.keyPresses.down = 1;
        break;
      case "a":
        this.keyPresses.left = -1;
        if (this.keyPresses.right === 0) this.keyPresses.right = 1;
        break;
      case "d":
        this.keyPresses.right = -1;
        if (this.keyPresses.left === 0) this.keyPresses.left = 1;
        break;
      default:
        return;
    }

    event.preventDefault();
  }
}