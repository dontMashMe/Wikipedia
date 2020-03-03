var url = window.location.href;
var oUrl = new URL(url); 
var kategorijaKey = oUrl.searchParams.get("kategorija_key");
var clanakNaslov = oUrl.searchParams.get("clanak");

$('a[href="#nigdje"]').attr('href', 'adminUredi.html?kategorija_key='+kategorijaKey+'&clanak='+clanakNaslov);
document.getElementById("pass").addEventListener("click", function(event){
    event.preventDefault();
    PotvrdiClanak(kategorijaKey, clanakNaslov);
})

document.getElementById("delete").addEventListener("click", function(event){
    ObrisiClanak(kategorijaKey,clanakNaslov);
})

function PotvrdiClanak(kkey, key)
{
    var ref = firebase.database().ref("Kategorija/" + kkey + "/" + key);
    ref.update({
        'visible' : true
    });
    alert("Članak potvrđen! Članak će od sada biti dostupan svima.");
}

function ObrisiClanak(kkey, key)
{
    var ref = firebase.database().ref("Kategorija/" + kkey + "/" + key);
    ref.remove();
    alert("Članak obrisan.");
}

