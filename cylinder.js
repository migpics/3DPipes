var container, stats;
var camera, scene, raycaster, renderer;

var mouse = new THREE.Vector2(), INTERSECTED;
var radius = 100, theta = 0;

init();
animate();

function init() {
    
    container = document.createElement( 'div' );
    document.body.appendChild( container );
    
    var info = document.createElement( 'div' );
    info.style.position = 'absolute';
    info.style.top = '10px';
    info.style.width = '100%';
    info.style.textAlign = 'center';
    info.innerHTML = '<a href="http://threejs.org" target="_blank">three.js</a> webgl - interactive cubes';
    container.appendChild( info );

    camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
    camera.position.z = 750;
    camera.position.y = 500;    
    controls = new THREE.OrbitControls( camera );
    controls.damping = 0.2;
    controls.addEventListener( 'change', render );

    scene = new THREE.Scene();
    
    var light = new THREE.DirectionalLight( 0xffffff, .75 );
    light.position.set( 1, 1, 1 ).normalize();
    scene.add( light );
	
    var light2 = new THREE.DirectionalLight( 0xffffff, .75 );
    light2.position.set( 1, 1, -20 ).normalize();
    scene.add( light2 );

    var light3 = new THREE.DirectionalLight( 0xffffff, .25 );
    light3.position.set( 1, -100, 1 ).normalize();
    scene.add( light3 );

    var light4 = new THREE.DirectionalLight( 0xffffff, .25 );
    light4.position.set( -100, 1, 1 ).normalize();
    scene.add( light4 );


    json = {"pipeline_3": [
	{
	    "name": "Pipeline 3, Mark Number 00001", 
	    "diameter": 72,
	    "pipe_length": 20.0,
	    "position_x": 0,
	    "position_y": 0,
	    "position_z": 0,
	    "rotation_x": 0,
	    "rotation_z": 90
    },
	{
	    "name": "Pipeline 3, Mark Number 00002", 
	    "diameter": 72,
	    "pipe_length": 20.0,
	    "position_x": 264,
	    "position_y": 0,
	    "position_z": 0,
	    "rotation_x": 0,
	    "rotation_z": 88
	},
	{
	    "name": "Pipeline 3, Mark Number 00002", 
	    "diameter": 72,
	    "pipe_length": 20.0,
	    "position_x": 528,
	    "position_y": -15,
	    "position_z": 0,
	    "rotation_x": 0,
	    "rotation_z": 84
	},
	{
	    "name": "Pipeline 3, Mark Number 00002", 
	    "diameter": 72,
	    "pipe_length": 20.0,
	    "position_x": 792,
	    "position_y": -50,
	    "position_z": 0,
	    "rotation_x": 0,
	    "rotation_z": 80
	},
	{
	    "name": "Pipeline 3, Mark Number 00002", 
	    "diameter": 72,
	    "pipe_length": 20.0,
	    "position_x": 1056,
	    "position_y": -110,
	    "position_z": 0,
	    "rotation_x": 0,
	    "rotation_z": 75
	},
	{
	    "name": "Pipeline 3, Mark Number 00002", 
	    "diameter": 72,
	    "pipe_length": 20.0,
	    "position_x": 1320,
	    "position_y": -145,
	    "position_z": 0,
	    "rotation_x": 0,
	    "rotation_z": 90
	},
	{
	    "name": "Pipeline 3, Mark Number 00002", 
	    "diameter": 72,
	    "pipe_length": 20.0,
	    "position_x": 1584,
	    "position_y": -135,
	    "position_z": 0,
	    "rotation_x": 0,
	    "rotation_z": 95
	},
	{
	    "name": "Pipeline 3, Mark Number 00002", 
	    "diameter": 72,
	    "pipe_length": 20.0,
	    "position_x": 1848,
	    "position_y": -100,
	    "position_z": 0,
	    "rotation_x": 0,
	    "rotation_z": 100
	},


    ]}

    for (i=0; i < json.pipeline_3.length; i++) {
	  
	  //var obj = json.pipeline_3[i];
	
	   var object_geometry = new THREE.CylinderGeometry(json.pipeline_3[i].diameter/2, json.pipeline_3[i].diameter/2, 264, 32, 2);
    	   var object_material =  new THREE.MeshLambertMaterial( { color: 0x0066ff, shading: THREE.FlatShading } );
    	   object = new THREE.Mesh(object_geometry, object_material );  
	   object.name = json.pipeline_3[i].name;  
           object.position.x = json.pipeline_3[i].position_x;
           object.position.y = json.pipeline_3[i].position_y;
           object.rotation.z = json.pipeline_3[i].rotation_z*Math.PI/180;	
           object.position.z = json.pipeline_3[i].position_z;	
           object.updateMatrix();
           object.matrixAutoUpdate = false;			
           scene.add(object);
	
	}

    json = {"pipeline_4": [
	{
	    "name": "Pipeline 4, Mark Number 00001", 
	    "diameter": 96,
	    "pipe_length": 20.0,
	    "position_x": 0,
	    "position_y": 0,
	    "position_z": 240,
	    "rotation_x": 0,
	    "rotation_z": 90
    },
	{
	    "name": "Pipeline 4, Mark Number 00002", 
	    "diameter": 96,
	    "pipe_length": 20.0,
	    "position_x": 264,
	    "position_y": 0,
	    "position_z": 240,
	    "rotation_x": 0,
	    "rotation_z": 88
	},
	{
	    "name": "Pipeline 4, Mark Number 00002", 
	    "diameter": 96,
	    "pipe_length": 20.0,
	    "position_x": 528,
	    "position_y": -15,
	    "position_z": 240,
	    "rotation_x": 0,
	    "rotation_z": 84
	},
	{
	    "name": "Pipeline 4, Mark Number 00002", 
	    "diameter": 96,
	    "pipe_length": 20.0,
	    "position_x": 792,
	    "position_y": -50,
	    "position_z": 240,
	    "rotation_x": 0,
	    "rotation_z": 80
	},
	{
	    "name": "Pipeline 4, Mark Number 00002", 
	    "diameter": 96,
	    "pipe_length": 20.0,
	    "position_x": 1056,
	    "position_y": -110,
	    "position_z": 240,
	    "rotation_x": 0,
	    "rotation_z": 75
	},
	{
	    "name": "Pipeline 4, Mark Number 00002", 
	    "diameter": 96,
	    "pipe_length": 20.0,
	    "position_x": 1320,
	    "position_y": -145,
	    "position_z": 240,
	    "rotation_x": 0,
	    "rotation_z": 90
	},
	{
	    "name": "Pipeline 4, Mark Number 00002", 
	    "diameter": 96,
	    "pipe_length": 20.0,
	    "position_x": 1584,
	    "position_y": -135,
	    "position_z": 240,
	    "rotation_x": 0,
	    "rotation_z": 95
	},
	{
	    "name": "Pipeline 4, Mark Number 00002", 
	    "diameter": 96,
	    "pipe_length": 20.0,
	    "position_x": 1848,
	    "position_y": -100,
	    "position_z": 240,
	    "rotation_x": 0,
	    "rotation_z": 100
	},


    ]}



    for (i=0; i < json.pipeline_4.length; i++) {
	  
	
	
	   var object_geometry = new THREE.CylinderGeometry(json.pipeline_4[i].diameter/2, json.pipeline_4[i].diameter/2, 264, 32, 2);
    	   var object_material =  new THREE.MeshLambertMaterial( { color: 0x0066ff, shading: THREE.FlatShading } );
    	   object = new THREE.Mesh(object_geometry, object_material );  
	   object.name = json.pipeline_4[i].name;  
           object.position.x = json.pipeline_4[i].position_x;
           object.position.y = json.pipeline_4[i].position_y;
           object.rotation.z = json.pipeline_4[i].rotation_z*Math.PI/180;	
           object.position.z = json.pipeline_4[i].position_z;	
           object.updateMatrix();
           object.matrixAutoUpdate = false;			
           scene.add(object);
	
	}

json = {"pipeline_5": [
	{
	    "name": "Pipeline 5, Mark Number 00001", 
	    "diameter": 108,
	    "pipe_length": 20.0,
	    "position_x": 0,
	    "position_y": 0,
	    "position_z": 480,
	    "rotation_x": 0,
	    "rotation_z": 90
    },
	{
	    "name": "Pipeline 5, Mark Number 00002", 
	    "diameter": 108,
	    "pipe_length": 20.0,
	    "position_x": 264,
	    "position_y": 0,
	    "position_z": 480,
	    "rotation_x": 0,
	    "rotation_z": 88
	},
	{
	    "name": "Pipeline 5, Mark Number 00003", 
	    "diameter": 108,
	    "pipe_length": 20.0,
	    "position_x": 528,
	    "position_y": -15,
	    "position_z": 480,
	    "rotation_x": 0,
	    "rotation_z": 84
	},
	{
	    "name": "Pipeline 5, Mark Number 00004", 
	    "diameter": 108,
	    "pipe_length": 20.0,
	    "position_x": 792,
	    "position_y": -50,
	    "position_z": 480,
	    "rotation_x": 0,
	    "rotation_z": 80
	},
	{
	    "name": "Pipeline 5, Mark Number 00005", 
	    "diameter": 108,
	    "pipe_length": 20.0,
	    "position_x": 1056,
	    "position_y": -110,
	    "position_z": 480,
	    "rotation_x": 0,
	    "rotation_z": 75
	},
	{
	    "name": "Pipeline 5, Mark Number 00006", 
	    "diameter": 108,
	    "pipe_length": 20.0,
	    "position_x": 1320,
	    "position_y": -145,
	    "position_z": 480,
	    "rotation_x": 0,
	    "rotation_z": 90
	},
	{
	    "name": "Pipeline 5, Mark Number 00007", 
	    "diameter": 108,
	    "pipe_length": 20.0,
	    "position_x": 1584,
	    "position_y": -135,
	    "position_z": 480,
	    "rotation_x": 0,
	    "rotation_z": 95
	},
	{
	    "name": "Pipeline 5, Mark Number 00008", 
	    "diameter": 108,
	    "pipe_length": 20.0,
	    "position_x": 1848,
	    "position_y": -100,
	    "position_z": 480,
	    "rotation_x": 0,
	    "rotation_z": 100
	},


    ]}



    for (i=0; i < json.pipeline_5.length; i++) {
	  
	
	
	   var object_geometry = new THREE.CylinderGeometry(json.pipeline_5[i].diameter/2, json.pipeline_5[i].diameter/2, 264, 32, 2);
    	   var object_material =  new THREE.MeshLambertMaterial( { color: 0x008000, shading: THREE.FlatShading } );
    	   object = new THREE.Mesh(object_geometry, object_material );  
	   object.name = json.pipeline_5[i].name;  
           object.position.x = json.pipeline_5[i].position_x;
           object.position.y = json.pipeline_5[i].position_y;
           object.rotation.z = json.pipeline_5[i].rotation_z*Math.PI/180;	
           object.position.z = json.pipeline_5[i].position_z;	
           object.updateMatrix();
           object.matrixAutoUpdate = false;			
           scene.add(object);
	
	}




    json = {"structures3": [
	{
	    "name": "Structure 3", 
	    "diameter": 30,
	    "pipe_length": 36,
	    "position_x": 0,
	    "position_y": 36,
	    "position_z": 0,
	    "rotation_x": 0,
	    "rotation_z": 0
    	},

	{
	    "name": "Structure 3", 
	    "diameter": 30,
	    "pipe_length": 36,
	    "position_x": 1320,
	    "position_y": -100,
	    "position_z": 0,
	    "rotation_x": 0,
	    "rotation_z": 0
    	},



    ]}

    //mig: do forloop over json.pipes



    for (i=0; i < json.structures3.length; i++) {
	  
	
	   var object_geometry = new THREE.CylinderGeometry(json.structures3[i].diameter/2, json.structures3[i].diameter/2, json.structures3[i].pipe_length, 32, 2);
    	   var object_material =  new THREE.MeshLambertMaterial( { color: 0x0066ff, shading: THREE.FlatShading } );
    	   object = new THREE.Mesh(object_geometry, object_material );  
	   object.name = json.structures3[i].name;  
           object.position.x = json.structures3[i].position_x;
           object.position.y = json.structures3[i].position_y;
           object.rotation.z = json.structures3[i].rotation_z*Math.PI/180;	
           object.position.z = json.structures3[i].position_z;	
           object.updateMatrix();
           object.matrixAutoUpdate = false;			
           scene.add(object);
	
	}



    json = {"structures4": [
	{
	    "name": "Structure 4", 
	    "diameter": 30,
	    "pipe_length": 36,
	    "position_x": 0,
	    "position_y": 36,
	    "position_z": 240,
	    "rotation_x": 0,
	    "rotation_z": 0
    	},

	{
	    "name": "Structure 4", 
	    "diameter": 30,
	    "pipe_length": 36,
	    "position_x": 1320,
	    "position_y": -100,
	    "position_z": 240,
	    "rotation_x": 0,
	    "rotation_z": 0
    	},



    ]}

    //mig: do forloop over json.pipes



    for (i=0; i < json.structures4.length; i++) {
	  
	
	   var object_geometry = new THREE.CylinderGeometry(json.structures4[i].diameter/2, json.structures4[i].diameter/2, json.structures4[i].pipe_length, 32, 2);
    	   var object_material =  new THREE.MeshLambertMaterial( { color: 0x0066ff, shading: THREE.FlatShading } );
    	   object = new THREE.Mesh(object_geometry, object_material );  
	   object.name = json.structures4[i].name;  
           object.position.x = json.structures4[i].position_x;
           object.position.y = json.structures4[i].position_y;
           object.rotation.z = json.structures4[i].rotation_z*Math.PI/180;	
           object.position.z = json.structures4[i].position_z;	
           object.updateMatrix();
           object.matrixAutoUpdate = false;			
           scene.add(object);
	
	}


    json = {"structures5": [
	{
	    "name": "Structure 4", 
	    "diameter": 30,
	    "pipe_length": 36,
	    "position_x": 0,
	    "position_y": 50,
	    "position_z": 480,
	    "rotation_x": 0,
	    "rotation_z": 0
    	},

	{
	    "name": "Structure 4", 
	    "diameter": 30,
	    "pipe_length": 36,
	    "position_x": 1320,
	    "position_y": -80,
	    "position_z": 480,
	    "rotation_x": 0,
	    "rotation_z": 0
    	},



    ]}

    //mig: do forloop over json.pipes



    for (i=0; i < json.structures5.length; i++) {
	  
	
	   var object_geometry = new THREE.CylinderGeometry(json.structures5[i].diameter/2, json.structures5[i].diameter/2, json.structures5[i].pipe_length, 32, 2);
    	   var object_material =  new THREE.MeshLambertMaterial( { color: 0x0066ff, shading: THREE.FlatShading } );
    	   object = new THREE.Mesh(object_geometry, object_material );  
	   object.name = json.structures5[i].name;  
           object.position.x = json.structures5[i].position_x;
           object.position.y = json.structures5[i].position_y;
           object.rotation.z = json.structures5[i].rotation_z*Math.PI/180;	
           object.position.z = json.structures5[i].position_z;	
           object.updateMatrix();
           object.matrixAutoUpdate = false;			
           scene.add(object);
	
	}







    raycaster = new THREE.Raycaster();
    
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor( 0xf0f0f0 );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.sortObjects = false;
    container.appendChild(renderer.domElement);
    
    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild( stats.domElement );
    
    document.addEventListener( 'click', onDocumentClick, true );
    
    //
    
    window.addEventListener( 'resize', onWindowResize, false );
    
}

