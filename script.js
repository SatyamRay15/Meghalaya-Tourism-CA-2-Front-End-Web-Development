//  Your web app's Firebase configuration
//   For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyCj9kam9Hgxdcpr7QgdPU1kX5_HcsoP4Ro",
    authDomain: "meghalaya-tourism.firebaseapp.com",
    databaseURL: "https://meghalaya-tourism.firebaseio.com",
    projectId: "meghalaya-tourism",
    storageBucket: "meghalaya-tourism.appspot.com",
    messagingSenderId: "896002054352",
    appId: "1:896002054352:web:e375f221e54dfddab266d5",
    measurementId: "G-PT4EBC1SH0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // firebase.analytics();

  const auth = firebase.auth();
  const db = firebase.firestore();

  function signUp(){
    var fname = document.getElementById("FName").value;
    var lname = document.getElementById("LName").value;
    var email = document.getElementById("Email").value;
    var password = document.getElementById("Password").value;

    const promise = auth.createUserWithEmailAndPassword(email,password).then(cred => {
      console.log(cred.user);
      alert("Signed Up");
      document.location.href="/tourism.html";
    })
    promise.catch(e => alert(e.message));

    db.collection("UserDetails").add({
      firstName: fname,
      lastName: lname,
      email: email,
      createdAt: new Date()
    }).then(function(docRef){
      console.log("Data added successfully");
    }).catch(function(error){
      console.error("Error adding your review: ", error);
    });
}

  function signIn(){
    var email = document.getElementById("Email").value;
    var password = document.getElementById("Password").value;

    const promise = auth.signInWithEmailAndPassword(email,password).then(cred => {
      console.log(cred);
      alert("Signed In Successfully... ");
      document.location.href="/tourism.html";
    })
    promise.catch(e => {
      alert(e.message);
      // location.reload();
    });
    // location.reload();
  }

  function logout(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
      alert("SignOut Successfull...");
      location.reload();
    }).catch(function(error) {
      // An error happened.
      alert(error+" This is error");
      location.reload();
    });
  }

  
  