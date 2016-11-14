

var words = ["federer", "becker", "agassi"]
/* make an array from string at index0 of words */
var currentWord = words[0].split("");
var currentBlanks = [];
var guessesRemaining = 8;
var lettersGuessed = [];


/* Write letter blanks to the screen */
for (var i = 0; i < currentWord.length; i++) {
	currentBlanks.push("_ ");
	document.getElementById("displayBlanks").innerHTML += "_ ";
}
console.log(currentBlanks);
console.log(currentWord);

/* Write # of guesses remaining to the screen */
document.getElementById("displayRemaining").innerHTML = guessesRemaining;



document.onkeyup = function(event) {
			var key = String.fromCharCode(event.keyCode).toLowerCase();
			console.log(key);
			var foundTheLetter = false;
			
			/* For loop to apply .indexof to each element of currentWord */
			for (var i = 0; i < currentWord.length; i++) {
				/* If the letter guessed is in the word... */
				if (key == currentWord[i]) {
					/* add the letter into the correct index of currentBlanks array */
					currentBlanks[i] = key + " ";
					foundTheLetter = true;
				}
			}

			if (foundTheLetter == false) {
				guessesRemaining--;
				document.getElementById("displayRemaining").innerHTML = guessesRemaining;
				lettersGuessed.push(key);
				document.getElementById("displayGuessed").innerHTML = lettersGuessed;
			} else {
				document.getElementById("displayBlanks").innerHTML = currentBlanks.join("");
			}
					
					


};

















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



		document.onkeyup = function(event) {
			var keyPressed = String.fromCharCode(event.keyCode).toLowerCase();
			console.log(keyPressed);
			var currentWord = gameObject.federer.word;
			document.getElementById("displayWord").innerHTML = currentWord;


			
		};


*/





		// document.getElementById("test").innerHTML = "Press any key to get started";