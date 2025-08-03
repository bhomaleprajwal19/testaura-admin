import React from 'react';
import { motion } from 'framer-motion';
const baseURL = import.meta.env.VITE_API_URL;

const QuizCard = ({ quiz, color = '#38B6FF' }) => {
  const [isFlipped, setIsFlipped] = React.useState(false);

  const handleFlip = () => setIsFlipped(!isFlipped);
  
  const handleDelete = async () => {
    try {
      const res = await fetch(`${baseURL}/quizes/deletequiz/${quiz.type}/${quiz._id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        console.log("Quiz deleted successfully");
      } else {
        console.error("Error deleting quiz:", res.statusText);
      }
    } catch (err) {
      console.error("Error deleting quiz:", err);
    }
  };

  return (
    <div
      className="w-full sm:w-64 h-64 perspective m-2"
      onMouseEnter={handleFlip}
      onMouseLeave={handleFlip}
    >
      <div className="relative w-full cursor-pointer h-full transition-transform duration-500 transform-style preserve-3d" style={{ transform: isFlipped ? 'rotateY(180deg)' : 'none' }}>
        {/* Front Side */}
        <motion.div
          className="absolute w-full h-full backface-hidden rounded-2xl shadow-md"
          style={{ backgroundColor: color }}
        >
          <div className="p-5 flex flex-col justify-between h-full">
            <div>
              <h2 className="font-bold text-xl text-[#142073] line-clamp-2 mb-2">
                {quiz.quizTitle || "Untitled Quiz"}
              </h2>
              <p className="text-sm text-gray-900 mb-1">
                <span className="font-medium">Difficulty:</span>{" "}
                <span className="capitalize">{quiz.difficulty}</span>
              </p>
            </div>

            <button
              className="mt-auto bg-[#e91313] hover:bg-[#0d154a] text-white px-4 py-2 rounded-xl text-sm font-medium transition"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this quiz?")) {
                  handleDelete();
                }
              }}
            >
              Delete Quiz
            </button>
          </div>
        </motion.div>

        {/* Back Side */}
        <motion.div
          className="absolute  w-full h-full backface-hidden rounded-2xl shadow-md rotate-y-180"
          style={{ backgroundColor: "#f9fafb" }}

        >
          <div className="p-5 flex flex-col justify-between h-full">
            <div>
              <h2 className="font-bold text-md text-[#142073] mb-2">
                Quiz Info
              </h2>

              <p className="text-sm font-bold text-gray-800 mb-1">Take a quiz and build your Aura.</p>
              <p className="text-sm text-gray-800 mb-1"> Subject:{quiz.subject}
              </p>


            </div>

 <button
              className="mt-auto bg-[#e91313] hover:bg-[#0d154a] text-white px-4 py-2 rounded-xl text-sm font-medium transition"
              onClick={() => {
                if (window.confirm("Are you sure you want to delete this quiz?")) {
                  handleDelete();
                }
              }}
            >
              Delete Quiz
            </button>          </div>
        </motion.div>
      </div >
    </div >
  );
};

export default QuizCard;
