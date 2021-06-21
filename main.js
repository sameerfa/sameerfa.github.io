import * as THREE from 'https://cdn.skypack.dev/three';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setX(-50)

//Point Light
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(0,0,-50)
//Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

//light and grid helper
const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(50,50)
//scene.add(lightHelper, gridHelper)

//orbit controls
const controls = new OrbitControls(camera, renderer.domElement);


function addstar(){ //addstar function
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color:0xffffff})
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))

  star.position.set(x, y, z) //setting position
  scene.add(star)
}

//Array(200).fill().forEach(addstar) //randomly generating 200 random stars

//spacetexture
const spaceTexture = new THREE.TextureLoader().load('bg.jpg')
scene.background = spaceTexture

//earthtexture
const earthTexture = new THREE.TextureLoader().load('earth_texture.jpg')
const earthNormalTexture = new THREE.TextureLoader().load('earth_normal_texture.jpg')
//earthShape
const earth = new THREE.Mesh(
  new THREE.SphereGeometry(10, 32, 32, 100),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
    normalMap: earthNormalTexture,
  })
);
scene.add(earth)
earth.position.z = 0
earth.position.setX(-10);

//sun
const sunTexture = new THREE.TextureLoader().load('sun-texture.jpg')
const sun = new THREE.Mesh(
  new THREE.SphereGeometry(545, 50, 50, 100),
  new THREE.MeshStandardMaterial({ map: sunTexture, })
);

scene.add(sun)
sun.position.setZ(-1500)
//moon
const moonTexture = new THREE.TextureLoader().load('moon-texture.jpg')
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32,100),
  new THREE.MeshStandardMaterial({ map:moonTexture, })
);
scene.add(moon)
moon.position.setZ(20)
moon.position.setX(5)
moon.position.setY(-5)


function moveCamera(){
  const t = document.body.getBoundingClientRect().top;
  earth.rotation.x += 0.05;
  earth.rotation.y += 0.075;
  earth.rotation.z += 0.05;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera


function animate(){
  requestAnimationFrame(animate);
  earth.rotation.y += 0.005;
  earth.rotation.y += 0.0005

  sun.rotation.x += 0.001;
  sun.rotation.y += 0.001;
  sun.rotation.z += 0.001;

  moon.rotation.y += 0.01;

  controls.update();

  renderer.render(scene, camera);
}
animate()
