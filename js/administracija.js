firebase.auth().onAuthStateChanged(user =>  {
    if(user){
        $('.cLogin').show();
        $('.cLogout').hide();
        $('#noviClanak').show();
        $('#loginWar').remove();     
    } else {
        $('body').append('<div id="loginWar" class="alert alert-danger" role="alert" style="margin-top:80px;">Morate biti ulogirani kako bi dodali novi članak.☹️</div>')
        $('.cLogout').show();
        $('.cLogin').hide();
        $('#noviClanak').hide();
    }
})

kat.on('value', function(a){ 
    var sSlika = "";
    var odabranaKategorija = "";

    var select = $('.kategorija');
    
    a.forEach(function(snapshot){
        var key = snapshot.key; 
        var option = '<option>'+ key + '</option>';
        select.append(option);
    })

    $("#slikaBtn").click(function(){
        sSlika = $("#inputSlika").val();
        $('#helpHiper').show();
    });
    $("select.kategorija").change(function(){
        odabranaKategorija = $(this).children("option:selected").val();
    });

   $("#spremiBtn").click(function(){
        var sNaslov = $('#inputNaslov').val();    
        var sTekst = $('#inputTekst').val();
        var oClanak = 
        {
            mKate : odabranaKategorija,
            mNaslov : sNaslov, 
            mTekst : sTekst,
            mSlika : sSlika,
        }; 
        DodajClanak(oClanak);
   });
   
})

function DodajClanak(oClanak)
{
    var ref = firebase.database().ref("Kategorija/" + oClanak.mKate + "/" + oClanak.mNaslov);
    ref.update({
        clanak_tekst: oClanak.mTekst, 
        clanak_slika: oClanak.mSlika,
        visible: false
    });
    alert("Članak uspješno podnešen! Članak će biti odobren ukoliko ga odobri administrator.");
}