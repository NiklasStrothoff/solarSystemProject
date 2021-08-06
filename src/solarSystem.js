import * as THREE from "../node_modules/three/build/three.module.js";
import * as ORBIT from "../node_modules/three/examples/jsm/controls/OrbitControls.js";
import DomeventMouse from "../node_modules/Three-DOMEvents/dist/DomeventMouse.es.js";
import DomEvents from "../node_modules/Three-DOMEvents/dist/domevents.es.js";
import {clickBox, cControl, absoluteCoordinates, createCamera, createPointLight, createVenus, createBackground, createUranus, createSaturn, createSun, createNeptune, createMercury, createEarth, createMoon, createJupiter, createMars, createPlanetCenter, createLightDirectional, shadowProperties} from "./create.js";
import {planetIndex} from "./menu.js";
DomEvents.extend(DomeventMouse);



////////////////////////////////////////////////////////////////////////////////////////
//////CREATE PLANET PROPERTIES
///////////////////////////////////////////////////////////////////////////////////////	

//make all planets relative to earths radius(size), rotation(day), orbit(year)
const planetProp = {};

planetProp.sun = {radius: 30};
planetProp.earth = {radius: 1*9.5*0.1, rotation: 1/150, orbit: 1/365};//0.4 is min size
planetProp.earth.sunDist = 17.25 + planetProp.sun.radius; //change multiplacation to make solar system orbits smaller
planetProp.sun.rotation = planetProp.earth.rotation / 35;
planetProp.mercury = {radius: 0.383*9.5*0.1, sunDist: 5.1 + planetProp.sun.radius, rotation: planetProp.earth.rotation / 58.8 , orbit: planetProp.earth.orbit / 0.241};
planetProp.venus = {radius: 0.949*9.5*0.1, sunDist: 12.25 + planetProp.sun.radius, rotation: planetProp.earth.rotation / -243 , orbit: planetProp.earth.orbit / 0.615};
planetProp.moon = {radius: 0.2724*planetProp.earth.radius, earthDist: planetProp.earth.radius + 0.5, orbit: planetProp.earth.orbit * 13.37};
planetProp.mars = {radius: 0.532*9.5*0.1, sunDist: 28.4 + planetProp.sun.radius, rotation: planetProp.earth.rotation / 1.03, orbit: planetProp.earth.orbit / 1.88};
planetProp.jupiter = {radius: 11.21*9.5*0.1, sunDist: 85.5 + planetProp.sun.radius, rotation: planetProp.earth.rotation / 0.415, orbit: planetProp.earth.orbit / 11.9};
planetProp.saturn = {radius: 9.45*9.5*0.1, sunDist: 167 + planetProp.sun.radius, rotation: planetProp.earth.rotation / 0.445, orbit: planetProp.earth.orbit / 29.4};
planetProp.uranus = {radius: 4.01*9.5*0.1, sunDist: 335.5 + planetProp.sun.radius, rotation: planetProp.earth.rotation / -0.72, orbit: planetProp.earth.orbit / 83.7};
planetProp.neptune = {radius: 3.88*9.5*0.1, sunDist: 500 + planetProp.sun.radius, rotation: planetProp.earth.rotation /0.673 , orbit: planetProp.earth.orbit / 163.7};

//CREATE SCENE
const scene = new THREE.Scene();

//CREATE RENDERER
const renderer = new THREE.WebGLRenderer(); //choose renderer webGL
renderer.setSize( window.innerWidth, window.innerHeight ); // set size of rendered window
renderer.shadowMap.enabled = true; //active the shadow map
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // choose the type of algorithm that calculates the shadows
document.body.appendChild( renderer.domElement ); //add everything to html doc for display

var PlanetViewIndex = 0;

function changeIndex(pIndex){
    PlanetViewIndex = pIndex;
}


////////////////////////////////////////////////////////////////////////////////////////
//////CREATE PLANETS
///////////////////////////////////////////////////////////////////////////////////////	
//SUN
var sun = createSun(0, planetProp.sun.radius);
sun.addEventListener("click", function(event){
    PlanetViewIndex = 0;
});
scene.add(sun);

