import {
  BoxGeometry,
  Clock,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  NearestFilter,
  PerspectiveCamera,
  PointLight,
  RepeatWrapping,
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

const camera = new PerspectiveCamera(75, SIZES.width / SIZES.height, 0.1, 1000);
camera.position.z = 5;
camera.updateProjectionMatrix();
camera.lookAt(new Vector3());

const controls = new OrbitControls(camera, CANVAS);
controls.enableDamping = true;

const scene = new Scene();

const textureLoader = new TextureLoader();
// const colorTexture = textureLoader.load("/textures/checkerboard-1024x1024.png");
const colorTexture = textureLoader.load("/textures/checkerboard-8x8.png");
// const colorTexture = textureLoader.load(
//   "/textures/minecraft.png",
//   () => {
//     console.log("textureLoader: loading finished");
//   },
//   () => {
//     console.log("textureLoader: loading progressing");
//   },
//   () => {
//     console.log("textureLoader: loading error");
//   }
// );
colorTexture.wrapS = RepeatWrapping;
colorTexture.wrapT = RepeatWrapping;
colorTexture.repeat.x = 2;
colorTexture.repeat.y = 3;
// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;
// colorTexture.rotation = Math.PI * 0.25;
// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;
// colorTexture.generateMipmaps = false;
colorTexture.minFilter = NearestFilter;
colorTexture.magFilter = NearestFilter;
const pointLight = new PointLight(0xff9000, 1);
// You can move it like any object
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight);

const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
const heightTexture = textureLoader.load("/textures/door/height.jpg");
const normalTexture = textureLoader.load("/textures/door/normal.jpg");
const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
const roughnessTexture = textureLoader.load("/textures/door/roughness.jpg");

const geometry = new BoxGeometry(1, 1, 1);
const material = new MeshStandardMaterial({ map: colorTexture });
// material.displacementScale = 0.05;
// material.transparent = true;
const mesh = new Mesh(geometry, material);
scene.add(mesh);

const clock = new Clock();
function animate() {
  const time = clock.getElapsedTime();

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
