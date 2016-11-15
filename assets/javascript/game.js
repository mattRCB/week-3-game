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
var currentWord = [];
var currentBlanks = [];
var guessesRemaining = 8;
var lettersGuessed = [];


/* Choose random string from words array; split it into currentWord array */
currentWord = words[Math.floor(Math.random() * words.length)].split("");
/* STILL NEED TO remove the value the user has selected and then return a random element from the diminished array. PROBABLY SHOULD MAKE THIS A FUNCTION TO BE CALLED HERE AND FROM END OF FLOW TO RESET GAME. */


/* Set currentBlanks based on currentWord; Draw blanks on screen */
for (var i = 0; i < currentWord.length; i++) {
	currentBlanks.push("_ ");
	document.getElementById("displayBlanks").innerHTML = currentBlanks.join("");
}
// console.log(currentBlanks);
// console.log(currentWord);


/* Write initial # of guesses remaining to the screen */
document.getElementById("displayRemaining").innerHTML = guessesRemaining;



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

	if (foundTheLetter == false) {
		guessesRemaining--;
		document.getElementById("displayRemaining").innerHTML = guessesRemaining;
		lettersGuessed.push(key);
		document.getElementById("displayGuessed").innerHTML = lettersGuessed;
		/* Check if guessesRemaining is 0; if so, end round & reset for new round. */

	} else /* THE LETTER-GUESSED WAS CORRECT */ {
		/*Add the letter to the on-screen blanks/letters display */
		document.getElementById("displayBlanks").innerHTML = currentBlanks.join("");
		/* Check if all blanks are filled-in; if so: Increment Wins; Display picture, etc.; Reset for new round. */

	}
					
					


};






