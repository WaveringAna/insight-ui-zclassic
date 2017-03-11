window.onload = function () {
  requestCMC(function (data, err){
    if (err) console.log (err); else {
      console.log("Got zclassic price")
      document.getElementById('price').innerHTML = "BTC: "+ data[0].price_btc + "; USD: " + data[0].price_usd;
    }
  });
}

function requestCMC (cback) {
  var request = new XMLHttpRequest();
  request.open('GET', 'https://api.coinmarketcap.com/v1/ticker/zclassic/', true);

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      cback(data, null)
    } else {
      cback(null, "Connected to CoinMarketCap but error getting zclassic price")
    }
  };

  request.onerror = function() {
    cback(null, "Error getting zclassic price, possibly couldn't connect to CoinMarketCap")
  };

  request.send();
}
