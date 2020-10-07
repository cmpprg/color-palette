const createElementAndAppend = (element, attributes, parent) => {
  const child = document.createElement(element)

  for (const key in attributes) {
    child.setAttribute(key, attributes[key])
  }

  parent.appendChild(child)
}


createElementAndAppend('div',{class:'main-container'}, document.body);
