/**************************************************************/
// fb_initialise()
// Initialize firebase, connect to the Firebase project.
// 
// Find the config data in the Firebase console. Cog wheel > Project Settings > General > Your Apps > SDK setup and configuration > Config
//
// Input:  n/a
// Return: n/a
/**************************************************************/
const firebaseConfig = {
	apiKey: "AIzaSyCgvVl3Zn1zpd-tzw9wveN0mHVc1srkfpA",
	authDomain: "wilkin-porter-12comp.firebaseapp.com",
	databaseURL: "https://wilkin-porter-12comp-default-rtdb.asia-southeast1.firebasedatabase.app",
	projectId: "wilkin-porter-12comp",
	storageBucket: "wilkin-porter-12comp.firebasestorage.app",
  	messagingSenderId: "303457244762",
  	appId: "1:303457244762:web:c56d92bedc419d77046a63"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// This log prints the firebase object to the console to show that it is working.
// As soon as you have the script working, delete this log.
console.log("Firebase initialize finished:");
console.log(firebase);
