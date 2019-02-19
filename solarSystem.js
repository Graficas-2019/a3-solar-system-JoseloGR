var planetsGroup = {
    sun: null,
    mercury: null,
    venus: null,
    earth: null,
    mars: null,
    jupiter: null,
    saturn: null,
    uranus: null,
    neptune: null,
    pluto: null
};

var renderer = null, 
scene = null, 
camera = null,
solarGroup = null,
orbitControls = null,
asteroids = null;

var duration = 30000; // ms
var currentTime = Date.now();

function animate() {
    var now = Date.now();
    var deltat = now - currentTime;
    currentTime = now;
    var fract = deltat / duration;
    var angle = Math.PI * 2 * fract;

    // Rotate the solarGroup about its Y axis
    solarGroup.rotation.y += angle;

    // Rotate the each planet and moon about its Y axis
    planets.forEach(planet => {
        fract = deltat / planet['speed'];
        angle = Math.PI * 2 * fract;
        planetsGroup[planet['id']]['children'].forEach(planetGroup => {
            planetGroup.rotation.y += angle;
        });
        // Rotate the each group planet about its Y axis
        planetsGroup[planet['id']].rotation.y += angle;
    });

    if(asteroids.children.length > 0) {
        asteroids.children.forEach(asteroid => {
            var fract = deltat / 10000;
            var angle = Math.PI * 2 * fract;
            asteroid.rotation.x += angle;
            asteroid.rotation.y += angle;
            asteroid.rotation.z += angle;
        });
    }
    
}

function run() {
    requestAnimationFrame(function() { run(); });

    // Render the scene
    renderer.render( scene, camera );

    // Spin the cube for next frame
    animate();

    // Update the camera controller
    orbitControls.update();
}

function createScene(canvas) {    
    // Create the Three.js renderer and attach it to our canvas
    renderer = new THREE.WebGLRenderer( { canvas: canvas, antialias: true } );

    // Set the viewport size
    renderer.setSize(canvas.width, canvas.height);

    // Create a new Three.js scene
    scene = new THREE.Scene();

    scene.background = new THREE.Color( 0.2, 0.2, 0.2 );

    // Add  a camera so we can view the scene
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 15000 );
    camera.position.z = 900;
    scene.add(camera);

    // element that is included in the camera to indicate the point of focus where it will rotate
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement); 

    createSkybox();
    
    // Create a group to hold all the objects
    solarGroup = new THREE.Object3D;
    
    // Add a directional light to show off the object
    var light = new THREE.DirectionalLight( 0xffffff, 1);

    // Position the light out from the scene, pointing at the origin
    light.position.set(140, 0, 0);
    solarGroup.add( light );

    light = new THREE.AmbientLight( 0xffef53, 0.4 );
    solarGroup.add(light);
    //scene.add(light)

    planets.forEach(planet => {
        createPlanets(planet);
        createOrbit(planet);
    });

    asteroids = new THREE.Object3D;
    solarGroup.add(asteroids);

    for(var j=0; j<50; j++) {
        createAsteroid();
    }

    // Now add the solarGroup to our scene
    scene.add( solarGroup );
}

// Create 3D Object with configuration of the planet
function createPlanets(planet) {
    // Create a group to hold the moons
    planetsGroup[planet['id']] = new THREE.Object3D;
    planetsGroup[planet['id']].name = `group_${planet['id']}`;
    
    solarGroup.add(planetsGroup[planet['id']]);

    var spherePlanet = createAstro(planet['material'], planet['bump'], planet['radius'], planet['widthSegments'], planet['heightSegments'] );
    spherePlanet.name = planet['id'];
    spherePlanet.rotation.x = planet['angleRotation'];

    planetsGroup[planet['id']].add(spherePlanet);
    var angles = randomAround(planet['distanceSun']);
    planetsGroup[planet['id']].position.set(angles[0], 0, angles[1]);

    if(planet['moon'] > 0) {
        for(var i=0; i<planet['moon']; i++) {
            var sphereMoon = createAstro('moon_1024.jpg', '', planet['radiusMoon'], planet['widthSegments'], planet['heightSegments']);
            var angles = randomAround(planet['distancePlanet']);
            sphereMoon.position.set(angles[0], 0, angles[1]);
            sphereMoon.name = `moon_${i}`;
            planetsGroup[planet['id']].add(sphereMoon);
        }
    }

    if(planet['rings'] > 0) {
        var geometry = new THREE.RingGeometry(planet['radius']+5, planet['radius']+10, 40 );
        var texture = new THREE.TextureLoader().load(`images/${planet['ringMaterial']}`);
        var material = new THREE.MeshPhongMaterial( { map: texture, side: THREE.DoubleSide });
        var ring = new THREE.Mesh(geometry, material);
        planetsGroup[planet['id']].add(ring);
    }
}

