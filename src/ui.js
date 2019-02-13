import * as THREE from 'three';

export default class UI {

  constructor(game) {
    
    this.game = game;
    // this.camera = camera;
    // this.mousePos = new THREE.Vector2();
    // this.raycaster = new THREE.Raycaster();
    // const loader = new THREE.FontLoader();

    // const group = new THREE.Group();
    // // group.name
    // scene.add(group);

    this.startGame = this.startGame.bind(this);
    this.titleUI = document.getElementById('title-ui');
    this.hudUI = document.getElementById('hud-ui');
    this.playButton = document.getElementById('play-button');
    this.playButton.addEventListener('click', this.startGame);

  //   loader.load('src/fonts/Neon Absolute Sans_Regular.json', function (font) {

  //     let geometry = new THREE.TextGeometry('PLAY', {
  //       font: font,
  //       size: 80,
  //       height: 5,
  //       curveSegments: 12,
  //     });

  //     const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
  //     geometry = new THREE.BufferGeometry().fromGeometry(geometry);
  //     geometry.computeBoundingBox();
  //     const mesh = new THREE.Mesh(geometry, material);

  //     const centerOffset = - 0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);
  //     mesh.position.x = centerOffset;
  //     mesh.position.y = 700;
  //     mesh.position.z = -1000;
  //     group.add(mesh);
  //   });

  //   this.onMouseMove = this.onMouseMove.bind(this);
  //   this.onMouseDown = this.onMouseDown.bind(this);
  //   window.addEventListener('mousemove', this.onMouseMove, false);
  //   window.addEventListener('mousedown', this.onMouseDown, false);
  // }

//   onMouseMove(event) {
//     // calculate mouse position in normalized device coordinates
//     // (-1 to +1) for both components

//     this.mousePos.x = (event.clientX / window.innerWidth) * 2 - 1;
//     this.mousePos.y = - (event.clientY / window.innerHeight) * 2 + 1;
// this.onMouseDown();
//   }

//   onMouseDown() {

//     // update the picking ray with the camera and mouse position
//     this.raycaster.setFromCamera(this.mousePos, this.camera);

//     // calculate objects intersecting the picking ray
//     var intersects = this.raycaster.intersectObjects(this.scene.children);

//     for (var i = 0; i < intersects.length; i++) {

//       intersects[i].object.material.color.set(0xff0000);

//     }

  }

  startGame(e) {
    e.preventDefault();
    this.playButton.disabled = true;
    this.game.startCameraTransition();
    this.titleUI.classList.add("transparent");
    console.log('start game')
  }
  
  showTitle() {
    this.playButton.disabled = false;
    this.titleUI.classList.remove("transparent");
  }
  
  showHud() {
    this.hudUI.classList.remove("transparent");
  }
  
  hideHud() {
    this.hudUI.classList.add("transparent");
  }
}