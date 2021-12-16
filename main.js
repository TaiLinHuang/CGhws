import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { Candle } from "./Candle.js";

var renderer, camera, scene;
var candles = [];

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
	///////////////////////////
	let floor = new THREE.Mesh (new THREE.PlaneGeometry(300,300), new THREE.MeshPhongMaterial({side:THREE.DoubleSide}));
	floor.rotation.x = -Math.PI/2;	
	scene.add (floor);	

	candles.push (new Candle(0,0),new Candle(50,0),new Candle(100,0),new Candle(-50,0),new Candle(-100,0));

};
function update(evt) {	///keyboard.ver///

	if (evt.key == 1) {

		candles[0].flameOut();
	}
	if (evt.key == 2) {

		candles[1].flameOut();
	}
	if (evt.key == 3) {

		candles[2].flameOut();
	}
	if (evt.key == 4) {

		candles[3].flameOut();
	}
	if (evt.key == 5) {

		candles[4].flameOut();
	}
}
function animate() {
	requestAnimationFrame (animate);
	renderer.render (scene, camera);
	
	window.onkeydown = function(evt){
		var evt = window.event?window.event:evt;
		update(evt);
	}
};

export {init, animate, scene};
