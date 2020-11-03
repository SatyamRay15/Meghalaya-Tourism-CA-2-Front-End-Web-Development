// var db = firebase.firestore();
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

db.settings({timestampsInSnapshots: true});

function add(){
  var place = document.getElementById("places").value;
  var author=document.getElementById("author").value;
  var postTitle=document.getElementById("postTitle").value;
  var postContent=document.getElementById("postContent").value;
  var postDate=document.getElementById("postDate").value;

  // Add a second document with a generated ID.
db.collection("posts").add({
  place: place,
  author: author,
  dateOfVisit: postDate,
  postContent: postContent,
  postName: postTitle,
  createdAt: new Date()
})
.then(function(docRef) {
  console.log("Document written with ID: ", docRef.id);
  alert("Blog added successfully!!!");
  document.location.href="blog.html";
})
.catch(function(error) {
  console.error("Error adding document: ", error);
}); 
}


//create element and render post
function renderPost(doc){
  let li = document.createElement('li');
  let postName = document.createElement('h2');
  let author = document.createElement('h5');
  let place = document.createElement('h4');
  let postContent = document.createElement('p');
  let dateOfVisit = document.createElement('h6');

  li.setAttribute('data-id',doc.id);
  postName.textContent = doc.data().postName;
  author.textContent ="Author Name: "+ doc.data().author;
  place.textContent = "Place of visit: "+doc.data().place;
  postContent.textContent = doc.data().postContent;
  dateOfVisit.textContent ="Date of visit: "+ doc.data().dateOfVisit;

  li.appendChild(postName);
  li.appendChild(author);
  li.appendChild(place);
  li.appendChild(postContent);
  li.appendChild(dateOfVisit);

  postList.appendChild(li);
}

db.collection('posts').get().then((snapshot)=>{
  snapshot.docs.forEach(doc => {
    renderPost(doc);
    postRef.orderBy("createdAt","desc");
    // console.log(doc.data());
  })
})

var postRef = db.collection("posts");


