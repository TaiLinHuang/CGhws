import * as THREE from "https://threejs.org/build/three.module.js";
import {scene} from './main.js';
var flameMesh;
class Candle {
	constructor (x=0,z=0) {		
		this.candle = new THREE.Group();
		let body = new THREE.Mesh (new THREE.CylinderGeometry(5,5,20,64), new THREE.MeshNormalMaterial());
		body.position.set(x,10.1,z);
		let loader = new THREE.TextureLoader();
		loader.load('https://i.imgur.com/M2tr5Tm.png',
			function(texture) {
			flameMesh = new THREE.Mesh(new THREE.PlaneGeometry(30,30), new THREE.MeshBasicMaterial({map:texture,alphaTest:0.5}));
			texture.wrapS = THREE.RepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set (1/3,1/3);
			texture.offset.set (0,2/3);
			flameMesh.position.set(x,28,z);
			},
			undefined,
			function(xhr) {
			console.log('An error happened');
			}
		);
		let light = new THREE.PointLight(0xFFF4A1,0.5);
		light.position.set(x,10,z);
		this.candle.add(body,flameMesh,light);
		scene.add (this.candle);
		this.flameInterval = setInterval (this.textureAnimate, 100);
   }
	textureAnimate() {
		this.count = (this.count === undefined) ? 1 : this.count;
		if (flameMesh!== undefined) {
			this.texture = flameMesh.material.map;
			this.texture.offset.x += 1/3;
 		if (textureAnimate.count % 3 === 0) {
			this.texture.offset.y -= 1/3;
			}
		this.count++;
		}
	}
	flameOff() {
		flameMesh.material.visible = false;
		this.light.intensity = 0;
		setTimeout(function(){flameMesh.material.visible = true;this.light.intensity = 0.5;}, 3000);
	} 
}
export { Candle };
