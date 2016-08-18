//----------------------------------------------
// Hangman example in javascript
//
//  8/15/2016 RJF
//----------------------------------------------


var questionBank=new Array;

var wordArray=new Array;


var wordlist = ["anchorman", 
		"jaws", 
		"the godfather", 
		"goodfellas",
		"back to the future",
		"the shining",
		"jurassic park"];

var movieImgList = ["assets/images/anchorman.jpg", 
		    "assets/images/jaws.jpg", 
		    "assets/images/thegodfather.png", 
		    "assets/images/goodfellas.jpg",
		    "assets/images/backtothefuture.png",
		    "assets/images/TheShining.png",
		    "assets/images/jurassicpark.jpg"]

var songlist = ["http://www.moviewavs.com/0053148414/MP3S/Movies/Anchorman_The_Legend_Of_Ron_Burgundy/stayclassy.mp3",
		"http://www.wavsource.com/snds_2016-08-14_2950306108039894/movies/misc/jaws_boat.wav",
		"http://www.moviewavs.com/0053148414/MP3S/Movies/Godfather/offer.mp3",
		"http://www.moviewavs.com/0053148414/MP3S/Movies/Goodfellas/beagangster.mp3",
		"http://www.moviewavs.com/0053148414/MP3S/Movies/Back_To_The_Future/thinkmcfly.mp3",
		"http://www.moviewavs.com/0053148414/MP3S/Movies/Shining/wendyimhome.mp3",
		"http://www.moviewavs.com/0053148414/MP3S/Movies/Jurassic_Park/welcome.mp3"];

var previousGuesses = new Array;  //holds the letters that were incorrect
var currentWord;		  //holds the current word that was randomly selected
var currentWordPosition;	  //holds the integer corresponding to the randomly selected word.  Used in VictoryMessage to show the correct Image and play correct sound
var currentClue;
var wrongAnswerCount;

var SecretWord;

var TotalNumberofGuesses = 6;
var TotalNumberofWins = 0;
var previousWords = new Array; //holds hangman words previously used to avoid repitition

// sets the board - and gets a new word

function gameScreen()
{
 
	clearBoard();  //refresh the board

	getWord();  //pick a random word from thw wordlist array

	var numberOfTiles = currentWord.length; // (i.e. length of 'the shining') 

	// this loop dynamically creates tags in the main document 
	for(i=0;i<numberOfTiles;i++)  
	{		
	    if (wordArray[i] == " "){
		document.getElementById("secret-word").innerHTML += "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";  //break/space between words
	    }else
		{
		   document.getElementById("secret-word").innerHTML += "<span class='tile' id='t" + i + "'>_</span>";
		}
    	}
	

      // add event listener to the document
	var evtlistener = document;
	evtlistener.addEventListener("keyup", handleKeyUp, false);
}

function clearBoard()
{
	wrongAnswerCount=0;
	previousGuesses=[];	

	TotalNumberofGuesses = 6;
	document.getElementById("secret-word").innerText="";
	document.getElementById("letters-guessed").innerText = "";
	document.getElementById("guesses").innerText = TotalNumberofGuesses;

	document.getElementById("moviePic").src = "assets\\images\\Hollywood-placeholder.jpg";  //reset the picture back to placeholder

}


function getWord()
{
	var rnd;
	var maxWords = 0;  //counter: max. number of words in the list

	//alert(previousWords.length + " " + wordlist.length);

	if (previousWords.length < wordlist.length)
	{
	  while(1)
	  {	
        	rnd = Math.floor(Math.random()*wordlist.length);
		var a = previousWords.indexOf(rnd);
		
		if(a == -1)  //if not found
		{
		   previousWords.push(rnd);

		   maxWords += 1;
		   break;
		}
	
		if(maxWords >= wordlist.length)  //you reached the end of the words
		{
			alert("outtie");
			break;
		}
	  }
	}
	else
	{
		alert("Game Over");
	}	
	
		
	currentWord = wordlist[rnd];
	
	currentWordPosition = rnd;
	wordArray = currentWord.split("");			
}



function checkAnswer()
{
	var currentAnswer="";	
	for(i=0;i<currentWord.length;i++)
	{
	    if (currentWord[i] == " ")  // Have to check for spaces in the secret word (i.e. The Godfather) 
		{
		currentAnswer+=" ";
		}
	    else{
		currentAnswer+=document.getElementById('t'+i).innerText;
		}
	}
		
	if(currentAnswer==currentWord)
	{
		TotalNumberofWins++;
		victoryMessage();
	};
}
		
function wrongAnswer(a)
{
	wrongAnswerCount++;
	
	
	document.getElementById("letters-guessed").innerText += a;
	
	TotalNumberofGuesses--;
	document.getElementById("guesses").innerText = TotalNumberofGuesses;


	if(wrongAnswerCount==6){
		defeatMessage();}
}//wronganswer
   


function handleKeyUp(event) 
{
	if(event.keyCode>64 && event.keyCode<91)
	{
		var found=false;
		var previouslyEntered=false;
		var input=String.fromCharCode(event.keyCode).toLowerCase();
				
		for(i=0;i<previousGuesses.length;i++){
        	  if(input==previousGuesses[i])
		  {
			previouslyEntered=true;
        	  }
        }
				
		if(!previouslyEntered){
			previousGuesses.push(input);
				
			for(i=0;i<wordArray.length;i++){
				
				if(input==wordArray[i]){
                			found=true;		
					document.getElementById('t'+i).innerText=input;  //display letter on screen
                		}	
				
			}//for
				
			if(found)
			{
					
			  checkAnswer();
			}
			else
			{
			   wrongAnswer(input);
			}
		}//if
	}//if
}//handlekeyup



function victoryMessage()
{
	document.getElementById("message-section").innerHTML = "<p class='center'>Congratulations!<BR \><BR \><a href='javascript:gameScreen();'>click here play again.</a></p>";
	
	//Show the # of wins 
	document.getElementById("win-count").innerText = TotalNumberofWins;
	
	//update the movie image here
	 document.getElementById("moviePic").src = movieImgList[currentWordPosition];

	// Play music from the movie
	var audio = new Audio(songlist[currentWordPosition]);
	audio.play();


}//victory 		 
    

		 



function defeatMessage()
{ 	
	document.getElementById("message-section").innerHTML = "<p class='center'>Sorry, You lost that game. <BR /><BR /><a href='javascript:gameScreen();'>click here play again.</a></p>";
	

}//defeat 
    