//  of quiz questions and options
  
const questions = [
  {
    question: "What does the 'typeof' operator in JavaScript return for an array?",
    options: ["object", "array", "function", "string"],
    correctAnswer: "object"
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["let", "var", "const", "int"],
    correctAnswer: "var"
  },
  {
    question: "What is the purpose of the 'addEventListener' method in JavaScript?",
    options: ["To add styles to an element", "To handle user input events", "To create new HTML elements", "To validate form data"],
    correctAnswer: "To handle user input events"
  },
  {
    question: "Which method is used to add elements to the end of an array in JavaScript?",
    options: ["push()", "add()", "append()", "concat()"],
    correctAnswer: "push()"
  },
  {
    question: "What is the result of the expression '3 + '3' in JavaScript?",
    options: ["33", "6", "NaN", "SyntaxError"],
    correctAnswer: "33"
  },
  {
    question: "In JavaScript, which loop is used to iterate over the properties of an object?",
    options: ["for loop", "while loop", "do-while loop", "for...in loop"],
    correctAnswer: "for...in loop"
  },
  {
    question: "What does the '=== ' operator in JavaScript do?",
    options: ["Checks for equality and type", "Assigns a value to a variable", "Performs logical AND", "Checks for equality only"],
    correctAnswer: "Checks for equality and type"
  },
  {
    question: "Which built-in method is used to sort elements in an array in JavaScript?",
    options: ["sort()", "order()", "change()", "arrange()"],
    correctAnswer: "sort()"
  },
  {
    question: "What is the purpose of 'JSON.parse()' in JavaScript?",
    options: ["To convert a JSON string to an object", "To convert an object to a JSON string", "To parse HTML documents", "To create a new object"],
    correctAnswer: "To convert a JSON string to an object"
  },
  {
    question: "What is the value of 'this' in the global scope in JavaScript?",
    options: ["null", "undefined", "window object", "document object"],
    correctAnswer: "window object"
  }
];


  
  const quizContainer = document.getElementById('quiz-container');
  const resultContainer = document.getElementById('result-container');
  // setting quiz and result, hidden result
  const finalScore = document.getElementById('final-score');
  const initialsInput = document.getElementById('initials');
  const submitButton = document.querySelector('button[type="submit"]');
  // submition for the leader board
  const highScore = document.querySelector('.list-group');


  let currentQuestionIndex = 0;
  let score = 0;
  let timeLeft = 60;
  //timer and question index
  
  
  function displayQuestion() {
    //generating questions 
    if (currentQuestionIndex < questions.length) {
      //endQuiz check
      const currentQuestion = questions[currentQuestionIndex];
      // storing current Question as current Question
      const optionsHtml = currentQuestion.options
      // storing current question options
        .map((option, index) => `<button class = "options" onclick="checkAnswer(${index})">${option}</button>`)
        .join("");
      
      quizContainer.innerHTML = `
        <h2>${currentQuestion.question}</h2>
        ${optionsHtml}
      `;// html population 
    } else {
      endQuiz();
      //end quiz of run out of questions
    }
  }

  function checkAnswer(selectedOptionIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    // store currentQuestion 
    if (currentQuestion.options[selectedOptionIndex] === currentQuestion.correctAnswer) {
      score++;
      // show score? around the question? 
    } else {
      timeLeft -= 10;
    }
  
    currentQuestionIndex++;
    displayQuestion();
  }
  
  function endQuiz() {
    clearInterval(timerInterval);
    quizContainer.style.display = 'none';
    resultContainer.style.display = 'block';
    finalScore.textContent = score;
  }
  
  function submitScore(event) {
    event.preventDefault();
    const initials = initialsInput.value.trim();
  
    if (initials === "") {
      alert("Please enter your initials.");
      return;
    }else{
    
    // Store the score and initials in local storage 
    localStorage.setItem(initials,score)
    //populate the high score

    const scoreId = `<li class="list-group-item">${initials} | ${score}</li>`
    highScore.innerHTML = scoreId
    }
    

  }
  
  function newQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 70;
    quizContainer.style.display = 'block';
    resultContainer.style.display = 'none';
    displayQuestion();
  }

  displayQuestion();
  
  // Timer
  let timerInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
  
  submitButton.addEventListener('click', submitScore);
  