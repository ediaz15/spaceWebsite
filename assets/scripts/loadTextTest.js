//using fetch() to load text data from a file and display it in the console
//For a prototype, load planet data from file from a button click
//using app-fetch-basic2.js from gitlab as reference

//loadTextButton
const loadButton = document.getElementById("loadTextButton");



//function to load text data from json file
const loadPlanetData = file => {
    //fetch file and return a promise
    const planetData = fetch(file);
    //have the data turn into json then log it
    planetData.then(response => response.json())
    .then(data => {
        //Log it to check if it works!
        console.log(data);
    })
};

loadButton.addEventListener( 'click', () => (loadPlanetData("/docs/json/planetInfo.json")) );

