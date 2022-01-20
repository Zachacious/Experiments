import { WEBGL } from "./WebGL";
import {
  BoxBufferGeometry,
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  WebGLRenderer,
  PointLight,
  PlaneGeometry,
  MeshStandardMaterial,
  AmbientLight,
  PointLightHelper,
  DirectionalLight,
  DirectionalLightHelper,
} from "three";

import { OrbitControls } from "./camera/OrbitControls";

let camera, scene, renderer;

class App {
  init() {
    if (!WEBGL.getWebGLErrorMessage()) {
      const warning = WEBGL.getWebGLErrorMessage();
      document.getElementById("container").appendChild(warning);
    }

    camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    scene = new Scene();

    // const geometry = new BoxBufferGeometry(200, 200, 200);
    const geometry = new BoxGeometry();
    const material = new MeshStandardMaterial({ color: 0x00ff00 });

    const ambientLight = new AmbientLight(0x404040); // soft white light
    scene.add(ambientLight);

    //Create a PointLight and turn on shadows for the light
    // const light = new PointLight(0xffffff, 1, 100);
    const light = new DirectionalLight(0xffffff, 1);
    light.position.set(5, 10, 3);
    light.castShadow = true; // default false
    scene.add(light);

    //Set up shadow properties for the light
    light.shadow.mapSize.width = 1024; // default
    light.shadow.mapSize.height = 1024; // default
    light.shadow.camera.near = 0.5; // default
    light.shadow.camera.far = 500; // default

    // const sphereSize = 1;
    // const pointLightHelper = new PointLightHelper(light, sphereSize);
    // scene.add(pointLightHelper);

    const helper = new DirectionalLightHelper(light, 5);
    scene.add(helper);

    const mesh = new Mesh(geometry, material);
    mesh.castShadow = true; //default is false
    mesh.receiveShadow = true; //default
    scene.add(mesh);

    light.target = mesh;

    //Create a plane that receives shadows (but does not cast them)
    const planeGeometry = new PlaneGeometry(20, 20, 32, 32);
    const planeMaterial = new MeshStandardMaterial({ color: 0x00ff00 });
    const plane = new Mesh(planeGeometry, planeMaterial);
    plane.rotateX((-90 * Math.PI) / 180);
    plane.position.setY(-0.5);
    plane.receiveShadow = true;
    plane.castShadow = true;
    scene.add(plane);

    renderer = new WebGLRenderer({
      antialias: true,
      shadowMap: { enabled: true },
    });
    renderer.shadowMap.enabled = true;
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener("resize", onWindowResize, false);

    const controls = new OrbitControls(camera, renderer.domElement);

    animate();
  }
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

export default App;
