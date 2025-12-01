//following: https://thegeekplanets.medium.com/managing-environment-variables-in-node-js-using-the-dotenv-package-2a5c8eee61a8 -> to ensure that my api keys dont go crazy
//For the sake of local, im using it here -> as a variable BUT make sure to NOT accidently expose it...
//Plan to use nasa api to get the image of the day and display it in the 3rd section
//https://github.com/nasa/apod-api
//ATM of 11/25, the api seems to be down
/* 
APOD
⚠ Service Outage Notice: This API is currently experiencing an unscheduled outage. We are working to resolve the issue as quickly as possible. We apologize for any inconvenience.
It appears to return the same images? Not sure -> will check on a day to day basis and see if it is changed
Not sure anymore tbh BUT will check if it changes everyday (image wise)
*/


const nasaImgTitle = document.getElementById("nasaImgTitle");
const nasaImgDescription = document.getElementById("nasaImgDescription");
const nasaImgElement = document.getElementById("nasaDailyImg");

function imgOfDay(){
    try {
        const apiKey = "erm the api works now??";
        let today = new Date();
        console.log(today.toISOString().slice(0,10));
        //the isosstringmethod https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString
        //ensures that the string representing the date is in the date time format -> slice string together to get only the date part!
            fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${today.toISOString().slice(0,10)}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                //get the img metadata and console log it
                const imgUrl = data.url; //will need it as the img src attri
                const imgTitle = data.title; //used for the title of the image
                const imgExplanation = data.explanation; //used for the description ield in the index.html file
                //adding the content to the dom! similar process as in planetData
                //changing img src attri -> https://www.tutorialspoint.com/how-to-change-the-src-attribute-of-an-img-element-in-javascript-jquery
                nasaImgElement.src = imgUrl;
                //text content like as saw in loadPlanetData.js, not sure if i sure clear it BUT possibly could
                nasaImgTitle.textContent = imgTitle;
                nasaImgDescription.textContent = imgExplanation;
        });
    } catch (e){
        console.log(e + "API seems to be down currently??");
    }
}

imgOfDay();
