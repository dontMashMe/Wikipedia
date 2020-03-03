
kat.on('value', function(a){
  var tablica = $('#tablica-kategorije');
  tablica.find('tbody').empty(); 
  var rbr = 0;
  var counter = 0;
  a.forEach(function(snapshot){
    var key = snapshot.key;
    if(key != "WikiPravila")
    {
      counter+=Count(key);
      var row = '<tr><td>' + rbr++ + '</td><td><a href="odabranaKategorija.html?kategorija_key=' + key + '">'+key+'</a></td><td>' + Count(key) + '</td></tr';
      tablica.find('tbody').append(row);
    } 
  })
  $('#clanakBrojac').html('<small>Broj članaka: '+counter+'</small>');
})

function Count(kate) {
  var counter = 0;
  kat.on('value', function (a) {
    a.forEach(function (snapshot) {
      var key = snapshot.key;
      if (kate == key) {
        snapshot.forEach(function (snapshotItem) {
          var val = snapshotItem.val();
          if (val.visible == true) {
            counter++;
          }
        })
      }
    })
  })
  return counter;
}

