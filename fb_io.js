/**************************************************************
 **************************************************************
 **                                                          **
 ** fb_io.js is where you will put common firebase functions **
 ** used throughout your code.                               **
 **                                                          **
 **************************************************************
 **************************************************************/

function fb_Global_loginListener() {
	console.log('Running fb_GLOBAL_loginListener');
	authenticationListener = firebase.auth().onAuthStateChanged(fb_GLOBAL_checkLoginState)
}

function fb_GLOBAL_checkLoginState(user) {
	
	if (user) {
		console.log('The user is already logged in, skipping login process.');
	} else {
		console.log('The user is not already logged in, starting login process.');
		fb_GLOBAL_popupLogin();
	}

	console.log('user details:');
	console.log(user);
	firebase.database().ref('/').update(
		{
			userData: {
				[user['l']]: {
					userName: user['displayName'],
					email: user['email'],
					profileURL: user['photoURL']
				}
			}
		});
}

function fb_GLOBAL_popupLogin() {
	console.log('Running fb_GLOBAL_popupLogin() - Starting login process')
	let provider = new firebase.auth.GoogleAuthProvider();

	firebase.auth().signInWithPopup(provider).then((result) => {
		fb_GLOBAL_user = result.user;
		console.log('User successfully logged in.')
	});
}