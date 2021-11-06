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
camera.position.z = 5;
camera.aspect = SIZES.width / SIZES.height;
const renderer = new WebGLRenderer({ canvas: CANVAS });
renderer.setSize(SIZES.width, SIZES.height);

const geometry = new BoxGeometry();
const material = new MeshBasicMaterial({ color: "green" });

const cube = new Mesh(geometry, material);

// Explain position, scale, rotation

scene.add(cube);

// camera.updateProjectionMatrix();

// Try animation with clock

const clock = new Clock();
function animate() {
  const time = clock.getElapsedTime();
  cube.rotation.x = 0.1 * time;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();

// Try OrbitControls with damping
