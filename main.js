import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { Candle } from "./candle.js";
var renderer, camera, scene;
var candles = [];
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
function init() {
	renderer = new THREE.WebGLRenderer();
	document.body.appendChild (renderer.domElement);
	var width = window.innerWidth;
	var height = window.innerHeight;
	renderer.setSize (width, height);
	renderer.setClearColor (0x888888);
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera (50, width/height, 1, 10000);
	camera.position.set (0,200,300);
	let controls = new OrbitControls(camera, renderer.domElement);
	window.addEventListener('resize', onWindowResize, false);
	///////////////////////////
	let floor = new THREE.Mesh (new THREE.PlaneGeometry(300,300), new THREE.MeshPhongMaterial({side:THREE.DoubleSide}));
	floor.rotation.x = -Math.PI/2;	
	scene.add (floor);
	var c1 = new Candle(-100, 0);
	var c2 = new Candle(-50, 0);
	var c3 = new Candle(0, 0);
	var c4 = new Candle(50, 0);
	var c5 = new Candle(100, 0);
	candles.push(c1,c2,c3,c4,c5);
	window.addEventListener( 'click', onMouseClick, false );
	window.requestAnimationFrame(render);
	//console.log(scene.children);
};
function onMouseClick( event ) {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera( mouse, camera );
    //var intersects = raycaster.intersectObjects( scene.children );
	var intersects = raycaster.intersectObjects(candles, true);
	console.log(intersects[0].Object.name);
	if (intersects.length > 0) {
		if(intersects[0].Object.name=='C1')candles[1].flameOff();
		if(intersects[0].Object.name=='C2')candles[2].flameOff();
		if(intersects[0].Object.name=='C3')candles[3].flameOff();
		if(intersects[0].Object.name=='C4')candles[4].flameOff();
		if(intersects[0].Object.name=='C5')candles[5].flameOff();
	}
};
function render() {
    renderer.render(scene, camera);
};
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
};
function animate() {
	requestAnimationFrame(animate);
	render();
};
export {init, animate, scene};
