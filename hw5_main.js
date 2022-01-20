import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { TeapotGeometry } from "https://threejs.org/examples/jsm/geometries/TeapotGeometry.js";
var renderer, camera, scene;
var mesh, pointLight;
var turn = true;
var angle = 0;
var meshs=[];
function init() {
	var width = window.innerWidth;
	var height = window.innerHeight;
	renderer = new THREE.WebGLRenderer();
	renderer.setSize (width, height);
	document.body.appendChild (renderer.domElement);
	renderer.setClearColor (0x888888);
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera (50, width/height, 1, 10000);
	camera.position.set (0,100,180);
	let controls = new OrbitControls(camera, renderer.domElement);
	window.addEventListener('resize', onWindowResize, false);
	///////////////////////////
	var gridXZ = new THREE.GridHelper(200, 20, 'red', 'white');
    scene.add(gridXZ);
	
	pointLight = new THREE.PointLight(0xffffff);
    scene.add (pointLight);
    scene.add (new THREE.PointLightHelper(pointLight, 5));

	var ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(ambientLight);
	
	let meshMaterial = new THREE.ShaderMaterial({
	uniforms: {
		lightpos: {type: 'v3', value: new THREE.Vector3()}
	},
	vertexShader: document.getElementById('myVertexShader').textContent,
	fragmentShader: document.getElementById('myFragmentShader').textContent
	});
	var geometry = new TeapotGeometry (4);
	for(var a=0;a<10;a++){
		for(var b=0;b<10;b++){
			mesh = new THREE.Mesh(geometry, meshMaterial);
	        mesh.position.set(a*20-90,4,b*20-90);
			meshs.push(mesh);
			scene.add(mesh);
		}
	}
};
function animate() {
    if (turn) angle += 0.01;
    pointLight.position.set(50 * Math.cos(angle), 80, 50 * Math.sin(angle));    
    meshs[0].material.uniforms.lightpos.value.copy (pointLight.position);
    for(var c=0;c<100;c++)
	meshs[c].rotation.y = 1.3*angle;
    requestAnimationFrame(animate);
    render();
};
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
};
function render() {
    renderer.render(scene, camera);
};
export {init, animate, scene};
