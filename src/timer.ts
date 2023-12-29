import { Timer } from "three/examples/jsm/misc/Timer.js";
import { resizeRendererToDisplaySize } from "./utils/resize";
import cube from "./meshes/cube";
import sphere from "./meshes/sphere";
import torus from "./meshes/torus";
import renderer from "./renderer";
import camera from "./camera";
import scene from "./scene";
import controls from "./controls";
import stats from "./utils/stats";
import particles, { particlesCount } from "./points/particles";

const timer = new Timer();

export default timer;

export const tick = () => {
  stats.begin();
  const elapsedTime = timer.getElapsed();
  timer.update();
  cube.rotation.y = elapsedTime * 0.5;
  sphere.rotation.y = elapsedTime * 0.5;
  torus.rotation.y = elapsedTime * 0.5;

  if (resizeRendererToDisplaySize(renderer)) {
    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  for (let i = 0; i < particlesCount; i++) {
    const xIdx = i * 3;
    const yIdx = i * 3 + 1;
    const zIdx = i * 3 + 2;

    const x = particles.geometry.attributes.position.array[xIdx];
    particles.geometry.attributes.position.array[yIdx] = Math.sin(
      elapsedTime + x
    );
  }

  particles.geometry.attributes.position.needsUpdate = true;
  renderer.render(scene, camera);
  controls.update();
  stats.end();
  requestAnimationFrame(tick);
};
