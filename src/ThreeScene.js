import React, {Component} from 'react';
import * as THREE from 'three'
import * as TrackballControls from 'three-trackballcontrols';
import { toCSG, fromCSG } from 'three-2-csg';
  class ThreeScene extends Component {
    
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
  
  
      var ambient = new THREE.AmbientLight(0xbbbbbb);
      this.scene.add(ambient);
  
      var directionalLight = new THREE.DirectionalLight(0xffffff);
      directionalLight.position.set(0, 0, 1);
      this.scene.add(directionalLight);
      this.material = new THREE.MeshPhongMaterial({ color: '#0b7dba', emissive: 0x072534, side: THREE.DoubleSide });

var length_of_pipe=1;
var length_of_cone=0.4;

var radius_outer_pipe_top=0.2;
var radius_inner_pipe_top=0.15;

var radius_outer_pipe_bottom=0.2;
var radius_inner_pipe_bottom=0.15;

var radius_outer_cone_top=radius_outer_pipe_bottom;
var radius_inner_cone_top=radius_inner_pipe_bottom;

var radius_outer_cone_bottom=0.4;
var radius_inner_cone_bottom=radius_inner_pipe_bottom;
var mesh_ind1=new THREE.Mesh();
var mesh_ind2=new THREE.Mesh();
var mesh_ind3=new THREE.Mesh();
var mesh_ind4=new THREE.Mesh();


var length_of_pipe2=0.1;
      mesh_ind1=this.create_component(radius_outer_pipe_top,radius_outer_pipe_bottom,radius_inner_pipe_top,radius_inner_pipe_bottom,length_of_pipe,0,0,0,0,0,3.14/2);
      var position_of_cone=length_of_pipe/2+length_of_cone/2;
        mesh_ind2=this.create_component(radius_outer_cone_top,radius_outer_cone_bottom,radius_inner_cone_top,radius_inner_cone_bottom,length_of_cone,position_of_cone,0,0,0,0,3.14/2);
        var position_of_second_cylinder=position_of_cone+length_of_cone/2;
var extrude_length=0.1;
mesh_ind3=this.create_flange(radius_outer_cone_bottom+0.15,radius_inner_cone_bottom,extrude_length,position_of_second_cylinder,0,0,0,3.14/2,0);
var position_of_outer_cylinder=position_of_second_cylinder+extrude_length;
var length_of_outer_cylinder=0.1;
mesh_ind4=this.create_component(0.28,0.28,radius_inner_cone_bottom,radius_inner_cone_bottom,length_of_outer_cylinder,position_of_outer_cylinder,0,0,0,0,3.14/2);

var group = new THREE.Group();
group.add( mesh_ind1 );
group.add( mesh_ind2 );
group.add( mesh_ind3 );
group.add( mesh_ind4 );
group.translateX(1).rotateZ(0);
this.scene.add(group);

   


//this.create_component(radius_outer_pipe_top,radius_outer_pipe_bottom,radius_inner_pipe_top,radius_inner_pipe_bottom,length_of_pipe2,0,0,0,0,0,3.14/2);



   

  // this.scene.add(pointclod);
  this.start();
  
}



    create_component=(outer_upper_rad, outer_lower_rad, inner_upper_rad,inner_lower_rad,length,translateX,translateY,translateZ,rotateX,rotateY,rotateZ)=>
    {
      //sphere
var cylinder_cone = new THREE.CylinderGeometry(outer_upper_rad,outer_lower_rad,length,100);
var cylinderconeMesh = new THREE.Mesh( cylinder_cone, this.material );
var coneCSG = toCSG( cylinderconeMesh ); // converting ThreeJS object to CSG
 
// cyl
var cylinder = new THREE.CylinderGeometry(inner_upper_rad, inner_lower_rad, length, 100 );
var cylinderMesh = new THREE.Mesh( cylinder, this.material );
var cylinderCSG = toCSG( cylinderMesh ); // converting ThreeJS object to CSG
 
//result
var subtractCSG = coneCSG.subtract( cylinderCSG );
var result = fromCSG(subtractCSG); // converting CSG back into ThreeJS object
 var mesh_test= new THREE.Mesh(result,this.material);
 mesh_test.translateX(translateX).translateY(translateY).translateZ(translateZ).rotateX(rotateX).rotateY(rotateY).rotateZ(rotateZ);
//result.geometry.computeVertexNormals();
 console.log("result",result);
//this.scene.add( mesh_test);
return mesh_test;
    }


    create_flange=(radius_outer,radius_inner,extrude_length,translateX,translateY,translateZ,rotateX,rotateY,rotateZ)=>{

      var material_extrude = new THREE.MeshPhongMaterial({
        color: '#0b7dba',
        shading: THREE.SmoothShading,
        specular: 0xffffff,
        shininess: 1.0,
      });
      var depth_flange3=0.1;
      var radius_hole3=0.05;
      var radius_central3=0.15;
      var thickness_nozzle_cylinder3=0.05;
      var radius_flange3=0.4
      var extrudeSettings3 = { curveSegments: 50,depth: extrude_length, bevelEnabled: false, bevelSegments: 1, steps: 1, bevelSize: 0, bevelThickness: 0 };
      var extrudeSettings4 = { curveSegments: 50,depth: 1, bevelEnabled: false, bevelSegments: 1, steps: 1, bevelSize: 0, bevelThickness: 0 };
 
     
      var arcShape3 = new THREE.Shape();
      arcShape3.moveTo(0, 0 );
      arcShape3.absarc( 0, 0, radius_outer, 0, Math.PI * 2, false );
      var holePath3 = new THREE.Path();
      holePath3.moveTo( 0, 0 );
 
      holePath3.absarc( (radius_outer-0.2), radius_outer-0.25,radius_hole3, 0, Math.PI * 2, true );
 
      var holePath32 = new THREE.Path();
      holePath32.moveTo( 0, 0 );
      
      holePath32.absarc( radius_outer-0.2, 0.25-radius_outer,radius_hole3, 0, Math.PI * 2, true );
      arcShape3.holes.push(holePath32);
 
 
      var holePath33 = new THREE.Path();
      holePath33.moveTo( 0, 0 );
      
      holePath33.absarc( -(radius_outer-0.2), 0.25-radius_outer,radius_hole3, 0, Math.PI * 2, true );
      arcShape3.holes.push(holePath33);
 
      var holePath34 = new THREE.Path();
      holePath34.moveTo( 0, 0 );
      
      holePath34.absarc( 0, 0,radius_inner, 0, Math.PI * 2, true );
      arcShape3.holes.push(holePath34);
 
      arcShape3.holes.push( holePath3 );
      var holePath35 = new THREE.Path();
      holePath35.moveTo( 0, 0 );
      holePath35.absarc( -(radius_outer-0.2), radius_outer-0.25,radius_hole3, 0, Math.PI * 2, true );
      arcShape3.holes.push(holePath35);

      var geometry_extrude3 = new THREE.ExtrudeGeometry( arcShape3, extrudeSettings3 );
var mesh3 = new THREE.Mesh( geometry_extrude3, this.material) ;
mesh3.translateX(translateX).translateY(translateY).translateZ(translateZ).rotateX(rotateX).rotateY(rotateY).rotateZ(rotateZ);

//this.scene.add(mesh3);
return mesh3; 

}

  //   toScreenXY=( position, camera)=> {
  //     var pos = position.clone();
  //     projScreenMat = new THREE.Matrix4();
  //     projScreenMat.multiply( camera.projectionMatrix, camera.matrixWorldInverse );
  //     projScreenMat.multiplyVector3( pos );

  //     var offset = findOffset(div);

  //     return { x: ( pos.x + 1 ) * this.width / 2 + offset.left,
  //          y: ( - pos.y + 1) * this.height / 2 + offset.top };

  // }
  // findOffset=(element)=> { 
  //   var pos = new Object();
  //   pos.left = pos.top = 0;        
  //   if (element.offsetParent)  
  //   { 
  //     do  
  //     { 
  //       pos.left += element.offsetLeft; 
  //       pos.top += element.offsetTop; 
  //     } while (element = element.offsetParent); 
  //   } 
  //   return pos;
  // } 

  orientation=(p,q,r)=>
{
    var val = (q.y - p.y) * (r.x - q.x) - (q.x - p.x) * (r.y - q.y);
    if (val === 0) return 0; 	 // colinear
    return (val > 0)? 1: 2; 	// clock or counterclock wise
}


