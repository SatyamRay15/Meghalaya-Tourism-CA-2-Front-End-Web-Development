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

 //Living Root Bridge
function review(){
  var heading = document.getElementById("reviewHeading").value;
  var content = document.getElementById("reviewContent").value;

  db.collection("LivingRootBridgeReview").add({
    heading: heading,
    content: content,
    createdAt: new Date()
  }).then(function(docRef){
    console.log("Review Added Successfully: ",docRef.id);
    alert("Thanks for giving your valuable review!!!");
  }).catch(function(error){
    console.error("Error adding your review: ", error);
  });
}

const postList = document.querySelector('#review-list');

//create element and render post
function renderReviewLivingRootBridge(doc){
  let li = document.createElement('li');
  let livingrootbridge = document.createElement('h6');
  let heading = document.createElement('b');
  let content = document.createElement('p');
  let createdAt = document.createElement('span');

  li.setAttribute('data-id',doc.id);
  livingrootbridge.textContent = "Living Root Bridge:";
  heading.textContent ="Title: "+ doc.data().heading;
  content.textContent = doc.data().content;
  createdAt.textContent ="Date of published: "+ doc.data().createdAt;

  li.appendChild(livingrootbridge);
  li.appendChild(heading);
  li.appendChild(content);
  li.appendChild(createdAt);

  postList.appendChild(li);
}

db.collection('LivingRootBridgeReview').get().then((snapshot)=>{
  console.log(snapshot.docChanges());
  
  snapshot.docs.forEach(doc => {
    renderReviewLivingRootBridge(doc);
    // totalReview(snapshot.docChanges());
    reviewRef.orderBy("createdAt","desc").limit(4);
    console.log(doc.data());
  })
})

const reviewRef = db.collection("LivingRootBridgeReview");

