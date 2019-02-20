import Building from './building';

// const COLORS = [
//   0x00FFAE, // teal
//   0x5805FF, // purple
//   0xF300FF, // pink
//   0x00DBFF, // sky blue
//   0x000CFF, // blue
//   0xFF0000, // red
//   0xFFEB00, // yellow
//   0x29FF00, // green
// ];
// const COLORS = [
//   // 0x00EFFF,
//   // 0x00CAFF,
//   // 0x008EFF,
//   // 0x0051FF,
//   // 0x161AFF,
//   0x3D00FF,
//   // 0x7D00FF,
// ];
// 0xBE00FF,
const COLORS = [
  0x460CFE,
  0xBF0CFE,
  0x0C4BFE,
  0x0C8FFE,
];

// const COLORS = [
//   0x00FFF7,
//   0x00AEFF,
//   0x8100FF,
//   0xC600FF,
//   0x00FF92,
//   0xFF8A00,
//   // 0xFF008A,
//   // 0x,
//   // 0x,
// ];

export default class Environment {

  constructor() {
    this.Buildings();
    this.Ground();
  }

  Buildings() {

    const texture = new THREE.TextureLoader().load("src/textures/grid.png");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 12);


    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////////// Left buildings ///////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    for (let i = 0; i < 100; i++) {
      const colorIndex = Math.floor(Math.random() * COLORS.length);
      const height = Math.floor(Math.random() * 600) + 200;
      const building = new Building(texture, COLORS[colorIndex], height);
      building.position.x = -300;
      building.position.y = height/2;
      building.position.z = 1500 - 225 * i;
      game.scene.add(building);
    }

    for (let i = 0; i < 100; i++) {
      const colorIndex = Math.floor(Math.random() * COLORS.length);
      const height = Math.floor(Math.random() * 1100) + 400;
      const building = new Building(texture, COLORS[colorIndex], height);
      building.position.x = -800;
      building.position.y = height/2;
      building.position.z = 1550 - 225 * i - 100;
      game.scene.add(building);
    }

    for (let i = 0; i < 100; i++) {
      const colorIndex = Math.floor(Math.random() * COLORS.length);
      const height = Math.floor(Math.random() * 2000) + 900;
      const building = new Building(texture, COLORS[colorIndex], height);
      building.position.x = -1300;
      building.position.y = height/2;
      building.position.z = 1500 - 225 * i;
      game.scene.add(building);
    }





    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////////// front buildings //////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    for (let i = 0; i < 12; i++) {
      const colorIndex = Math.floor(Math.random() * COLORS.length);
      const height = Math.floor(Math.random() * 1000) + 600;
      const building = new Building(texture, COLORS[colorIndex], height);
      building.position.x = -1300 + 225 * i;
      building.position.y = height / 2;
      building.position.z = -21000;
      game.scene.add(building);
    }

    for (let i = 0; i < 12; i++) {
      const colorIndex = Math.floor(Math.random() * COLORS.length);
      const height = Math.floor(Math.random() * 1500) + 1000;
      const building = new Building(texture, COLORS[colorIndex], height);
      building.position.x = -1300 + 225 * i;
      building.position.y = height / 2;
      building.position.z = -21500;
      game.scene.add(building);
    }

    for (let i = 0; i < 12; i++) {
      const colorIndex = Math.floor(Math.random() * COLORS.length);
      const height = Math.floor(Math.random() * 2000) + 1500;
      const building = new Building(texture, COLORS[colorIndex], height);
      building.position.x = -1300 + 225 * i;
      building.position.y = height / 2;
      building.position.z = -22000;
      game.scene.add(building);
    }

    for (let i = 0; i < 12; i++) {
      const colorIndex = Math.floor(Math.random() * COLORS.length);
      const height = Math.floor(Math.random() * 2000) + 1500;
      const building = new Building(texture, COLORS[colorIndex], height);
      building.position.x = -1300 + 225 * i;
      building.position.y = height / 2;
      building.position.z = -22500;
      game.scene.add(building);
    }

    for (let i = 0; i < 12; i++) {
      const colorIndex = Math.floor(Math.random() * COLORS.length);
      const height = Math.floor(Math.random() * 2000) + 1500;
      const building = new Building(texture, COLORS[colorIndex], height);
      building.position.x = -1300 + 225 * i;
      building.position.y = height / 2;
      building.position.z = -23000;
      game.scene.add(building);
    }







    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////////// Right buildings //////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    for (let i = 0; i < 100; i++) {
      const colorIndex = Math.floor(Math.random() * COLORS.length);
      const height = Math.floor(Math.random() * 600) + 200;
      const building = new Building(texture, COLORS[colorIndex], height);
      building.position.x = 300;
      building.position.y = height/2;
      building.position.z = 1500 - 225 * i;
      game.scene.add(building);
    }

    for (let i = 0; i < 100; i++) {
      const colorIndex = Math.floor(Math.random() * COLORS.length);
      const height = Math.floor(Math.random() * 1100) + 400;
      const building = new Building(texture, COLORS[colorIndex], height);
      building.position.x = 800;
      building.position.y = height/2;
      building.position.z = 1550 - 225 * i;
      game.scene.add(building);
    }

    for (let i = 0; i < 100; i++) {
      const colorIndex = Math.floor(Math.random() * COLORS.length);
      const height = Math.floor(Math.random() * 2000) + 900;
      const building = new Building(texture, COLORS[colorIndex], height);
      building.position.x = 1300;
      building.position.y = height/2;
      building.position.z = 1500 - 225 * i;
      game.scene.add(building);
    }


    ////////////////////////////////////////////////////////////////////////////
    ///////////////////////////// Back buildings ///////////////////////////////
    ////////////////////////////////////////////////////////////////////////////

    for (let i = 0; i < 12; i++) {
      const colorIndex = Math.floor(Math.random() * COLORS.length);
      const height = Math.floor(Math.random() * 1000) + 600;
      const building = new Building(texture, COLORS[colorIndex], height);
      building.position.x = -1300 + 225 * i;
      building.position.y = height / 2;
      building.position.z = 1725;
      game.scene.add(building);
    }

    for (let i = 0; i < 12; i++) {
      const colorIndex = Math.floor(Math.random() * COLORS.length);
      const height = Math.floor(Math.random() * 1500) + 1000;
      const building = new Building(texture, COLORS[colorIndex], height);
      building.position.x = -1300 + 225 * i;
      building.position.y = height / 2;
      building.position.z = 2225;
      game.scene.add(building);
    }

    for (let i = 0; i < 12; i++) {
      const colorIndex = Math.floor(Math.random() * COLORS.length);
      const height = Math.floor(Math.random() * 2000) + 1500;
      const building = new Building(texture, COLORS[colorIndex], height);
      building.position.x = -1300 + 225 * i;
      building.position.y = height / 2;
      building.position.z = 2725;
      game.scene.add(building);
    }

    for (let i = 0; i < 12; i++) {
      const colorIndex = Math.floor(Math.random() * COLORS.length);
      const height = Math.floor(Math.random() * 2000) + 1500;
      const building = new Building(texture, COLORS[colorIndex], height);
      building.position.x = -1300 + 225 * i;
      building.position.y = height / 2;
      building.position.z = -22500;
      game.scene.add(building);
    }

    for (let i = 0; i < 12; i++) {
      const colorIndex = Math.floor(Math.random() * COLORS.length);
      const height = Math.floor(Math.random() * 2000) + 1500;
      const building = new Building(texture, COLORS[colorIndex], height);
      building.position.x = -1300 + 225 * i;
      building.position.y = height / 2;
      building.position.z = 3225;
      game.scene.add(building);
    }
  }

  Ground() {

    const texture = new THREE.TextureLoader().load("src/textures/grid-thin.png");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(250, 250);

    const planeGeometry = new THREE.PlaneGeometry(10000, 20000);
    const planeMaterial = new THREE.MeshPhongMaterial({ color: 0x8326FF, side: THREE.DoubleSide, map:  texture});
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = THREE.Math.degToRad(90);
    plane.position.y = 0;
    plane.params = { tags: ['environment'] };
    game.scene.add(plane);
  }
}