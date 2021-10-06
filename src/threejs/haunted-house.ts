import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GUI } from "dat.gui";
import { CANVAS, SIZES } from "../common";
import {
  Scene,
  TextureLoader,
  Mesh,
  SphereGeometry,
  MeshStandardMaterial,
  PlaneGeometry,
  AmbientLight,
  DirectionalLight,
  PerspectiveCamera,
  WebGLRenderer,
  Clock,
  Group,
  BoxGeometry,
  ConeGeometry,
} from "three";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Scene
const scene = new Scene();

/**
 * Textures
 */
const textureLoader = new TextureLoader();

/**
 * House
 */
const houseWidth = 4;
const houseHeight = 2.5;
const houseDepth = 4;

const house = new Group();
scene.add(house);

// Walls
const walls = new Mesh(
  new BoxGeometry(houseWidth, houseHeight, houseDepth),
  new MeshStandardMaterial({ color: "#ac8e82" })
);
walls.position.y = houseHeight / 2;
house.add(walls);

// Roof
const roofHeight = 1;
const roof = new Mesh(
  new ConeGeometry(3.5, roofHeight, 4),
  new MeshStandardMaterial({ color: "#b35f45" })
);
roof.position.y = houseHeight + roofHeight / 2;
roof.rotation.y = Math.PI * 0.25;
house.add(roof);

// Door
const doorSize = 2;
const door = new Mesh(
  new PlaneGeometry(doorSize, doorSize),
  new MeshStandardMaterial({ color: "#aa7b7b" })
);
door.position.y = doorSize / 2;
door.position.z = houseDepth / 2 + 0.01;
house.add(door);

//Bushes

// Floor
const floor = new Mesh(
  new PlaneGeometry(20, 20),
  new MeshStandardMaterial({ color: "#a9c388" })
);
floor.rotation.x = -Math.PI * 0.5;
floor.position.y = 0;
scene.add(floor);

/**
 * Lights
 */
// Ambient light
const ambientLight = new AmbientLight("#ffffff", 0.5);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const moonLight = new DirectionalLight("#ffffff", 0.5);
moonLight.position.set(4, 5, -2);
gui.add(moonLight, "intensity").min(0).max(1).step(0.001);
gui.add(moonLight.position, "x").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "y").min(-5).max(5).step(0.001);
gui.add(moonLight.position, "z").min(-5).max(5).step(0.001);
scene.add(moonLight);

window.addEventListener("resize", () => {
  // Update SIZES
  SIZES.width = window.innerWidth;
  SIZES.height = window.innerHeight;

  // Update camera
  camera.aspect = SIZES.width / SIZES.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(SIZES.width, SIZES.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new PerspectiveCamera(75, SIZES.width / SIZES.height, 0.1, 100);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, CANVAS);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new WebGLRenderer({
  canvas: CANVAS,
});
renderer.setSize(SIZES.width, SIZES.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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
