// var db=firebase.firestore();

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
const db = firebase.firestore();


//Shillon Peak
function bookFulltripToConfirm(){
  var head = localStorage.getItem("Heading");
  var tripName = head;
  var visitDate = document.getElementById("visitDate").value;
  var firstName = document.getElementById("FName").value;
  var lastName = document.getElementById("LName").value;
  var Age = document.getElementById("Age").value;
  var phoneNumber = document.getElementById("PNumber").value;
  var Email = document.getElementById("Email").value;
  var NoOfPeople = document.getElementById("NoOfPeople").value;
  var singleAmount = localStorage.getItem("Price");

  var totalAmount = NoOfPeople*singleAmount;
  var PaymentMethod = document.getElementById("payment_method").value;

  

  db.collection("BookingAfullTrip").add({
    TripName: tripName,
    DateOfVisit: visitDate,
    FirstName: firstName,
    LastName: lastName,
    Age: Age,
    PhoneNumber: phoneNumber,
    Email_id: Email,
    NumberOfPeople: NoOfPeople,
    TotalAmount: totalAmount,
    PaymentMethod: PaymentMethod,
    createdAt: new Date()
  }).then(function(docRef){
    console.log("Booking went to confirm section Successfully: ",docRef.id);
    var documentId = docRef.id;
    localStorage.setItem("DocumentId: ",documentId);
    console.log("local storage successfully!!");
    alert("Please Confirm Your Booking In Next Page...");
     
    document.location.href="confirmingFulltrip.html";
  }).catch(function(error){
    console.error("Error booking: ", error);
    alert("Error Booking",error);
  });
};



const ConfirmBookingList = document.querySelector('#confirmBooking');

//create element and render post
function renderReviewConfirmBooking(doc){
  let li = document.createElement('li');
  let RefferenceId = document.createElement('h4');
  let TripName = document.createElement('h6');
  let firstName = document.createElement('h6');
  let lastName = document.createElement('h6');
  let Age = document.createElement('h6');
  let phoneNumber = document.createElement('h6');
  let Email = document.createElement('h6');
  let DateOfVisit = document.createElement('h6');
  let NumberOfPeople = document.createElement('h6');
  let TotalAmount = document.createElement('h6');
  let PaymentMethod = document.createElement('h6');

  li.setAttribute('data-id',doc.id);
  RefferenceId.textContent = "Booking Id: "+ doc.id;
  TripName.textContent ="Trip Name: "+ doc.data().TripName;
  firstName.textContent ="First Name: "+ doc.data().FirstName;
  lastName.textContent ="Last Name: "+ doc.data().LastName;
  Age.textContent ="Age: "+ doc.data().Age;
  phoneNumber.textContent ="Phone Number: "+doc.data().PhoneNumber;
  Email.textContent ="Email: "+ doc.data().Email_id;
  DateOfVisit.textContent ="Date Of Visit: " +doc.data().DateOfVisit;
  NumberOfPeople.textContent ="Number Of People: "+ doc.data().NumberOfPeople;
  TotalAmount.textContent ="Total Amount: "+ doc.data().TotalAmount;
  PaymentMethod.textContent ="Payment Method: "+ doc.data().PaymentMethod;

  li.appendChild(RefferenceId);
  li.appendChild(TripName);
  li.appendChild(firstName);
  li.appendChild(lastName);
  li.appendChild(Age);
  li.appendChild(phoneNumber);
  li.appendChild(Email);
  li.appendChild(DateOfVisit);
  li.appendChild(NumberOfPeople);
  li.appendChild(TotalAmount);
  li.appendChild(PaymentMethod);

  ConfirmBookingList.appendChild(li);
}


function cancelBooking(){
  var deleteBooking = localStorage.getItem("DocumentId: ");
  console.log(deleteBooking+"This is the one to be deleted");
  db.collection("BookingAfullTrip").doc(deleteBooking).delete().then(function() {
    console.log("Document successfully deleted!");
    alert("You Booking was Discarded Successfully. Thank You for visiting Meghalaya Tourism.");
    document.location.href="transactionCancelled.html";
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
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