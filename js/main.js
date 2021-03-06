// ************************************************
// *****************DOM Selectors*****************
// ************************************************
//get containers
const headerContainer = document.querySelector('.header-container');
const mainContainer = document.querySelector('.main-container');
const footerContainer = document.querySelector('.footer-container');
//get radio buttons
const radioButtons = document.querySelectorAll(".header-container input[type='radio']");
//get mode buttons
const modeButton = document.querySelector(".mode-button");

// ************************************************
// *****************HELPER METHODS*****************
// ************************************************
// method to create and append new elements dynamically
const createElementAndAppend = (element, attributes, parent) => {
  const child = document.createElement(element)

  for (const key in attributes) {
    child.setAttribute(key, attributes[key])
  }

  parent.appendChild(child)
};

// method to create swatches and append them to chosen container
const createSwatches = (quantity, container) => {
  for (var i = 0; i < quantity; i++) {
    createElementAndAppend('div', {
      class:`color-swatch-${i}`
    }, mainContainer)
  };
};
// method to create hex input for color swatches, including label
const createHexInput = (swatch, index, label) => {
  createElementAndAppend('div', {
    id: `hex-input-div-${index}`,
    class: 'hex-input-div'
  }, swatch)

  const hexInputDiv = document.querySelector(`#hex-input-div-${index}`)

  createElementAndAppend('label', {
    id: `hex-input-label-${index}`,
    for: `hex-input-${index}`
  }, hexInputDiv)

  document.querySelector(`#hex-input-label-${index}`).innerHTML = label

  createElementAndAppend('input', {
    id: `hex-input-${index}`,
    class: 'hex-input',
    type: 'text',
    name: `hex-input-${index}`,
    value: 'ffffff',
    maxlength: '6',
    size: '7'
  }, hexInputDiv)
};
//define method that returns boolean about wether or not light mode is engaged.
const lightModeActive = () => {
  return (document.body.classList.contains('light') ? true : false);
}
//define method that returns hex white lightModeActive, black otherwise
const returnWhiteIfLightMode = () => {
  return (lightModeActive() ? '#fff' : '#000');
}
//define adding a listener to change color of swatch when hex input changes
const colorEvent = (input, swatch) => {
  input.addEventListener('input', () => {
    let hexValue = '#' + input.value;

    if (!input.value) {
      console.log(returnWhiteIfLightMode())
      swatch.style.backgroundColor = returnWhiteIfLightMode();
    }

    swatch.style.border = 'none';
    swatch.style.backgroundColor = hexValue;
  });
};
const setGridTemplateByQuantityOfSwatches = (quantity) => {
  if (quantity === 2) {
    return '1.5fr 1fr'
  } else if (quantity === 6) {
    return '2fr repeat(2, 1.25fr) 1fr .75fr .5fr'
  } else {
    return `1.5fr repeat(${quantity - 2}, 1fr) .5fr`
  }
}
//define method that orients main grid to display swatches horizontally
const horizontalGridOrientation = (quantityOfSwatches) => {
  mainContainer.style.gridTemplateColumns = setGridTemplateByQuantityOfSwatches(quantityOfSwatches)
  mainContainer.style.gridTemplateRows = '1fr'
};
//define method that orients main grid to display swatches vertically
const verticalGridOrientation = (quantityOfSwatches) => {
  mainContainer.style.gridTemplateColumns = "1fr"
  mainContainer.style.gridTemplateRows = setGridTemplateByQuantityOfSwatches(quantityOfSwatches)
};
//define method that will re align the main container grid based on window width
const orientMainGridBasedOnWindowSize = (quantityOfSwatches, minWindowSize) => {
  if (window.innerWidth <= minWindowSize) {
    verticalGridOrientation(quantityOfSwatches);
  } else {
    horizontalGridOrientation(quantityOfSwatches);
  };
};
//define method that will delete all contents of mainContainer
const clearMainContainer = () => {
  mainContainer.innerHTML = "";
}
//define method that clears and constructsMainContainer and swatches
const clearAndConstructMainContainer = (quantityOfSwatches) => {
  clearMainContainer();
  constructMainContainer(quantityOfSwatches);
}
//define method that constructs swatches.
const constructMainContainer = (quantity) => {
  //create swatches for displaying color and append to the main container.
  createSwatches(quantity, mainContainer)
  //select the swatches created in last step
  const colorSwatches = document.querySelectorAll('[class^=color-swatch]')
  //create hex inputs
  colorSwatches.forEach((colorSwatch, index) => {
    createHexInput(colorSwatch, index, "#");
  });
  //apply colorEvent to the paired inputs and color swatches.
  colorSwatches.forEach((colorSwatch, i) => {
    let input = document.querySelector(`#hex-input-${i}`);
    colorEvent(input, colorSwatch);
  });
}

//************************
//begin all actions below:
//************************
const windowSizeforOrientationChange = 1050
let swatchQuantity = 4;

//check size of screen in begining and size grid vertical or horizontal accordingly
document.body.onload = () => {
  orientMainGridBasedOnWindowSize(swatchQuantity, windowSizeforOrientationChange);
};

//initial set up of Main Container
clearAndConstructMainContainer(swatchQuantity)

//listen to see if user changes swatch quantity via radio buttons.
radioButtons.forEach( button => {
  button.addEventListener('input', () => {
    swatchQuantity = parseInt(button.value)
    clearMainContainer();
    constructMainContainer(swatchQuantity)
    orientMainGridBasedOnWindowSize(swatchQuantity, windowSizeforOrientationChange)
  });
});

//dynamically switch between vertical and horizontal setup if window is resied
window.onresize = () => {
  orientMainGridBasedOnWindowSize(swatchQuantity, windowSizeforOrientationChange);
};

//change background dark and light on button push.

modeButton.onclick = () => {
  const nodesToToggle = [modeButton, document.body, mainContainer]

  if (lightModeActive()) {
    nodesToToggle.forEach( node => {
      node.classList.replace('light', 'dark');
    })
  } else {
    nodesToToggle.forEach( node => {
      node.classList.replace('dark', 'light');
    })
  }
}
