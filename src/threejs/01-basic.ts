import {
  BoxGeometry,
  Clock,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
} from "three";
import { CANVAS, SIZES } from "../common";

const scene = new Scene();
const camera = new PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new WebGLRenderer({ canvas: CANVAS });
renderer.setSize(SIZES.width, SIZES.height);

const geometry = new BoxGeometry();
const material = new MeshBasicMaterial({ color: "red" });

const cube = new Mesh(geometry, material);
// Explain position, scale, rotation
cube.position.x = 0.5;
// cube.position.y = 1;
// cube.scale.x = 5;

scene.add(cube);

camera.updateProjectionMatrix();

// Try animation with clock

const clock = new Clock();
function animate() {
  // const time = clock.getElapsedTime();
  // cube.rotation.x += 0.1 * time;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

// Try OrbitControls with damping
