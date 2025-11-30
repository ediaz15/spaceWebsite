

//adapted from https://www.youtube.com/watch?v=T33NN_pPeNI
//uses: https://www.geeksforgeeks.org/javascript/introduction-to-intersection-observer/
//checks visibility of element -> can use to trigger animations on scroll using css!!
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        //checks if the element is visible
        if (entry.isIntersecting) {
            entry.target.classList.replace("hidden", "show");
        } else {
            //if we want to repeat, make sure to go back to hidden
            entry.target.classList.replace("show", "hidden");
        }
    });
});

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));