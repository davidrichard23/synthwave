import * as THREE from 'three';
import OutlinedGeometry from './outlinedGeometry';
import Bullet from './bullet';

export default class Gun {

  constructor(scene, player, camera) {
    this.scene = scene;
    this.player = player;
    this.camera = camera;

    const geometry = new THREE.BoxGeometry(0.5, 0.5, 3);
    this.gunMesh = new OutlinedGeometry({ geometry, name: 'gun', color: 0x00ff00});
    this.gunMesh.position.set(1, -1, -3);

    this.shoot = this.shoot.bind(this);

    window.addEventListener("mousedown", this.shoot);
  }

  show() {
    this.player.playerGroup.add(this.gunMesh);
  }

  hide() {
    this.player.playerGroup.remove(this.gunMesh);
  }

  shoot(e) {
    if (!this.player.enabled) return;

    const cameraPos = new THREE.Vector3();
    const cameraDir = new THREE.Vector3();

    this.camera.getWorldPosition(cameraPos);
    this.camera.getWorldDirection(cameraDir);

    // const raycaster = new THREE.Raycaster(cameraPos, cameraDir);
    // let intersects = raycaster.intersectObjects(this.scene.children, true);

    // intersects = intersects.filter(obj => obj.object.name !== 'reticle');
    // console.log(intersects[0]);

    this.drawBullet();
    e.preventDefault();
  }

  drawBullet() {
    const cameraPos = new THREE.Vector3();
    const cameraDir = new THREE.Vector3();
    const gunMeshPos = new THREE.Vector3();

    this.camera.getWorldPosition(cameraPos);
    this.camera.getWorldDirection(cameraDir);
    this.gunMesh.getWorldPosition(gunMeshPos);
    
    const centerVector = new THREE.Vector3();
    const dir = new THREE.Vector3();

    centerVector.addVectors(cameraPos, cameraDir.multiplyScalar(1000));
    dir.subVectors(centerVector, gunMeshPos).normalize();

    new Bullet({scene: this.scene, position: gunMeshPos, direction: dir, color: 0x00ff00, target: 'enemy'});

    // const endPoint = new THREE.Vector3();
    // endPoint.addVectors(gunMeshPos, dir.multiplyScalar(1000));

    // const geometry = new THREE.Geometry();
    // geometry.vertices.push(gunMeshPos);
    // geometry.vertices.push(endPoint);
    // const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    // const line = new THREE.Line(geometry, material);
    // this.scene.add(line);

    // setTimeout(() => this.scene.remove(line), 100);
  }
}