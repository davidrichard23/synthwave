
const keys = {
  up: false,
  down: false,
  left: false,
  right: false,
};


var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 25);
camera.lookAt(0, 0, 0);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry(10, 10, 10);
var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

var geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3(-10, 0, 0));
geometry.vertices.push(new THREE.Vector3(0, 10, 0));
geometry.vertices.push(new THREE.Vector3(10, 0, 0));

var line = new THREE.Line(geometry, material);

scene.add(line);

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  if (keys.down) camera.position.z += 1;
  if (keys.up) camera.position.z -= 1;
  if (keys.left) camera.position.x -= 1;
  if (keys.right) camera.position.x += 1;

  renderer.render(scene, camera);
}
animate();


window.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowDown":
      keys.down = true;
      break;
    case "ArrowUp":
      keys.up = true;
      break;
    case "ArrowLeft":
      keys.left = true;
      break;
    case "ArrowRight":
      keys.right = true;
      break;
    default:
      return;
  }

  event.preventDefault();
}, true);

window.addEventListener("keyup", function (event) {
  switch (event.key) {
    case "ArrowDown":
      keys.down = false;
      break;
    case "ArrowUp":
      keys.up = false;
      break;
    case "ArrowLeft":
      keys.left = false;
      break;
    case "ArrowRight":
      keys.right = false;
      break;
    default:
      return;
  }

  event.preventDefault();
}, true);