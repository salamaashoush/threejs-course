import { GUI } from "dat.gui";
import { PerspectiveCamera, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./style.css";
export const SIZES = {
  width: window.innerWidth,
  height: window.innerHeight,
};

export const CANVAS = document.querySelector<HTMLCanvasElement>("#canvas")!;
CANVAS.width = SIZES.width;
CANVAS.height = SIZES.height;

export function setupBasicExample() {
  // Debug
  const gui = new GUI();

  // Scene
  const scene = new Scene();
  /**
   * Camera
   */
  // Base camera
  const camera = new PerspectiveCamera(
    75,
    SIZES.width / SIZES.height,
    0.1,
    100
  );
  camera.position.x = 3;
  camera.position.y = 3;
  camera.position.z = 3;
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

  window.addEventListener("resize", () => {
    // Update sizes
    SIZES.width = window.innerWidth;
    SIZES.height = window.innerHeight;

    // Update camera
    camera.aspect = SIZES.width / SIZES.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(SIZES.width, SIZES.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
  return {
    renderer,
    scene,
    camera,
    controls,
    gui,
    SIZES,
    CANVAS,
  };
}
