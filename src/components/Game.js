import React, { useState, useEffect } from "react";

import CssTransition from "react-transition-group/CssTransition";
import "../css/Game.css";
import Card from "./Card";
import Question from "./Question";
import Answers from "./Answers";
import Score from "./Score";
import Endscreen from "./Endscreen";
import StartScreen from "./StartScreen";

// let questions = [
//   {
//     category: "Entertainment: Music",
//     type: "multiple",
//     difficulty: "medium",
//     question:
//       "Which band released songs such as &quot;Electric Feel&quot;, &quot;Kids&quot;, and &quot;Time to Pretend&quot;?",
//     correct_answer: "MGMT",
//     incorrect_answers: ["Passion Pit", "Phoenix", "Franz Ferdinand"],
//   },
//   {
//     category: "Entertainment: Comics",
//     type: "multiple",
//     difficulty: "medium",
//     question:
//       "Which of the following superheros did Wonder Woman NOT have a love interest in?",
//     correct_answer: "Green Arrow",
//     incorrect_answers: ["Superman", "Batman", "Steve Trevor"],
//   },
//   {
//     category: "Entertainment: Board Games",
//     type: "multiple",
//     difficulty: "hard",
//     question:
//       "Which ability from the &quot;Magic: The Gathering&quot; Scars of Mirrodin expansion involves having at least three artifacts in play?",
//     correct_answer: "Metalcraft",
//     incorrect_answers: ["Affinity", "Imprint", "Living Weapon"],
//   },
//   {
//     category: "Entertainment: Music",
//     type: "multiple",
//     difficulty: "easy",
//     question:
//       "Which punk rock band released hit songs such as &quot;Californication&quot;, &quot;Can&#039;t Stop&quot; and &quot;Under the Bridge&quot;?",
//     correct_answer: "Red Hot Chilli Peppers",
//     incorrect_answers: ["Green Day", "Linkin Park", "Foo Fighters"],
//   },
//   {
//     category: "General Knowledge",
//     type: "multiple",
//     difficulty: "easy",
//     question:
//       "When someone is cowardly, they are said to have what color belly?",
//     correct_answer: "Yellow",
//     incorrect_answers: ["Green", "Red", "Blue"],
//   },
//   {
//     category: "Entertainment: Video Games",
//     type: "multiple",
//     difficulty: "medium",
//     question:
//       "Which one of the first four titles of the &quot;Grand Theft Auto&quot; franchise started the series of iconic image grid cover arts?",
//     correct_answer: "Grand Theft Auto III",
//     incorrect_answers: [
//       "Grand Theft Auto",
//       "Grand Theft Auto II",
//       "Grand Theft Auto Vice City",
//     ],
//   },
//   {
//     category: "Entertainment: Japanese Anime & Manga",
//     type: "multiple",
//     difficulty: "hard",
//     question: "Who was the Author of the manga Uzumaki?",
//     correct_answer: "Junji Ito",
//     incorrect_answers: [
//       "\tNoboru Takahashi",
//       "Akira Toriyama",
//       "Masashi Kishimoto",
//     ],
//   },
//   {
//     category: "Entertainment: Film",
//     type: "multiple",
//     difficulty: "medium",
//     question:
//       "About how much money did it cost for Tommy Wiseau to make his masterpiece &quot;The Room&quot; (2003)?",
//     correct_answer: "$6 Million",
//     incorrect_answers: ["$20,000", "$1 Million", "$10 Million"],
//   },
// ];

