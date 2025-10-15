//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";



//CODE ADAPTED FROM: https://www.youtube.com/watch?v=lGokKxJ8D2c
//Learned more from: https://www.youtube.com/watch?v=wG6-lGODkKs
//ALL Solar System Models Taken from: Akshat @ https://sketchfab.com/shooter24994

/*
Steps:
Set up scene: load stuff
Set up object
define camera
render model
*/

/*
to do:

NEED TO ABSTRACT the steps
//Import other solar system models
//use an array to store names of planets to change models [iterate and render]
//mess with the camera settings to ensure it functions like the eye
    Need to edit test.js in the way that the zoom is, atm its super zoomed in to the model, need to make it be far while capturing relative planet size

create an external div container THAT will center the planets in the middle of page
- Created buttons to change index based on order of prev or next
- idk if we need to fetch the model from dom and update it...
*/

function main(){
  /*Earth, */
  //Create a Three.JS Scene
  const scene = new THREE.Scene();
  //create a new camera with positions and angles
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

  //Keep track of the mouse position, so we can make the eye move
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  //Keep the 3D object on a global variable so we can access it later
  let object;

  //OrbitControls allow the camera to move around the scene
  let controls;

  //Set which object to render

  const solarSystem = ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune", "pluto"];

  //Need to ensure that it loops back around [0,8] 
  let solarSystemIndex = 2;

  function renderObj(solarSystemIndex){
    solarSystemIndex = Math.abs(solarSystemIndex % solarSystem.length);
    var obj = solarSystem[solarSystemIndex];
    return obj;
  }
  var objToRender = renderObj(solarSystemIndex);

  //handling button clicks for prev and next buttons

  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");

  prevButton.addEventListener('click' , () => {
      solarSystemIndex--;
      objToRender = renderObj(solarSystemIndex);
      console.log(solarSystemIndex);
      console.log("prev works");
      console.log(objToRender); 
    });

  nextButton.addEventListener('click', () => {
    solarSystemIndex++;
    objToRender = renderObj(solarSystemIndex);
    console.log(solarSystemIndex);
    console.log("next works");
    console.log(objToRender); 
  });


  //Buttons to help switch the 3d models
  //need a back button for all
  //Since the objects have indexes, we can build off this to use mod % len of arr to loop forward
  //the issue is going backwards -> do i subtract 1 from the index? issue is going to index =1 rather than looping

  // After getting the planets to only spawn on left at a given size
  /*
    - Need to change the sizes up [still not to scale but make it seem like it]
    - use switch case stateement for each of the planets OR the index we are in
    - update planet size based on the planet
  */

  //Instantiate a loader for the .gltf file
  const loader = new GLTFLoader();

  //Load the file [can be turned into an array]
  loader.load(
    'media/solarSystemModels/' + objToRender + '.glb',
    function (gltf) {
      //If the file is loaded, add it to the scene
      object = gltf.scene;
      scene.add(object);
    },
    function (xhr) {
      //While it is loading, log the progress
      console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
      //If there is an error, log it
      console.error(error);
    }
  );

  //Instantiate a new renderer and set its size
  const renderer = new THREE.WebGLRenderer({ alpha: true }); //Alpha: true allows for the transparent background


  //this seemed to have made the planets BASED on container size rather than the window size...
  renderer.setSize(window.innerWidth, window.innerHeight);

  //Add the renderer to the DOM
  document.getElementById("container3D").appendChild(renderer.domElement);


  //OK MUST ensure that the sizes are varying using switch statements BASED on the value

  //This will be updated based on the value [inc makes it smaller]
  var planetSize;

  switch(objToRender){
      case "mercury":
        planetSize = 500;
        console.log(objToRender);
        break;
      case "venus":
        planetSize = 400;
        console.log(objToRender);
        break;
      case "earth":
        planetSize = 300;
        console.log(objToRender);
        break;
      case "mars":
        planetSize = 300;
        console.log(objToRender);
        break;
      case "jupiter":
        planetSize = 200;
        console.log(objToRender);
        break;
      case "saturn":
        planetSize = 250;
        console.log(objToRender);
        break;
      case "uranus":
        planetSize = 250;
        console.log(objToRender);
        break;
      case "neptune":
        planetSize = 200;
        console.log(objToRender);
        break;
      case "pluto":
        planetSize = 450;
        console.log(objToRender);
        break;
    }




  //Set how far the camera will be from the 3D model
  //adjust the value in the terniary operator       THIS = 200

  //OK MUST ensure that the sizes are varying using switch statements BASED on the value


  //This ^^ will be updated based on the value

  camera.position.z = planetSize;

  //Add lights to the scene, so we can actually see the 3D model
  var color= 0xffffff;
  var intensity = .5
  const topLight = new THREE.DirectionalLight(color, intensity); // (color, intensity)
  topLight.position.set(500, 500, 500) //top-left-ish
  topLight.castShadow = true;
  scene.add(topLight);

  const ambientLight = new THREE.AmbientLight(0x333333, objToRender ? 5 : 1);
  scene.add(ambientLight);

  //This adds controls to the camera, so we can rotate / zoom it with the mouse

  controls = new OrbitControls(camera, renderer.domElement);


  //Render the scene
  function animate() {
    requestAnimationFrame(animate);
    //Here we could add some code to update the scene, adding some automatic movement

    //Make the eye move
    //I've played with the constants here until it looked good 
    object.rotation.y = -5 + mouseX / window.innerWidth * 3;
    object.rotation.x = -1 + mouseY * 2.5 / window.innerHeight;
    renderer.render(scene, camera);
  }

  //Add a listener to the window, so we can resize the window and the camera
  window.addEventListener("resize", function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });



  //Start the 3D rendering
  animate();
}
main();