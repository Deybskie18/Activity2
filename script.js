import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.154.0/build/three.module.js';

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75, // Field of view
  window.innerWidth / window.innerHeight, // Aspect ratio
  0.1, // Near clipping plane
  1000 // Far clipping plane
);
camera.position.z = 10;
camera.position.y = 2;

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true
document.body.appendChild(renderer.domElement);

// Texture Loader
const textureLoader = new THREE.TextureLoader();

// Add background picture
const backgroundTexture = textureLoader.load('./assets/background.jpg');
scene.background = backgroundTexture;

// Building house
const group = new THREE.Group()
group.rotation.y = 0.5
scene.add(group)

// Add window
const windowTexture = textureLoader.load('./assets/window.jpg');
const houseWindow = new THREE.Mesh(
  new THREE.BoxGeometry(1.5, 2, 0.5),
  new THREE.MeshLambertMaterial({ map: windowTexture })
)
houseWindow.position.x = - 1.4
houseWindow.position.y = - 0.1
houseWindow.position.z = - 0.2
group.add(houseWindow)

// Load grass texture for the ground
const grassTexture = textureLoader.load('./assets/grass.png');
const ground = new THREE.Mesh(
  new THREE.BoxGeometry(40, 0.2, 40),
  new THREE.MeshLambertMaterial({ map: grassTexture })
)
ground.position.y = - 2
ground.receiveShadow = true
group.add(ground)

// House's body
const houseTexture = textureLoader.load('./assets/wall.jpg');
const house = new THREE.Mesh(
  new THREE.BoxGeometry(7, 5, 10),
  new THREE.MeshLambertMaterial({ map: houseTexture })
)
house.position.y = 1
house.position.y = 0.5
house.position.z = -5
house.receiveShadow = true
house.castShadow = true
group.add(house)

// Roof
const geometry = new THREE.BoxGeometry(8, 0.4, 11)
const material = new THREE.MeshLambertMaterial({ color: 0xffaacc})
const roof = new THREE.Mesh(geometry, material)
roof.position.z = - 4
roof.position.y = 2.3
group.add(roof)

const roof2 = new THREE.Mesh(geometry, material)
roof2.position.z = - 4
roof2.position.y = 3
group.add(roof2)


// For the door
const doorTexture = textureLoader.load('./assets/door.jpg');
const door = new THREE.Mesh(
  new THREE.BoxGeometry(2.5, 3, 1),
  new THREE.MeshLambertMaterial({ map: doorTexture })
)
door.position.y = - 0.4
door.position.x = 1.5
door.position.z = - 0.4
group.add(door)




// Charr
const pointLight = new THREE.PointLight(0xff9000, 0.5)
scene.add(pointLight)
pointLight.position.set(1, - 0.5, 1)

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 1, 1)
scene.add(rectAreaLight)
rectAreaLight.position.set(- 1.5, 0, 1.5)
rectAreaLight.lookAt(new THREE.Vector3())

const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1,
  0.25, 1)
  spotLight.position.set(0, 2, 3)
  scene.add(spotLight)
spotLight.target.position.x = - 0.75





// Lighting
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
light.castShadow = true
scene.add(light);

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Render the scene
  renderer.render(scene, camera);
}

animate();

// Resize handler
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
