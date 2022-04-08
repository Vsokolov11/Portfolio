import {OrbitControls} from 'https://unpkg.com/three@0.127.0/examples/jsm/controls/OrbitControls.js';
import * as THREE from 'https://unpkg.com/three@0.127.0/build/three.module.js';

//setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(0);
camera.position.setX(-3);
const bg = new THREE.TextureLoader().load('./images/bg.jpg')
const sunMap = new THREE.TextureLoader().load( "./images/sunmap.png" );
const geometry = new THREE.SphereGeometry( 15, 32, 16 );
const material = new THREE.MeshBasicMaterial( { map: sunMap } );
const sphere = new THREE.Mesh( geometry, material );
sphere.position.setZ(-20);
sphere.position.setX(-5);
scene.add(sphere);
scene.background = bg;

const controls = new OrbitControls(camera, renderer.domElement);

console.log(camera.position, camera.rotation)

//light
const ambLight = new THREE.AmbientLight(0xffffff);
scene.add(ambLight);

//OBJs


//stars
function addStars(){
  const geometry = new THREE.SphereGeometry(0.5, 16,16);
  const material = new THREE.MeshStandardMaterial({color: 0xafd4de});
  const star = new THREE.Mesh(geometry, material);
  const[x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x,y,z);
  scene.add(star);
}

Array(200).fill().forEach(addStars);
//Animation
function update(){
  requestAnimationFrame(update);
  controls.update();
  renderer.render(scene, camera);
}
update();
//Camera movement
function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.005;
  sphere.rotateY(0.005);
}
document.body.onscroll = moveCamera;
  