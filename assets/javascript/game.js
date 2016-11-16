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

var words = ["federer", "becker", "agassi"]
var wordsDiminished = words;
var currentWord = [];
var currentBlanks = [];
var guessesRemaining = 8;
var lettersGuessed = [];
var wins = 0;

var selectWordAtRandom = function() {
	console.log(wordsDiminished);
	var randomIndex = Math.floor(Math.random() * wordsDiminished.length);
	/* Choose random string from words array; split it into currentWord array */
	currentWord = wordsDiminished[randomIndex].split("");
	console.log(randomIndex);
	console.log(currentWord);
	/* Remove the selected word from the array of remaining words */
	wordsDiminished.splice(randomIndex, 1);
	console.log(wordsDiminished);	
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

var resetGame = function() {
	if (wordsDiminished == []) {
		wordsDiminished = words;
		wins = 0;
	}
	selectWordAtRandom();
	guessesRemaining = 8;
	displayGuessesRemaining();
	lettersGuessed = [];
	displayGuessed();
	drawBlanks();
};

/* Initiate game by choosing a word at random */
selectWordAtRandom();

drawBlanks();

/* Write initial # of guesses remaining to the screen */
displayGuessesRemaining();


document.onkeyup = function(event) {
	var key = String.fromCharCode(event.keyCode).toLowerCase();
	console.log(key);	
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
		/*Add the letter to the on-screen blanks/letters display */
		document.getElementById("displayBlanks").innerHTML = currentBlanks.join("");
		/* Check if all blanks are filled-in; if so: Increment Wins; Display picture, etc.; Reset for new round. */
		if (currentBlanks.indexOf("_ ") < 0) {
			wins++;
			document.getElementById("displayWins").innerHTML = wins;
			resetGame();
		}
	}
					
};






