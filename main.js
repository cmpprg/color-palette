const container = document.querySelector('.main-container');

for (var i = 1; i < 5; i++) {
  createElementAndAppend('div', {
    class:`color-strip-${i}`,
    style:'border:3px solid blue;'
  }, container)
}

const colorStrips = document.querySelectorAll('[class^=color-strip]')

colorStrips.forEach((colorStrip, i) => {
  createElementAndAppend('input', {
    class: `input${i + 1}`,
    type: 'text',
    value: 'ffffff',
    maxlength: '6',
    size: '10'
  }, colorStrip)
});

const colorEvent = (input, strip) => {
  input.addEventListener('input', () => {
    let inputValue = input.value;
    let hexValue = '#' + inputValue;

    if (!inputValue) {
      strip.style.backgroundColor = '#ffffff';
    }
    strip.style.border = 'none';
    strip.style.backgroundColor = hexValue;
  });
};

colorStrips.forEach((colorStrip, i) => {
  let input = document.querySelector(`.input${i + 1}`)

  colorEvent(input, colorStrip)
})
