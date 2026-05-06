/**************************************************************
 **************************************************************
 **                                                          **
 ** script.js is where you will write most of your code.     **
 **                                                          **
 **************************************************************
 **************************************************************/

const HTML_OUTPUT = document.getElementById('databaseOutput');
const readListenerOutput = document.getElementById('readListenerOutput');
const highScoreUserListenerOutput = document.getElementById('highScoreUserListenerOutput');
var readListenerEnable = false;

readListenerOutput.textContent = 'Automatic read disabled';

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
	firebase.database().ref('/').update(
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
	firebase.database().ref('/').update(
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
function readMessageSafe(){
	console.log("Running readMessageSafe()")
	firebase.database().ref('/').child('message').once('value', displayReadMessageSafe, readError);
}


/**************************************************************/
// 
/**************************************************************/
function displayReadMessage(message){
	console.log('Running displayReadMessage(), the message is ' + message.val());
	HTML_OUTPUT.style.color = 'black';
	HTML_OUTPUT.innerHTML = message.val();
}


/**************************************************************/
// 
/**************************************************************/
function displayReadMessageSafe(message){
	if (message.val() == null) {
		console.log('An error occured when trying to read from the database.');
		HTML_OUTPUT.style.color = 'red';
		HTML_OUTPUT.innerHTML = 'An error occured when trying to read from the database.';
	} else {
		console.log('Running displayReadMessageSafe(), the message is ' + message.val());
		HTML_OUTPUT.style.color = 'black';
		HTML_OUTPUT.innerHTML = message.val();
	}
}


/**************************************************************/
// 
/**************************************************************/
function readError(error){
	console.log('An error occured, see the following:');
	console.error(error);
}


/**************************************************************/
// 
/**************************************************************/
function toggleReadListener() {
	console.log("Running toggleReadListener()")
	if (readListenerEnable == true) {
		readListenerEnable = false;
		readListenerOutput.textContent = 'Automatic read disabled';
		console.log("Automatic read disabled");
	} else {
		readListenerEnable = true;
		readListenerOutput.textContent = 'Automatic read enabled';
		console.log("Automatic read enabled");
	}
}


/**************************************************************/
// 
/**************************************************************/
function initialise() {
	console.log("initialise()")
	firebase.database().ref('/').child('message').on('value', readListener);
	firebase.database().ref('/highScoreTable/').child("usersByID").on('value', highScoreUserListener);
}


/**************************************************************/
// 
/**************************************************************/
function readListener(message) {
	if (readListenerEnable == true) {
		console.log("ReadListenerEnabled is true / enabled, attempting to read database");
		displayReadMessageSafe(message);
	} else {
		console.log("ReadListenerEnabled is false / disabled, database was updated but not displayed");
	}
}


/**************************************************************/
// 
/**************************************************************/
function createHighScoreTable() {
	console.log("createHighScoreTable")
	firebase.database().ref('/highScoreTable/').set(
    {
		usersByID: {
			1: {
				username: "coolguy4",
				currentScore: 12,
				highScore: 31,
			},

			2: {
				username: "alex619",
				currentScore: 3,
				highScore: 102,
			},

			3: {
				username: "__mrbell__",
				currentScore: 1,
				highScore: 2,
			},

			4: {
				username: "coneil704",
				currentScore: 305,
				highScore: 436,
			}
		}
	}
	)
}


/**************************************************************/
// 
/**************************************************************/
function addUserToHighScoreTable() {
	firebase.database().ref('/highScoreTable/').child("usersByID").once('value', checkTableLength);
}


/**************************************************************/
// 
/**************************************************************/
function checkTableLength(object) {
	writeUserToTable(Object.keys(object.val()).length)
}


/**************************************************************/
// 
/**************************************************************/
function writeUserToTable(length) {
	var usernameToAdd = prompt("Enter player name to add");
	if (usernameToAdd == null) {
		return;
	}
	var currentScoreToAdd = prompt("Enter player's current score");
	if (currentScoreToAdd == null) {
		return;
	}
	var highScoreToAdd = prompt("Enter player's high score");
	if (highScoreToAdd == null) {
		return;
	}

	firebase.database().ref('/highScoreTable/usersByID/' + (length + 1)).set(
    {	
		username: usernameToAdd,
		currentScore: Number(currentScoreToAdd),
		highScore: Number(highScoreToAdd),
	}
	)
}


/**************************************************************/
// 
/**************************************************************/
function readHighScoreTable(userToRead) {
	console.log("readHighScoreTable()")
	firebase.database().ref('/highScoreTable/usersByID/').child(userToRead).once('value', displayHighScoreSafe, readError);
}


/**************************************************************/
// 
/**************************************************************/
function displayHighScoreSafe(message) {
	if (message.val() == null) {
		console.log('An error occured when trying to read from the database.');
		HTML_OUTPUT.style.color = 'red';
		HTML_OUTPUT.innerHTML = 'An error occured when trying to read from the database.';
	} else {
		console.log('Running displayReadMessageSafe(), the message is ' + message.val());
		HTML_OUTPUT.style.color = 'black';
		HTML_OUTPUT.innerHTML = 'User ' + message.val()["username"] + ' got a score of ' + message.val()["currentScore"] + '. Their high score is ' + message.val()["highScore"];
	}
}


/**************************************************************/
// usersByID/...
/**************************************************************/
function highScoreUserListener(object) {
	console.log('Running highScoreUserListener()')
	var highest = {
		username: '',
		score: 0,
	};

	if (object.val() == null) {
		console.log('hecsbjvc');
		return;
	}

	for (var i = 1; i < Number(Object.keys(object.val()).length) + 1; i++) {
		console.log(i.toString())
		if (highest['score'] < object.val()[i.toString()]['highScore']) {
			highest['score'] = object.val()[i.toString()]['highScore'];
			highest['username'] = object.val()[i.toString()]['username'];
		}
		console.log('looping')
	}

	highScoreUserListenerOutput.textContent = highest['username'] + ' has the high score with a score of ' + highest['score']
}