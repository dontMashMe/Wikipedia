//registracija
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e)=> {
    e.preventDefault();

    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;
    const passwordCheck = signupForm['signup-passwordCheck'].value;
    if(password.length < 6)
    {
        alert("Lozinka mora biti barem 6 znakova!");
    }
    else if(password != passwordCheck)
    {
        alert("Lozinke moraju biti jednake!");
    }
    //registriraj korisnika
    //create users je asinkrona funkcija, znaci treba malo vremena da se izvrsi 
    //s obzirom da treba vremena da se izvrsi, ne mozemo pisati sinkroni kod odma ispod nje, nego moramo koristiti mmetodu then()
    //create users nam vraća promise, a metode then ceka taj promise i onda izvrsava kod 
    firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
        console.log(cred.user);
        $('#register-modal').modal('hide');
        signupForm.reset();
    })
})  

//logout 
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e)=> {
    refresh();
    console.log("kliknuo si me!");
    firebase.auth().signOut()
})
function refresh() {    
    setTimeout(function () {
        location.reload()
    }, 100);
}
//login 
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e)=> {
    console.log("aaaaaaaaaaaaaaaaaaaaaa");
    //get user info 
    e.preventDefault();
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;
    firebase.auth().signInWithEmailAndPassword(email, password)
    .catch(function(error){
        var errorCode = error.code; 
        var errorMessage = error.message;
        alert(errorCode, errorMessage);
    })
    .then(cred => {
        $('#myModalLogin').modal('hide');
        loginForm.reset();
    }) 

})

//listen for auth status changes

firebase.auth().onAuthStateChanged(user =>  {
    if(user){
        user.getIdTokenResult().then(getIdTokenResult => { //kroz IdToken pristupamo claims
            user.admin = getIdTokenResult.claims.admin; //ako je user admin, dodaj admin property na njega
            SetAdminUI(user);
            $('#korisnik').append('<small><i class="fas fa-user-alt" style="margin-right: 5px;"></i>'+ user.email + '</small>');
        })
        console.log('user logged in: ', user.email)
    } else {
        console.log('user logged out');
    }
})

const SetAdminUI = (user) => {
    const adminItems = document.querySelectorAll('#admin');
    if(user.admin){
        adminItems.forEach(function(item) {
            item.style.display ='block';
        });
    }
    else {
        adminItems.forEach(function(item) {
            item.style.display = 'none';
        });
    }
}
//<small><i class="fas fa-user-alt" style="margin-right: 5px;"></i>marijan.bebek@mail.com</small>

var arr = []; 
kat.on('value', function(a){
    a.forEach(function(snapshot){
        var kkey = snapshot.key; 
        snapshot.forEach(function(snapshotItem){
            var key = snapshotItem.key;
            var val = snapshotItem.val();
            if(kkey != "WikiPravila" && val.visible == true) {
                var clanakInfo = 
                {
                    oKate : kkey, 
                    oNaslov : key
                }
                arr.push(clanakInfo);  
            }                                       
        })
    })
    var randomItem =arr[Math.floor(Math.random()*arr.length)]
    $('a[href="#rand"]').attr('href', 'clanak.html?kategorija_key='+randomItem.oKate+'&clanak='+randomItem.oNaslov);
})