//this is for me to attempt to refactor the planet.js file
//goal: have it render different planet based on input string


//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

import { loadPlanetData } from "./loadTextTest.js";

/*
Creating a Scene: https://threejs.org/manual/#en/creating-a-scene
Adding lights: https://threejs.org/manual/#en/lights
Controlling camera: https://threejs.org/manual/#en/cameras
This stackoverflow refers to adding and removing objects from a scene:
https://stackoverflow.com/questions/54544309/three-js-adding-and-replacing-objects-in-scene#:~:text=Specifically%2C%20you'll%20want%20to,Copy
method move referred to are -> 
https://threejs.org/docs/#Object3D.remove
controls: https://threejs.org/docs/#OrbitControls

*/
let object;
//This will be updated based on the value [inc makes it smaller]
let planetSize;
const solarSystem = ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"];

//Need to ensure that it loops back around [0,8] 
let solarSystemIndex = 0;
function getPlanetIndex(solarSystemIndex){
    return Math.abs(solarSystemIndex % solarSystem.length);
}
function choosePlanetName(solarSystemIndex){
    solarSystemIndex = Math.abs(solarSystemIndex % solarSystem.length);
    var obj = solarSystem[solarSystemIndex];
    return obj;
}

var planetName = choosePlanetName(solarSystemIndex);
const url = "/docs/json/planetInfo.json";
//handling button clicks for prev and next buttons
const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");

loadPlanetData(url, solarSystemIndex);

prevButton.addEventListener('click' , () => {
    solarSystemIndex--;
    planetName = choosePlanetName(solarSystemIndex);
    loadPlanetData(url, solarSystemIndex);
    renderPlanet(planetName);
    console.log(solarSystemIndex);
    console.log("prev works");
});

nextButton.addEventListener('click', () => {
    solarSystemIndex++;
    planetName = choosePlanetName(solarSystemIndex);
    loadPlanetData(url, solarSystemIndex);
    renderPlanet(planetName);
    console.log(solarSystemIndex);
    console.log("next works");
});

//adding the event listener for left and right arrows
//will be used to switch planets using the keyboard
//https://plainenglish.io/blog/how-to-detect-arrow-key-presses-in-javascript-2c38192de0e8
window.addEventListener('keydown', (event) => {
    if(event.key === "ArrowLeft"){
        solarSystemIndex--;
        planetName = choosePlanetName(solarSystemIndex);
        loadPlanetData(url, solarSystemIndex);
        renderPlanet(planetName);
    }
    else if(event.key === "ArrowRight"){
        solarSystemIndex++;
        planetName = choosePlanetName(solarSystemIndex);
        loadPlanetData(url, solarSystemIndex);
        renderPlanet(planetName);
    }
});

//creating the scene
function createPlanetScene(){
    const scene = new THREE.Scene();
    return scene;
}



//setting up the renderer
function createPlanetRenderer(){
    //setups the renderer (this was taken from the original planet.js file)
    const renderer = new THREE.WebGLRenderer({alpha:true});
    renderer.setSize(window.innerWidth, window.innerHeight);
    //Add the renderer to the DOM
    document.getElementById("container3D").appendChild(renderer.domElement);
    return renderer;
}

function addLighting(scene){
    //also taken from the planet.js file
    //Add lights to the scene, so we can actually see the 3D model
    var color= 0xffffff;
    var intensity = 1;
    const topLight = new THREE.DirectionalLight(color, intensity); // (color, intensity)
    topLight.position.set(500, 500, 500) //top-left-ish
    topLight.castShadow = true;
    scene.add(topLight);
    const ambientLight = new THREE.AmbientLight(0x333333, 1);
    scene.add(ambientLight);
}

/*
"you'll want to call scene.remove() with 
the current square shape (if present), 
rather than to call it with the shape object 
that you subsequently call scene.add()"

so perhaps:
- check if model is there
- if so, remove it
- load new model
- add to scene!
    */
    //Already tried getObjectByName but it returns undefined -> no object was found

function loadPlanetModel(planetName, scene){
    //Instantiate a loader for the .gltf file
    try {
        const loader = new GLTFLoader();
        //check if the object is already there
        if(object){
            scene.remove(object);
            object = null;
        }
        loader.load(
        'media/solarSystemModels/' + planetName + '.glb',
            function (gltf) {
                //If the file is loaded, add it to the scene
                object = gltf.scene;
                //retrying the getObjectByName here, but after looking at docs, must assign a name to the scene
                scene.add(object);
            },
        );
        console.log("Current planet: " + planetName); 
    } catch(e){
        console.log(e);
    }
}


function getPlanetSize(planetName){
    switch(planetName){
      case "mercury":
        planetSize = 500;
        break;
      case "venus":
        planetSize = 400;
        break;
      case "earth":
        planetSize = 300;
        break;
      case "mars":
        planetSize = 300;
        break;
      case "jupiter":
        planetSize = 200;        
        break;
      case "saturn":
        planetSize = 250;
        break;
      case "uranus":
        planetSize = 250;
        break;
      case "neptune":
        planetSize = 200;
        break;
      case "pluto":
        planetSize = 450;
        break;
    }
    return planetSize;
}


//Keep track of the mouse position, so we can make the eye move
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
    
//Render the scene
function animate() {
    requestAnimationFrame(animate);
    //Here we could add some code to update the scene, adding some automatic movement

    //Make the eye move
    //till rn Idk how this would actually work..
    /*Best guess:
    - gets the mouse coordinates
    - does some calculation from th constants
    - decides how to rotate the object based on that?
    */
    //I've played with the constants here until it looked good 
    //checks if the object is actually there
    if(object){
        object.rotation.y = -5 + mouseX / window.innerWidth * 3;
        object.rotation.x = -1 + mouseY * 2.5 / window.innerHeight;
    }
    renderer.render(scene, camera);
}


//setting up stuff
const scene = createPlanetScene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

//Set how far the camera will be from the 3D model
//LOOKS LIKE I WAS MISSING THIS PORTION HERE!!!!!
planetSize = getPlanetSize(planetName);
camera.position.z = planetSize;

const renderer = createPlanetRenderer();
addLighting(scene);
//adapted from planet.js again
//This adds controls to the camera, so we can rotate / zoom it with the mouse
const controls = new OrbitControls(camera, renderer.domElement);

//Add a listener to the window, so we can resize the window and the camera
window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();
renderPlanet(planetName);
//HOPEFULLY AFTER THE DEBUGGING THIS WORKS
function renderPlanet(planetName){
    //does the rest of the cool model stuff
    loadPlanetModel(planetName, scene);
    planetSize = getPlanetSize(planetName);
    camera.position.z = planetSize;

}


