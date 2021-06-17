// inspired by https://exercism.io/tracks/javascript/exercises/etl/solutions/91f99a3cca9548cebe5975d7ebca6a85
let newPointStructure;
let word = '';
let scoringAlgorithms = [];
const input = require("readline-sync");
const vowelList = ['A', 'E', 'I', 'O', 'U']
const consonantList = ['B','C', 'D', 'F', 'G', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'S', 'T', 'V', 'X', 'Z', 'H', 'R', 'W', 'Y'];
const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
	for (let i = 0; i < word.length; i++) {
	  for (const pointValue in oldPointStructure) {
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
	  }
	}
	return letterPoints;
 }

let scrabbleScore = function(word) {
  word = word.toUpperCase();
  let arr1 = word.split('');
  let letterPoints = 0;
  let numberedPoint;
  for(let i = 0; i<word.length; i++) {
    if(Object.keys(newPointStructure).includes(arr1[i])){
      numberedPoint = Number(newPointStructure[arr1[i]]);
      letterPoints = letterPoints + numberedPoint;
    }
  }
  return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble!");
   console.log();
   wordInput = input.question("Enter a word to score: ")
   return wordInput;
};

function simpleScore(word){
  word = word.toUpperCase(word);
  let letterPoints = 0;
  for (i=0;i<word.length;i++){
    letterPoints = letterPoints + 1;
  }
return letterPoints;
}

function vowelBonusScore(word){
  word = word.toUpperCase();
  let letterPoints = 0;
  for (i = 0; i<word.length;i++){
    if (vowelList.includes(word[i])){
      letterPoints = letterPoints + 3;
    } else {
      letterPoints = letterPoints + 1;
    }
  }
return letterPoints;
}

function scorerPrompt() {
  let userInput = input.question (`Which scoring algorithm would you like to use?

0 - Simple: One point per character
1 - Vowel Bonus: Vowels are worth 3 points
2 - Scrabble: Uses scrabble point system
Enter 0, 1, or 2: `)
  return userInput;
}

function transform(object) {
  let newObj = {};
  for (let key in object){
    for (let i = 0;i<object[key].length;i++){
     newObj[object[key][i]] = key;
     newObj[' '] = 0;
    }
  }
  return newObj;
}

newPointStructure = transform(oldPointStructure);

scoringAlgorithms = [ 
Object({ name: 'Simple Score', description: 'Each letter is worth 1 point.', scoringFunction: 0 }), 
Object({ name: 'Bonus Vowels', description: 'Vowels are 3 pts, consonants are 1 pt.', scoringFunction: 0 }), 
Object({ name: 'Scrabble Score', desc: 'The traditional scoring algorithm.', scoringFunction: 0 }) ];

function runProgram() {
  word = initialPrompt();
  userChoice = scorerPrompt();
  if (userChoice === '0'){
    letterPoints = simpleScore(word)
  } else if (userChoice === '1') {
    letterPoints = vowelBonusScore(word)
  } else if (userChoice === '2'){
    letterPoints = scrabbleScore(word)
  } else {
    console.log('User input not valid, please try again.')
    runProgram();
  }
  console.log(`Score for '${word}' is: ${letterPoints}`);
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScore: simpleScore,
   vowelBonusScore: vowelBonusScore,
   scrabbleScore: scrabbleScore,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};