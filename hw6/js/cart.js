let cart = [];

function getCart(){
  let cartArrayStr = localStorage.getItem('cart');
  if (cartArrayStr == null){
    cart = [];
  }
  else{
    cart = JSON.parse(cartArrayStr);
  }
}

getCart();
// console.log(cart);

function saveCart(){
    let cartArrayStr = JSON.stringify(cart);
    localStorage.setItem('cart', cartArrayStr);
    console.log(localStorage.getItem('cart'));
    // console.log(cart);
  }

let totalPrice = 0;

class Roll {

    constructor(rollType, rollGlazing, packSize, basePrice) {
        this.type = rollType;
        this.glazing =  rollGlazing;
        this.size = packSize;
        this.basePrice = basePrice;
    }
}

let allGlazingChanges = {
    'Keep original': 0,
    'Sugar milk': 0,
    'Vanilla milk': 0.50,
    'Double chocolate': 1.50,
};

let allSizeChanges = {
    '1': 1,
    '3': 3,
    '6': 5,
    '12': 10,
};

function addToCart(newRoll){
    // cart.push(newRoll);
    // console.log(cart);
    var temp, item, i;
    cartContents = document.querySelector(".cart-contents")
    temp = document.querySelector("template");
    item = temp.content.querySelector(".cart-product");

    let price = ((allGlazingChanges[newRoll.glazing] + newRoll.basePrice) * allSizeChanges[newRoll.size]).toFixed(2);

    let imagePath = './products/' + rolls[newRoll.type].imageFile;
    cartProduct = document.importNode(item, true);

    productImage = cartProduct.querySelector(".cart-product-image");
    productImage.src = imagePath;

    productDesc = cartProduct.querySelector(".cart-product-description");
    productName = productDesc.querySelector(".cart-product-name");
    productName.innerText = newRoll.type + ' cinnamon roll';
    productGlaze = productDesc.querySelector(".cart-product-glazing");
    productGlaze.textContent += newRoll.glazing;
    productSize = productDesc.querySelector(".cart-product-size");
    productSize.textContent += newRoll.size;

    productPrice = cartProduct.querySelector(".cart-product-price");
    productPrice.innerText = "$" + price;

    totalPrice += parseFloat(price);
    total = document.querySelector(".total-price");
    total.innerText = "$" + totalPrice.toFixed(2);

    cartContents.appendChild(cartProduct);
}

function removeFromCart(element){
    productToRemove = element.parentElement.parentElement;

    productPrice = productToRemove.querySelector(".cart-product-price");
    price_string = productPrice.innerText;

    totalPrice -= parseFloat(price_string.substring(1));
    total = document.querySelector(".total-price");
    if (totalPrice < 0){
        total.innerText = "$0.00";
    }
    else{
        total.innerText = "$" + totalPrice.toFixed(2);
    }

    let type = productToRemove.querySelector(".cart-product-name");
    let glaze = productToRemove.querySelector(".cart-product-glazing");
    let size = productToRemove.querySelector(".cart-product-size");

    for (let i = 0; i < cart.length; i++){
        if (type.innerText == (cart[i].type + " cinnamon roll") && glaze.innerText == ("Glazing: " + cart[i].glazing) && size.innerText == ("Pack Size: " + cart[i].size)){
            cart.splice(i, 1);
            break;
        }
    }   

    saveCart();
    productToRemove.remove();

}

for (let i = 0; i < cart.length; i++){
     addToCart(cart[i]);
}
  