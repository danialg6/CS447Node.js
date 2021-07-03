window.onload = function() {
    console.log('inside client js - main.js')
    document.getElementById('product').onsubmit = function (event) {
        event.preventDefault();

    }
}