import * as THREE from 'three';
import OutlinedGeometry from './outlinedGeometry';
import Bullet from './bullet';

export default class Gun {

  constructor() {
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 3);
    this.gunMesh = new OutlinedGeometry({ geometry, name: 'gun', color: 0x00ff00});
    this.gunMesh.position.set(1, -1, -3);
    this.gunMesh.params = { tags: ['player'] };

    this.shoot = this.shoot.bind(this);

    window.addEventListener("mousedown", this.shoot);
  }

  show() {
    game.player.playerGroup.add(this.gunMesh);
  }

  hide() {
    game.player.playerGroup.remove(this.gunMesh);
  }

  shoot(e) {
    if (!game.player.enabled) return;

    const cameraPos = new THREE.Vector3();
    const cameraDir = new THREE.Vector3();

    game.camera.getWorldPosition(cameraPos);
    game.camera.getWorldDirection(cameraDir);

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

    game.camera.getWorldPosition(cameraPos);
    game.camera.getWorldDirection(cameraDir);
    this.gunMesh.getWorldPosition(gunMeshPos);
    
    const centerVector = new THREE.Vector3();
    const dir = new THREE.Vector3();

    centerVector.addVectors(cameraPos, cameraDir.multiplyScalar(1000));
    dir.subVectors(centerVector, gunMeshPos).normalize();

    new Bullet({position: gunMeshPos, direction: dir, color: 0x00ff00, target: 'enemy'});

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