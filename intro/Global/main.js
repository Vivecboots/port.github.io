import './style.css'
// create a new Three.js scene
const scene = new THREE.Scene();

// create a new Three.js camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// create a new Three.js renderer and set its size
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

// add the renderer element to the page
document.body.appendChild(renderer.domElement);
