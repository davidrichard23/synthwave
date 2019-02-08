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

  constructor(scene) {
    this.scene = scene;

    this.Buildings();
    this.Ground();
  }

  Buildings() {
    // const building = new Building();
    // const building2 = new Building(0x5805FF, 1000);

    // building.position.x = -1000;
    // building.position.y = 350;
    // this.scene.add(building);

    // building2.position.x = -1000;
    // building2.position.y = 500;
    // building2.position.z = 250;
    // this.scene.add(building2);

    for (let i = 0; i < 22; i++) {
      const colorIndex = Math.floor(Math.random() * COLORS.length);
      const height = Math.floor(Math.random() * 1400) + 400;
      const building = new Building(COLORS[colorIndex], height);
      building.position.x = -300;
      building.position.y = height/2;
      building.position.z = -2500 + 225 * i;
      this.scene.add(building);
    }
    // for (let i = 0; i < 22; i++) {
    //   const colorIndex = Math.floor(Math.random() * COLORS.length);
    //   const height = Math.floor(Math.random() * 1700) + 100;
    //   const building = new Building(COLORS[colorIndex], height);
    //   building.position.x = -550;
    //   building.position.y = height/2;
    //   building.position.z = -2500 + 225 * i - 100;
    //   this.scene.add(building);
    // }

    for (let i = 0; i < 22; i++) {
      const colorIndex = Math.floor(Math.random() * COLORS.length);
      const height = Math.floor(Math.random() * 1400) + 400;
      const building = new Building(COLORS[colorIndex], height);
      building.position.x = 300;
      building.position.y = height/2;
      building.position.z = -2500 + 225 * i;
      this.scene.add(building);
    }

    // for (let i = 0; i < 22; i++) {
    //   const colorIndex = Math.floor(Math.random() * COLORS.length);
    //   const height = Math.floor(Math.random() * 1700) + 100;
    //   const building = new Building(COLORS[colorIndex], height);
    //   building.position.x = 550;
    //   building.position.y = height/2;
    //   building.position.z = -2500 + 225 * i - 100;
    //   this.scene.add(building);
    // }
  }

  Ground() {
    const width = 5000;
    const length = 5000;
    const spacing = 15;
    const startX = -width/2;
    const startY = -length/2;
    const lineMaterial = new THREE.MeshLambertMaterial({ color: 0x2E0088 });

    for (let i = 0; i < width/spacing; i++) {
      const geometry = new THREE.Geometry();
      geometry.vertices.push(new THREE.Vector3(startX + spacing * i, 0, -length/2));
      geometry.vertices.push(new THREE.Vector3(startX + spacing * i, 0, length/2));

      const line = new THREE.Line(geometry, lineMaterial);
      this.scene.add(line);
    }

    for (let i = 0; i < length/spacing; i++) {
      const geometry = new THREE.Geometry();
      geometry.vertices.push(new THREE.Vector3(-length/2, 0, startY + spacing * i));
      geometry.vertices.push(new THREE.Vector3(length/2, 0, startY + spacing * i));

      const line = new THREE.Line(geometry, lineMaterial);
      this.scene.add(line);
    }
  }
}