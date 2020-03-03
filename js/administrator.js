//dodaj novog admina cloud function.


const adminForm = document.querySelector('.admin-actions');
adminForm.addEventListener('submit',(e) => {
    e.preventDefault();
    const adminEmail = document.querySelector('#admin-email').value;
    const addAdminRole = functions.httpsCallable('addAdminRole'); //referenca na cloud funkciju koja se poziva preko httpsCallable funkcije **NIJE POZIV (cloud) FUNKCIJE!!
    addAdminRole({email: adminEmail}).then(result => { //pozovi funkciju sa (email: adminEmail) kao data; 
        console.log(result);
    })

})


firebase.auth().onAuthStateChanged(user =>  {
  if(user){
    user.getIdTokenResult().then(getIdTokenResult => { //kroz IdToken pristupamo claims
        user.admin = getIdTokenResult.claims.admin; //ako je user admin, dodaj admin property na njega
        var stari = $('#sysop').text();
        $('#sysop').text(stari + " " +user.email);
    })
} else {
}
})


kat.on('value', function(a){
  var tablica = $('#tablicaAdmin');
  //tablica.find('tbody').empty(); 
  var counter = 0;
  a.forEach(function(snapshot){
    var kkey = snapshot.key;
  snapshot.forEach(function(itemSnapshot) {
    var key = itemSnapshot.key; 
    var val = itemSnapshot.val();
    if(val.visible == false) 
    {   
        counter++;
        var row = '<tr><td>' + counter + '</td><td>' + '<a href="adminView.html?kategorija_key='+kkey +'&clanak='+key+'">'+key+'</a></td><td>' + kkey + '</td><td>' + DajDanasnjiDatum() + '</td></tr>';
        tablica.find('tbody').append(row);
    }
  })    
  })
  if(counter < 1)
  {
    var message = "Trenutno nema podnešenih članaka.";
    var row ='<tr><td>' + message + '</td><td></td><td></td><td></td></tr>';
    tablica.find('tbody').append(row);
  }
})
//<a href="clanak.html?kategorija_key='+kategorijaKey+'&clanak='+naziv+'"><strong>Pročitaj više</strong></a>
function DajDanasnjiDatum() 
{
    var tdate = new Date();
    var dd = tdate.getDate();
    var MM = tdate.getMonth(); 
    var yyyy = tdate.getFullYear(); 
    var sDatum = dd + "." + (MM + 1) + "." + yyyy;

    return sDatum;
}