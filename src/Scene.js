import React, {
  Component
} from 'react';
import * as THREE from 'three'
import * as TrackballControls from 'three-trackballcontrols';
import {
  toCSG,
  fromCSG
} from 'three-2-csg';
import ThreeScene from './ThreeScene';
class Scene extends Component {

  constructor(props) {
    super(props);

    this.state = {
      heade: false
    }
  }

  clearScene = () => {
    for (let i = this.scene.children.length - 1; i >= 0; i--) {
      const object = this.scene.children[i];
      if (object.type === "Mesh") {
        object.geometry.dispose();
        object.material.dispose();
      } else if (object.type === "Group") {
        for (let h = object.children.length - 1; h >= 0; h--) {
          const object2 = object.children[h];
          if (object2.type === "Mesh") {
            object2.geometry.dispose();
            object2.material.dispose();
          } else if (object2.type === "Group") {
            for (let j = object2.children.length - 1; j >= 0; j--) {
              const object3 = object2.children[j];
              if (object3.type === "Mesh") {
                object3.geometry.dispose();
                object3.material.dispose();
                //this.scene.remove(object3);
              } else if (object3.type === "Group") {
                for (let k = object3.children.length - 1; k >= 0; k--) {
                  const object4 = object3.children[j];
                  if (object4.type === "Mesh") {
                    object4.geometry.dispose();
                    object4.material.dispose();
                    //this.scene.remove(object3);
                  }
                }
              }
            }
          }

        }

      }
      if (object.type === "Mesh" || object.type === "Group") {
        this.scene.remove(object);
      }
      //  while(object.type!=="Mesh")
      //  {
      //    childrens=return_children
      //    if(childrens.type==)
      //  }
      //   //  object.children[j].geometry.dispose();
      //   // object.children[j].material.dispose();
      //   this.scene.remove(object);
      //   children[i].geometry.dispose();
      //   children[i].
      //   console.log("cleared group",object);
      console.log("length of children of object",  object.children.length);
    }
  }
  componentWillUpdate() {

  }


  componentDidMount() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    //ADD CAMERA
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    );
    this.camera.position.z = 10;

    //ADD SCENE

    //ADD RENDERER
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize(width, height);
    this.mount.appendChild(this.renderer.domElement);
    this.positionx=-12;

    //ADD CUBE

    this.controls = new TrackballControls(this.camera, this.renderer.domElement);

    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 1.2;
    this.controls.panSpeed = 0.8;
    this.controls.noZoom = false;
    this.controls.noPan = false;
    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 0.3;
    this.controls.keys = [65, 83, 68];


    let ambient = new THREE.AmbientLight(0xbbbbbb);
    this.scene.add(ambient);

    let directionalLight = new THREE.DirectionalLight(0xffffff);
    directionalLight.position.set(0, 0, 1);
    this.scene.add(directionalLight);


  }
  activateLasers = () => {
    if (!this.state.heade) {
      this.setState({
        heade: true
      });
      if (this.scene) {
        // for (let i = this.scene.children.length - 1; i >= 0; i--) {
        //   const object = this.scene.children[i];
        //   console.log("object removed");
        //   this.scene.remove(object);
        // }
        // 
        {
          this.mesh = new THREE.Mesh();
          this.mesh = ThreeScene();
          
          this.mesh.translateX(this.positionx).rotateY(3.14/2);
          this.positionx=this.positionx+3;
          if (this.positionx>=12){
            this.positionx=-12;
          }
          this.scene.add(this.mesh);

        }
        this.start();
      }
    } else {
      this.setState({

        heade: false
      });
      this.clearScene();

    }

  }
  shouldComponentUpdate() {
    //  this.clearScene();
    console.log("scene children length", this.scene.children.length);
    return true;
  }

  componentWillUnmount() {
    this.stop();
    this.mount.removeChild(this.renderer.domElement);
  }

  start = () => {
    if (!this.frameId) {
      this.frameId = requestAnimationFrame(this.animate);
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
    }
  }

  stop = () => {
    cancelAnimationFrame(this.frameId);
  }

  animate = () => {
    this.controls.update();


    this.renderScene();
    this.frameId = window.requestAnimationFrame(this.animate);
  }

  renderScene = () => {
    this.renderer.render(this.scene, this.camera);
  }
  render() {
    if (this.scene) {
      this.material = new THREE.MeshPhongMaterial({
        color: '#0b7dba',
        emissive: 0x072534,
        side: THREE.DoubleSide
      });



    }
    return ( <
      div style = {
        {
          width: '400px',
          height: '400px'
        }
      }
      ref = {
        (mount) => {
          this.mount = mount
        }
      } >
      <
      button onClick = {
        this.activateLasers
      } >
      Render </button></div >
    );
  }

}

export default Scene;