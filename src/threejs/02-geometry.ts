import {
  BoxGeometry,
  BufferGeometry,
  Clock,
  ConeGeometry,
  CylinderGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SphereGeometry,
  TorusGeometry,
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
camera.updateProjectionMatrix();

const renderer = new WebGLRenderer({ canvas: CANVAS });
renderer.setSize(SIZES.width, SIZES.height);

const material = new MeshBasicMaterial({ color: "blue" });

// const g = new BufferGeometry()

const cube = new Mesh(new BoxGeometry(), material);
cube.position.x = -3;
scene.add(cube);

const sphere = new Mesh(new SphereGeometry(0.5, 16, 16), material);
sphere.position.x = -1.5;
scene.add(sphere);

const plane = new Mesh(new PlaneGeometry(1, 1), material);
scene.add(plane);

const torus = new Mesh(new TorusGeometry(0.3, 0.2, 16, 32), material);
torus.position.x = 1.5;
scene.add(torus);

const cone = new Mesh(new ConeGeometry(0.5, 1, 16, 32), material);
cone.position.x = 3;
scene.add(cone);

const cylinder = new Mesh(new CylinderGeometry(0.3, 0.3, 1, 16, 16), material);
cylinder.position.x = 4.5;
scene.add(cylinder);

const clock = new Clock();

function animate() {
  const elapsedTime = clock.getElapsedTime();

  // Update objects
  cube.rotation.y = 0.1 * elapsedTime;
  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;
  cone.rotation.y = 0.1 * elapsedTime;
  cylinder.rotation.y = 0.1 * elapsedTime;

  cube.rotation.x = 0.15 * elapsedTime;
  sphere.rotation.x = 0.15 * elapsedTime;
  plane.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;
  cone.rotation.x = 0.15 * elapsedTime;
  cylinder.rotation.x = 0.15 * elapsedTime;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
