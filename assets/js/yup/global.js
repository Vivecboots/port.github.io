// Import the necessary libraries
import * as THREE from 'three';

// Create a new Three.js scene
const scene = new THREE.Scene();

// Create a new Three.js camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a new Three.js renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a new Three.js geometry for the Earth
const geometry = new THREE.SphereGeometry(1, 32, 32);

// Create a new Three.js material for the Earth
const material = new THREE.MeshBasicMaterial({ color: 0x0000ff });

// Create a new Three.js mesh for the Earth
const earth = new THREE.Mesh(geometry, material);
scene.add(earth);

// Create a new ASCII shader
const ASCIIShader = {
  uniforms: {
    tDiffuse: { value: null },
    resolution: { value: new THREE.Vector2() },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 resolution;
    varying vec2 vUv;
    const vec4 ascii = vec4(
      vec3(0.0, 0.5, 0.5),
      1.0
    );
    void main() {
      gl_FragColor = ascii * texture2D(tDiffuse, vUv);
    }
  `,
};

// Create a new Three.js material using the ASCII shader
const asciiMaterial = new THREE.ShaderMaterial({
  uniforms: ASCIIShader.uniforms,
  vertexShader: ASCIIShader.vertexShader,
  fragmentShader: ASCIIShader.fragmentShader,
});

// Create a new Three.js mesh using the ASCII material
const asciiEarth = new THREE.Mesh(geometry, asciiMaterial);
scene.add(asciiEarth);

// Animate the Earth by rotating it around the Y-axis
function animate() {
  requestAnimationFrame(animate);
  earth.rotation.y += 0.01;
  renderer.render(scene, camera);
}

// Start the animation
animate();