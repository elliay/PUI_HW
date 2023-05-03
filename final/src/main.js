function changeBackgroundColor() {
    const colorInput = document.getElementById('colorInput').value;
    document.getElementById("album-covers").style.backgroundColor = "#" + colorInput;
    let imagesArr = document.getElementsByClassName("album-image");
    for (let i = 0; i < 12; i++){
        imagesArr[i].style.backgroundColor = "#" + colorInput;
    }
  }