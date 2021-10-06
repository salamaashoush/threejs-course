import { setupBasicExample } from "../common";
import {
  Clock,
  BufferGeometry,
  BufferAttribute,
  PointsMaterial,
  AdditiveBlending,
  Points,
} from "three";

/**
 * Base
 */
const { scene, renderer, controls, gui, camera } = setupBasicExample();

// Galaxy
const parameters = { count: 100000, size: 0.01, radius: 5, branches: 3 };

let geometry: BufferGeometry | null = null;
let material: PointsMaterial | null = null;
let points: Points | null = null;

function createGalaxy() {
  if (points != null && geometry != null && material != null) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }
  geometry = new BufferGeometry();
  const positions = new Float32Array(parameters.count * 3);

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3;
    const radius = Math.random() * parameters.radius;
    const branchAngle = i % parameters.branches;
    positions[i3] = radius;
    positions[i3 + 1] = 0;
    positions[i3 + 2] = 0;
  }
  geometry.setAttribute("position", new BufferAttribute(positions, 3));

  material = new PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: AdditiveBlending,
  });

  points = new Points(geometry, material);
  scene.add(points);
}

createGalaxy();

gui
  .add(parameters, "count")
  .min(100)
  .max(1000000)
  .step(100)
  .onFinishChange(createGalaxy);
gui
  .add(parameters, "size")
  .min(0.001)
  .max(0.1)
  .step(0.001)
  .onFinishChange(createGalaxy);
gui
  .add(parameters, "radius")
  .min(0.01)
  .max(20)
  .step(0.001)
  .onFinishChange(createGalaxy);
gui
  .add(parameters, "branches")
  .min(1)
  .max(20)
  .step(1)
  .onFinishChange(createGalaxy);
/**
 * Animate
 */
const clock = new Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