// Create 3D Object with configuration of any sphere astro
function createAstro(path, pathBump, radius, width, height) {
    var texture = new THREE.TextureLoader().load(`images/${path}`);
    var textureBump = null;
    var material = null;
    
    if(!!pathBump) {
        textureBump = new THREE.TextureLoader().load(`images/${pathBump}`);
        material = new THREE.MeshPhongMaterial({ map: texture, bumpMap: textureBump, bumpScale: 0.1 });
    }else {
        material = new THREE.MeshPhongMaterial({ map: texture });
    }
    // Create the sphere geometry
    var geometry = new THREE.SphereGeometry(radius, width, height);
    // And put the geometry and material together into a mesh
    var spherePlanet = new THREE.Mesh(geometry, material);
    return spherePlanet;
}

// Create 3D Object with configuration of the asteroid
function createAsteroid() {
    // instantiate a loader
    var loader = new THREE.OBJLoader();
    // load a resource
    loader.load('models/asteroid.obj',
        // called when resource is loaded
        function ( object ) {
            // calculate position around a radius
            var angles = randomAround(320);
            object.position.set(angles[0], 0, angles[1]);
            object.scale.set(Math.random() * 0.1, Math.random() * 0.1, Math.random() * 0.1);
            asteroids.add(object);
        },
        // called when loading is in progresses
        function ( xhr ) {
            console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
        },
        // called when loading has errors
        function ( error ) {
            console.log( 'An error happened' );
        }
    );
}

// Generate random angles
function randomAround(radius) {
    // get a random angle
    var angle = Math.random() * Math.PI * 2;
    var containers = [];
    containers.push(Math.cos(angle) * radius);
    containers.push(Math.sin(angle) * radius);
    return containers;
}

// Create the orbit for each planet
function createOrbit(planet) {
    var curve = new THREE.EllipseCurve(
        0,  0,                                         // ax, aY
        planet['distanceSun'], planet['distanceSun'],  // xRadius, yRadius
        0,  2 * Math.PI,                               // aStartAngle, aEndAngle
        true,                                          // aClockwise
        0                                              // aRotation
    );
    var points = curve.getPoints( 100 );
    var geometry = new THREE.BufferGeometry().setFromPoints( points );
    var material = new THREE.LineBasicMaterial( { color : 0xffffff } );
    // Create the object to add to the scene
    var ellipse = new THREE.Line( geometry, material );
    ellipse.rotation.x = Math.PI / 2;
    solarGroup.add(ellipse);
}

function createSkybox() {
    var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
    var skyboxMaterials = [
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('images/cwd_bk.jpg'),
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('images/cwd_bk.jpg'),
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('images/cwd_up.jpg'),
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('images/cwd_dn.jpg'),
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('images/cwd_rt.jpg'),
            side: THREE.DoubleSide
        }),
        new THREE.MeshBasicMaterial({
            map: new THREE.TextureLoader().load('images/cwd_lf.jpg'),
            side: THREE.DoubleSide
        })
    ];

    var skyboxMaterial = new THREE.MeshFaceMaterial(skyboxMaterials);
    var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
    skybox.position.set(0, 0, 0);
    scene.add(skybox);
}