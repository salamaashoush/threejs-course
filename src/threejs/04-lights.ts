import {
  AmbientLight,
  BoxGeometry,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Scene,
  SphereGeometry,
  SpotLight,
  TorusGeometry,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CANVAS, SIZES } from "../common";

const scene = new Scene();
const camera = new PerspectiveCamera(75, SIZES.width / SIZES.height, 0.1, 1000);
camera.position.z = 5;

camera.updateProjectionMatrix();

const controls = new OrbitControls(camera, CANVAS);
controls.enableDamping = true;

const renderer = new WebGLRenderer({ canvas: CANVAS });
renderer.setSize(SIZES.width, SIZES.height);

// Material
const material = new MeshStandardMaterial();
material.roughness = 0.4;

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

/**
 * The AmbientLight applies omnidirectional lighting on all geometries of the scene. The first parameter is the color and the second parameter is the intensity
 */
// const ambientLight = new AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

/**
 * The DirectionalLight will have a sun-like effect as if the sun rays were traveling in parallel. The first parameter is the color and the second parameter is the intensity
 */
// const directionalLight = new DirectionalLight(0x00fffc, 0.3);
// scene.add(directionalLight);

/**
 * By default, the light will seems to come from above. To change that, you must move the whole light by using the position property like if it were a normal object.
 */
// directionalLight.position.set(1, 0.25, 0);

/**
 * The PointLight is almost like a lighter. The light source is infinitely small, and the light spreads uniformly in every direction. The first parameter is the color and the second parameter is the intensity
 */
// const pointLight = new PointLight(0xff9000, 0.5);
// // You can move it like any object
// pointLight.position.set(1, -0.5, 1);
// scene.add(pointLight);

/**
 The SpotLight works like a flashlight. It's a cone of light starting at a point and oriented in a direction. Here the list of its parameters:
  color: the color
  intensity: the strength
  distance: the distance at which the intensity drops to 0
  angle: how large is the beam
  penumbra: how diffused is the contour of the beam
  decay: how fast the light dims
 */
// const spotLight = new SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1);
// spotLight.position.set(0, 2, 3);
// scene.add(spotLight);

function animate() {
  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

animate();
