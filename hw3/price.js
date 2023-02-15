function glazingChange(element){
    //get value of selected glazing option
    const priceChange = element.value;

}

let allGlazingChanges = [
    {text: 'Keep original', change: 0},
    {text: 'Sugar milk', change: 0},
    {text: 'Vanilla milk', change: 0.50},
    {text: 'Double chocolate', change: 1.50},
  ];
  
  /**
   * Updates the UI to display a particular car's info.
   * @param glazeChange A car object containing a model and a description.
   */
  function displayNewPrice(glazeChange) {
    let price = document.querySelector('#details-price');
    let newprice = glazeChange.change + 2.49;
    console.log("$" + newprice);
    price.innerText = "$" + newprice;
  }
  
  function glazingChange(element) {
    // In this function, `this` corresponds to the select
    // element. So `this.value` will contain the value of the
    // selected option as a string.
    console.log('You selected ' + element.value);
  
    // We need to convert the string value to an integer
    let glazeIndex = parseInt(element.value);
  
    // Now retrieve the object at the index specified by the select's value
    let glazeChangetoMake = allGlazingChanges[glazeIndex];
  
    // Update the UI
    displayNewPrice(glazeChangetoMake);
  }
  
  // When the page loads, find the select element.
  let selectElement = document.querySelector('#glazingOptions');
  
  // Give it a listener for the 'change' event, which is a function that will run
  // when the selected option changes. You could also do this by setting the
//   // onchange property of selectElement, e.g. selectElement.onchange = ...
//   selectElement.addEventListener('change', onSelectValueChange);
  

for (var i = 0; i < allGlazingChanges.length; i++){
    console.log("asdfasdfsdf");
    let option = document.createElement("option");
    option.setAttribute('value', i);

    let optionText = document.createTextNode(allGlazingChanges[i].text);
    option.appendChild(optionText);
    // selectElement.append("<option value='" + i + "'>" + allGlazingChanges[i].text + "</option>");
    selectElement.append(option);
}

displayNewPrice(allGlazingChanges[0]);