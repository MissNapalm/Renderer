// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

// Create a renderer with an alpha background (transparent)
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set a black background
renderer.setClearColor(0x000000, 1);

// Create a wireframe object
const wireframeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true });
let wireframe = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 4), wireframeMaterial);
scene.add(wireframe);

// Set the camera position
camera.position.set(0, 0, 5);
camera.lookAt(0, 0, 0);

// Define shape options
const shapeOptions = {
    cube: new THREE.BoxGeometry(1, 1, 1),
    pyramid: new THREE.ConeGeometry(1, 2, 4),
    sphere: new THREE.SphereGeometry(1, 32, 32),
};

// Initialize shape and rotation parameters
let currentShape = 'cube';
let xRotationSpeed = 0.01;
let yRotationSpeed = 0.01;
let objectSize = 1;

// Create user input forms
const createInput = (label, id, initialValue) => {
    const inputForm = document.createElement("div");
    inputForm.innerHTML = `${label}: <input type='number' id='${id}' value='${initialValue}'>`;
    return inputForm;
};

const xSpeedInput = createInput("Rotation Speed (X-Axis)", "xSpeed", xRotationSpeed);
const ySpeedInput = createInput("Rotation Speed (Y-Axis)", "ySpeed", yRotationSpeed);
const objectSizeInput = createInput("Size of Object", "objectSize", objectSize);

// Create shape selector dropdown
const shapeSelector = document.createElement("div");
shapeSelector.innerHTML = "Select Shape: <select id='shapeSelect'><option value='cube'>Cube</option><option value='pyramid'>Pyramid</option><option value='sphere'>Sphere</option></select>";

// Append input forms to the document
document.body.appendChild(xSpeedInput);
document.body.appendChild(ySpeedInput);
document.body.appendChild(objectSizeInput);
document.body.appendChild(shapeSelector);

// Function to update the wireframe object based on user input
const updateWireframe = () => {
    scene.remove(wireframe);
    wireframe = new THREE.Mesh(shapeOptions[currentShape], wireframeMaterial);
    wireframe.scale.set(objectSize, objectSize, objectSize);
    scene.add(wireframe);
};

// Function to handle user input changes
const handleInputChange = () => {
    xRotationSpeed = parseFloat(document.getElementById('xSpeed').value);
    yRotationSpeed = parseFloat(document.getElementById('ySpeed').value);
    objectSize = parseFloat(document.getElementById('objectSize').value);
    currentShape = document.getElementById('shapeSelect').value;

    updateWireframe();
};

// Listen for changes in input fields and shape selector
xSpeedInput.querySelector("input").addEventListener('input', handleInputChange);
ySpeedInput.querySelector("input").addEventListener('input', handleInputChange);
objectSizeInput.querySelector("input").addEventListener('input', handleInputChange);
shapeSelector.querySelector("select").addEventListener('change', handleInputChange);

// Create an animation loop
const animate = function () {
    requestAnimationFrame(animate);

    // Rotate the object based on user-defined speeds
    wireframe.rotation.y += yRotationSpeed;
    wireframe.rotation.x += xRotationSpeed;

    renderer.render(scene, camera);
};

// Start the animation loop
animate();
