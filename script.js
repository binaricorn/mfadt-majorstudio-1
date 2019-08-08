
var lowHarmony = document.getElementById("lowHarmony");
var midHarmony = document.getElementById("midHarmony");
var origHarmony = document.getElementById("origHarmony");
var funkyHarmony = document.getElementById("funkyHarmony");


//  SOUNDS LOAD AND MUTED WHEN WINDOW LOADS 

window.onload = function () {


	document.getElementById("lowHarmony").defaultMuted = true;
	document.getElementById("midHarmony").defaultMuted = true;
	document.getElementById("origHarmony").defaultMuted = true;
	document.getElementById("funkyHarmony").deafultMuted = true;

	document.getElementById("lowHarmony").preload = "auto";
	document.getElementById("midHarmony").preload = "auto";
	document.getElementById("origHarmony").preload = "auto";
	document.getElementById("funkyHarmony").preload = "auto";

	console.log("Sounds loaded and muted");

}


// KEY DOWN EVENTS 
document.addEventListener("keydown", function(e) {

  if (e.keyCode == 50) {
  	document.getElementById("origHarmony").volume = 0.8;
    document.getElementById("origHarmony").play();
    console.log("Original harmony is playing");

    document.getElementById("midHarmony").volume = 0; 
    document.getElementById("midHarmony").play(); 
    console.log("Mid harmony is muted and playing");

    document.getElementById("funkyHarmony").volume = 0; 
    document.getElementById("funkyHarmony").play(); 
    console.log("Funky harmony is muted and playing");

   	document.getElementById("lowHarmony").volume = 0; 
    document.getElementById("lowHarmony").play(); 
    console.log("Low harmony is muted and playing");

  } 

});

// document.onkeypress = function(e) {

//   	document.getElementById("origHarmony").volume = 0.8;
//     document.getElementById("origHarmony").play();
//     console.log("Original harmony is playing");

//     document.getElementById("midHarmony").volume = 0; 
//     document.getElementById("midHarmony").play(); 
//     console.log("Mid harmony is muted and playing");

//     document.getElementById("funkyHarmony").volume = 0; 
//     document.getElementById("funkyHarmony").play(); 
//     console.log("Funky harmony is muted and playing");

//    	document.getElementById("lowHarmony").volume = 0; 
//     document.getElementById("lowHarmony").play(); 
//     console.log("Low harmony is muted and playing");


// };

document.addEventListener("keydown", function(e) {

	if (e.keyCode == 51) {
		document.getElementById("midHarmony").volume = 1;
		console.log("Mid harmony is unmuted and playing");
	}
});

document.addEventListener("keydown", function(e) {

	if (e.keyCode == 52) {
		document.getElementById("funkyHarmony").volume = 0.7;
		console.log("Funky harmony is unmuted and playing");
	}
});

document.addEventListener("keydown", function(e) {

	if (e.keyCode == 53) {
		document.getElementById("lowHarmony").volume = 1;
		console.log("Low harmony is unmuted and playing");
	}
});


//// KEY UP EVENTSS 

document.addEventListener("keyup", function(e) {

	if (e.keyCode == 50) {
		document.getElementById("origHarmony").volume = 0;
		console.log("Orig harmony is muted and playing");
	}
});

document.addEventListener("keyup", function(e) {
if (e.keyCode == 51) {
		document.getElementById("midHarmony").volume = 0;
		console.log("Mid harmony is muted and playing");
	}
});

document.addEventListener("keyup", function(e) {

	if (e.keyCode == 52) {
		document.getElementById("funkyHarmony").volume = 0;
		console.log("Funky harmony is muted and playing");
	}
});

document.addEventListener("keyup", function(e) {

	if (e.keyCode == 53) {
		document.getElementById("lowHarmony").volume = 0;
		console.log("Low harmony is muted and playing");
	}
});

