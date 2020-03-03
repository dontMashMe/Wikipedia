firebase.auth().onAuthStateChanged(user=> {
  if(user){
    $('#loginWarning').css('display', 'none');
  }
  else{
  }
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

kat.on('value', function (a) {
  var select = $('.kategorija');
  var sSlika = "";
  var odabranaKategorija = "";
  a.forEach(function (snapshot) {
    var key = snapshot.key;
    if(key != "WikiPravila")
    {
      var option = '<option>' + key + '</option>';
      select.append(option);
    }
   
  })
  $("select.kategorija").change(function () {
    odabranaKategorija = $(this).children("option:selected").val();
  });
  $("#slikaBtn").click(function () {
    sSlika = $("#inputSlika").val();
    $('#helpHiper').css('display', 'inline-block');
  });
  $("#spremiBtn").click(function () {
    var sNaslov = $('#inputNaslov').val();
    var sTekst = $('#inputTekst').val();
    var x = $('#novaKate').val();
    if (x.length > 1) {
      odabranaKategorija = $('#novaKate').val();
    }
    if (odabranaKategorija == "") {
      odabranaKategorija = "Automobili";
    }
    var oClanak =
    {
      mKate: odabranaKategorija,
      mNaslov: sNaslov,
      mTekst: sTekst,
      mSlika: sSlika,
    };
    firebase.auth().onAuthStateChanged(user =>  {
      if(user){
          user.getIdTokenResult().then(getIdTokenResult => { //kroz IdToken pristupamo claims
              user.admin = getIdTokenResult.claims.admin; //ako je user admin, dodaj admin property na njega
              CheckAdmin(user, oClanak);
          })
      } else {
        DodajClanak(oClanak);
      }
    })    
  });
})


const CheckAdmin = (user, oClanak) => {
  if(user.admin) {
    var ref = firebase.database().ref("Kategorija/" + oClanak.mKate + "/" + oClanak.mNaslov);
    ref.update({
        clanak_tekst: oClanak.mTekst, 
        clanak_slika: oClanak.mSlika,
        visible: true
    });
    alert("Članak uspješno dodan!");
  }
  else {
    DodajClanak(oClanak);
  }
}  


function DodajClanak(oClanak)
{
    var ref = firebase.database().ref("Kategorija/" + oClanak.mKate + "/" + oClanak.mNaslov);
    ref.update({
        clanak_tekst: oClanak.mTekst, 
        clanak_slika: oClanak.mSlika,
        visible: false
    });
    alert("Članak uspješno podnešen! Članak će biti objavljen ukoliko ga odobri administrator.");
}

