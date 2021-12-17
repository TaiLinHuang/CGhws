import * as THREE from "https://threejs.org/build/three.module.js";
import {scene} from './main.js';
var flameMesh;
var candle;
class Candle {
	constructor (x=0,z=0) {		
		this.candle = new THREE.Group();
		let body = new THREE.Mesh (new THREE.CylinderGeometry(5,5,20,64), new THREE.MeshNormalMaterial());
		let loader = new THREE.TextureLoader();
		//loader.load('./hw4.png',
		loader.load('http://i.imgur.com/M2tr5Tm.png?1%27',
			function(texture) {
			flameMesh = new THREE.Mesh(new THREE.PlaneGeometry(30,30), new THREE.MeshBasicMaterial({map:texture,alphaTest:0.5,side:THREE.DoubleSide}));
			texture.wrapS = THREE.RepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set (1/3,1/3);
			texture.offset.set (0,2/3);
			flameMesh.position.set(0,20,0);
			//this.candle.add(flameMesh);
			body.add(flameMesh);
			},
			undefined,
			function(xhr) {
			console.log('An error happened');
			}
		);
		body.position.set(x,10.1,z);
		let light = new THREE.PointLight(0xFFF4A1,0.3);
		light.position.set(x,10,z);
		this.candle.add(body,light);
		scene.add (this.candle);
		this.flameInterval = setInterval (this.textureAnimate.bind(this), 100);
   }
	textureAnimate() {
		this.count = (this.count === undefined) ? 1 : this.count;
		//if (this.candle.flameMesh !== undefined) {
			//this.texture = this.candle.flameMesh.material.map;
		if (this.candle.children[0].children[0].material.map!== undefined) {
			this.texture = this.candle.children[0].children[0].material.map;
			this.texture.offset.x += 1/3;
 		if (this.count % 3 === 0) {
			this.texture.offset.y -= 1/3;
			}
		this.count++;
		}
	}
	/*flameOff() {
		this.flameMesh.material.visible = false;
		this.light.intensity = 0;
		setTimeout(function(){this.flameMesh.material.visible = true;this.light.intensity = 0.3;}, 3000);
	} */
	
	flameOut() {
		
		console.log(this.candle);
		this.light.intensity = 0;
		this.candle.children[0].children[0].material.visible = false;
		setTimeout(this.ignition.bind(this), 2000);
	}
	
	ignition() {
		
		console.log(this.candle);
		this.candle.children[0].children[0].material.visible = true;
		this.light.intensity = 0.4;
	}
}
export { Candle };
