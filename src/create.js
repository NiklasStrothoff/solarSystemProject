import * as THREE from "../node_modules/three/build/three.module.js";
import * as ORBIT from "../node_modules/three/examples/jsm/controls/OrbitControls.js";

//CREATE A PLANET WITH A TEXTURE
function createPlanet(radius, txt){
    //CREATE SPHERE WITH TEXTURE
    var geometry = new THREE.SphereGeometry(radius, 32, 32);
    var texture = new THREE.TextureLoader().load("./src/textures/"+txt); //load new texture
    var material = new THREE.MeshStandardMaterial({map: texture});
    var sphere = new THREE.Mesh(geometry, material);
    sphere.receiveShadow = true;
    sphere.castShadow = true;
        
    return sphere;
}

//CREATE A DIRECTIONAL LIGHT
function createLightDirectional(x, y, z, target){
    var lightD = new THREE.DirectionalLight(0xFFFFFF, 1.5);
    lightD.position.set(x,y,z); //position light source
    lightD.target = target; //set target light is pointing at
    lightD.castShadow = true; //enable the object to create a shadow

    return lightD;
}

//SET DIRECTIONAL LIGHT SHADOW PROPERTIS
function shadowProperties(light, size, length){
    
    light.shadow.camera.left = size;
    light.shadow.camera.right = size;
    light.shadow.camera.top = size;
    light.shadow.camera.bottom = -size;
    light.shadow.camera.near = 1;
    light.shadow.camera.far = length;
}

//CREATES THE LIGHT OMITTED BY THE SUN
function createPointLight(){
    const sunLight = new THREE.PointLight(0xffffff, 1, 1500);
    sunLight.position.set(0,0,0);
    sunLight.castShadow = true;
    return sunLight;
}

//CREATE PLANET CENTER
function createPlanetCenter(planet){
    var planetCenter = new THREE.Object3D;
    planetCenter.position.copy(planet.position);

    return planetCenter;
}

//CREATE BACKGROUND
function createBackground(rad){
    var skyGeometry = new THREE.SphereGeometry(rad, 32, 32);
    var skyTexture = new THREE.TextureLoader().load("./src/textures/space.png");
    skyTexture.wrapS = THREE.RepeatWrapping;
    skyTexture.wrapT = THREE.RepeatWrapping;
    skyTexture.repeat.set(5,5);
    var skyMaterial = new THREE.MeshStandardMaterial({map: skyTexture, side: THREE.BackSide});
    var space = new THREE.Mesh(skyGeometry, skyMaterial);
    
    return space;
}

////////////////////////////////////////////////////////////////////////////////////////
//////CREATE PLANETS
///////////////////////////////////////////////////////////////////////////////////////

//CREATE EARTH
function createEarth(x, rad){
    var earth = createPlanet(rad, "earth.png");
    earth.position.x = x;

    //CREATE CLOUDS
    var cloudsGeometry = new THREE.SphereGeometry((rad + rad*0.01), 32, 32);
    var cloudsTexture = new THREE.TextureLoader().load("./src/textures/clouds.png"); //load new texture
    var cloudsMaterial = new THREE.MeshStandardMaterial({map: cloudsTexture, transparent: true, opacity: 2});
    var clouds = new THREE.Mesh(cloudsGeometry, cloudsMaterial);
    clouds.receiveShadow = true;
    clouds.castShadow = false;
    clouds.name = "clouds";
    
    earth.add(clouds);

    return earth;
}

//CREATE MOON
function createMoon(x, rad){
    var moon = createPlanet(rad, "moon.jpg");
    moon.position.set(x ,0.0038,0);

    return moon;
}

//CREATE JUPITER
function createJupiter(x, rad){
    var jupiter = createPlanet(rad, "jupiter.jpg");
    jupiter.position.x = x;

    return jupiter;
}

//CREATE MARS
function createMars(x, rad){
    var mars = createPlanet(rad, "mars.jpg");
    mars.position.x = x;

    return mars;
}

//CREATE MERCURY
function createMercury(x, rad){
    var mercury = createPlanet(rad, "mercury.jpg");
    mercury.position.x = x;

    return mercury;
}

//CREATE NEPTUNE
function createNeptune(x, rad){
    var neptune = createPlanet(rad, "neptune.jpg");
    neptune.position.x = x;

    return neptune;
}

//CREATE SATURN
function createSaturn(x, rad){
    var saturn = createPlanet(rad, "saturn.jpg");
    saturn.position.x = x;

    return saturn;
}

//CREATE SUN
function createSun(x, rad){
    var sun = createPlanet(rad, "sun.jpg");
    sun.position.set(x,0,0);
    sun.receiveShadow = false;
    sun.castShadow = false;
    //make sun glow
    var emissiveTexture = new THREE.TextureLoader().load("./src/textures/sun.jpg");
    sun.material.emissive.set(0xffffff);
    sun.material.emissiveIntensity = 0.75;
    sun.material.emissiveMap = emissiveTexture;
    
    return sun;
}

//CREATE URANUS
function createUranus(x, rad){
    var uranus = createPlanet(rad, "uranus.jpg");
    uranus.position.x = x;

    return uranus;
}

//CREATE VENUS
function createVenus(x, rad){
    var venus = createPlanet(rad, "venus.jpg");
    venus.position.x = x;

    return venus;
}


////////////////////////////////////////////////////////////////////////////////////////
//////CAMERA AND CLICKS
///////////////////////////////////////////////////////////////////////////////////////
function createCamera(coordinates, dist){
    var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 5000 );
    camera.position.set(coordinates.x + dist, 200, coordinates.z);
    //camera.lookAt(coordinates);
    
    return camera;
}
function absoluteCoordinates(planet){
    var targetP = new THREE.Vector3();
    planet.getWorldPosition(targetP);

    return targetP;
}

function cControl(camera, domE, coordinates){
    const cameraControl = new ORBIT.OrbitControls(camera, domE);
    cameraControl.target = coordinates;

    return cameraControl;
}

function clickBox(clickSize, ){
    var clickMat = new THREE.MeshStandardMaterial({transparent: true, opacity: 0, color: 0x00ffff});
    var earthClic = new THREE.Mesh(new THREE.BoxGeometry(clickSize, clickSize, clickSize), clickMat);
    return earthClic;
}



export {clickBox, cControl, absoluteCoordinates, createCamera, createPointLight, createVenus, createBackground, createUranus, createSaturn, createSun, createNeptune, createMercury, createEarth, createMoon, createJupiter, createMars, createPlanetCenter, createLightDirectional, shadowProperties};