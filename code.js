import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let scene, camera, renderer, controls;
let mainTree, ornaments = [], lights = [];
const clock = new THREE.Clock();

// Snowfall Variables
const canvas = document.getElementById('snowfall-canvas');
const ctx = canvas.getContext('2d');
let snowflakes = [];



function init() {
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 8, 18);

    renderer = new THREE.WebGLRenderer({ 
        antialias: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.5;
    document.getElementById('scene-container').appendChild(renderer.domElement);

    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 1.8;
    controls.minDistance = 8;
    controls.maxDistance = 20;
    controls.target.set(0, 4, 0);
    controls.update();

    setupLighting();
    createTree();
    createGround();
    addDecorations();
    setupSnowfall();

    window.addEventListener('resize', onWindowResize, false);
}



function setupLighting() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 2.5);
    scene.add(ambientLight);

    const topLight = new THREE.DirectionalLight(0xffffff, 3);
    topLight.position.set(0, 15, 0);
    topLight.castShadow = true;
    topLight.shadow.mapSize.width = 2048;
    topLight.shadow.mapSize.height = 2048;
    topLight.shadow.camera.near = 0.5;
    topLight.shadow.camera.far = 30;
    topLight.shadow.camera.left = -10;
    topLight.shadow.camera.right = 10;
    topLight.shadow.camera.top = 10;
    topLight.shadow.camera.bottom = -10;
    scene.add(topLight);
}
