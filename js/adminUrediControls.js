var url = window.location.href;
var oUrl = new URL(url); 
var kategorijaKey = oUrl.searchParams.get("kategorija_key");
var clanakNaslov = oUrl.searchParams.get("clanak");


$('#naslovUr').html("Uređujete Wikipedija:" + clanakNaslov);
var sNaslov ="";
var sSlika = "";
var odabranaKategorija = "";
var tempNaslov = "";
var tempSlika = "";

kat.on('value', function(a){
    a.forEach(function(snapshot){
        var select = $('.kategorija');
        var kkey = snapshot.key; 
        var option = '<option>'+ kkey + '</option>';
        select.append(option);
        if(kkey == kategorijaKey)
        {          
            snapshot.forEach(function(snapshotItem){
                var val = snapshotItem.val();
                var key = snapshotItem.key;
                if(key == clanakNaslov)
                {
                    tempNaslov = clanakNaslov;
                    odabranaKategorija = kkey;
                    tempSlika = val.clanak_slika;
                    $('.kategorija').val(kkey);
                    $('#inputNaslov').attr('placeholder',key);
                    $('#inputTekst').text(val.clanak_tekst);
                    $('#inputSlika').val(val.clanak_slika);                   
                }
            })
        }
    })
    //odabranaKategorija = $('.kategorija').val(kkey);
    $("select.kategorija").change(function(){
        odabranaKategorija = $(this).children("option:selected").val();
      });
    $("#slikaBtn").click(function(){
        sSlika = $("#inputSlika").val();
      });
    $('#spremiBtn').click(function(){
        if(sSlika == "")
        {
            sSlika = tempSlika;
        }
        var sTekst = $('#inputTekst').val();
        var x = $('#novaKate').val();
         if (x.length > 1) {
         odabranaKategorija = $('#novaKate').val();}
        var sNaslov = $('#inputNaslov').val();

        if(sNaslov == "")
        {
            sNaslov = tempNaslov;
        }
        var sTekst = $('#inputTekst').val();
        var oClanak = 
        {
            mKate : odabranaKategorija,
            mNaslov : sNaslov, 
            mTekst : sTekst, 
            mSlika : sSlika
        };
        var ref = firebase.database().ref("Kategorija/" + kategorijaKey + "/" + clanakNaslov);
        ref.remove();
        SpremiClanak(oClanak);
    })
}) 

document.getElementById("paragraph").addEventListener("click", function(event){
    event.preventDefault()
    var stari = $('#inputTekst').val();
    var novi = stari + "<p></p>";
    $('#inputTekst').val(novi);
});

document.getElementById("bold").addEventListener("click", function(event){
    event.preventDefault()
    var stari = $('#inputTekst').val();
    var novi = stari + "<strong></strong>";
    $('#inputTekst').val(novi);
});

document.getElementById("italic").addEventListener("click", function(event){
    event.preventDefault()
    var stari = $('#inputTekst').val();
    var novi = stari + "<i></i>";
    $('#inputTekst').val(novi);
});

document.getElementById("heading").addEventListener("click", function(event){
  event.preventDefault()
  var stari = $('#inputTekst').val();
  var novi = stari + "<h2></h2>";
  $('#inputTekst').val(novi);
});

var counter = 0;
document.getElementById("list").addEventListener("click", function(event){
    counter++;
    event.preventDefault()
    var stari = $('#inputTekst').val();
    var novi ="";
    if(counter == 1)
    {
      novi = stari + "<ol><li></li></ol>";
    }
    else{
      novi = stari.slice(0, -5) + "<li></li></ol>";
    }
    $('#inputTekst').val(novi);
    console.log(counter);
});

function SpremiClanak(oClanak)
{
    var ref = firebase.database().ref("Kategorija/" + oClanak.mKate + "/" + oClanak.mNaslov);
    ref.update({
        clanak_tekst: oClanak.mTekst, 
        clanak_slika: oClanak.mSlika,
        visible: true
    });
    alert("Članak uspješno uređen!");
}

