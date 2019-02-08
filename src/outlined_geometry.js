import * as THREE from 'three';

export default function (geometry, lineColor = 0x00ff00, meshColor = 0x000000, lineWidth=4) {

  const meshMaterial = new THREE.MeshBasicMaterial({
    color: meshColor,
    polygonOffset: true,
    polygonOffsetFactor: 1,
    polygonOffsetUnits: 1
  });
  
  const mesh = new THREE.Mesh(geometry, meshMaterial);
  const geo = new THREE.EdgesGeometry(mesh.geometry);
  const mat = new THREE.LineBasicMaterial({ color: lineColor });
  const wireframe = new THREE.LineSegments(geo, mat);

  const group = new THREE.Group();
  group.add(mesh);
  group.add(wireframe);

  return group;
}
