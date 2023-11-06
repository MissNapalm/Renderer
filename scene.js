// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

// Create a renderer with an alpha background (transparent)
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a wireframe pyramid
const pyramidGeometry = new THREE.ConeGeometry(1, 2, 4);
const pyramidMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
const pyramid = new THREE.Mesh(pyramidGeometry, pyramidMaterial);
scene.add(pyramid);

// Set a clear color with alpha
renderer.setClearColor(0x000000, 0);

// Set the camera position
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);

// Create an animation loop
const animate = function () {
    requestAnimationFrame(animate);

    // Rotate the pyramid
    pyramid.rotation.y += 0.01;
    pyramid.rotation.x += 0.01;

    renderer.render(scene, camera);
};

// Start the animation loop
animate();