//CREATE EARTH
var earth = createEarth(planetProp.earth.sunDist, planetProp.earth.radius);
earth.name ="earth";
var earthContainer = new THREE.Object3D();
//create bigger contrainer so its easy to click planets
var clickBoxE = clickBox(planetProp.earth.radius * 5);
clickBoxE.name = "earth3";
earth.add(clickBoxE);
clickBoxE.addEventListener("click", function(event){
    changeIndex(3);
    console.log(event);
});
clickBoxE.addEventListener("ich", function(obj){
    PlanetViewIndex = 3;
    console.log(obj);
});
//add
earthContainer.add(earth);
scene.add(earthContainer);

//CREATE MOON
var moonContainer = new THREE.Object3D();
var moon = createMoon(planetProp.moon.earthDist, planetProp.moon.radius);
moonContainer.add(moon);
earth.add(moonContainer);

//JUPITER
var jupiter = createJupiter(planetProp.jupiter.sunDist, planetProp.jupiter.radius);
var jupiterContainer = new THREE.Object3D();
jupiter.addEventListener("click", function(event){
    PlanetViewIndex = 6;
});
jupiterContainer.add(jupiter);
scene.add(jupiterContainer);

//MARS
var mars = createMars(planetProp.mars.sunDist, planetProp.mars.radius);
var marsContainer = new THREE.Object3D();
//create bigger contrainer so its easy to click planets
var clickBoxMA = clickBox(planetProp.mars.radius * 7);
mars.add(clickBoxMA);
clickBoxMA.addEventListener("click", function(event){
    PlanetViewIndex = 5;
});
marsContainer.add(mars);
scene.add(marsContainer);

//MERCURY
var mercury = createMercury(planetProp.mercury.sunDist, planetProp.mercury.radius);
var mercuryContainer = new THREE.Object3D();
//create bigger contrainer so its easy to click planets
var clickBoxME = clickBox(planetProp.mercury.radius * 10);
mercury.add(clickBoxME);
clickBoxME.addEventListener("click", function(event){
    PlanetViewIndex = 1;
});
mercuryContainer.add(mercury);
scene.add(mercuryContainer);

//NEPTUNE
var neptune = createNeptune(planetProp.neptune.sunDist, planetProp.neptune.radius);
var neptuneContainer = new THREE.Object3D();
neptune.addEventListener("click", function(event){
    PlanetViewIndex = 9;
});
neptuneContainer.add(neptune);
scene.add(neptuneContainer);

//SATURN
var saturn = createSaturn(planetProp.saturn.sunDist, planetProp.saturn.radius);
var saturnContainer = new THREE.Object3D();
saturn.addEventListener("click", function(event){
    PlanetViewIndex = 7;
});
saturnContainer.add(saturn);
scene.add(saturnContainer);

//RING
var pi2 = Math.PI * 2;
var degToRad = pi2 / 360;
const rgeometry = new THREE.TorusGeometry( planetProp.saturn.radius * 2.2, 5, 2, 100 );
const rtexture = new THREE.TextureLoader().load("./src/textures/ring.png")
const rmaterial = new THREE.MeshStandardMaterial( {map : rtexture, transparent: true,  opacity: 3} );
const torus = new THREE.Mesh( rgeometry, rmaterial);
torus.rotation.x = 75 * degToRad;
saturn.add( torus );

//URANUS
var uranus = createUranus(planetProp.uranus.sunDist, planetProp.uranus.radius);
var uranusContainter = new THREE.Object3D();
uranus.addEventListener("click", function(event){
    PlanetViewIndex = 8;
});
uranusContainter.add(uranus);
scene.add(uranusContainter);

//VENUS
var venus = createVenus(planetProp.venus.sunDist, planetProp.venus.radius);
var venusContainer = new THREE.Object3D();
//create bigger contrainer so its easy to click planets
var clickBoxV = clickBox(planetProp.venus.radius * 5);
venus.add(clickBoxV);
clickBoxV.addEventListener("click", function(event){
    PlanetViewIndex = 2;
});
venusContainer.add(venus);
scene.add(venusContainer);


var rand = false;

