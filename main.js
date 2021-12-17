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
	
	var c0 = new Candle(0, 0);
	var c1 = new Candle(50, 0);
	var c2 = new Candle(100, 0);
	var c3 = new Candle(-50, 0);
	var c4 = new Candle(-100, 0);
	
	window.addEventListener( 'click', onMouseClick, false );
	window.requestAnimationFrame(render);
};
function onMouseClick( event ) {
 
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera( mouse, camera );
    var intersects = raycaster.intersectObjects( scene.children );
    for ( var i = 0; i < intersects.length; i++ ) {
		setTimeout(intersects[ i ].object.material.color.set( 0xff0000 ), 3000);
        //intersects[ i ].object.material.color.set( 0xff0000 );
		//intersects[ i ].Object.material.visible = false;
    }
}
function render() {
    renderer.render(scene, camera);
}
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}
function animate() {
	requestAnimationFrame(animate);
	render();
}
export {init, animate, scene};
