export function rps(input) {
	if (input == null) {
		return('{\"player\":\"' + randPlayer(3) + '\"}');
	}
	input = input.toLowerCase();
	if (input == "help") {
		return(`Usage: node-rps [SHOT]
Play Rock Paper Scissors (RPS)

  -h, --help      display this help message and exit
  -r, --rules     display the rules and exit

Examples:
  node-rps        Return JSON with single player RPS result.
				  e.g. {"player":"rock"}
  node-rps rock   Return JSON with results for RPS played against a simulated opponent.
				  e.g {"player":"rock","opponent":"scissors","result":"win"}`);
	}
	if (input == "rules" || ((input !== "rock") && (input !== "paper") && (input !== "scissors"))) {
		return(`Rules for Rock Paper Scissors:

  - Scissors CUTS Paper
  - Paper COVERS Rock
  - Rock CRUSHES Scissors`);
	}
	return playRps(input);
}

export function rpsls(input) {
	if (input == null) {
		return('{\"player\":\"' + randPlayer(5) + '\"}');
	}
	input = input.toLowerCase();
	if (input == "help") {
		return(`Usage: node-rpsls [SHOT]
Play the Lizard-Spock Expansion of Rock Paper Scissors (RPSLS)!

  -h, --help        display this help message and exit
  -r, --rules       display the rules and exit

Examples:
  node-rpsls        Return JSON with single player RPSLS result.
                    e.g. {"player":"rock"}
  node-rpsls rock   Return JSON with results for RPSLS played against a simulated opponent.
                    e.g {"player":"rock","opponent":"Spock","result":"lose"}`);
	}
	if (input == "rules" || (input !== "rock" && input !== "paper" && input !== "scissors" && input !== "lizard" && input !== "spock")) {
		return(`Rules for the Lizard-Spock Expansion of Rock Paper Scissors:

  - Scissors CUTS Paper
  - Paper COVERS Rock
  - Rock SMOOSHES Lizard
  - Lizard POISONS Spock
  - Spock SMASHES Scissors
  - Scissors DECAPITATES Lizard
  - Lizard EATS Paper
  - Paper DISPROVES Spock
  - Spock VAPORIZES Rock
  - Rock CRUSHES Scissors`);
	}
	return playRpsls(input);
}

function playRps(input) {
	var opponent = randPlayer(3);
	var result;
	if (input === opponent) {
		result = "tie";
	} else if ((input === "scissors" && opponent === "paper") ||
				(input === "paper" && opponent === "rock") ||
				(input === "rock" && opponent === "scissors")) {
		result = "win";
	} else {
		result = "lose";
	}
	return('{\"player\":\"' + input + '\",\"opponent\":\"' + opponent + '\",\"result\":\"' + result + '\"}');
}

function playRpsls(input) {
	var opponent = randPlayer(5);
	var result;
	if (input === opponent) {
		result = "tie";
	} else if ((input === "scissors" && opponent === "paper") ||
				(input === "paper" && opponent === "rock") ||
				(input === "rock" && opponent === "lizard") ||
				(input === "lizard" && opponent === "spock") ||
				(input === "spock" && opponent === "scissors")) {
		result = "win";
	} else {
		result = "lose";
	}
	return('{\"player\":\"' + input + '\",\"opponent\":\"' + opponent + '\",\"result\":\"' + result + '\"}');
}

function randPlayer(max) {
	var i = Math.floor(Math.random() * max);
	if (i == 0) return "rock";
	if (i == 1) return "paper";
	if (i == 2) return "scissors";
	if (i == 3) return "lizard";
	return "spock";
}
