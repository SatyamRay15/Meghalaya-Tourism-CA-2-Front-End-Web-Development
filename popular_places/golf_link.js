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
function golfLink(){
  var headingGolfLink = document.getElementById("reviewHeadingGolfLink").value;
  var contentGolfLink = document.getElementById("reviewContentGolfLink").value;

  db.collection("GolfLink").add({
    heading: headingGolfLink,
    content: contentGolfLink,
    createdAt: new Date()
  }).then(function(docRef){
    console.log("Review Added Successfully: ",docRef.id);
    alert("Thanks for giving your valuable review!!!");
  }).catch(function(error){
    console.error("Error adding your review: ", error);
  });
}

const GolfLinkPostList = document.querySelector('#golflinkreview-list');



//create element and render post
function renderReviewGolfLink(doc){
  let li = document.createElement('li');
  let GolfLink = document.createElement('h6');
  let headingGolfLink = document.createElement('b');
  let contentGolfLink = document.createElement('p');

  li.setAttribute('data-id',doc.id);
  GolfLink.textContent = "Golf Link: ";
  headingGolfLink.textContent ="Title: "+ doc.data().heading;
  contentGolfLink.textContent = doc.data().content;

  li.appendChild(GolfLink);
  li.appendChild(headingGolfLink);
  li.appendChild(contentGolfLink);

  GolfLinkPostList.appendChild(li);
}

db.collection('GolfLink').get().then((snapshot)=>{
  console.log(snapshot.docChanges());
  
  snapshot.docs.forEach(doc => {
    renderReviewGolfLink(doc);
    // totalReview(snapshot.docChanges());
    reviewGolfLink.orderBy("createdAt","desc").limit(4);
    console.log(doc.data());
  })
})

const reviewGolfLink = db.collection("GolfLink");