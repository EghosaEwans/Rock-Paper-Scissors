const game = () => {
	let pScore = 0;
	let cScore = 0;
	const pAudio = new Audio("./Sounds/playerPoint.mp3");
	const cAudio = new Audio("./Sounds/computerPoint.mp3");

	const startGame = () => {
		const playButton = document.querySelector(".play");
		const homeScreen = document.querySelector(".home-screen");
		const scoreBar = document.querySelector(".score-bar");
		const gameScreen = document.querySelector(".game-screen");
		const optionsScreen = document.querySelector(".options-screen");

		playButton.addEventListener("click", () => {
			homeScreen.classList.add("fadeOut");
			scoreBar.classList.remove("fadeOut");
			gameScreen.classList.remove("fadeOut");
			optionsScreen.classList.remove("fadeOut");
		});
	};

	const playing = () => {
		const options = document.querySelectorAll(".buttons button");
		const playerHand = document.querySelector(".player-hand");
		const computerHand = document.querySelector(".computer-hand");
		const computerOptions = ["rock", "paper", "scissors"];

		options.forEach((option) => {
			option.addEventListener("click", function () {
				const computerNumber = Math.floor(Math.random() * 3);
				const computerChoice = computerOptions[computerNumber];
				const resultsScreen = document.querySelector(".results-screen");
				const optionsScreen = document.querySelector(".options-screen");
				const banner = document.querySelector(".banner-winner");
				optionsScreen.classList.add("fadeOut");
				resultsScreen.classList.remove("fadeOut");
				playerHand.classList.add("rotate");
				playerHand.src = `./photos/rock.png`;
				computerHand.src = `./photos/rock.png`;
				banner.textContent = "Rock";
				playerHand.style.animation = "shakePlayerHands";
				setTimeout(() => {
					playerHand.classList.remove("rotate");
					playerHand.src = `./photos/paper.png`;
					computerHand.src = `./photos/paper.png`;
					computerHand.classList.add("rotate");
					banner.textContent = "Paper";
				}, 500);
				setTimeout(() => {
					playerHand.src = `./photos/scissors.png`;
					computerHand.src = `./photos/scissors.png`;
					banner.textContent = "Scissors";
				}, 1000);
				setTimeout(() => {
					computerHand.classList.remove("rotate");
					playerHand.classList.remove("rotate");
					compareHands(option.textContent, computerChoice);
					if (option.textContent === "rock") {
						if (!playerHand.classList.contains("rotate")) {
							playerHand.classList.add("rotate");
						}
					}
					if (
						computerChoice === "scissors" ||
						computerChoice === "paper"
					) {
						if (!computerHand.classList.contains("rotate")) {
							computerHand.classList.add("rotate");
						}
					}
					playerHand.src = `./photos/${option.textContent}.png`;
					computerHand.src = `./photos/${computerChoice}.png`;
				}, 2000);
				setTimeout(() => {
					resultsScreen.classList.add("fadeOut");
					optionsScreen.classList.remove("fadeOut");
					computerHand.classList.remove("rotate");
					playerHand.classList.remove("rotate");
				}, 4000);
			});
			option.addEventListener("mouseover", function () {
				const img = document.querySelector(
					`.${option.textContent}-img`
				);
				if (option.textContent === "rock") {
					img.style.animation =
						"shake-rock 0.82s cubic-bezier(.36,.07,.19,.97) both ";
				} else {
					img.style.animation =
						"shake-rest 0.82s cubic-bezier(.36,.07,.19,.97) both ";
				}

				setTimeout(() => {
					img.style.animation = "";
				}, 1000);
			});
		});
	};

	const updateScore = () => {
		const playerScore = document.querySelector(".player-score h2");
		const computerScore = document.querySelector(".computer-score h2");
		playerScore.textContent = pScore;
		computerScore.textContent = cScore;
	};

	const compareHands = (playerChoice, computerChoice) => {
		const banner = document.querySelector(".banner-winner");
		if (playerChoice === computerChoice) {
			banner.textContent = "It is a draw!";
			return;
		} else if (playerChoice === "rock") {
			if (computerChoice === "scissors") {
				banner.textContent = "You Win!";
				pScore++;
				updateScore();
				pAudio.play();
				return;
			} else {
				banner.textContent = "Compter Wins!";
				cScore++;
				updateScore();
				cAudio.play();
				return;
			}
		} else if (playerChoice === "paper") {
			if (computerChoice === "rock") {
				banner.textContent = "You Win!";
				pScore++;
				updateScore();
				pAudio.play();
				return;
			} else {
				banner.textContent = "Compter Wins!";
				cScore++;
				updateScore();
				cAudio.play();
				return;
			}
		} else if (playerChoice === "scissors") {
			if (computerChoice === "paper") {
				banner.textContent = "You Win!";
				pScore++;
				updateScore();
				pAudio.play();
				return;
			} else {
				banner.textContent = "Compter Wins!";
				cScore++;
				updateScore();
				cAudio.play();
				return;
			}
		}
	};

	const audioToggle = () => {
		const audioIcon = document.querySelector(".audio-icon");
		audioIcon.addEventListener("click", function () {
			if (pAudio.muted === true) {
				audioIcon.src = "./photos/sound-on.png";
				pAudio.muted = false;
				cAudio.muted = false;
			} else {
				audioIcon.src = "./photos/sound-off.png";
				pAudio.muted = true;
				cAudio.muted = true;
			}
		});
	};

	startGame();
	playing();
	audioToggle();
};
game();
