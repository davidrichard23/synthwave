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
  0x0CC4FE,
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
    // const building = new Building();
    // const building2 = new Building(0x5805FF, 1000);

    // building.position.x = -1000;
    // building.position.y = 350;
    // game.scene.add(building);

    // building2.position.x = -1000;
    // building2.position.y = 500;
    // building2.position.z = 250;
    // game.scene.add(building2);

    var texture = new THREE.TextureLoader().load("src/textures/grid.png");
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 12);

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

    // const colorIndex1 = Math.floor(Math.random() * COLORS.length);
    // const height1 = Math.floor(Math.random() * 1400) + 1000;
    // const building1 = new Building(COLORS[colorIndex1], height1);
    // building1.position.x = -112;
    // building1.position.y = height1 / 2;
    // building1.position.z = -1500 - 225;
    // game.scene.add(building1);

    // const colorIndex2 = Math.floor(Math.random() * COLORS.length);
    // const height2 = Math.floor(Math.random() * 1400) + 1000;
    // const building2 = new Building(COLORS[colorIndex2], height2);
    // building2.position.x = 112;
    // building2.position.y = height2 / 2;
    // building2.position.z = -1500 - 225;
    // game.scene.add(building2);



    // for (let i = 0; i < 22; i++) {
    //   const colorIndex = Math.floor(Math.random() * COLORS.length);
    //   const height = Math.floor(Math.random() * 1700) + 100;
    //   const building = new Building(COLORS[colorIndex], height);
    //   building.position.x = -550;
    //   building.position.y = height/2;
    //   building.position.z = -2500 + 225 * i - 100;
    //   game.scene.add(building);
    // }

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
      const height = Math.floor(Math.random() * 2000) + 100;
      const building = new Building(texture, COLORS[colorIndex], height);
      building.position.x = 1300;
      building.position.y = height/2;
      building.position.z = 1500 - 225 * i;
      game.scene.add(building);
    }

    // const colorIndex3 = Math.floor(Math.random() * COLORS.length);
    // const height3 = Math.floor(Math.random() * 1400) + 1000;
    // const building3 = new Building(COLORS[colorIndex3], height3);
    // building3.position.x = -112;
    // building3.position.y = height3 / 2;
    // building3.position.z = 1400 + 225;
    // game.scene.add(building3);

    // const colorIndex4 = Math.floor(Math.random() * COLORS.length);
    // const height4 = Math.floor(Math.random() * 1400) + 1000;
    // const building4 = new Building(COLORS[colorIndex4], height4);
    // building4.position.x = 112;
    // building4.position.y = height4 / 2;
    // building4.position.z = 1400 + 225;
    // game.scene.add(building4);




    // for (let i = 0; i < 22; i++) {
    //   const colorIndex = Math.floor(Math.random() * COLORS.length);
    //   const height = Math.floor(Math.random() * 1700) + 100;
    //   const building = new Building(COLORS[colorIndex], height);
    //   building.position.x = 550;
    //   building.position.y = height/2;
    //   building.position.z = -2500 + 225 * i - 100;
    //   game.scene.add(building);
    // }
  }

  Ground() {
    const width = 100;
    const length = 3500;
    const spacing = 15;
    const startX = -width/2;
    const startY = -length/2;
    const lineMaterial = new THREE.MeshLambertMaterial({ color: 0x2E0088 });

    for (let i = 0; i < width/spacing; i++) {
      const geometry = new THREE.Geometry();
      geometry.vertices.push(new THREE.Vector3(startX + spacing * i, 0, -length/2));
      geometry.vertices.push(new THREE.Vector3(startX + spacing * i, 0, length/2));

      const line = new THREE.Line(geometry, lineMaterial);
      line.params = {tags: ['environment']};
      game.scene.add(line);
    }

    for (let i = 0; i < length/spacing; i++) {
      const geometry = new THREE.Geometry();
      geometry.vertices.push(new THREE.Vector3(-length/2, 0, startY + spacing * i));
      geometry.vertices.push(new THREE.Vector3(length/2, 0, startY + spacing * i));

      const line = new THREE.Line(geometry, lineMaterial);
      line.params = {tags: ['environment']};
      game.scene.add(line);
    }
  }
}