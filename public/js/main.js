window.onload = function () {
  requestCMC();
}

function requestCMC () {
  var request = new XMLHttpRequest();
  request.open('GET', 'https://api.coinmarketcap.com/v1/ticker/zclassic/', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      document.getElementById('price').innerHTML = "BTC: "+ data[0].price_btc + "; USD: " + data[0].price_usd;
    } else {

    }
  };

  request.onerror = function() {
    console.log("error getting zclassic price");
  };

  request.send();
}
