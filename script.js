// Your JavaScript code for the 3D wireframe rendering goes here
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0, 5);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight - 40);
document.getElementById('viewer-container').appendChild(renderer.domElement);

let currentShape = 'cube';
let rotationDirection = 'clockwise';
let xRotationSpeed = 0.01;
let yRotationSpeed = 0.01;
let zRotationSpeed = 0.01;
let wireframeColor = '#ff0000';
let backgroundColor = '#000000';
let objectSize = 1;

function createWireframe(shape, wireframeColor) {
    const wireframeMaterial = new THREE.MeshBasicMaterial({ color: wireframeColor, wireframe: true });
    let wireframe;

    switch (shape) {
        case 'cube':
            wireframe = new THREE.Mesh(new THREE.BoxGeometry(objectSize, objectSize, objectSize), wireframeMaterial);
            break;
        case 'sphere':
            wireframe = new THREE.Mesh(new THREE.SphereGeometry(objectSize, 32, 32), wireframeMaterial);
            break;
        case 'cylinder':
            wireframe = new THREE.Mesh(new THREE.CylinderGeometry(objectSize, objectSize, objectSize * 2, 32), wireframeMaterial);
            break;
        default:
            wireframe = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), wireframeMaterial);
            break;
    }

    wireframe.position.set(0, 0, 0);
    return wireframe;
}

function updateWireframe() {
    const oldWireframe = scene.getObjectByName('wireframe');
    scene.remove(oldWireframe);

    currentShape = document.getElementById('shapeSelect').value;
    rotationDirection = document.getElementById('rotationDirection').value;
    xRotationSpeed = parseFloat(document.getElementById('xRotationSpeed').value);
    yRotationSpeed = parseFloat(document.getElementById('yRotationSpeed').value);
    zRotationSpeed = parseFloat(document.getElementById('zRotationSpeed').value);
    wireframeColor = document.getElementById('wireframeColor').value;
    backgroundColor = document.getElementById('backgroundColor').value;
    objectSize = parseFloat(document.getElementById('objectSize').value);

    const wireframe = createWireframe(currentShape, wireframeColor);
    wireframe.name = 'wireframe';
    scene.add(wireframe);
    renderer.setClearColor(backgroundColor, 1);
}

document.getElementById('renderButton').addEventListener('click', updateWireframe);

updateWireframe();

function animate() {
    requestAnimationFrame(animate);

    if (scene.getObjectByName('wireframe')) {
        if (rotationDirection === 'clockwise') {
            scene.getObjectByName('wireframe').rotation.y += yRotationSpeed;
            scene.getObjectByName('wireframe').rotation.x += xRotationSpeed;
            scene.getObjectByName('wireframe').rotation.z += zRotationSpeed;
        } else {
            scene.getObjectByName('wireframe').rotation.y -= yRotationSpeed;
            scene.getObjectByName('wireframe').rotation.x -= xRotationSpeed;
            scene.getObjectByName('wireframe').rotation.z -= zRotationSpeed;
        }
    }

    renderer.render(scene, camera);
}

animate();
