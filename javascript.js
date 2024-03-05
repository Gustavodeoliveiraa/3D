import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";


let container = document.getElementById("container3D")
let width = container.clientWidth;
let height = container.clientHeight; 

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, width/height, 0.01, 1000);

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let object;
let controls;
let objToRender = 'shirt';

const loader = new GLTFLoader();

loader.load(
  `models/${objToRender}/scene.gltf`,
  function (gltf) {
    object = gltf.scene;
    scene.add(object);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    console.error(error);
  }
);

const renderer = new THREE.WebGLRenderer({ alpha: true }); 
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.setSize(width, height)

// Add the renderer to the DOM
document.getElementById("container3D").appendChild(renderer.domElement);
camera.position.z = 170;

const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
topLight.position.set(500, 500, 500) // top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, objToRender === "shirt" ? 5 : 1);
scene.add(ambientLight);

if (objToRender === "shirt") {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
  }
  
function animate() {
  requestAnimationFrame(animate);
  
  if (object && objToRender === "shirt") {
    object.rotation.y = -3 + mouseX / window.innerWidth * 3;
    object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
  }
  renderer.render(scene, camera);
}

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


document.onmousemove = (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (object && objToRender === "shirt") {
      object.rotation.y = -3 + mouseX / window.innerWidth * 3;
      object.rotation.x = -1.2 + mouseY * 2.5 / window.innerHeight;
    }
}

// Start the 3D rendering
animate();
