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
function bookToConfirm(){
  var place = document.getElementById("place").value;
  var visitDate = document.getElementById("visitDate").value;
  var firstName = document.getElementById("FName").value;
  var lastName = document.getElementById("LName").value;
  var Age = document.getElementById("Age").value;
  var phoneNumber = document.getElementById("PNumber").value;
  var Email = document.getElementById("Email").value;
  var NoOfPeople = document.getElementById("NoOfPeople").value;
  var totalAmount = NoOfPeople*1000;
  var PaymentMethod = document.getElementById("payment_method").value;

  

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
    PaymentMethod: PaymentMethod,
    createdAt: new Date()
  }).then(function(docRef){
    console.log("Booking went to confirm section Successfully: ",docRef.id);
    var documentId = docRef.id;
    localStorage.setItem("DocumentId: ",documentId);
    console.log("local storage successfully!!");
    alert("Please Confirm Your Booking In Next Page...");
     
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
  let PaymentMethod = document.createElement('h6');

  li.setAttribute('data-id',doc.id);
  RefferenceId.textContent = "Booking Id: "+ doc.id;
  firstName.textContent ="First Name: "+ doc.data().FirstName;
  lastName.textContent ="Last Name: "+ doc.data().LastName;
  Age.textContent ="Age: "+ doc.data().Age;
  phoneNumber.textContent ="Phone Number: "+doc.data().PhoneNumber;
  Email.textContent ="Email: "+ doc.data().Email_id;
  PlaceOfVisit.textContent ="Place Of Visit: "+ doc.data().PlaceOfVisit;
  var locacPlaceOfVisit = doc.data().PlaceOfVisit;
  localStorage.setItem("LocalPhoto",locacPlaceOfVisit);
  DateOfVisit.textContent ="Date Of Visit: " +doc.data().DateOfVisit;
  NumberOfPeople.textContent ="Number Of People: "+ doc.data().NumberOfPeople;
  TotalAmount.textContent ="Total Amount: "+ doc.data().TotalAmount;
  PaymentMethod.textContent ="Payment Method: "+ doc.data().PaymentMethod;

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
  li.appendChild(PaymentMethod);

  ConfirmBookingList.appendChild(li);
}

// var y = function book();
function fun(){
   document.getElementById("download").addEventListener("click",()=>{
    const invoice = this.document.getElementById("invoice");
    // console.log(invoice+"This is invoice");
    // console.log(window);
    var opt = {
      margin: 1,
      filename: 'Booking_Refference.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
    html2pdf().from(invoice).set(opt).save();
  })
  var local = localStorage.getItem("DocumentId: ");
  console.log(local+"This is also global variable");
db.collection('BookingAsingleTrip').doc(local).onSnapshot(function(doc) {
    renderReviewConfirmBooking(doc);
  });
}



function cancel(){
  var deleteBooking = localStorage.getItem("DocumentId: ");
  console.log(deleteBooking+"This is the one to be deleted");
  db.collection("BookingAsingleTrip").doc(deleteBooking).delete().then(function() {
    console.log("Document successfully deleted!");
    alert("You Booking was Discarded Successfully. Thank You for visiting Meghalaya Tourism.");
    document.location.href="transaction_cancelled.html";
}).catch(function(error) {
    console.error("Error removing document: ", error);
});
}


function bgphoto(){
  var Dawki = "Dawki";
  var KrangsuriFalls = "Krangsuri Falls";
  var LaitlumGrandCanyon ="Laitlum Grand Canyon";
  var LivingRootBridge ="Living Root Bridge";
  var ShillongPeak ="Shillong Peak";
  var UmiamLake = "Umiam Lake";
  var GolfLink = "Golf Link";
  var WardsLake = "Wards Lake";
  var LadyHydraPark = "Lady Hydra Park";
  var DonboscoChurch = "Donbosco Church";
  var DonboscoMuseum = "Donbosco Museum";

  var localPhoto = localStorage.getItem("LocalPhoto");

  //Background Picture for Cancel Module
  if(Dawki == localPhoto){
    document.body.style.backgroundImage = "url('/images/meghalaya_tour_6.png')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
  } else if(KrangsuriFalls == localPhoto){
    document.body.style.backgroundImage = "url('/images/background_popular_places_1.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
  }else if(LivingRootBridge == localPhoto){
    document.body.style.backgroundImage = "url('/images/background_popular_places.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
  }else if(LaitlumGrandCanyon == localPhoto){
    document.body.style.backgroundImage = "url('/images/laitlum_pic.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
  }else if(ShillongPeak == localPhoto){
    document.body.style.backgroundImage = "url('/images/shillong-peak.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
  }else if(UmiamLake == localPhoto){
    document.body.style.backgroundImage = "url('/images/bara_pani.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
  }else if(GolfLink == localPhoto){
    document.body.style.backgroundImage = "url('/images/golf_link_1.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
  }else if(WardsLake == localPhoto){
    document.body.style.backgroundImage = "url('/images/wards_lake.JPG')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
  }else if(LadyHydraPark == localPhoto){
    document.body.style.backgroundImage = "url('/images/Lady_Hydari_Park.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
  }else if(DonboscoMuseum == localPhoto){
    document.body.style.backgroundImage = "url('/images/donbosco_museum_1.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
  }else if(DonboscoChurch == localPhoto){
    document.body.style.backgroundImage = "url('/images/don-bosco-church.jpg')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
  }
  else{
    document.body.style.backgroundImage = "url('/images/blog_cover_image.jpg')";
  }
}