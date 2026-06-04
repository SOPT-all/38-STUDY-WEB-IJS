import { writeFile } from 'node:fs/promises';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter.js';

globalThis.FileReader = class {
  result = null;
  onloadend = null;

  async readAsArrayBuffer(blob) {
    this.result = await blob.arrayBuffer();
    this.onloadend?.();
  }
};

const scene = new THREE.Scene();

const donut = new THREE.Mesh(
  new THREE.TorusGeometry(1, 0.38, 48, 128),
  new THREE.MeshStandardMaterial({
    color: '#d99a45',
    roughness: 0.55,
    metalness: 0.02,
  }),
);
donut.rotation.x = Math.PI / 2;
donut.castShadow = true;
donut.receiveShadow = true;
scene.add(donut);

const icing = new THREE.Mesh(
  new THREE.TorusGeometry(1, 0.2, 32, 128),
  new THREE.MeshStandardMaterial({
    color: '#8a3f22',
    roughness: 0.35,
    metalness: 0.02,
  }),
);
icing.position.y = 0.2;
icing.rotation.x = Math.PI / 2;
icing.scale.set(1.03, 1.03, 0.35);
icing.castShadow = true;
scene.add(icing);

const sprinkleColors = ['#ffffff', '#ffcf33', '#ff6b8a', '#78d6ff', '#7bd66f'];

for (let i = 0; i < 36; i += 1) {
  const angle = (i / 36) * Math.PI * 2;
  const radius = 0.78 + Math.random() * 0.42;
  const sprinkle = new THREE.Mesh(
    new THREE.BoxGeometry(0.16, 0.035, 0.035),
    new THREE.MeshStandardMaterial({
      color: sprinkleColors[i % sprinkleColors.length],
      roughness: 0.4,
    }),
  );

  sprinkle.position.set(Math.cos(angle) * radius, 0.45, Math.sin(angle) * radius);
  sprinkle.rotation.set(Math.random() * Math.PI, angle, Math.random() * Math.PI);
  scene.add(sprinkle);
}

const exporter = new GLTFExporter();
const glb = await exporter.parseAsync(scene, { binary: true });

await writeFile(new URL('../public/donut.glb', import.meta.url), Buffer.from(glb));
