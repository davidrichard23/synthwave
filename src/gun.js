import * as THREE from 'three';
import OutlinedGeometry from './outlinedGeometry';

export default class Gun {

  constructor(scene, playerGroup, camera) {
    this.scene = scene;
    this.playerGroup = playerGroup;
    this.camera = camera;

    const geometry = new THREE.BoxGeometry(0.5, 0.5, 3);
    this.gunMesh = new OutlinedGeometry({geometry, name: 'gun'});
    // const gunMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    // this.gunMesh = new THREE.Mesh(gunGeometry, gunMaterial);
    this.gunMesh.position.set(1, -1, -3);
    this.playerGroup.add(this.gunMesh);

    this.shoot = this.shoot.bind(this);

    window.addEventListener("mousedown", this.shoot);
  }

  shoot() {
    const cameraPos = new THREE.Vector3();
    const cameraDir = new THREE.Vector3();

    this.camera.getWorldPosition(cameraPos);
    this.camera.getWorldDirection(cameraDir);

    const raycaster = new THREE.Raycaster(cameraPos, cameraDir);
    let intersects = raycaster.intersectObjects(this.scene.children, true);

    intersects = intersects.filter(obj => obj.object.name !== 'reticle');
    console.log(intersects[0]);

    this.drawBullet();
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

    const endPoint = new THREE.Vector3();
    endPoint.addVectors(gunMeshPos, dir.multiplyScalar(1000));

    const geometry = new THREE.Geometry();
    geometry.vertices.push(gunMeshPos);
    geometry.vertices.push(endPoint);
    const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
    const line = new THREE.Line(geometry, material);
    this.scene.add(line);

    setTimeout(() => this.scene.remove(line), 100);
  }
}