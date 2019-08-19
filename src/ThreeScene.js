import * as THREE from 'three'
import { toCSG, fromCSG } from 'three-2-csg';
let lenght_poip =0;
const ThreeScene=(length_of_pipe2)=> {
  let length_of_pipe=parseFloat(length_of_pipe2);
  let length_of_cone=0.4;
  lenght_poip=length_of_pipe/2;
  let radius_outer_pipe_top=0.2;
  let radius_inner_pipe_top=0.15;
  
  let radius_outer_pipe_bottom=0.2;
  let radius_inner_pipe_bottom=0.15;
  
  let radius_outer_cone_top=radius_outer_pipe_bottom;
  let radius_inner_cone_top=radius_inner_pipe_bottom;
  
  let radius_outer_cone_bottom=0.4;
  let radius_inner_cone_bottom=radius_inner_pipe_bottom;
  let mesh_ind1=new THREE.Mesh();
  let mesh_ind2=new THREE.Mesh();
  let mesh_ind3=new THREE.Mesh();
  let mesh_ind4=new THREE.Mesh();
  let material=new THREE.MeshPhongMaterial({ color: '#0b7dba', emissive: 0x072534, side: THREE.DoubleSide });;
  let center_of_torus=1;
  mesh_ind1=create_component(radius_outer_pipe_top,radius_outer_pipe_bottom,radius_inner_pipe_top,radius_inner_pipe_bottom,length_of_pipe,0,0,0,0,0,3.14/2);
  let position_of_cone=length_of_cone/2+length_of_pipe/2;//+0.08;
  mesh_ind2=create_component(radius_outer_cone_top,radius_outer_cone_bottom,radius_inner_cone_top,radius_inner_cone_bottom,length_of_cone,position_of_cone,0,0,0,0,3.14/2);
  let position_of_second_cylinder=position_of_cone+length_of_cone/2;
  let extrude_length=0.1;
  mesh_ind3=create_flange(radius_outer_cone_bottom+0.15,radius_inner_cone_bottom,extrude_length,position_of_second_cylinder,0,0,0,3.14/2,0);
  let position_of_outer_cylinder=position_of_second_cylinder+extrude_length;
  let length_of_outer_cylinder=0.1;
  mesh_ind4=create_component(0.28,0.28,radius_inner_cone_bottom,radius_inner_cone_bottom,length_of_outer_cylinder,position_of_outer_cylinder,0,0,0,0,3.14/2);
  
  let group = new THREE.Group();
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
        let material =new THREE.MeshPhongMaterial({ color: '#232000', emissive: 0x072534, side: THREE.DoubleSide });
  let cylinder_cone = new THREE.CylinderGeometry(outer_upper_rad,outer_lower_rad,length,100);
  let cylinderconeMesh = new THREE.Mesh( cylinder_cone, material );
  let coneCSG = toCSG( cylinderconeMesh ); // converting ThreeJS object to CSG
   
  // cyl
  let cylinder = new THREE.CylinderGeometry(inner_upper_rad, inner_lower_rad, length, 100 );
  let cylinderMesh = new THREE.Mesh( cylinder, material );
  let cylinderCSG = toCSG( cylinderMesh ); // converting ThreeJS object to CSG
   
  //result
  let subtractCSG = coneCSG.subtract( cylinderCSG );
  let result = fromCSG(subtractCSG); // converting CSG back into ThreeJS object
   let mesh_test= new THREE.Mesh(result,material);
   mesh_test.translateX(translateX+lenght_poip).translateY(translateY).translateZ(translateZ).rotateX(rotateX).rotateY(rotateY).rotateZ(rotateZ);
  //result.geometry.computeVertexNormals();
   console.log("result",result);
  //this.scene.add( mesh_test);
  return mesh_test;
      }
  
  
      const create_flange=(radius_outer,radius_inner,extrude_length,translateX,translateY,translateZ,rotateX,rotateY,rotateZ)=>{
  
        let material_extrude = new THREE.MeshPhongMaterial({
          color: '#0b7dba',
          shading: THREE.SmoothShading,
          specular: 0xffffff,
          shininess: 1.0,
        });
        let material =new THREE.MeshPhongMaterial({ color: '#232000', emissive: 0x072534, side: THREE.DoubleSide });
        let depth_flange3=0.1;
        let radius_hole3=0.05;
        let radius_central3=0.15;
        let thickness_nozzle_cylinder3=0.05;
        let radius_flange3=0.4
        let extrudeSettings3 = { curveSegments: 50,depth: extrude_length, bevelEnabled: false, bevelSegments: 1, steps: 1, bevelSize: 0, bevelThickness: 0 };
        let extrudeSettings4 = { curveSegments: 50,depth: 1, bevelEnabled: false, bevelSegments: 1, steps: 1, bevelSize: 0, bevelThickness: 0 };
   
       
        let arcShape3 = new THREE.Shape();
        arcShape3.moveTo(0, 0 );
        arcShape3.absarc( 0, 0, radius_outer, 0, Math.PI * 2, false );
        let holePath3 = new THREE.Path();
        holePath3.moveTo( 0, 0 );
   
        holePath3.absarc( (radius_outer-0.2), radius_outer-0.25,radius_hole3, 0, Math.PI * 2, true );
   
        let holePath32 = new THREE.Path();
        holePath32.moveTo( 0, 0 );
        
        holePath32.absarc( radius_outer-0.2, 0.25-radius_outer,radius_hole3, 0, Math.PI * 2, true );
        arcShape3.holes.push(holePath32);
   
   
        let holePath33 = new THREE.Path();
        holePath33.moveTo( 0, 0 );
        
        holePath33.absarc( -(radius_outer-0.2), 0.25-radius_outer,radius_hole3, 0, Math.PI * 2, true );
        arcShape3.holes.push(holePath33);
   
        let holePath34 = new THREE.Path();
        holePath34.moveTo( 0, 0 );
        
        holePath34.absarc( 0, 0,radius_inner, 0, Math.PI * 2, true );
        arcShape3.holes.push(holePath34);
   
        arcShape3.holes.push( holePath3 );
        let holePath35 = new THREE.Path();
        holePath35.moveTo( 0, 0 );
        holePath35.absarc( -(radius_outer-0.2), radius_outer-0.25,radius_hole3, 0, Math.PI * 2, true );
        arcShape3.holes.push(holePath35);
  
        let geometry_extrude3 = new THREE.ExtrudeGeometry( arcShape3, extrudeSettings3 );
  let mesh3 = new THREE.Mesh( geometry_extrude3, material) ;
  mesh3.translateX(translateX+lenght_poip).translateY(translateY).translateZ(translateZ).rotateX(rotateX).rotateY(rotateY).rotateZ(rotateZ);
  
  //this.scene.add(mesh3);
  return mesh3; 
  
  }  
    
    
    
   export default ThreeScene;