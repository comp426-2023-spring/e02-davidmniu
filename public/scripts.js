// If you would like to see some examples of similar code to make an interface interact with an API, 
// check out the coin-server example from a previous COMP 426 semester.
// https://github.com/jdmar3/coinserver

function init() {
	var elements = document.getElementsByTagName("input");
	for (var i = 0; i < elements.length; i++) {
			if (elements[i].type == "radio" && elements[i].name == "choice") {
					elements[i].style.display = "none";
					document.getElementById(elements[i].id + "_TAG").style.display = "none";
			}
	}
}

function generatePlay(json) {
	return "<p>You: " + json.player.toUpperCase() + "</p>" +
	       "<p>Your opponent: " + json.opponent.toUpperCase() + "</p>" +
				 "<p>Result: " + json.result.toUpperCase() + "</p>";
}

function generateChoice(json) {
	return "<p>" + json.player.toUpperCase() + "</p>";
}

function validate(e) {

	var game_type = (e && e.id == "RPS_GAME" ? e.id : (e && e.id == "RPSLS_GAME" ? e.id :
	(document.getElementById("RPS_GAME").checked ? "RPS_GAME" : (document.getElementById("RPSLS_GAME").checked ? "RPSLS_GAME" : null))));

	var is_playing_opponent = (e && e.id == "opponent") || document.getElementById("opponent").checked;


	var ok = game_type && !is_playing_opponent;

	if (!ok && is_playing_opponent && game_type) {
		var elements = document.getElementsByTagName("input");
		for (var i = 0; i < elements.length; i++) {
				if (elements[i].type == "radio" && elements[i].name == "choice" && elements[i].checked) {
					ok = true;
					if (game_type == "RPS_GAME") {
						if (elements[i].id == "LIZARD" || elements[i].id == "SPOCK") {
							ok = false;
						}
					}
				}

		}
	}

	var elements = document.getElementsByTagName("input");
	for (var i = 0; i < elements.length; i++) {
			if (elements[i].type == "radio" && elements[i].name == "choice") {
					if (!game_type || !is_playing_opponent || (game_type == "RPS_GAME" && (elements[i].id == "LIZARD" || elements[i].id == "SPOCK"))) {
						elements[i].style.display = "none";
						document.getElementById(elements[i].id + "_TAG").style.display = "none";
					} else {
						elements[i].style.display = "inline";
						document.getElementById(elements[i].id + "_TAG").style.display = "inline";
					}
			}
	}

	if (ok) {
		document.getElementById("play_button").style.display = "inline";
	} else {
		document.getElementById("play_button").style.display = "none";
	}

}

function playGame(e) {
	document.getElementById('results-text').innerHTML = '';

	var game_type = (e && e.id == "RPS_GAME" ? e.id : (e && e.id == "RPSLS_GAME" ? e.id :
	(document.getElementById("RPS_GAME").checked ? "RPS_GAME" : (document.getElementById("RPSLS_GAME").checked ? "RPSLS_GAME" : null))));

	var is_playing_opponent = (e && e.id == "opponent") || document.getElementById("opponent").checked;

	if (game_type == "RPS_GAME") {
		game_type = "rps";
	} else if (game_type == "RPSLS_GAME") {
		game_type = "rpsls";
	}


	if (is_playing_opponent) {
		request = {};
		var elements = document.getElementsByTagName("input");
		for (var i = 0; i < elements.length; i++) {
				if (elements[i].type == "radio" && elements[i].name == "choice" && elements[i].checked) {
					request.shot = elements[i].value;
				}
		}
		//https://stackoverflow.com/questions/24468459/sending-a-json-to-server-and-retrieving-a-json-in-return-without-jquery
		var xhr = new XMLHttpRequest();
		var url = window.location.href + 'app/' + game_type + "/play";
		xhr.open("POST", url, true);
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.onreadystatechange = function () {
				if (xhr.readyState === 4 && xhr.status === 200) {
						var json = JSON.parse(xhr.responseText);
						document.getElementById('results-text').innerHTML = generatePlay(json);
						document.getElementById('game_form').style.display = "none";
						document.getElementById('results').style.display = "inline";
				}
		};
		var data = JSON.stringify({"shot": request.shot});
		xhr.send(data);
	} else {
		//https://stackoverflow.com/questions/247483/http-get-request-in-javascript
		var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
						var json = JSON.parse(xmlHttp.responseText);
						document.getElementById('results-text').innerHTML = generateChoice(json);
						document.getElementById('game_form').style.display = "none";
						document.getElementById('results').style.display = "inline";
				}
    }
		var theUrl = window.location.href + 'app/' + game_type;
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
	}



	return false;
}

function startOver(e) {
	//code from https://stackoverflow.com/questions/15784554/how-to-uncheck-radio-button-javascript
	var elements = document.getElementsByTagName("input");
	for (var i = 0; i < elements.length; i++) {
			if (elements[i].type == "radio") {
					elements[i].checked = false;
			}
  }
	document.getElementById('game_form').style.display = "inline";
	document.getElementById('results').style.display = "none";
	validate(null);
	return false;
}

init();

