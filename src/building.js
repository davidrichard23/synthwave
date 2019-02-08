import * as THREE from 'three';
import OutlinedGeometry from './outlined_geometry';

export default class Building {
  constructor(color = 0x00FFAE, height = 700, width = 200) {

    this.windowWidth = 50;
    this.windowPadding = 15;
    this.width = width;
    this.height = height;
    this.windowCountX = Math.floor(width/(this.windowWidth + this.windowPadding));
    this.windowCountY = Math.floor(height / (this.windowWidth + this.windowPadding));

    this.group = new THREE.Group();
    this.lineMaterial = new THREE.LineBasicMaterial({ color });
    const buildingGeometry = new THREE.BoxGeometry(width, height, width);
    const building = new OutlinedGeometry(buildingGeometry, color);
    this.group.add(building);
    this.windows();
    
    return this.group;
  }
  
  windows() {
    for (let i = 0; i < 4; i++) {
      const sideGroup = new THREE.Group();
      this.buildingSide(sideGroup);
      sideGroup.rotation.y = THREE.Math.degToRad(90 * i);
      this.group.add(sideGroup);
    }
  }
  
  buildingSide(sideGroup) {
    for (let i = 0; i < this.windowCountY; i++) {
      this.windowRow(sideGroup, i);
    }

  }

  windowRow(sideGroup, row) {
    const totalWindowWidth = this.windowCountX * (this.windowWidth + this.windowPadding);
    const startX = -this.width/2 + (this.width - totalWindowWidth + this.windowPadding) / 2;
    const startY = -this.height / 2 + this.windowWidth / 2 + (this.windowWidth + this.windowPadding) * row;
    
    for (let col = 0; col < this.windowCountX; col++) {
      const left = startX + this.windowWidth * col + this.windowPadding * col;
      const right = startX + this.windowWidth * (col + 1) + this.windowPadding * col;
      const bottom = startY;
      const top = startY + this.windowWidth;
  
      const geometry = new THREE.Geometry();
      geometry.vertices.push(new THREE.Vector3(left, bottom, this.width / 2 + 1));
      geometry.vertices.push(new THREE.Vector3(left, top, this.width / 2 + 1));
      geometry.vertices.push(new THREE.Vector3(right, top, this.width / 2 + 1));
      geometry.vertices.push(new THREE.Vector3(right, bottom, this.width / 2 + 1));
      geometry.vertices.push(new THREE.Vector3(left, bottom, this.width / 2 + 1));
  
      const line = new THREE.Line(geometry, this.lineMaterial);
      sideGroup.add(line);
    }
  }
}


