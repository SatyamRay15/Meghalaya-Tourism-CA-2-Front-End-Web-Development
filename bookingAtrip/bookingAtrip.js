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
function book(){
  var place = document.getElementById("place").value;
  var visitDate = document.getElementById("visitDate").value;
  var firstName = document.getElementById("FName").value;
  var lastName = document.getElementById("LName").value;
  var Age = document.getElementById("Age").value;
  var phoneNumber = document.getElementById("PNumber").value;
  var Email = document.getElementById("Email").value;
  var NoOfPeople = document.getElementById("NoOfPeople").value;
  var totalAmount = NoOfPeople*1000;

  

  db.collection("BookingAsingleTrip").add({
    PlaceOfVisit: place,
    DateOfVisit: visitDate,
    FirstName: firstName,
    LastName: lastName,
    Age: Age,
    PhoneNumber: phoneNumber,
    Email_id: Email,
    NumberOfPeople: NoOfPeople,
    TotalAmount: totalAmount,
    createdAt: new Date()
  }).then(function(docRef){
    console.log("Booking went to confirm section Successfully: ",docRef.id);
    alert("Please Confirm Your Booking In Next Page...");
    var next = docRef.id;
  document.location.href="confirmBooking.html";
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
  let firstName = document.createElement('h6');
  let lastName = document.createElement('h6');
  let Age = document.createElement('h6');
  let phoneNumber = document.createElement('h6');
  let Email = document.createElement('h6');
  let PlaceOfVisit = document.createElement('h6');
  let DateOfVisit = document.createElement('h6');
  let NumberOfPeople = document.createElement('h6');
  let TotalAmount = document.createElement('h6');

  li.setAttribute('data-id',doc.id);
  RefferenceId.textContent = "Refference Id: "+ doc.id;
  firstName.textContent ="First Name: "+ doc.data().FirstName;
  lastName.textContent ="Last Name: "+ doc.data().LastName;
  Age.textContent ="Age: "+ doc.data().Age;
  phoneNumber.textContent ="Phone Number: "+doc.data().PhoneNumber;
  Email.textContent ="Email: "+ doc.data().Email_id;
  PlaceOfVisit.textContent ="Place Of Visit: "+ doc.data().PlaceOfVisit;
  DateOfVisit.textContent ="Date Of Visit: " +doc.data().DateOfVisit;
  NumberOfPeople.textContent ="Number Of People: "+ doc.data().NumberOfPeople;
  TotalAmount.textContent ="Total Amount: "+ doc.data().TotalAmount;

  li.appendChild(RefferenceId);
  li.appendChild(firstName);
  li.appendChild(lastName);
  li.appendChild(Age);
  li.appendChild(phoneNumber);
  li.appendChild(Email);
  li.appendChild(PlaceOfVisit);
  li.appendChild(DateOfVisit);
  li.appendChild(NumberOfPeople);
  li.appendChild(TotalAmount);

  ConfirmBookingList.appendChild(li);
}

db.collection('BookingAsingleTrip').get().then((snapshot)=>{
  console.log(snapshot.docChanges());
  
  snapshot.docs.forEach(doc => {
    renderReviewConfirmBooking(next);
    // totalReview(snapshot.docChanges());
    reviewConfirmBooking.orderBy("createdAt","desc").limit(4);
    console.log(doc.data());
  })
})

const reviewConfirmBooking = db.collection("BookingAsingleTrip");