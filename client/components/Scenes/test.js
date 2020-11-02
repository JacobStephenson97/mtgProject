import React, { Component } from 'react';
import * as THREE from "three";
import { MTLLoader, OBJLoader  } from "three-obj-mtl-loader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { SceneUtils } from "three/examples/jsm/utils/SceneUtils";
import { sceneConfig } from "./constants/config";

export default class ThreeScene extends Component {
  componentDidMount() {
    this.setupScene();
    this.setupEnvironment();
    this.addModels();
    this.renderScene();
    this.start();
  }

  setupScene() {
    const { mount } = this;
    const { clientWidth: width, clientHeight: height } = mount;
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer(sceneConfig);
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);
  }

  setupEnvironment() {
    const { mount } = this;
    const { clientWidth: width, clientHeight: height } = mount;
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 8;
    this.camera.position.y = 5;
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.lights = [];
    this.lights[0] = new THREE.AmbientLight(0xFFFFFF, 1);
    this.lights[1] = new THREE.DirectionalLight(0xFFFFFF, 1);
    this.lights[0].position.set(0, 0, -10);
    this.lights[1].position.set(0, 0, -10);
    this.lights[1].target.position.set(0, 0, 0);
    this.lights.map(l => this.scene.add(l))
  }

  addModels() {
    const geometry = new THREE.PlaneGeometry(5, 7.5, .1);
    const aImg = document.createElement("img");
    aImg.src = "/alphamap.jpg";

    const aTexture = new THREE.Texture(aImg);
    const fMaterial = new THREE.MeshBasicMaterial({ side: THREE.FrontSide, alphaMap: aTexture, transparent: true });
    const bMaterial = new THREE.MeshBasicMaterial({ side: THREE.BackSide, alphaMap: aTexture, transparent: true });
    const bImg = document.createElement("img");
    const fImg = document.createElement("img");
    const fTexture = new THREE.Texture(fImg);
    const bTexture = new THREE.Texture(bImg);
    const fsrc = "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=129730&type=card";
    const bsrc = "https://upload.wikimedia.org/wikipedia/en/thumb/a/aa/Magic_the_gathering-card_back.jpg/220px-Magic_the_gathering-card_back.jpg"
    const imgs = [fImg, aImg, bImg];
    const textures = [aTexture, fTexture, bTexture];

    fMaterial.map = fTexture;
    bMaterial.map = bTexture;
    bTexture.wrapS = THREE.RepeatWrapping;
    bTexture.repeat.x = -1;

    this.cardMesh = SceneUtils.createMultiMaterialObject(geometry, [fMaterial, bMaterial]);
    this.scene.add(this.cardMesh)
    this.cardMesh.needsUpdate = true;

    Meteor.call("getImage", fsrc, (err, res) => fImg.src=res)
    Meteor.call("getImage", bsrc, (err, res) => bImg.src=res)
    const updateAll = () => {
      this.cardMesh.needsUpdate = true;
      textures.map(t => t.needsUpdate = true);
    }

    imgs.map(img => img.onload = updateAll);
  }

  start = () => {
    if (!this.frameId) {
    this.frameId = requestAnimationFrame(this.animate);}
  }

  stop = () => {
    cancelAnimationFrame(this.frameId);
  }

  animate = () => {
    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene = () => {
    if (this.renderer) this.renderer.render(this.scene, this.camera);
  }

  render() {
    return (
      <div
        style={{ width: "800px", height: "800px" }}
        ref={m => this.mount = m}
      >
      </div>
    );
  }
}
