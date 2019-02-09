import * as THREE from 'three';

var squareOutline = new THREE.TextureLoader().load("src/textures/square-outline.png");
squareOutline.wrapS = THREE.RepeatWrapping;
squareOutline.wrapT = THREE.RepeatWrapping;
squareOutline.repeat.set(1, 1);

export default function ({geometry, texture=squareOutline, lineColor = 0x00ff00, meshColor = 0x000000, lineWidth=4, tags='', createMesh=true}) {

  const group = new THREE.Group();

  
  
  if (createMesh) {
    const meshMaterial = new THREE.MeshBasicMaterial({
      color: lineColor,
      map: texture,
      // polygonOffset: true,
      // polygonOffsetFactor: 1,
      // polygonOffsetUnits: 1
    });

    const mesh = new THREE.Mesh(geometry, meshMaterial);
    mesh.tags = tags;
    group.add(mesh);
  }
  
  // const geo = new THREE.EdgesGeometry(geometry);
  // const mat = new THREE.LineBasicMaterial({ color: lineColor });
  // const wireframe = new THREE.LineSegments(geo, mat);

  // wireframe.tags = tags;

  // group.add(wireframe);

  return group;
}
