/**************************************************************
 **************************************************************
 **                                                          **
 ** script.js is where you will write most of your code.     **
 **                                                          **
 **************************************************************
 **************************************************************/

const HTML_OUTPUT = document.getElementById("databaseOutput");

/**************************************************************/
// helloWorld()
// Demonstrate a minimal write to firebase
// This function replaces the entire database with the message "Hello World"
// 
// This uses the set() operation to write the key:value pair "message":"Hello World"
// The ref('/') part tells the operation to write to the base level of the database "/"
// This means it replaces the whole database with message:Hello World
/**************************************************************/
function helloWorld(){
	console.log("Running helloWorld()")
	firebase.database().ref('/').set(
    {
		message: 'Kia Ora!'
	}
	)
}


/**************************************************************/
// goodbyeWorld()
// Demonstrate a minimal write to firebase
// This function replaces the entire database with the message "Ki kite ano!"
// 
// This uses the set() operation to write the key:value pair "message":"Ki kite ano!"
// The ref('/') part tells the operation to write to the base level of the database "/"
// This means it replaces the whole database with message:Ki Kite ano!
/**************************************************************/
function goodbyeWorld(){
	console.log("Running goodbyeWorld()")
	firebase.database().ref('/').set(
    {
      	message: 'Ki kite ano!'
    }
	)
}


/**************************************************************/
// 
/**************************************************************/
function readMessage(){
	console.log("Running readMessage()")
	firebase.database().ref('/').child('message').once('value', displayReadMessage);
}


/**************************************************************/
// 
/**************************************************************/
function displayReadMessage(message){
	if (message.val() == null) {
		console.log('An error occured when trying to read from the database.');
		HTML_OUTPUT.style.color = 'red';
		HTML_OUTPUT.innerHTML = 'An error occured when trying to read from the database.';
	} else {
		console.log('Running displayReadMessage(), the message is ' + message.val());
		HTML_OUTPUT.style.color = 'black';
		HTML_OUTPUT.innerHTML = message.val();
	}
}