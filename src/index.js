import * as THREE from 'three';
import Player from './player';

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
const canvas = renderer.domElement;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(canvas);

const player = new Player(canvas);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.lookAt(0, -1, 1);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // soft white light
scene.add(ambientLight);

const planeGeometry = new THREE.PlaneGeometry(5000, 5000);
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x626D70, side: THREE.DoubleSide });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = THREE.Math.degToRad(90);
plane.position.y = 0;
scene.add(plane);


const geometry = new THREE.BoxGeometry(10, 10, 10);
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube1 = new THREE.Mesh(geometry, material);
cube1.position.y = 5;
scene.add(cube1);

const cube2 = new THREE.Mesh(geometry, material);
cube2.position.x = 15;
cube2.position.y = 5;
scene.add(cube2);


function animate() {
  requestAnimationFrame(animate);

  cube1.rotation.x += 0.01;
  cube1.rotation.y += 0.01;

  player.update();

  renderer.render(scene, player.camera);
}
animate();