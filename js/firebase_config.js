/*<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.6.0/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.6.0/firebase-analytics.js"></script>

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDpgQIM7PF0bSKAeOfqfTArwFrve_LAYMs",
    authDomain: "wiki-b9eab.firebaseapp.com",
    databaseURL: "https://wiki-b9eab.firebaseio.com",
    projectId: "wiki-b9eab",
    storageBucket: "wiki-b9eab.appspot.com",
    messagingSenderId: "62901304596",
    appId: "1:62901304596:web:0a0ab2ec20ad3c28d65601",
    measurementId: "G-T7JQ1W4LBL"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
</script>
*/

var firebaseConfig = {
    apiKey: "AIzaSyDpgQIM7PF0bSKAeOfqfTArwFrve_LAYMs",
    authDomain: "wiki-b9eab.firebaseapp.com",
    databaseURL: "https://wiki-b9eab.firebaseio.com",
    projectId: "wiki-b9eab",
    storageBucket: "wiki-b9eab.appspot.com",
    messagingSenderId: "62901304596",
    appId: "1:62901304596:web:0a0ab2ec20ad3c28d65601",
    measurementId: "G-T7JQ1W4LBL"
}

firebase.initializeApp(firebaseConfig);

//const auth = firebase.auth();
var db = firebase.database();
var kat = db.ref('Kategorija');
const functions = firebase.functions();