convexHull=(points, n,y_position)=>
	{
    // There must be at least 3 points
    if (n < 3) return;
    
    // Initialize Result
    let geometry_for_outline= new THREE.Geometry();
    // Find the leftmost point
    var l = 0;
    var i =1;
    for (i = 1; i < n; i++)
    {
        if (points[i].x < points[l].x)
            l = i;
    }
    // Start from leftmost point, keep moving counterclockwise
    // until reach the start point again.  This loop runs O(h)
    // times where h is number of points in result or output.
    var p = l, q;
    var initial=p;
    do
    {
        // Add current point to result
          geometry_for_outline.vertices.push(points[p]);
        // Search for a point 'q' such that orientation(p, x,
        // q) is counterclockwise for all points 'x'. The idea
        // is to keep track of last visited most counterclock-
        // wise point in q. If any point 'i' is more counterclock-
        // wise than q, then update q.
        q = (p+1)%n;
        var j =0;
        for (j = 0; j < n; j++)
        {
           // If i is more counterclockwise than current q, then
           // update q
           if (this.orientation(points[p], points[j], points[q]) === 2)
               q = j;
        }
        // Now q is the most counterclockwise with respect to p
        // Set p as q for next iteration, so that q is added to
        // result 'hull'
        p = q;
    } while (p !== l);  // While we don't come to first point
    geometry_for_outline.vertices.push(points[initial]);
   // console.log("loop ended")
    // Print Result
    var k;
    console.log(geometry_for_outline.vertices);
    var material2 = new THREE.LineBasicMaterial( { color: 0xffffff} );
    var line = new THREE.Line( geometry_for_outline, material2);
    line.position.x=-2;
    line.position.y=y_position;
    this.scene.add(line);
    for (k = 0; k < geometry_for_outline.length; k++)
{
        console.log("geometry of hull vertices",geometry_for_outline.vertices[k].x,geometry_for_outline.vertices[k].y);
}
geometry_for_outline.dispose();
line.remove();
material2.dispose();
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
  
  export default ThreeScene;