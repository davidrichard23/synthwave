import * as THREE from 'three';
window.THREE = THREE;
require("three/examples/js/postprocessing/EffectComposer");
require("three/examples/js/postprocessing/UnrealBloomPass");
require("three/examples/js/postprocessing/RenderPass");
require("three/examples/js/postprocessing/ShaderPass");
require("three/examples/js/shaders/LuminosityHighPassShader");
require("three/examples/js/shaders/CopyShader");

import Stats from './stats/stats.min.js';
import Game from './game.js';

window.stats = new Stats();
stats.showPanel(0); 
document.body.appendChild(stats.dom);

new Game();







// const planeGeometry = new THREE.PlaneGeometry(5000, 5000);
// const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x080A0A, side: THREE.DoubleSide });
// const plane = new THREE.Mesh(planeGeometry, planeMaterial);
// plane.rotation.x = THREE.Math.degToRad(90);
// plane.position.y = 0;
// scene.add(plane);









