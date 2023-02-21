
let cart = [];

// First, we get the query string from the URL. This is the list of parameters
// that begins with a question mark. (These are known as "search parameters")
const queryString = window.location.search;

// console.log(queryString);

// Then, we use the query string to create a URLSearchParams object:
const params = new URLSearchParams(queryString);

// console.log(params);

// Finally, we can access the parameter we want using the "get" method:
const rollType = params.get('roll');
const imagePath = './products/' + rolls[rollType].imageFile;
const basePrice = rolls[rollType].basePrice;

/* ------------------------------------------------------------------------- */

// Now, we will use the URL parameter to update our page.

// Update the header text
const titleElement = document.querySelector('.details-title');
titleElement.innerText = rollType + ' cinnamon roll';

// Update the image
const rollImage = document.querySelector('.product-details-image');
rollImage.src = imagePath;

const price = document.querySelector('.details-price');
price.innerText = basePrice;


let allGlazingChanges = [
    {text: 'Keep original', change: 0},
    {text: 'Sugar milk', change: 0},
    {text: 'Vanilla milk', change: 0.50},
    {text: 'Double chocolate', change: 1.50},
  ];

let allSizeChanges = [
    {text: '1', change: 1},
    {text: '3', change: 3},
    {text: '6', change: 5},
    {text: '12', change: 10},
  ];

let glazeIndex = 0;
let sizeIndex = 0;
  
  /**
   * Updates the UI to display a particular 's info.
   * @param glazeChange A change object containing a name and a change amount.
   */
  function displayNewPrice(glazeChange, sizeChange) {
    let newprice = ((glazeChange.change + basePrice) * sizeChange.change).toFixed(2);
    console.log("$" + newprice);
    price.innerText = "$" + newprice;
  }
  
  function glazingChange(element) {
    // In this function, `this` corresponds to the select
    // element. So `this.value` will contain the value of the
    // selected option as a string.
    console.log('You selected ' + element.value);
  
    // We need to convert the string value to an integer
    glazeIndex = parseInt(element.value);
  
    // Now retrieve the object at the index specified by the select's value
    glazeChangetoMake = allGlazingChanges[glazeIndex];
  
    // Update the UI
    displayNewPrice(glazeChangetoMake, allSizeChanges[sizeIndex]);
  }

  function sizeChange(element) {
    // In this function, `this` corresponds to the select
    // element. So `this.value` will contain the value of the
    // selected option as a string.
    console.log('You selected ' + element.value);
  
    // We need to convert the string value to an integer
    sizeIndex = parseInt(element.value);
  
    // Now retrieve the object at the index specified by the select's value
    sizeChangetoMake = allSizeChanges[sizeIndex];
  
    // Update the UI
    displayNewPrice(allGlazingChanges[glazeIndex], sizeChangetoMake);
  }
  
  // When the page loads, find the select element.
  let selectGlazeElement = document.querySelector('#glazingOptions');
  let selectPackElement = document.querySelector('#sizeOptions')
  

for (var i = 0; i < allGlazingChanges.length; i++){
    let option = document.createElement("option");
    option.setAttribute('value', i);
    let optionText = document.createTextNode(allGlazingChanges[i].text);
    option.appendChild(optionText);
    selectGlazeElement.append(option);
}

for (var i = 0; i < allSizeChanges.length; i++){
    let option = document.createElement("option");
    option.setAttribute('value', i);
    let optionText = document.createTextNode(allSizeChanges[i].text);
    option.appendChild(optionText);
    selectPackElement.append(option);
}

class Roll {

  constructor(rollType, rollGlazing, packSize, basePrice) {
      this.type = rollType;
      this.glazing =  rollGlazing;
      this.size = packSize;
      this.basePrice = basePrice;
  }
}

function addToCart(){
  let thisRoll = new Roll(rollType, allGlazingChanges[glazeIndex].text, allSizeChanges[sizeIndex].text, basePrice);
  cart.push(thisRoll);
  console.log(cart);
}


displayNewPrice(allGlazingChanges[0]);