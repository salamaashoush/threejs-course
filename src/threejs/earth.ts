import {
  Clock,
  Group,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  SphereGeometry,
  TextureLoader,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CANVAS, SIZES } from "../common";

const renderer = new WebGLRenderer({ canvas: CANVAS });
renderer.setSize(SIZES.width, SIZES.height);

// WebGL background color
renderer.setClearColor("#000", 1);

const camera = new PerspectiveCamera(75, SIZES.width / SIZES.height, 0.1, 1000);
camera.position.z = 5;
camera.updateProjectionMatrix();
camera.lookAt(new Vector3());

const controls = new OrbitControls(camera, CANVAS);
const scene = new Scene();

const geometry = new SphereGeometry(1, 32, 16);

const loader = new TextureLoader();
const earthMap = loader.load("/textures/earth.jpg");
const moonMap = loader.load("/textures/moon.jpg");

const material = new MeshStandardMaterial({
  map: earthMap,
  metalness: 0,
  roughness: 1,
});

const earth = new Mesh(geometry, material);
scene.add(earth);

const moonMaterial = new MeshStandardMaterial({
  map: moonMap,
  metalness: 0,
  roughness: 1,
});

const moonAnchor = new Group();
const moon = new Mesh(geometry, moonMaterial);
moonAnchor.add(moon);
moon.position.x = -2;
moon.position.y = 0.5;
moon.scale.setScalar(0.25);

scene.add(moonAnchor);

const light = new PointLight("white", 1);
light.position.set(2, 2, 2);
scene.add(light);

const clock = new Clock();
function animate() {
  const time = clock.getElapsedTime();
  earth.rotation.y = time * 0.15;
  moon.rotation.y = time * 0.1;
  moonAnchor.rotation.y = time * 0.2;

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
