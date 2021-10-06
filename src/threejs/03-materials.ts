import { GUI } from "dat.gui";
import {
  AmbientLight,
  BoxGeometry,
  Color,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  MeshMatcapMaterial,
  MeshNormalMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Scene,
  SphereGeometry,
  TextureLoader,
  TorusGeometry,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
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

const controls = new OrbitControls(camera, CANVAS);
controls.enableDamping = true;

const renderer = new WebGLRenderer({ canvas: CANVAS });
renderer.setSize(SIZES.width, SIZES.height);

// basic material
// const material = new MeshBasicMaterial({ color: "red" });

// Color
// material.color = new Color("#ff0000");
// material.color = new Color("#f00");
// material.color = new Color("red");
// material.color = new Color("rgb(255, 0, 0)");
// material.color = new Color(0xff0000);

// Wireframe
// material.wireframe = true;

// Opacity
// you should set the transparent property to true to inform Three.js that this material now supports transparency:
// material.transparent = true;
// material.opacity = 0.5;

// Side
// material.side = DoubleSide;

// Mesh Normal material
// const material = new MeshNormalMaterial();
// material.flatShading = true;

// Metcap material
// const textureLoader = new TextureLoader();
// const matcapTexture = textureLoader.load("/textures/matcaps/5.png");
// const material = new MeshMatcapMaterial({ matcap: matcapTexture });

// standard PBR material

const ambientLight = new AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const pointLight = new PointLight(0xffffff, 1);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

const material = new MeshStandardMaterial({
  color: "red",
  roughness: 0.5,
  metalness: 1,
});

// Debug UI
const gui = new GUI();
gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);

// Objects
const sphere = new Mesh(new SphereGeometry(0.5, 32, 32), material);
sphere.position.x = -1.5;

const cube = new Mesh(new BoxGeometry(0.75, 0.75, 0.75), material);

const torus = new Mesh(new TorusGeometry(0.3, 0.2, 32, 64), material);
torus.position.x = 1.5;

const plane = new Mesh(new PlaneGeometry(5, 5), material);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.65;

scene.add(sphere, cube, torus, plane);

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
