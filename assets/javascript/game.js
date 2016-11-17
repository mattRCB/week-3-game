/*
var randomSelector = ["federer", "becker", "agassi"]

var gameObject = {
	federer : {
		word : "roger federer",
		img : "./assets/images/federer.jpg"
	},
	becker : {
		word : "boris becker",
		img : "./assets/images/becker.jpg"
	}
	agassi : {
		word : "andre agassi",
		img : "./assets/images/agassi.jpg"
	}	
}
*/

var words = ["federer", "becker", "agassi", "wawrinka"]
var wordsDiminished = words.slice();
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
	currentWord = wordsDiminished[randomIndex].split("");
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
};

var drawBlanks = function() {
	/* Set currentBlanks based on currentWord; Draw blanks on screen */
	currentBlanks = [];
	for (var i = 0; i < currentWord.length; i++) {
		currentBlanks.push("_ ");
		document.getElementById("displayBlanks").innerHTML = currentBlanks.join("");
	}
	// console.log(currentBlanks);
	// console.log(currentWord);
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
	}
};

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
			resetGame();
		}
	}
					
};






