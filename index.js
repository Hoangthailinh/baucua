document.addEventListener("DOMContentLoaded", function () {
  const resultImages = [
    { src: "./img/Screenshot 2024-10-07 232527.png", animal: "bau" },
    { src: "./img/Screenshot 2024-10-07 232536.png", animal: "cua" },
    { src: "./img/Screenshot 2024-10-07 232546.png", animal: "tom" },
    { src: "./img/Screenshot 2024-10-07 232553.png", animal: "ca" },
    { src: "./img/Screenshot 2024-10-07 232600.png", animal: "nai" },
    { src: "./img/Screenshot 2024-10-07 232609.png", animal: "ga" },
  ];

  let betScores = {
    bau: 0,
    cua: 0,
    tom: 0,
    ca: 0,
    nai: 0,
    ga: 0,
  };
  let totalBet = 0;
  const maxBet = 3;
  let spinning = false;

  const resultEls = [
    document.getElementById("result1"),
    document.getElementById("result2"),
    document.getElementById("result3"),
  ];
  const betStatusEl = document.getElementById("bet-status");
  const spinButton = document.getElementById("spin-button");
  const resetButton = document.getElementById("reset-button");

  function updateBetScores() {
    for (let animal in betScores) {
      document.getElementById(`${animal}-score`).innerHTML = betScores[animal];
    }
  }

  function placeBet(animal) {
    if (spinning || totalBet >= maxBet) {
      betStatusEl.innerHTML = "You've reached the maximum bet limit!";
      return;
    }
    if (betScores[animal] < maxBet) {
      betScores[animal]++;
      totalBet++;
      updateBetScores();
      betStatusEl.innerHTML = ""; // Clear any previous messages
    }
  }

  function resetBets() {
    if (spinning) return;
    totalBet = 0;
    for (let animal in betScores) {
      betScores[animal] = 0;
    }
    updateBetScores();
  }

  function spinResults() {
    if (spinning) return;
    spinning = true;
    spinButton.disabled = true;
    resetButton.disabled = true;

    resultEls.forEach((el) => el.classList.add("spin")); // Add spin animation

    let spinCount = 0;
    const spinInterval = setInterval(() => {
      resultEls.forEach((el) => {
        const randomIndex = Math.floor(Math.random() * resultImages.length);
        const result = resultImages[randomIndex];
        el.src = result.src;
        el.setAttribute("data-animal", result.animal);
      });
      spinCount++;
      if (spinCount > 100) {
        clearInterval(spinInterval);
        resultEls.forEach((el) => el.classList.remove("spin")); // Remove spin animation
        spinning = false;
        spinButton.disabled = false;
        resetButton.disabled = false;
        checkResults();
      }
    }, 50);
  }

  function checkResults() {
    const result = resultEls.map((el) => el.getAttribute("data-animal"));
    let correct = false;
    result.forEach((animal) => {
      if (betScores[animal] > 0) correct = true;
    });
    if (correct) {
      betStatusEl.innerHTML =
        "Bạn đã đoán đúng với kết quả: " + result.join(", ");
    } else {
      betStatusEl.innerHTML =
        "Bạn đã đoán sai với kết quả: " + result.join(", ");
    }
  }

  // Event listeners for betting
  document.getElementById("bau").addEventListener("click", () => placeBet("bau"));
  document.getElementById("cua").addEventListener("click", () => placeBet("cua"));
  document.getElementById("tom").addEventListener("click", () => placeBet("tom"));
  document.getElementById("ca").addEventListener("click", () => placeBet("ca"));
  document.getElementById("nai").addEventListener("click", () => placeBet("nai"));
  document.getElementById("ga").addEventListener("click", () => placeBet("ga"));

  // Event listeners for buttons
  spinButton.addEventListener("click", spinResults);
  resetButton.addEventListener("click", resetBets);
});