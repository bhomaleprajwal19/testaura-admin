import React, { useState, useEffect } from 'react';
import Sidebar from '../component/sidebar';
import QuizCard from '../component/QuizCard';
import Loader from '../component/loader';
import { Flame } from 'lucide-react';

const baseURL = import.meta.env.VITE_API_URL;

const Quiz = () => {
  const [quizes, setQuizes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {   
       setLoading(true);

      try {
        const res = await fetch(`${baseURL}/quizes/gethotquiz`);
        const data = await res.json();
        if (res.ok && Array.isArray(data)) {
          setQuizes(data);  
          setLoading(false);

        } else {
          console.error("Unexpected response:", data);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchQuiz();
  }, []);

  const filtered = quizes.filter((quiz) =>
    quiz.quizTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Group quizzes by subject
  const grouped = filtered.reduce((acc, quiz) => {
    const subject = quiz.subject || "Unknown";
    if (!acc[subject]) acc[subject] = [];
    acc[subject].push(quiz);
    return acc;
  }, {});

  return (
    <>
      <Loader loading={loading} />  
    <div className="w-screen h-screen flex">

      <div className="h-full flex-shrink-0">
        <Sidebar />
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black flex items-center gap-4"><Flame size={30} /> Hot Quizzes</h1>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search by quiz title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-500 shadow focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>


        {filtered.length === 0 ? (
          <p className="text-gray-500">No matching quizzes found.</p>
        ) : (
          Object.entries(grouped).map(([subject, quizzes]) => (
            <div key={subject} className="mb-10 ">

              <h2 className="text-2xl font-semibold text-gray-800 mb-4">{subject}</h2>
              <div className="overflow-x-auto scroll-smooth px-6 py-2 hide-scroll-bar">
                <div className="flex gap-4">
                  {quizzes.map((quiz) => (
                    <div key={quiz._id} className="flex-shrink-0 w-64">
                      <div className="transition-transform duration-300 hover:scale-105">
                        <QuizCard quiz={quiz} color={quiz.color || '#FEFBC7'} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </>
  );
};

export default Quiz;
