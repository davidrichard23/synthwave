import * as THREE from 'three';

export default function ({geometry, lineColor = 0x00ff00, meshColor = 0x000000, lineWidth=4, tags='', createMesh=true}) {

  const group = new THREE.Group();

  if (createMesh) {
    const meshMaterial = new THREE.MeshBasicMaterial({
      color: meshColor,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1
    });

    const mesh = new THREE.Mesh(geometry, meshMaterial);
    mesh.tags = tags;
    group.add(mesh);
  }
  
  const geo = new THREE.EdgesGeometry(geometry);
  const mat = new THREE.LineBasicMaterial({ color: lineColor });
  const wireframe = new THREE.LineSegments(geo, mat);

  wireframe.tags = tags;

  group.add(wireframe);

  return group;
}
