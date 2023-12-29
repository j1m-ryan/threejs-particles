import * as THREE from "three";
import { particlesMaterial } from "../shared/materials";

const particlesGeometry = new THREE.BufferGeometry();

export const particlesCount = 20000;
const vertices = new Float32Array(particlesCount * 3);
const colors = new Float32Array(particlesCount * 3);

const factor = 10;
for (let i = 0; i < particlesCount; i++) {
  const x = (Math.random() - 0.5) * factor;
  const y = (Math.random() - 0.5) * factor;
  const z = (Math.random() - 0.5) * factor;

  vertices[i * 3] = x;
  vertices[i * 3 + 1] = y;
  vertices[i * 3 + 2] = z;

  colors[i * 3] = Math.random();
  colors[i * 3 + 1] = Math.random();
  colors[i * 3 + 2] = Math.random();
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(vertices, 3)
);

particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

const particles = new THREE.Points(particlesGeometry, particlesMaterial);

export default particles;
