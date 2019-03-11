import * as THREE from 'three'
import { toCSG, fromCSG } from 'three-2-csg';
import { noConflict } from 'q';
import math from 'mathjs';
const ThreeScene=()=> {
    
var length_of_nozzle=1;
var length_of_cone=0.4;

var bore_outer_diameter=0.2;
var bore_inner_diameter=0.15;

var radius_outer_pipe_bottom=bore_outer_diameter;
var radius_inner_pipe_bottom=bore_inner_diameter;

var radius_outer_cone_top=radius_outer_pipe_bottom;
var radius_inner_cone_top=radius_inner_pipe_bottom;

var radius_outer_cone_bottom=0.4;
var radius_inner_cone_bottom=radius_inner_pipe_bottom;


var flange_outer_diameter=radius_outer_cone_bottom+0.15;
var raised_face_diameter=0.28;
var flange_thickness=0.1;
var mesh_ind1=new THREE.Mesh();
var mesh_ind2=new THREE.Mesh();
var mesh_ind3=new THREE.Mesh();
var mesh_ind4=new THREE.Mesh();
var material=new THREE.MeshPhongMaterial({ color: '#0b7dba', emissive: 0x072534, side: THREE.DoubleSide });;
var center_of_torus=1;
var length_of_pipe2=0.1;
mesh_ind1=create_component(bore_outer_diameter,radius_outer_pipe_bottom,bore_inner_diameter,radius_inner_pipe_bottom,length_of_nozzle,0,0,0,0,0,3.14/2);
var position_of_cone=length_of_cone/2+length_of_nozzle/2;//+0.08;
mesh_ind2=create_component(radius_outer_cone_top,radius_outer_cone_bottom,radius_inner_cone_top,radius_inner_cone_bottom,length_of_cone,position_of_cone,0,0,0,0,3.14/2);
var position_of_second_cylinder=position_of_cone+length_of_cone/2;
mesh_ind3=create_flange(flange_outer_diameter,radius_inner_cone_bottom,flange_thickness,position_of_second_cylinder,0,0,0,3.14/2,0,4,flange_outer_diameter-0.07,0.1);
var position_of_outer_cylinder=position_of_second_cylinder+flange_thickness;
var raised_face_thickness=0.1;
mesh_ind4=create_component(raised_face_diameter,raised_face_diameter,radius_inner_cone_bottom,radius_inner_cone_bottom,raised_face_thickness,position_of_outer_cylinder,0,0,0,0,3.14/2);

var group = new THREE.Group();
//group.add( mesh_ind1 );
group.add(mesh_ind1);
group.add( mesh_ind2 );
group.add( mesh_ind3 );
group.add( mesh_ind4 );


//this.create_component(radius_outer_pipe_top,radius_outer_pipe_bottom,radius_inner_pipe_top,radius_inner_pipe_bottom,length_of_pipe2,0,0,0,0,0,3.14/2);

  // this.scene.add(pointclod);
 
  return group;
}



    const create_component=(outer_upper_rad, outer_lower_rad, inner_upper_rad,inner_lower_rad,length,translateX,translateY,translateZ,rotateX,rotateY,rotateZ)=>
    {
      //sphere
      var material =new THREE.MeshPhongMaterial({ color: '#0b7dba', emissive: 0x072534, side: THREE.DoubleSide });
var cylinder_cone = new THREE.CylinderGeometry(outer_upper_rad,outer_lower_rad,length,100);
var cylinderconeMesh = new THREE.Mesh( cylinder_cone, material );
var coneCSG = toCSG( cylinderconeMesh ); // converting ThreeJS object to CSG
 
// cyl
var cylinder = new THREE.CylinderGeometry(inner_upper_rad, inner_lower_rad, length, 100 );
var cylinderMesh = new THREE.Mesh( cylinder, material );
var cylinderCSG = toCSG( cylinderMesh ); // converting ThreeJS object to CSG
 
//result
var subtractCSG = coneCSG.subtract( cylinderCSG );
var result = fromCSG(subtractCSG); // converting CSG back into ThreeJS object
 var mesh_test= new THREE.Mesh(result,material);
 mesh_test.translateX(translateX).translateY(translateY).translateZ(translateZ).rotateX(rotateX).rotateY(rotateY).rotateZ(rotateZ);
//result.geometry.computeVertexNormals();
 console.log("result",result);
//this.scene.add( mesh_test);
return mesh_test;
    }


    const create_flange=(radius_outer,radius_inner,extrude_length,translateX,translateY,translateZ,rotateX,rotateY,rotateZ,hole_number1,bolt_hole_diameter,bolt_size1)=>{

      var material_extrude = new THREE.MeshPhongMaterial({
        color: '#0b7dba',
        shading: THREE.SmoothShading,
        specular: 0xffffff,
        shininess: 1.0,
      });
      var material =new THREE.MeshPhongMaterial({ color: '#0b7dba', emissive: 0x072534, side: THREE.DoubleSide });
      var depth_flange3=0.1;
      var radius_hole3=0.05;
      var radius_central3=0.15;
      var thickness_nozzle_cylinder3=0.05;
      var hole_number= parseFloat(hole_number1);
      var bolt_hole_radius=parseFloat(bolt_hole_diameter);
      var radius_flange3=0.4
      var extrudeSettings3 = { curveSegments: 50,depth: extrude_length, bevelEnabled: false, bevelSegments: 1, steps: 1, bevelSize: 0, bevelThickness: 0 };
      var extrudeSettings4 = { curveSegments: 50,depth: 1, bevelEnabled: false, bevelSegments: 1, steps: 1, bevelSize: 0, bevelThickness: 0 };
      var bolt_size=parseFloat(bolt_size1)/2;
      var arcShape3 = new THREE.Shape();
      arcShape3.moveTo(0, 0 );
      arcShape3.absarc( 0, 0, radius_outer, 0,math.PI * 2, false );
      var pos=(2*math.PI)/hole_number;
      console.log("angle difference",pos, (pos/math.pi)*180)
      var angle =math.pi/hole_number;
      for (var i =0;i<hole_number;i++){
        var angle_pos = angle + i*pos;
        var x = bolt_hole_radius*math.sin(angle_pos);
        var y= bolt_hole_radius*math.cos(angle_pos);
        console.log("angle",(angle_pos/math.PI)*180);
      var holePath3 = new THREE.Path();
      holePath3.moveTo( 0, 0 );
      holePath3.absarc( x, y,bolt_size, 0, math.PI * 2, true );
      arcShape3.holes.push(holePath3);
      }

      var holePath34 = new THREE.Path();
      holePath34.moveTo( 0, 0 );
      
      holePath34.absarc( 0, 0,radius_inner, 0, Math.PI * 2, true );
      arcShape3.holes.push(holePath34);

      // var holePath3 = new THREE.Path();
      // holePath3.moveTo( 0, 0 );
 
      // holePath3.absarc( (radius_outer-0.2), radius_outer-0.25,radius_hole3, 0, Math.PI * 2, true );
 
      // var holePath32 = new THREE.Path();
      // holePath32.moveTo( 0, 0 );
      
      // holePath32.absarc( radius_outer-0.2, 0.25-radius_outer,radius_hole3, 0, Math.PI * 2, true );
      // arcShape3.holes.push(holePath32);
 
 
      // var holePath33 = new THREE.Path();
      // holePath33.moveTo( 0, 0 );
      
      // holePath33.absarc( -(radius_outer-0.2), 0.25-radius_outer,radius_hole3, 0, Math.PI * 2, true );
      // arcShape3.holes.push(holePath33);
 
 
 
      // arcShape3.holes.push( holePath3 );
      // var holePath35 = new THREE.Path();
      // holePath35.moveTo( 0, 0 );
      // holePath35.absarc( -(radius_outer-0.2), radius_outer-0.25,radius_hole3, 0, Math.PI * 2, true );
      // arcShape3.holes.push(holePath35);

      var geometry_extrude3 = new THREE.ExtrudeGeometry( arcShape3, extrudeSettings3 );
var mesh3 = new THREE.Mesh( geometry_extrude3, material) ;
mesh3.translateX(translateX).translateY(translateY).translateZ(translateZ).rotateX(rotateX).rotateY(rotateY).rotateZ(rotateZ);

//this.scene.add(mesh3);
return mesh3; 

}  
  
  
  
 export default ThreeScene;
 //module.exports= ThreeScene;