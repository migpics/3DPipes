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



				var manager = new THREE.LoadingManager();
				manager.onProgress = function ( item, loaded, total ) {

					console.log( item, loaded, total );

				};
// model
				var loader = new THREE.OBJLoader( manager );
				loader.load( 'pif.obj', function ( object ) {

					object.traverse( function ( child ) {

						if ( child instanceof THREE.Mesh ) {

							//child.material.map = texture;

						}

					} );

					object.position.x = - 60;
                    object.rotation.x = 20* Math.PI / 180;
                    object.rotation.z = 20* Math.PI / 180;
                    object.scale.x = 30;
                    object.scale.y = 30;
                    object.scale.z = 30;
                    obj = object
					scene.add( obj );

				} );



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

    
}

function onWindowResize() {
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize( window.innerWidth, window.innerHeight );
    
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
