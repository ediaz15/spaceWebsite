//using fetch() to load text data from a file and display it in the console
//For a prototype, load planet data from file from a button click
//using app-fetch-basic2.js from gitlab as reference


const planetName = document.getElementById("planetName");


//function to load text data from json file
const loadPlanetData = file => {
    //fetch file and return a promise
    const planetData = fetch(file);
    //have the data turn into json then log it
    planetData.then(response => response.json())
    .then(data => {
        //now we handle the data -> create elements -> add them to text nodes -> render to dom
        const planetTitle = data.planets[1].name; //this should access the array of planets where we need to specify which ones using indexes!
       
        const planetDataContainer = document.createElement("h1");
        const planetDataText = document.createTextNode(planetTitle);
        //we add the text to the container
        planetDataContainer.appendChild(planetDataText);
        //send it to the dom body
        //we can replace the text content of the existing container
        planetName.textContent = planetTitle;
        //based on this: https://developer.mozilla.org/en-US/docs/Web/API/Node/textContent
        //log to console for testing
        console.log("Current accessed planet: " + planetTitle);
    })
};

loadPlanetData("/docs/json/planetInfo.json");

