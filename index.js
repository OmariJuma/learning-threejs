import * as THREE from "three";
import {OrbitControls} from "jsm/controls/OrbitControls.js";
import getStarfield from "./src/getStarfield.js";
const w = window.innerWidth;
const h = window.innerHeight;
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({antialias: true});

const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far)
camera.position.z = 5;

renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

const earthGroup = new THREE.Group();
earthGroup.rotation.z = -23.4 * Math.PI/180;
scene.add(earthGroup);

new OrbitControls(camera, renderer.domElement);
const loader = new THREE.TextureLoader();
const geometry = new THREE.IcosahedronGeometry(1,12);
const material = new THREE.MeshStandardMaterial({
//   map: loader.load("./textures/earth-daymap.jpg")
  map: loader.load("./textures/earth-map-5k.jpg")

})

const earthMesh = new THREE.Mesh(geometry, material);
scene.add(earthMesh);

const stars = getStarfield(2000);
scene.add(stars);
const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff)

scene.add(hemiLight)

function animate() {
    requestAnimationFrame(animate);
    // earthMesh.rotation.x +=0.001;
    earthMesh.rotation.y +=0.001;

    renderer.render(scene, camera);
    // controls.update();

}
animate()


