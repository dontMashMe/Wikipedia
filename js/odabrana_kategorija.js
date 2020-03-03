var url = window.location.href;
var oUrl = new URL(url);
var kategorijaKey = oUrl.searchParams.get("kategorija_key");
$('#odabranaKate').html(kategorijaKey);

var ref = firebase.database().ref("Kategorija/" + kategorijaKey);
console.log(kategorijaKey);
class Clanak {
  constructor(naziv, tekst, slika) {
    this.naziv = naziv; 
    this.tekst = tekst; 
    this.slika = slika;
  }
}
var array = [];
ref.once('value', function(a){
  a.forEach(function(snapshot){
    var key = snapshot.key; 
    var clanak = snapshot.val(); 
    if(clanak.visible == true)
    {
      array.push(new Clanak(key, clanak.clanak_tekst, clanak.clanak_slika));
    }
  })
  for(var i = 0; i < array.length; i++)
  {
    //kloniraj tablicu sa id-em tablica-0
    $('#tablica-0').clone().prop("id", "tablica-" + i).appendTo("#page-content-wrapper");       
    //appendaj sadrzaj u tablica-i    	
    $('#tablica-'+ i +' .mp-tekst').html(SeeMore(array[i].tekst, array[i].naziv));
    $('#tablica-'+ i +' .mp-naslov').html(array[i].naziv);
    $('#tablica-'+ i +' .mp-slika').attr("src", array[i].slika);
  }
  console.log(array.length);
  //obriši nultu tablicu jer se dupla
  $('#tablica-0').remove();
})

function SeeMore(tekst, naziv)
{
  if(tekst.length > 250) {
    tekst = tekst.substring(0,250) + '...(<a href="clanak.html?kategorija_key='+kategorijaKey+'&clanak='+naziv+'"><strong>Pročitaj više</strong></a>)';
  }
  else {
    tekst = tekst + '...(<a href="clanak.html?kategorija_key='+kategorijaKey+'&clanak='+naziv+'"><strong>Pročitaj više</strong></a>)';
  }
  return tekst;
}
/*
tekst = tekst.substring(0,250) + '...('+ '<a href="clanak.htmnl?kategorija_key='+kategorijaKey+'?clanak='+naziv+'><strong>Pročitaj više</strong></a>'+')';
var row = '<tr><td>' + rbr++ + '</td><td><a href="odabranaKategorija.html?kategorija_key=' + key + '">'+key+'</a></td><td>' + snapshot.numChildren() + '</td></tr';
*/