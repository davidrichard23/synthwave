import * as THREE from 'three';

export default class Gun {

  constructor(scene, playerGroup, camera) {
    this.scene = scene;
    this.playerGroup = playerGroup;
    this.camera = camera;

    const gunGeometry = new THREE.BoxGeometry(0.5, 0.5, 3);
    const gunMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
    this.gunMesh = new THREE.Mesh(gunGeometry, gunMaterial);
    this.gunMesh.position.set(1, -1, -3);
    this.playerGroup.add(this.gunMesh);

    this.shoot = this.shoot.bind(this);

    window.addEventListener("mousedown", this.shoot);
  }

  shoot() {
    const cameraPos = this.camera.getWorldPosition();
    const cameraDir = this.camera.getWorldDirection();
    const raycaster = new THREE.Raycaster(cameraPos, cameraDir);

    this.drawBullet();
  }

  drawBullet() {
    const cameraPos = this.camera.getWorldPosition();
    const cameraDir = this.camera.getWorldDirection();
    const gunMeshPos = this.gunMesh.getWorldPosition();
    const centerVector = new THREE.Vector3();
    const dir = new THREE.Vector3();

    centerVector.addVectors(cameraPos, cameraDir.multiplyScalar(1000));
    dir.subVectors(centerVector, gunMeshPos).normalize();

    const endPoint = new THREE.Vector3;
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