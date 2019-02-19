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
orbitControls = null;

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
    for(var i=0; i<planets.length; i++) {
        fract = deltat / planets[i]['speed'];
        angle = Math.PI * 2 * fract;
        for(var j=0; j<planetsGroup[planets[i]['id']]['children'].length; j++) {
            planetsGroup[planets[i]['id']]['children'][j].rotation.y += angle;
        }
        planetsGroup[planets[i]['id']].rotation.y += angle;
        //planetsGroup[planets[i]['id']].rotation.x += angle;
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
    camera = new THREE.PerspectiveCamera( 45, canvas.width / canvas.height, 1, 4000 );
    camera.position.z = 900; //900
    scene.add(camera);

    // element that is included in the camera to indicate the point of focus where it will rotate
    orbitControls = new THREE.OrbitControls(camera, renderer.domElement); 
    
    // Create a group to hold all the objects
    solarGroup = new THREE.Object3D;
    
    // Add a directional light to show off the object
    var light = new THREE.DirectionalLight( 0xffffff, 1);

    // Position the light out from the scene, pointing at the origin
    light.position.set(.5, 0, 1);
    solarGroup.add( light );

    light = new THREE.AmbientLight ( 0xaaccbb, 0.3 );
    solarGroup.add(light);
    //scene.add(light)

    for(var i=0; i<planets.length; i++) {
        createPlanets(planets[i]);
    }

    // Now add the solarGroup to our scene
    scene.add( solarGroup );
}

function rotateScene(deltax) {
    solarGroup.rotation.y += deltax / 100;
    console.log("rotation: 0," + solarGroup.rotation.y.toFixed(2) + ",0");
}

function scaleScene(scale) {
    solarGroup.scale.set(scale, scale, scale);
    console.log("scale: " + scale);
}

// Create 3D Object with configuration of the planet
function createPlanets(planet) {
    // Create a group to hold the moons
    planetsGroup[planet['id']] = new THREE.Object3D;
    planetsGroup[planet['id']].name = `group_${planet['id']}`;
    
    solarGroup.add(planetsGroup[planet['id']]);

    var spherePlanet = createAstro(`images/${planet['material']}`, planet['radius'], planet['widthSegments'], planet['heightSegments'] );
    spherePlanet.name = planet['id'];

    planetsGroup[planet['id']].add(spherePlanet);
    planetsGroup[planet['id']].position.set(planet['distanceSun'], 0, 0);

    if(planet['moon'] > 0) {
        // for(var i=1; i<=planet['moon']; i++) {
        for(var i=1; i<=1; i++) {
            var sphereMoon = createAstro('images/moon_1024.jpg', planet['radiusMoon'], planet['widthSegments'], planet['heightSegments']);
            sphereMoon.position.set(planet['distancePlanet'], 0, 0);
            sphereMoon.name = `moon_${i}`;
            planetsGroup[planet['id']].add(sphereMoon);
        }
    }
    // group.add(planetsGroup[planet['id']]);
}

function createAstro(path, radius, width, height) {
    var texture = new THREE.TextureLoader().load(path);
    var material = new THREE.MeshPhongMaterial({ map: texture });
    // Create the sphere geometry
    var geometry = new THREE.SphereGeometry(radius, width, height);
    // And put the geometry and material together into a mesh
    var spherePlanet = new THREE.Mesh(geometry, material);
    return spherePlanet;
}