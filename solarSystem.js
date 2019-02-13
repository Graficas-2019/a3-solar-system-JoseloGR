var planets = [
    sun = {
        radius : 80.0,
        widthS : 20.0,
        heightS : 20.0,
        distanceSun : 0.0,
        angleRotation : 0.0,
        moon : 0,
        rings : 0,
        speed : 0.0,
        material : "sunmap.jpg",
        id: "sun"
    },
    mercury = {
        radius : 2.0,
        widthS : 20.0,
        heightS : 20.0,
        distanceSun : 140.0,
        angleRotation : 0.0,
        moon : 0,
        rings : 0,
        speed : 0.0,
        material : "mercurymap.jpg",
        id: "mercury"
    },
    venus = {
        radius : 6.0,
        widthS : 20.0,
        heightS : 20.0,
        distanceSun : 180.0,
        angleRotation : 0.0,
        moon : 0,
        rings : 0,
        speed : 0.0,
        material : "venusmap.jpg",
        id: "venus"
    },
    earth = {
        radius : 6.2,
        widthS : 20.0,
        heightS : 20.0,
        distanceSun : 220.0,
        angleRotation : 0.0,
        moon : 1,
        rings : 0,
        speed : 0.0,
        material : "earthmap1k.jpg",
        id: "earth"
    },
    mars = {
        radius : 3.5,
        widthS : 20.0,
        heightS : 20.0,
        distanceSun : 260.0,
        angleRotation : 0.0,
        moon : 0,
        rings : 0,
        speed : 0.0,
        material : "mars_1k_color.jpg",
        id: "mars"
    },
    jupiter = {
        radius : 34.0,
        widthS : 20.0,
        heightS : 20.0,
        distanceSun : 350.0,
        angleRotation : 0.0,
        moon : 0,
        rings : 0,
        speed : 0.0,
        material : "jupitermap.jpg",
        id: "jupiter"
    },
    saturn = {
        radius : 32.0,
        widthS : 20.0,
        heightS : 20.0,
        distanceSun : 450.0,
        angleRotation : 0.0,
        moon : 0,
        rings : 0,
        speed : 0.0,
        material : "saturnmap.jpg",
        id: "saturn"
    },
    uranus = {
        radius : 10.0,
        widthS : 20.0,
        heightS : 20.0,
        distanceSun : 520.0,
        angleRotation : 0.0,
        moon : 0,
        rings : 0,
        speed : 0.0,
        material : "uranusmap.jpg",
        id: "uranus"
    },
    neptune = {
        radius : 9.0,
        widthS : 20.0,
        heightS : 20.0,
        distanceSun : 580.0,
        angleRotation : 0.0,
        moon : 0,
        rings : 0,
        speed : 0.0,
        material : "neptunemap.jpg",
        id: "neptune"
    }
];

var planetsGroup = {
    sun: null,
    mercury: null,
    venus: null,
    earth: null,
    mars: null,
    jupiter: null,
    saturn: null,
    uranus: null,
    neptune: null
};

var renderer = null, 
scene = null, 
camera = null,
root = null,
group = null;

var duration = 30000; // ms
var currentTime = Date.now();

function animate() {
    var now = Date.now();
    var deltat = now - currentTime;
    currentTime = now;
    var fract = deltat / duration;
    var angle = Math.PI * 2 * fract;

    // Rotate the sphere group about its Y axis
    group.rotation.y += angle;

    planetsGroup['earth'].rotation.y += angle * 5;
    planetsGroup['earth'].rotation.x -= angle * 5;
}

function run() {
    requestAnimationFrame(function() { run(); });

    // Render the scene
    renderer.render( scene, camera );

    // Spin the cube for next frame
    animate();
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
    camera.position.z = 900;
    scene.add(camera);
    
    // Create a group to hold all the objects
    root = new THREE.Object3D;
    
    // Add a directional light to show off the object
    var light = new THREE.DirectionalLight( 0xffffff, 1);

    // Position the light out from the scene, pointing at the origin
    light.position.set(.5, 0, 1);
    root.add( light );

    light = new THREE.AmbientLight ( 0xaaccbb, 0.3 );
    root.add(light);
    
    // Create a group to hold the spheres
    group = new THREE.Object3D;
    root.add(group);

    for(var i=0; i<planets.length; i++) {
        console.log(planets[i]);
       createPlanets(planets[i]);
    }

    // Now add the group to our scene
    scene.add( root );
}

function rotateScene(deltax) {
    root.rotation.y += deltax / 100;
    console.log("rotation: 0," + root.rotation.y.toFixed(2) + ",0");
}

function scaleScene(scale) {
    root.scale.set(scale, scale, scale);
    console.log("scale: " + scale);
}

// Create 3D Object with configuration of the planet
function createPlanets(planet) {
    // Create a group to hold the moons
    planetsGroup[planet['id']] = new THREE.Object3D;
    group.add(planetsGroup[planet['id']]);

    var spherePlanet = createAstro(`images/${planet['material']}`, planet['radius'], planet['widthS'], planet['heightS'] );

    planetsGroup[planet['id']].add(spherePlanet)
    planetsGroup[planet['id']].position.set(planet['distanceSun'], 0, 0);

    if(planet['moon'] > 0) {
        for(var i=1; i<=planet['moon']; i++) {
            var sphereMoon = createAstro('images/moon_1024.jpg', planet['radius']/5, planet['widthS'], planet['heightS']);
            sphereMoon.position.set(0, 15*i, 0);
            planetsGroup[planet['id']].add(sphereMoon);
        }
    }
    group.add(planetsGroup[planet['id']]);
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