if(rand){
    //RANDOM PLANETARY POSITION
    earthContainer.rotation.y = Math.random() * pi2; //earth
    moonContainer.rotation.y = Math.random() * pi2; //moon
    mercuryContainer.rotation.y = Math.random() * pi2; //mercury
    venusContainer.rotation.y = Math.random() * pi2; //venus
    marsContainer.rotation.y = Math.random() * pi2; //mars
    jupiterContainer.rotation.y = Math.random() * pi2; //jupiter
    saturnContainer.rotation.y = Math.random() * pi2; //saturn
    uranusContainter.rotation.y = Math.random() * pi2; //uranus
    neptuneContainer.rotation.y = Math.random() * pi2; //neptun
}
else{
    //PLANETARY POSITION FOR 01.08.2021 RELATIVE TO SUN EARTH DEGREE
    earthContainer.rotation.y = 0; //earth
    moonContainer.rotation.y = 100 * degToRad; //moon
    mercuryContainer.rotation.y = 180 * degToRad; //mercury
    venusContainer.rotation.y = 261 * degToRad; //venus
    marsContainer.rotation.y = 216 * degToRad; //mars
    jupiterContainer.rotation.y = 16 * degToRad; //jupiter
    saturnContainer.rotation.y = 2 * degToRad; //saturn
    uranusContainter.rotation.y = 97 * degToRad; //uranus
    neptuneContainer.rotation.y = 45 * degToRad; //neptun

};

//SPACE BACKGROUND
var space = createBackground(1000);
scene.add(space);

////////////////////////////////////////////////////////////////////////////////////////
//////CREATE CAMERA
///////////////////////////////////////////////////////////////////////////////////////		
var planets = ["sun", "mercury", "venus", "earth", "moon", "mars", "jupiter", "saturn", "uranus", "neptune"];
var planetsObj = [sun, mercury, venus, earth, moon, mars, jupiter, saturn, uranus, neptune];
var targetP = absoluteCoordinates(planetsObj[PlanetViewIndex]); //get planets global position
const camera = createCamera(targetP, (planetProp[planets[PlanetViewIndex]].radius * 2));
scene.add(camera);
const cameraControl = cControl(camera, renderer.domElement, targetP);

cameraControl.update();//must be added after any camera transformations!!!

const DEH = new DomEvents(camera, renderer.domElement);//create dom handler
DEH.activate(scene);//specify where the dom event handler should listen

////////////////////////////////////////////////////////////////////////////////////////
//////CREATE LIGHTS
///////////////////////////////////////////////////////////////////////////////////////		
//ADD SUN POINT LIGHT
var sunLight = createPointLight();
sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;
scene.add(sunLight);

//LIGHT AMBIENT
const lightA = new THREE.AmbientLight(0xFFFFFF, 0.5);
scene.add(lightA);

////////////////////////////////////////////////////////////////////////////////////////
//////CREATE EVENTS
///////////////////////////////////////////////////////////////////////////////////////


var clock = new THREE.Clock();
const animate = function () {
    requestAnimationFrame( animate );

    //ROTATE ALL PLANETS
    earth.rotation.y += planetProp.earth.rotation;
    moonContainer.rotation.y -= planetProp.earth.rotation; // counter the moon from orbiting by rotating the earth
    sun.rotation.y += planetProp.sun.rotation;
    venus.rotation.y += planetProp.venus.rotation;
    mercury.rotation.y -= planetProp.mercury.rotation;
    mars.rotation.y += planetProp.mars.rotation;
    jupiter.rotation.y += planetProp.jupiter.rotation;
    saturn.rotation.y += planetProp.saturn.rotation;
    torus.rotation.z = planetProp.saturn.rotation;
    uranus.rotation.y += planetProp.uranus.rotation;
    neptune.rotation.y += planetProp.neptune.rotation;

    //ORBIT ALL PLANETS
    earthContainer.rotation.y += planetProp.earth.orbit; //earth
    moonContainer.rotation.y += planetProp.moon.orbit; //moon
    mercuryContainer.rotation.y += planetProp.mercury.orbit; //mercury
    venusContainer.rotation.y += planetProp.venus.orbit; //venus
    marsContainer.rotation.y += planetProp.mars.orbit; //mars
    jupiterContainer.rotation.y += planetProp.jupiter.orbit; //jupiter
    saturnContainer.rotation.y += planetProp.saturn.orbit; //saturn
    uranusContainter.rotation.y += planetProp.uranus.orbit; //uranus
    neptuneContainer.rotation.y += planetProp.neptune.orbit; //neptune

    //ROTATE EARTH AND VENUS ATMOSPHERE
    earth.children[0].rotation.y -= planetProp.earth.rotation - 1/50; //rotate clouds on earth

    //CAMERA CONTROLS
    planetsObj[PlanetViewIndex].getWorldPosition(targetP);//earth coordinates
    cameraControl.update();
    camera.updateProjectionMatrix();
 


    renderer.render(scene, camera );
};

animate();

export {changeIndex};