function onWindowResize() {
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize( window.innerWidth, window.innerHeight );
    
}

function onDocumentClick( event ) {
    
    event.preventDefault();
    
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;


	    var text2 = document.createElement('div');
	    text2.style.position = 'absolute';
            text2.style.width = 100;
	    text2.style.height = 100;
	    text2.style.backgroundColor = "white";
            text2.innerHTML = INTERSECTED.name;
	    text2.style.top = 100 + 'px';
	    text2.style.left = 100 + 'px';
	    document.body.appendChild(text2);
}




function animate() {
    
    requestAnimationFrame( animate );
    
    render();
    stats.update();
    
}



function render() {
    
    //theta += 0.1;
    
   // camera.position.x = radius * Math.sin( THREE.Math.degToRad( theta ) );
   // camera.position.y = radius * Math.sin( THREE.Math.degToRad( theta ) );
    //camera.position.z = radius * Math.cos( THREE.Math.degToRad( theta ) );
   // camera.lookAt( scene.position );
    
    camera.updateMatrixWorld();
    
    // find intersections
    
    raycaster.setFromCamera( mouse, camera );
    
    var intersects = raycaster.intersectObjects( scene.children );
    
    if ( intersects.length > 0 ) {
	
	if ( INTERSECTED != intersects[ 0 ].object ) {
	    
	    if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
	    
	    INTERSECTED = intersects[ 0 ].object;
	    INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
	    INTERSECTED.material.emissive.setHex( 0xff0000 );

    


		



	    
	}
	
    } else {
	    
	    if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
	    
	    INTERSECTED = null;
	   


	}

    renderer.render( scene, camera );
    
}
