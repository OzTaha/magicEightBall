
  const ball = document.getElementById("ball");
  const answerText = document.getElementById("answer");
  const askButton = document.getElementById("askButton");
  const questionInput = document.getElementById("question");

  let answers = [];

  fetch("answers.json")
      .then(response => response.json())
      .then(data => {
          answers = data.answers;
      })
      .catch(error => {
          console.error("Cevaplar yüklenirken hata oluştu:", error);
          answers = ["Hata oluştu! Lütfen tekrar deneyin."];
      });

  askButton.addEventListener("click", () => {
      if (questionInput.value.trim() === "") {
          answerText.textContent = "Lütfen bir soru girin!";
          return;
      }

      shakeBall();
      changeBackground();
      showRandomAnswer();

      setTimeout(resetUI, 3000);
  });

  function shakeBall() {
      ball.classList.add("shake");
      setTimeout(() => ball.classList.remove("shake"), 500);
  }

  function changeBackground() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
      document.body.style.backgroundColor = color;
  }

  function showRandomAnswer() {
      setTimeout(() => {
          if (answers.length > 0) {
              answerText.textContent = answers[Math.floor(Math.random() * answers.length)];
          } else {
              answerText.textContent = "Cevaplar yüklenemedi!";
          }
      }, 500);
  }

  function resetUI() {
      answerText.textContent = "";
      questionInput.value = "";
      questionInput.focus();
  }

