//using fetch() to load text data from a file and display it in the console
//For a prototype, load planet data from file from a button click
//using app-fetch-basic2.js from gitlab as reference

//feels slow BUT it works -> might use the reduce method you talked about PROF!!!
//I think this may be because of the way im accessing the json data

//function to load text data from json file
const loadPlanetData = (file, currentPlanetIndex) => {
    //fetch file and return a promise
    const planetData = fetch(file);
    //have the data turn into json then log it
    planetData.then(response => response.json())
    .then(data => {
        //now we handle the data -> create elements -> add them to text nodes -> render to dom
        //GETTING ATTRIBUTES BUT THE MANUAL WAY -> WILL REFACTOR
        //taken from: https://www.geeksforgeeks.org/javascript/how-to-iterate-json-object-in-javascript/
        //for each key in the json object, we get its value
        //its like a for each key loop in java where we use keys to access values
        //reviewing dynamic creation of elements then appending to dom: https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
        //manual checking and processing of planet indexes -> will prob use a function to do this and repeat myself less
        currentPlanetIndex = Math.abs(currentPlanetIndex % 9);

        Object.keys(data.planets[currentPlanetIndex]).forEach(key => {
            const value = data.planets[currentPlanetIndex][key];
            //create a new element based on the key
            
            const planetDataContainer = document.getElementById(key);
            planetDataContainer.textContent = ""; //clearing previous data before adding new data!
            const planetDataText = document.createTextNode(value);
            //using the pattern we add it to the container
            planetDataContainer.appendChild(planetDataText);
        });

    })
};

export { loadPlanetData };
