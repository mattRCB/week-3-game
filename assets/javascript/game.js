var gameObject = {
	angular : {
		technology : "Angular.js",
		desc : 'Google\'s javaScript-based framework for building single-page, desktop-style, browser-based web applications. Can be used in conjunction with Apache Cordova to build cross-platform mobile apps, too. In HTML, Angular tags start with "ng-", for example, &lt;div ng-app=""&gt;.',
		img : "./assets/images/angularjs.png",
		hint : "A popular framework from google."
	},
	node : {
		technology : "Node.js",
		desc : "An open-source, back-end, runtime environment which is event-driven for handling asynchronous connections. Allows developers to cobble-together custom web servers from a collection of modules which provide core functionalities. Similar to PHP, except unlike PHP, Node is \"non-blocking\", i.e. capable of running commands in parallel; and offers \"callbacks\" to inform the browser when a process completes or fails. Uses Google's V8 engine to interpret javaScript. Has a package manager called NPM which let's programmers contribute to/take from the open-source community's collection of node libraries.",
		img : "./assets/images/nodejs.png",
		hint : "You probably can't make a server with javascript without this."
	},
	handlebars : {
		technology : "Handlebars",
		desc : 'A templating engine which can be run along-side a Node web-server. Handlebars can produce data-free HTML-templates with handlebar expressions as placeholders. When the web-server provides the data dynamically, the final html is rendered and sent to the browser with the handlebar expressions replaced with actual data. Thus html structures remain seperate from data and scripting structures until they are served to the client.',
		img : "./assets/images/handlebars.png",
		hint : "Why make your html templates by hand, when you can grab a hold of these."
	},
	express : {
		technology : "Express.js",
		desc : 'Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications. With a myriad of HTTP utility methods and middleware at your disposal, creating a robust API is quick and easy. Express provides a thin layer of fundamental web application features, without obscuring Node.js features that you know and love.',
		img : "./assets/images/express.png",
		hint : "Sure, django's nice if you like python, but this tidy web app framework is for javascript."
	},
	hapi : {
		technology : "Hapi.js",
		desc : "Hapi is a framework for creating Node servers to run RESTful-APIs and MVC-style applications. Similar to django for python, and rails for ruby, Hapi can be used to create a ready-made generic server with capabilities including user-authentication, MVC routing, input validation, cookies and caching. Customized web applications are prototyped rapidly by re-configuring the pre-built infrastructure. Hapi is employed best by larger organizations and development teams building complex applications, as the ready-to-use infastructure encourages developers to adhere to Hapi conventions. DIY'ers and smaller teams building projects of narrow-scope may find the pre-made structure counterproductive.",
		img : "./assets/images/hapi.png",
		hint : "Teams will be elated how quickly apps build-out on this framework."
	}
}

/*  FUNCTION TO DETERMINE IF CLIENT IS A TOUCHSCREEN DEVICE 
function isTouchDevice() {
    return true == ("ontouchstart" in window || window.DocumentTouch && document instanceof DocumentTouch);
}
if (isTouchDevice() === true) {
    alert('Touch Device'); //your logic for touch device here
} else {
    alert('Not a Touch Device'); //your logic for non touch device here
}
*/
var words = ["angular", "node", "handlebars", "express", "hapi"]
var wordsDiminished = words.slice();
var currentStr = "";
var currentWord = [];
var currentBlanks = [];
var guessesRemaining = 8;
var lettersGuessed = [];
var wins = 0;
var gameCompletionCounter = 0;

var selectWordAtRandom = function() {
	console.log(wordsDiminished);
	var randomIndex = Math.floor(Math.random() * wordsDiminished.length);
	/* Choose random string from words array; split it into currentWord array */
	currentStr = wordsDiminished[randomIndex];
	currentWord = currentStr.split("");
	console.log(randomIndex);
	console.log(currentWord);
	/* Remove the selected word from the array of remaining words */
	if (wordsDiminished.length > 1) {	
		wordsDiminished.splice(randomIndex, 1);
		console.log(wordsDiminished);
	} else {
		wordsDiminished = words.slice();
		console.log(wordsDiminished);
	}
	showHint(currentStr);
};

var drawBlanks = function() {
	/* Set currentBlanks based on currentWord; Draw blanks on screen */
	currentBlanks = [];
	for (var i = 0; i < currentWord.length; i++) {
		currentBlanks.push("_ ");
		document.getElementById("displayBlanks").innerHTML = currentBlanks.join("");
	}
};

var displayGuessesRemaining = function() {
	document.getElementById("displayRemaining").innerHTML = guessesRemaining;
};

var displayGuessed = function() {
	document.getElementById("displayGuessed").innerHTML = lettersGuessed;
};

var displayWins = function() {
	document.getElementById("displayWins").innerHTML = wins;
};

var resetGame = function() {
	gameCompletionCounter++;
	selectWordAtRandom();
	guessesRemaining = 8;
	displayGuessesRemaining();
	lettersGuessed = [];
	displayGuessed();
	drawBlanks();
	displayWins();
	console.log("game: " + gameCompletionCounter);
	if (gameCompletionCounter == words.length) {		
		alert("CONGRATULATIONS! You've completed the entire game, and you won " + wins + " out of " + words.length + " rounds.");
		wins = 0;
		displayWins();
		gameCompletionCounter = 0;
	}
};

var displayObjectSet = function(curStr) {
	console.log("Is it fillingin current string: " + curStr);
	document.getElementById("infoDisplay").innerHTML = 
		"<img src=" + gameObject[curStr].img + "><p>" + gameObject[curStr].desc + "</p>";
}

var showHint = function(curStr) {
	document.getElementById("hint").innerHTML = gameObject[curStr].hint;
}



/* Initiate game by choosing a word at random */
selectWordAtRandom();

drawBlanks();

/* Write initial # of guesses remaining to the screen */
displayGuessesRemaining();



document.onkeyup = function(event) {
	var key = String.fromCharCode(event.keyCode).toLowerCase();
	console.log(key);
	console.log("words is: " + words);
	console.log("wordsDiminished is: " + wordsDiminished);
	var foundTheLetter = false;
	
	/* Iterate thru currentWord array checking for letter-key pressed */
	for (var i = 0; i < currentWord.length; i++) {
		/* If the letter guessed is in the word... */
		if (key == currentWord[i]) {
			/* add the letter at the correct index of currentBlanks array */
			currentBlanks[i] = key + " ";
			foundTheLetter = true;
		}
	}

	/* If the guessed-letter was incorrect AND it wasn't already guessed, then decrease guesses-remaining and include the letter in the list of incorrect guesses */
	if ((foundTheLetter == false)  && (lettersGuessed.indexOf(key) < 0)){			
		guessesRemaining--;
		displayGuessesRemaining();
		lettersGuessed.push(key);
		displayGuessed();
		/* Check if guessesRemaining is 0; if so, end round & reset for new round. */
		if (guessesRemaining == 0) {
			resetGame();
		}
	} else /* THE LETTER-GUESSED WAS CORRECT */ {
		/*Add the letter to the on-screen blanks/letters, i.e. display of the word*/
		document.getElementById("displayBlanks").innerHTML = currentBlanks.join("");
		console.log(key);
		/* Check if all blanks are filled-in; if so: Increment Wins; Display picture, etc.; Reset for new round. */
		if (currentBlanks.indexOf("_ ") < 0) {
			wins++;
			displayWins();
			console.log(wins);
			/* DISPLAY ALL INFO FROM currentWord OBJECT */
			displayObjectSet(currentStr);
			resetGame();
		}
	}
					
};










