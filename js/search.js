var url = window.location.href;
var oUrl = new URL(url);
var term = oUrl.searchParams.get("Searchterm");

console.log(term);
$('#rezPretrag').html("Rezultati pretraživanja: " + term);

class Clanak {
    constructor(kategorija, naziv, tekst) {
      this.kategorija = kategorija;
      this.naziv = naziv; 
      this.tekst = tekst; 
    }
}

var arrNew = [];
kat.on('value', function(a){
    a.forEach(function(snapshot){
        var kkey = snapshot.key;
       snapshot.forEach(function(snapshotItem){
           var key = snapshotItem.key; 
           var val = snapshotItem.val();
           if(PartialMatch(term, key) == true && val.visible == true)
           {
               arrNew.push(new Clanak(kkey, key, val.clanak_tekst));
           }
       })
    })
    console.log("pronađeno: " + arrNew.length);
    for(var i=0; i < arrNew.length; i++)
    {
      console.log(arrNew[i]);

        $('#list-searcresult-0').clone().prop("id", "list-searcresult-" + i).appendTo(".lista-rezultati");
        $('#list-searcresult-'+ i +' #naslovResult').html('<strong style="color:blue;">'+arrNew[i].naziv+'</strong>');
        $('#list-searcresult-'+ i +' .searchresult-data').html('(' +countWords(arrNew[i].tekst)+' Riječi)');   
        $('#list-searcresult-'+ i +' .searchresult-tekst').html(SeeMore(arrNew[i].tekst, arrNew[i].naziv, arrNew[i].kategorija));
    }
    $('#list-searcresult-0').remove();
    $('.searchFound').html("Pronađeno rezultata: " + arrNew.length);
    
})

function PartialMatch(term, naslov)
{
    if(naslov.toLowerCase().indexOf(term.toLowerCase()) > -1)
    {
        return true;
    }
    else return false;
}



function SeeMore(tekst, naziv, kate)
{
  if(tekst.length > 250) {
    tekst = tekst.substring(0,200) + '...(<a href="clanak.html?kategorija_key='+kate+'&clanak='+naziv+'"><strong>Pročitaj više</strong></a>)';
  }
  else {
    tekst = tekst + '...(<a href="clanak.html?kategorija_key='+kate+'&clanak='+naziv+'"><strong>Pročitaj više</strong></a>)';
  }
  return tekst;
}

function countWords(str) {
  return str.trim().split(/\s+/).length;
}
