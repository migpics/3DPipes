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
    
    var light = new THREE.DirectionalLight( 0xffffff, 1 );
    light.position.set( 1, 1, 1 ).normalize();
    scene.add( light );

    json = {"pipes": [
	{
	    "name": "test 1", 
	    "diameter": 72,
	    "pipe_length": 20.0,
	    "position_x": 0,
	    "position_y": 0,
	    "position_z": 0,
	    "rotation_x": 0,
	    "rotation_z": 90
    },
	{
	    "name": "test 2", 
	    "diameter": 72,
	    "pipe_length": 20.0,
	    "position_x": 264,
	    "position_y": 0,
	    "position_z": 0,
	    "rotation_x": 0,
	    "rotation_z": 90
	},
	{
	    "name": "test 3", 
	    "diameter": 72,
	    "pipe_length": 20.0,
	    "position_x": 528,
	    "position_y": -15,
	    "position_z": 0,
	    "rotation_x": 0,
	    "rotation_z": 84
	},
	{
	    "name": "test 4", 
	    "diameter": 72,
	    "pipe_length": 20.0,
	    "position_x": 792,
	    "position_y": -50,
	    "position_z": 0,
	    "rotation_x": 0,
	    "rotation_z": 80
	},
	{
	    "name": "test 5", 
	    "diameter": 72,
	    "pipe_length": 20.0,
	    "position_x": 1056,
	    "position_y": -110,
	    "position_z": 0,
	    "rotation_x": 0,
	    "rotation_z": 75
	},
	{
	    "name": "test 6", 
	    "diameter": 72,
	    "pipe_length": 20.0,
	    "position_x": 1320,
	    "position_y": -145,
	    "position_z": 0,
	    "rotation_x": 0,
	    "rotation_z": 90
	},
	{
	    "name": "test 7", 
	    "diameter": 72,
	    "pipe_length": 20.0,
	    "position_x": 1584,
	    "position_y": -135,
	    "position_z": 0,
	    "rotation_x": 0,
	    "rotation_z": 95
	},
	{
	    "name": "test 8", 
	    "diameter": 72,
	    "pipe_length": 20.0,
	    "position_x": 1848,
	    "position_y": -100,
	    "position_z": 0,
	    "rotation_x": 0,
	    "rotation_z": 100
	},


    ]}

    for (i=0; i < json.pipes.length; i++) {
	  
	  //var obj = json.pipes[i];
	
	   var object_geometry = new THREE.CylinderGeometry(36, 36, 264, 32, 2);
    	   var object_material =  new THREE.MeshLambertMaterial( { color: 0x0066ff, shading: THREE.FlatShading } );
    	   object = new THREE.Mesh(object_geometry, object_material );  
	   object.name = json.pipes[i].name;  
           object.position.x = json.pipes[i].position_x;
           object.position.y = json.pipes[i].position_y;
           object.rotation.z = json.pipes[i].rotation_z*Math.PI/180;	
           object.position.z = json.pipes[i].position_z;	
           object.updateMatrix();
           object.matrixAutoUpdate = false;			
           scene.add(object);
	
	}


    json = {"structures": [
	{
	    "name": "Structure 1", 
	    "diameter": 30,
	    "pipe_length": 36,
	    "position_x": 0,
	    "position_y": 36,
	    "position_z": 0,
	    "rotation_x": 0,
	    "rotation_z": 0
    	},

	{
	    "name": "Structure 1", 
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



    for (i=0; i < json.structures.length; i++) {
	  
	
	   var object_geometry = new THREE.CylinderGeometry(json.structures[i].diameter/2, json.structures[i].diameter/2, json.structures[i].pipe_length, 32, 2);
    	   var object_material =  new THREE.MeshLambertMaterial( { color: 0x0066ff, shading: THREE.FlatShading } );
    	   object = new THREE.Mesh(object_geometry, object_material );  
	   object.name = json.structures[i].name;  
           object.position.x = json.structures[i].position_x;
           object.position.y = json.structures[i].position_y;
           object.rotation.z = json.structures[i].rotation_z*Math.PI/180;	
           object.position.z = json.structures[i].position_z;	
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
    
    document.addEventListener( 'click', onDocumentClick, false );
    
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
