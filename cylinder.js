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
	    "diameter": 10.0,
	    "pipe_length": 20.0,
	    "position_x": 1.0,
	    "position_y": 1.0,
	    "position_z": 1.0,
	    "rotation_x": 1.0,
	    "rotation_z": 1.0
    },
	{
	    "name": "test 1", 
	    "diameter": 10.0,
	    "pipe_length": 20.0,
	    "position_x": 1.0,
	    "position_y": 1.0,
	    "position_z": 1.0,
	    "rotation_x": 1.0,
	    "rotation_z": 1.0
	},
    ]}

    //mig: do forloop over json.pipes

    for (i=0; i < json.pipes.length; i++) {
	
	    var json.pipes[name] = new THREE.CylinderGeometry(36, 36, 264, 32, 2);
    	    var json.pipes.name + material =  new THREE.MeshLambertMaterial( { color: 0x0066ff, shading: THREE.FlatShading } );
    	    json.pipes.[name] = new THREE.Mesh(json.pipes.name + '_geometry', json.pips.name + '_material' );    
            json.pipes.[name].position.x = json.pipes[position_x];
            json.pipes.[name].position.y = json.pipes.[position_y];
            json.pipes.[name].rotation.z = json.pipes.[rotation_z]*Math.PI/180;	
            json.pipes.[name].position.z = json.pipes.[position_z];	
            json.pipes.[name].updateMatrix();
            json.pipes.[name].matrixAutoUpdate = false;			
            scene.add(json.pipes.[name]);
	
	}

    //var pipe00001_geometry = new THREE.CylinderGeometry(36, 36, 264, 32, 2);
    //var pipe00001_material =  new THREE.MeshLambertMaterial( { color: 0x0066ff, shading: THREE.FlatShading } );
    //pipe00001 = new THREE.Mesh(pipe00001_geometry, pipe00001_material );    
   // pipe00001.position.x = 0;
   // pipe00001.position.y = 25;
   // pipe00001.rotation.z = 90*Math.PI/180;	
   // pipe00001.position.z = 34;	
   // pipe00001.updateMatrix();
   // pipe00001.matrixAutoUpdate = false;			
   // scene.add(pipe00001);
    
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
	    alert ("Insert Data Here");
	    
	}
	
    } else {
	    
	    if ( INTERSECTED ) INTERSECTED.material.emissive.setHex( INTERSECTED.currentHex );
	    
	    INTERSECTED = null;

	}

    renderer.render( scene, camera );
    
}
