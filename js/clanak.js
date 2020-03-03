var url = window.location.href;
var oUrl = new URL(url); 
var kategorijaKey = oUrl.searchParams.get("kategorija_key");
var clanakNaslov = oUrl.searchParams.get("clanak");

$('a[href="uredi"]').attr('href', 'adminUredi.html?kategorija_key='+kategorijaKey+'&clanak='+clanakNaslov);
$('a[href="obrisi"]').attr('href', 'adminUredi.html?kategorija_key='+kategorijaKey+'&clanak='+clanakNaslov);

var ref = firebase.database().ref("Kategorija/" + kategorijaKey);
console.log(clanakNaslov);
console.log(kategorijaKey); 
var tKate = '<a href="odabranaKategorija.html?kategorija_key=' + kategorijaKey + '">'+kategorijaKey+'</a>'
ref.once('value', function(a){
    a.forEach(function(snapshot){
        var key = snapshot.key;
        var clanak = snapshot.val();
        if(key==clanakNaslov)
        {
            $('#naslovClanak').html(key);
            if(kategorijaKey != "WikiPravila"){
                $('#tdKate').html(tKate);
            }else {
                $('#tdKate').html("-");
            }
            $('#infoboxTitle').html(key);
            $('#div1').html(clanak.clanak_tekst);
            $('#clanakSlika').attr("src", clanak.clanak_slika);
            console.log("odabrani clanak: "+key );
        }
    })
})

function Obrisi()
{
    var ref = firebase.database().ref("Kategorija/"+kategorijaKey + "/" + clanakNaslov);
    ref.remove();
    alert("Članak uspješno obrisan!\n Preusmjeravanje na početnu stranicu.");
}