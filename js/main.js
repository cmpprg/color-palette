//get main container created in the begin.js file
const container = document.querySelector('.main-container');

//create swatches for displaying color and append to the main container.
for (var i = 1; i < 5; i++) {
  createElementAndAppend('div', {
    class:`color-swatch-${i}`,
  }, container)
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
