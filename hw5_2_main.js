import * as THREE from "https://threejs.org/build/three.module.js";
import { OrbitControls } from "https://threejs.org/examples/jsm/controls/OrbitControls.js";
import { TeapotGeometry } from "https://threejs.org/examples/jsm/geometries/TeapotGeometry.js";
var renderer, camera, scene;
var mesh, pointLight;
var angle = 0;
var quads=[];
var sceneRTT, torus, renderTarget;
var quad;
function init() {
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild (renderer.domElement);
	scene = new THREE.Scene();
	camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000);
	camera.position.set (0, 80, 200);
	let controls = new OrbitControls(camera, renderer.domElement);
	var ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);
	window.addEventListener('resize', onWindowResize, false);
	///////////////////////////
	sceneRTT = new THREE.Scene();
	pointLight = new THREE.PointLight(0xffffff);
	pointLight.position.set(0, 300, 200);
	sceneRTT.add(pointLight);
	renderTarget = new THREE.WebGLRenderTarget(
		1024, 1024, {
		minFilter: THREE.LinearFilter,
		magFilter: THREE.NearestFilter,
		format: THREE.RGBFormat
		}
	);	
	let meshMaterial = new THREE.ShaderMaterial({
	uniforms: {
		lightpos: {type: 'v3', value: new THREE.Vector3()}
	},
	vertexShader: document.getElementById('myVertexShader').textContent,
	fragmentShader: document.getElementById('myFragmentShader').textContent
	});
	var geometry = new TeapotGeometry (4);
	mesh = new THREE.Mesh(geometry, meshMaterial);
	mesh.scale.set(16, 16, 16);
	sceneRTT.add(mesh);
	/*for(var a=0;a<10;a++){
		for(var b=0;b<10;b++){
			mesh = new THREE.Mesh(geometry, meshMaterial);
	        mesh.position.set(a*20-90,4,b*20-90);
			mesh.scale.set(32, 32, 32);
			meshs.push(mesh);
			sceneRTT.add(mesh)
		}
	}*/
	let plane = new THREE.PlaneBufferGeometry(20, 20);
	let quadmaterial = new THREE.MeshBasicMaterial({
      map: renderTarget.texture,
      side: THREE.DoubleSide
    });
	for(var a=0;a<10;a++){
		for(var b=0;b<10;b++){
			quad = new THREE.Mesh(plane, quadmaterial);
	        quad.position.set(a*20-90,4,b*20-90);
			quads.push(quad);
			scene.add(quad);
		}
	}
};
/*function animate() {
    if (turn) angle += 0.01;
    pointLight.position.set(50 * Math.cos(angle), 80, 50 * Math.sin(angle));   
	meshs[0].material.uniforms.lightpos.value.copy (pointLight.position);
    for(var c=0;c<100;c++)
	meshs[c].rotation.y = 1.3*angle;
    requestAnimationFrame(animate);
    render();
};*/
function animate() {
	requestAnimationFrame(animate);
	angle += 0.005;
	mesh.rotation.y = -angle;
// render torusKnot to texture
	renderer.setRenderTarget (renderTarget);
	renderer.setClearColor(0x008888);
	renderer.render(sceneRTT, camera);
// render texture to quad
	renderer.setRenderTarget(null);
	renderer.setClearColor(0x888800);
	renderer.render(scene, camera);
	//quad.lookAt (camera.position);
	for(var c=0;c<100;c++)
	quads[c].lookAt(camera.position);
}
function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
};
function render() {
    renderer.render(scene, camera);
};
export {init, animate, scene};