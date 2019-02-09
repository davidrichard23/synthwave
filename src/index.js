import * as THREE from 'three';
window.THREE = THREE;
require("three/examples/js/postprocessing/EffectComposer");
require("three/examples/js/postprocessing/UnrealBloomPass");
require("three/examples/js/postprocessing/RenderPass");
require("three/examples/js/postprocessing/ShaderPass");
require("three/examples/js/shaders/LuminosityHighPassShader");
require("three/examples/js/shaders/CopyShader");

import Stats from './stats/stats.min.js';

import Player from './player';
import OutlinedGeometry from './outlinedGeometry';
import Environment from './environment';
import Enemy from './enemy';

var stats = new Stats();
stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
// stats.showPanel(1); // 0: fps, 1: ms, 2: mb, 3+: custom
// stats.showPanel(2); // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom);


const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({ antialias: true });
const canvas = renderer.domElement;
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(canvas);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.lookAt(0, -1, 1);
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const player = new Player(scene, canvas);
const enemy = new Enemy(scene, canvas);
const environment = new Environment(scene);






// const planeGeometry = new THREE.PlaneGeometry(5000, 5000);
// const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x080A0A, side: THREE.DoubleSide });
// const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// plane.rotation.x = THREE.Math.degToRad(90);
// plane.position.y = 0;
// scene.add(plane);




// const bGeometry = new THREE.BoxGeometry(200, 1000, 200);
// const building = new OutlinedGeometry({ geometry: bGeometry, color: 0x00ff00 });
// scene.add(building);


var params = {
  exposure: 1,
  bloomStrength: 1.3,
  bloomThreshold: 0,
  bloomRadius: 1
};
// var params2 = {
//   exposure: 1,
//   bloomStrength: 1,
//   bloomThreshold: 0,
//   bloomRadius: 0
// };

const renderScene = new THREE.RenderPass(scene, player.camera);
const bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
// const bloomPass2 = new THREE.UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
bloomPass.renderToScreen = true;
bloomPass.threshold = params.bloomThreshold;
bloomPass.strength = params.bloomStrength;
bloomPass.radius = params.bloomRadius;
// bloomPass2.renderToScreen = true;
// bloomPass2.threshold = params2.bloomThreshold;
// bloomPass2.strength = params2.bloomStrength;
// bloomPass2.radius = params2.bloomRadius;

const composer = new THREE.EffectComposer(renderer);
composer.setSize(window.innerWidth, window.innerHeight);
composer.addPass(renderScene);
composer.addPass(bloomPass);
// composer.addPass(bloomPass2);






const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  stats.begin();

  player.update();

  composer.render(clock.getDelta());

  stats.end();
}
animate();