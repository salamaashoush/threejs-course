import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  FontLoader,
  Mesh,
  MeshMatcapMaterial,
  PerspectiveCamera,
  Scene,
  TextBufferGeometry,
  TextureLoader,
  TorusGeometry,
  WebGLRenderer,
} from "three";
import { CANVAS, SIZES } from "../common";

const scene = new Scene();

const textureLoader = new TextureLoader();
const matcapTexture = textureLoader.load("textures/matcaps/8.png");

const fontLoader = new FontLoader();

fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
  const material = new MeshMatcapMaterial({ matcap: matcapTexture });

  const textGeometry = new TextBufferGeometry("Hello Frontmen", {
    font: font,
    size: 0.5,
    height: 0.2,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 5,
  });
  textGeometry.center();

  const text = new Mesh(textGeometry, material);
  scene.add(text);

  const donutGeometry = new TorusGeometry(0.3, 0.2, 32, 64);

  for (let i = 0; i < 100; i++) {
    const donut = new Mesh(donutGeometry, material);
    donut.position.x = (Math.random() - 0.5) * 10;
    donut.position.y = (Math.random() - 0.5) * 10;
    donut.position.z = (Math.random() - 0.5) * 10;
    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;
    const scale = Math.random();
    donut.scale.set(scale, scale, scale);

    scene.add(donut);
  }
});

const camera = new PerspectiveCamera(75, SIZES.width / SIZES.height, 0.1, 100);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
camera.updateProjectionMatrix();
scene.add(camera);

const controls = new OrbitControls(camera, CANVAS);
controls.enableDamping = true;

const renderer = new WebGLRenderer({
  canvas: CANVAS,
});
renderer.setSize(SIZES.width, SIZES.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

const tick = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(tick);
};

tick();
