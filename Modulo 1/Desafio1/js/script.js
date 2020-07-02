function getValueRange(value, TxtId) {
    var txtVermelho = document.querySelector(`#${TxtId}`);
    txtVermelho.value = value;

    getValueColor();
}

function getValueColor() {
    var red = document.querySelector("#rangeVermelhoID").value;
    var green = document.querySelector("#rangeVerdeID").value;
    var blue = document.querySelector("#rangeAzulID").value;    

    var areaColor = document.querySelector(".area-color");
    areaColor.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
}