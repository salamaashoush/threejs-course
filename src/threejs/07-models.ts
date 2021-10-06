import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  AmbientLight,
  Clock,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  PCFSoftShadowMap,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  WebGLRenderer,
} from "three";

import { CANVAS, SIZES } from "../common";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// 3D file formats https://en.wikipedia.org/wiki/List_of_file_formats#3D_graphics
// glTF https://en.wikipedia.org/wiki/GlTF
const renderer = new WebGLRenderer({ canvas: CANVAS });
renderer.setSize(SIZES.width, SIZES.height);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
renderer.setSize(SIZES.width, SIZES.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Scene
const scene = new Scene();

// Base camera
const camera = new PerspectiveCamera(75, SIZES.width / SIZES.height, 0.1, 100);
camera.position.set(2, 2, 2);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, CANVAS);
controls.target.set(0, 0.75, 0);
controls.enableDamping = true;

// Floor
const floor = new Mesh(
  new PlaneGeometry(10, 10),
  new MeshStandardMaterial({
    color: "#444444",
    metalness: 0,
    roughness: 0.5,
  })
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

// Lights
const ambientLight = new AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new DirectionalLight(0xffffff, 0.6);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

const gltfLoader = new GLTFLoader();

gltfLoader.load("/models/Car/scene.gltf", (obj) => {
  scene.add(obj.scene.children[0]);
});
const clock = new Clock();
function animate() {
  const time = clock.getElapsedTime();

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
