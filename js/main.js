//get containers
const headerContainer = document.querySelector('.header-container');
const mainContainer = document.querySelector('.main-container');
const footerContainer = document.querySelector('.footer-container');

document.body.style.height = window.innerHeight
// helper method to create and append new elements dynamically
const createElementAndAppend = (element, attributes, parent) => {
  const child = document.createElement(element)

  for (const key in attributes) {
    child.setAttribute(key, attributes[key])
  }

  parent.appendChild(child)
}


//create swatches for displaying color and append to the main container.
const quantityOfSwatches = 4

for (var i = 0; i < quantityOfSwatches; i++) {
  createElementAndAppend('div', {
    class:`color-swatch-${i}`,
  }, mainContainer)
}

//get the swatches created in last step
const colorSwatches = document.querySelectorAll('[class^=color-swatch]')

//create input to take in hex color values from user and append to each swatch
colorSwatches.forEach((colorSwatch, i) => {
  createElementAndAppend('input', {
    class: `hexInput${i + 1}`,
    type: 'text',
    value: 'ffffff',
    maxlength: '6',
    size: '10'
  }, colorSwatch)
});

//define adding a listener to change color of swatch when hex input changes
const colorEvent = (input, swatch) => {
  input.addEventListener('input', () => {
    let hexValue = '#' + input.value;

    if (!input.value) {
      swatch.style.backgroundColor = '#ffffff';
    }

    swatch.style.border = 'none';
    swatch.style.backgroundColor = hexValue;
  });
};

//apply colorEvent to the paire inputs and color swatches.
colorSwatches.forEach((colorSwatch, i) => {
  let input = document.querySelector(`.hexInput${i + 1}`)

  colorEvent(input, colorSwatch)
})