// Unescape strings.
function unEscape(htmlStr) {
  htmlStr = htmlStr.replace(/&lt;/g, "<");
  htmlStr = htmlStr.replace(/&gt;/g, ">");
  htmlStr = htmlStr.replace(/&quot;/g, '"');
  htmlStr = htmlStr.replace(/&#039;/g, "'");
  htmlStr = htmlStr.replace(/&amp;/g, "&");
  htmlStr = htmlStr.replace(/&ldquo;/g, '"');
  htmlStr = htmlStr.replace(/&rdquo;/g, '"');
  htmlStr = htmlStr.replace(/&eacute;/g, "é");
  htmlStr = htmlStr.replace(/&rsquo;/g, "'");
  htmlStr = htmlStr.replace(/&iacute;/g, "í");
  htmlStr = htmlStr.replace(/&aacute;/g, "á")
  return htmlStr;
}

export default function Game() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([1]); //1 is a placeholder
  const [hasLoaded, setHasLoaded] = useState(false);
  const [gameNum, setGameNum] = useState(-1);
  const [highScore, setHighScore] = useState(0);
  const [renderedGame, setRenderedGame] = useState(true);
  const [difficulty, setDifficulty] = useState("easy");

  //Fetch Question Set
  useEffect(() => {
    //fetch the questions
    console.log('fetching questions')
    if (gameNum >= 0) {
      fetch("https://opentdb.com/api.php?amount=10&type=multiple&difficulty=" + difficulty)
        .then((response) => response.json())
        .then((data) => {
          setQuestions(data.results);
          setHasLoaded(true);
        });
    }
  }, [gameNum, difficulty]);

  const verifyAnswer = (answer) => {
    setRenderedGame(false);
    setTimeout(() => {
      if (questions[questionIndex].correct_answer === answer) {
        console.log("correct!");
        // Add correct amount to score
        setScore((prevState) => {
          if (questions[questionIndex].difficulty === "easy") {
            return prevState + 100;
          } else if (questions[questionIndex].difficulty === "medium") {
            return prevState + 200;
          } else if (questions[questionIndex].difficulty === "hard") {
            return prevState + 300;
          }
        });
        setQuestionIndex((prevState) => {
          return (prevState += 1);
        });
      } else {
        console.log("incorrect!");
        setQuestionIndex((prevState) => {
          return (prevState += 1);
        });
      }
      setRenderedGame(true);
    }, 1000);
  };

  const handlePlayAgain = () => {
    // Update game num to indicate another api call
    setGameNum((prevState) => {
      return prevState + 1;
    });

    // Handle High Score
    if (score > highScore) {
      setHighScore(score);
    }

    // reset necessary variables
    setQuestionIndex(0);
    setHasLoaded(false);
    setScore(0);
  };

  const shuffleArray = (array) => {
    let out_arr = [];
    let startidx = Math.floor(Math.random() * 100) % 4;
    for (let i = 0; i < 4; i++) {
      out_arr.push(array[(startidx + i) % 4]);
    }
    return out_arr;
  };

  if (gameNum < 0) {
    return (
      <StartScreen
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        gameNum={gameNum}
        handleUpdate={setGameNum}
      />
    );
  }

  if (questionIndex >= questions.length) {
    return (
      <Endscreen
        score={score}
        highScore={highScore}
        handlePlayAgain={handlePlayAgain}
      />
    );
  }

  if (hasLoaded && gameNum >= 0) {
    // Build array of answers to send off
    let answers_array = [
      ...questions[questionIndex].incorrect_answers,
      questions[questionIndex].correct_answer,
    ];

    // Preprocess Answers and questions
    let question = unEscape(questions[questionIndex].question);
    answers_array = answers_array.map((item) => unEscape(item));
    answers_array = shuffleArray(answers_array);
    return (
      <CssTransition
        in={renderedGame}
        timeout={1000}
        mountOnEnter
        unmountOnExit
        classNames="game"
        appear={true}
        onEntered={() => {
          setRenderedGame(true);
        }}
      >
        <div>
          <Card className="game-wrapper">
            <Score
              score={score}
              highScore={highScore}
              questionNumber={questionIndex + 1}
            />
            <Question question={question} />
            <Answers
              answers={answers_array}
              verify={verifyAnswer}
            />
          </Card>
        </div>
      </CssTransition>
    );
  }
}
