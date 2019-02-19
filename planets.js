const planets = [
    sun = {
        radius: 80.0,
        widthSegments: 100.0,
        heightSegments: 100.0,
        distanceSun: 0.0,
        angleRotation: Math.PI / 8,
        moon: 0,
        rings: 0,
        speed: 30000.0,
        material: "sunmap.jpg",
        bump: '',
        id: "sun"
    },
    mercury = {
        radius: 2.0,
        widthSegments: 30.0,
        heightSegments: 30.0,
        distanceSun: 140.0,
        angleRotation: Math.PI / 4,
        moon: 0,
        rings: 0,
        speed: 2000.0,
        material: "mercurymap.jpg",
        bump: 'mercurybump.jpg',
        id: "mercury"
    },
    venus = {
        radius: 6.0,
        widthSegments: 30.0,
        heightSegments: 30.0,
        distanceSun: 180.0,
        angleRotation: Math.PI / 4,
        moon: 0,
        rings: 0,
        speed: 2500.0,
        material: "venusmap.jpg",
        bump: 'venusbump.jpg',
        id: "venus"
    },
    earth = {
        radius: 6.2,
        widthSegments: 30.0,
        heightSegments: 30.0,
        distanceSun: 220.0,
        angleRotation: Math.PI / 8,
        moon: 1,
        radiusMoon: 1.4,
        distancePlanet: 10.0,
        rings: 0,
        speed: 3000.0,
        material: "earthmap.jpg",
        bump: 'earthbump.jpg',
        id: "earth"
    },
    mars = {
        radius: 3.5,
        widthSegments: 30.0,
        heightSegments: 30.0,
        distanceSun: 260.0,
        angleRotation: Math.PI / 4,
        moon: 2,
        radiusMoon: 1.0,
        distancePlanet: 6.0,
        rings: 0,
        speed: 3500.0,
        material: "marsmap.jpg",
        bump: 'marsbump.jpg',
        id: "mars"
    },
    jupiter = {
        radius: 34.0,
        widthSegments: 50.0,
        heightSegments: 50.0,
        distanceSun: 400.0,
        angleRotation: Math.PI / 4,
        moon: 79,
        radiusMoon: 0.9,
        distancePlanet: 40.0,
        rings: 0,
        speed: 4000.0,
        material: "jupitermap.jpg",
        bump: '',
        id: "jupiter"
    },
    saturn = {
        radius: 32.0,
        widthSegments: 50.0,
        heightSegments: 50.0,
        distanceSun: 550.0,
        angleRotation: Math.PI / 2,
        moon: 62,
        radiusMoon: 0.8,
        distancePlanet: 36.0,
        rings: 1,
        ringMaterial: 'saturnring.jpg',
        speed: 4000.0,
        material: "saturnmap.jpg",
        bump: '',
        id: "saturn"
    },
    uranus = {
        radius: 10.0,
        widthSegments: 40.0,
        heightSegments: 40.0,
        distanceSun: 650.0,
        angleRotation: Math.PI / 2,
        moon: 27,
        radiusMoon: 0.8,
        distancePlanet: 14.0,
        rings: 1,
        ringMaterial: 'uranusring.jpg',
        speed: 3500.0,
        material: "uranusmap.jpg",
        bump: '',
        id: "uranus"
    },
    neptune = {
        radius: 9.0,
        widthSegments: 40.0,
        heightSegments: 40.0,
        distanceSun: 700.0,
        angleRotation: Math.PI / 2,
        moon: 14,
        radiusMoon: 0.8,
        distancePlanet: 13.0,
        rings: 0,
        speed: 3000.0,
        material: "neptunemap.jpg",
        bump: '',
        id: "neptune"
    },
    pluto = {
        radius: 1.5,
        widthSegments: 20.0,
        heightSegments: 20.0,
        distanceSun: 750.0,
        angleRotation: Math.PI / 8,
        moon: 5,
        radiusMoon: 0.5,
        distancePlanet: 2.0,
        rings: 0,
        speed: 500.0,
        material: "plutomap.jpg",
        bump: '',
        id: "pluto"
    }
];