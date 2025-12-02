//Inspired by: https://activetheory.net/ for its hover effect!!!
//They use: webgl, three.js maybe, and some frameworks
//reference: https://codepen.io/upzlvppy-the-sasster/pen/MWxGJyP


function animate(e) {
  document.body.style.setProperty('--cursor-top', e.clientY + 'px');
  document.body.style.setProperty('--cursor-left', e.clientX + 'px');
};

window.addEventListener('mousemove', animate);