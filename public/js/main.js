window.onload = function () {   //Call functions here, DO NOT USE MORE THAN 2 CALLBACKS AT A TIME!
  requestCMC(function (data, err){  //Manipulate <p style="border-top: 1px solid #aaa; border-bottom: none;border-left: none;border-right: none;display: block;text-align: center;" id="price">
    if (err) console.log (err); else {
      console.log("Got zclassic price")
      document.getElementById('price').innerHTML = "BTC: "+ data[0].price_btc + "; USD: " + data[0].price_usd;
    }
  });
  getMemos(function (data, err){  //Manipulate <table class="table table-hover table-striped" id="memoTable">
    if (err) console.log (err); else {
      console.log("Got memos: " + JSON.stringify(data));

      var tablediv = document.getElementById('memoDiv'),
          table = document.createElement('table'),
          thead = document.createElement('thead'),
          tbody = document.createElement('tbody');
      table.className  = 'table table-hover table-striped';

      var theadTR = document.createElement('tr');
      var theadTH = document.createElement('th');
      theadTH.appendChild(document.createTextNode('Memo'));
      theadTR.appendChild(theadTH);
      thead.appendChild(theadTR);
      table.appendChild(thead);

      for (var i in data) {
        var row = document.createElement("tr");
        var cell = document.createElement("td");
        cell.appendChild(document.createTextNode(data[i].memo))
        row.appendChild(cell);
        tbody.appendChild(row)
      }
      table.appendChild(tbody)
      tablediv.appendChild(table)
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

function getMemos (cback) {
  var request = new XMLHttpRequest();
  request.open('GET', 'js/memos.txt')

  request.onload = function() {
    if (request.status >= 200 && request.status < 400) {
      var data = JSON.parse(request.responseText);
      cback(data, null)
    } else {
      cback(null, "Got the memos, but something weird happened")
    }
  };

  request.onerror = function() {
    cback(null, "Couldn't get the memos :(")
  };

  request.send();
}
