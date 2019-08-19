
import React, {Component} from 'react';
import * as THREE from 'three'
import * as TrackballControls from 'three-trackballcontrols';
import { toCSG, fromCSG } from 'three-2-csg';
import ThreeScene from './ThreeScene';
import { SpheroidHeadBufferGeometry } from './SpheroidHead_v2';
class Scene extends Component {
    
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
      this.camera.position.z = 5;
  
      //ADD SCENE
  
      //ADD RENDERER
      this.renderer = new THREE.WebGLRenderer();
      this.renderer.setSize(width, height);
      this.mount.appendChild(this.renderer.domElement);
      document.addEventListener( 'click', this.onDocumentMouseDown, false );

  
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
  
      let axes=new THREE.AxesHelper(100);
      this.scene.add(axes);
      var ambient = new THREE.AmbientLight(0xbbbbbb);
      this.scene.add(ambient);
  
      var directionalLight = new THREE.DirectionalLight(0xffffff);
      directionalLight.position.set(0, 0, 1);
      this.scene.add(directionalLight);
      this.material = new THREE.MeshPhongMaterial({ color: '#0b7dba', emissive: 0x072534 });
      let  materials = new THREE.MeshPhongMaterial({ color: '#011dba', emissive: 0x033534, side: THREE.DoubleSide });

      this.mesh= new THREE.Mesh();
      let outer_height=1;
      let outer_radius=3;
      let inner_radius=2.5;
      let inner_height=outer_height-outer_height/3;
      this.geometry= new SpheroidHeadBufferGeometry(outer_radius, outer_height, inner_radius, inner_height, 400);
      this.mesh = new THREE.Mesh(this.geometry, this.material);
      this.scene.add(this.mesh);
      this.shapes=[];
      let projection=2;
      let length_of_pipe=projection-outer_height;
      let offset=1;
      let angle=20;

      let z_offset=-offset*Math.cos((angle/180)*Math.PI);
      let x_offset=offset*Math.sin((angle/180)*Math.PI);
      let cosTheta=Math.sqrt(((Math.pow(x_offset,2)+Math.pow(z_offset,2))/Math.pow(outer_radius,2)));
      let theta=Math.acos(cosTheta);
      
      let y_offset=(outer_height)*Math.sin(theta);
      console.log("offset",y_offset,theta)
      // console.log("offset",x_offset,z_offset,y_offset);
      // let l1 = (2*x_offset)/(Math.pow(outer_radius,2));
      // let m1 = (2*y_offset)/(Math.pow(outer_radius,2));
      // let n1 = (2*z_offset)/(Math.pow(outer_radius,2));
      // let normal1 = new THREE.Vector3(l1,m1,n1);
      // normal1.normalize();
      // console.log("angles",l1,m1,n1,normal1.x,normal1.y,normal1.z)
      let nozzle =new ThreeScene(length_of_pipe);
      // let angle_tiltx=(Math.atan2(l1,m1));
      // let angle_tilt2x=(Math.atan2(m1,n1));
      // let angle_tilt3x=(Math.atan2(n1,m1));
      // let angle_tilt=(Math.atan2(normal1.x,normal1.y));
      // let angle_tilt2=(Math.atan2(normal1.y,normal1.z));
      // let angle_tilt3=(Math.atan2(normal1.x,normal1.z));
      // console.log("angle",90-(angle_tiltx*180)/Math.PI,90-(angle_tilt2x*180)/Math.PI,90-(angle_tilt3x*180)/Math.PI,(angle_tilt*180)/Math.PI,(angle_tilt2*180)/Math.PI,(angle_tilt3*180)/Math.PI);

      
      // let den1=Math.pow(offset,2);
      // let den2=Math.pow(offset,2);
      // let slope=((2*x_offset)/den1)+((2*y_offset)/den1)+((2*z_offset)/den1);
     // let deno=(Math.sqrt(1-Math.pow(x_offset/outer_radius,2)-Math.pow(y_offset/outer_height,2)))
      //   let Zx=-(x_offset/outer_radius)/deno
      // console.log("value of Zx",Zx);
      // let Zy=-((y_offset*outer_radius)/Math.pow(outer_height,2))/deno
      // console.log("value of Zy",Zy);  
      // let angle_theta=Math.acos(Zx/Math.sqrt((Zx*Zx+Zy*Zy+1)))
      
      

      let Zx= (2*x_offset)/Math.pow(outer_radius,2);
      let Zy= (2*y_offset)/Math.pow(outer_height,2);
      let Zz= (2*z_offset)/Math.pow(outer_radius,2);
      let deno = -Zx*x_offset-Zy*y_offset-Zz*z_offset;

      // let angle_theta=Math.acos(Zx/Math.sqrt((Zx*Zx+Zy*Zy+Zz*Zz)))
      let angle_theta=Math.asin(Math.abs(Zy/(Math.sqrt(Zx*Zx+Zy*Zy+Zz*Zz))))
      console.log("angle",(angle_theta/Math.PI)*180);
      //console.log("angle",slope,(((Math.atan(slope))/Math.PI)*180));
      console.log("offsets",x_offset,y_offset,z_offset,Math.sqrt(z_offset*z_offset+x_offset*x_offset))
      console.log(Zx.toString()+"x+"+Zy.toString()+"y+"+Zz.toString()+"z"+(deno).toString())
      let y_plus=(length_of_pipe/2)*Math.sin(angle_theta);
      let x_plus=((length_of_pipe/2)-y_plus)*Math.sin((angle/180)*Math.PI);
      let z_plus=((length_of_pipe/2)-y_plus)*Math.cos((angle/180)*Math.PI);
      nozzle.translateY(y_offset);
      nozzle.translateZ(-z_offset);
      nozzle.translateX(x_offset);
      nozzle.rotateY(-Math.PI/2+(angle/180)*Math.PI)
      nozzle.rotateZ(angle_theta)//.rotateX(((180+angle)/180)*Math.PI)
      this.scene.add(this.mesh);
      this.scene.add(nozzle);
      this.shapes.push(this.mesh);
      this.start();

    
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
          }
          />
        );
      }

    }

    export default Scene;