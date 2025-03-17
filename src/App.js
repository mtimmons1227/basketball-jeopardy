import { useState, useEffect } from "react";
import { Card } from "@components/ui/Card";  // ✅ Uses {}
import Button from "@components/ui/Button"
import { CardContent } from "@components/ui/CardContent";  // ✅ Uses {}


import { motion } from "framer-motion";
import { Speaker } from "lucide-react";

const categories = [
  "Violations",
  "Fouls",
  "Game Management",
  "Signals",
  "Scoring Rules"
];

const points = [100, 200, 300, 400, 500];

const questions = {
  Violations: {
    100: "What is a traveling violation?",
    200: "What is a double dribble?",
    300: "What is a backcourt violation?",
    400: "What is a three-second violation?",
    500: "What is a goaltending violation?"
  },
  Fouls: {
    100: "What is a personal foul?",
    200: "What is a charging foul?",
    300: "What is a blocking foul?",
    400: "What is a flagrant foul?",
    500: "What is a technical foul?"
  },
  "Game Management": {
    100: "What is the role of the shot clock?",
    200: "What happens after a jump ball?",
    300: "How is overtime handled in high school basketball?",
    400: "What is the procedure for a coach's timeout?",
    500: "How are substitutions managed?"
  },
  Signals: {
    100: "What is the signal for a three-pointer?",
    200: "What is the signal for a foul?",
    300: "What is the signal for a timeout?",
    400: "What is the signal for a traveling violation?",
    500: "What is the signal for a technical foul?"
  },
  "Scoring Rules": {
    100: "How many points is a free throw worth?",
    200: "What determines a two-point vs. three-point shot?",
    300: "What is a bonus situation in free throws?",
    400: "What is an and-one play?",
    500: "What is a buzzer-beater rule?"
  }
};

const funnyResponses = [
  "Oof! That's a brick! Try again next round.",
  "Yikes! That was off the backboard and out!",
  "Airball! Maybe check the rulebook?",
  "Not even close! Did you even warm up?",
  "Nope! That shot was rejected like a weak layup!"
];

export default function BasketballJeopardy() {
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showBoard, setShowBoard] = useState(true);
  const [message, setMessage] = useState("Welcome to Basketball Jeopardy!");
  const [level, setLevel] = useState("Beginner");
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    if (selectedQuestion && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [selectedQuestion, timer]);

  const handleQuestionClick = (category, points) => {
    setSelectedQuestion({ category, points, question: questions[category][points] });
    setShowBoard(false);
    setMessage(`You chose ${category} for ${points} points!`);
    setTimer(10);
  };

  const handleAnswer = (correct) => {
    if (correct) {
      setScore(score + selectedQuestion.points);
      setMessage("Nice shot! Points on the board!");
    } else {
      setScore(score - selectedQuestion.points);
      const randomIndex = Math.floor(Math.random() * funnyResponses.length);
      setMessage(funnyResponses[randomIndex]);
    }
    setShowBoard(true);
  };

  return (
    <div className="flex flex-col items-center p-6">
      <motion.h1
        className="text-4xl font-bold mb-4"
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 0.5, repeat: Infinity }}
      >
        Basketball Jeopardy 🏀
      </motion.h1>

      <motion.div
        className="p-4 bg-gray-800 text-white rounded-lg text-lg flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <Speaker className="mr-2" />
        {message}
      </motion.div>

      <div className="mt-4 flex space-x-4">
        <label className="text-white">Select Level:</label>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="p-2 bg-gray-700 text-white rounded-md"
        >
          <option value="Beginner">Beginner</option>
          <option value="Advanced">Advanced</option>
        </select>
        <p className="text-white">Score: {score}</p>
      </div>

      {showBoard ? (
        <div className="grid grid-cols-5 gap-4 mt-6">
          {categories.map((category) => (
            <div key={category} className="flex flex-col items-center">
              <h2 className="text-xl font-semibold mb-2 text-yellow-400">
                {category}
              </h2>
              {points.map((point) => (
                <Button
                  key={point}
                  className="w-24 h-12 text-lg bg-blue-500 hover:bg-blue-600"
                  onClick={() => handleQuestionClick(category, point)}
                >
                  {point}
                </Button>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <Card className="mt-6 p-6 bg-white w-2/3 shadow-lg">
          <CardContent>
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedQuestion?.category} - {selectedQuestion?.points} Points
            </h2>
            <p className="text-lg mt-4 text-gray-700">
              {selectedQuestion?.question}
            </p>
            <p className="text-red-600 font-bold">Time Left: {timer}s</p>
            <Button
              className="mt-4 bg-red-500 hover:bg-red-600"
              onClick={() => handleAnswer(false)}
            >
              Wrong Answer
            </Button>
            <Button
              className="mt-4 ml-2 bg-green-500 hover:bg-green-600"
              onClick={() => handleAnswer(true)}
            >
              Correct Answer
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}