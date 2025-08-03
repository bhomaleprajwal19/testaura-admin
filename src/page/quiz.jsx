import React, { useRef, useState, useEffect } from 'react';
import Sidebar from '../component/sidebar';
import QuizCard from '../component/quizcard';
import Loader from '../component/loader';
import { ReceiptText } from 'lucide-react';

const baseURL = import.meta.env.VITE_API_URL;

const Quiz = () => {
  const [quizes, setQuizes] = useState({});
  const subjectRefs = useRef({});
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuiz = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseURL}/quizes/allquizes`);
        const data = await res.json();
        if (res.ok && typeof data === "object") {
          setQuizes(data);
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (err) {
        console.error("Error fetching quizzes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, []);

  

  useEffect(() => {
    if (!quizes) return;
    Object.keys(quizes).forEach((subject) => {
      if (!subjectRefs.current[subject]) {
        subjectRefs.current[subject] = React.createRef();
      }
    });
  }, [quizes]);

  return (    <>
      <Loader loading={loading} />
    <div className="w-screen h-screen flex">
      <div className="h-full flex-shrink-0">
        <Sidebar />
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-black flex items-center gap-4"><ReceiptText /> All Quizzes</h1>
        </div>

        <div className="mb-2">
          <input
            type="text"
            placeholder="Search by quiz title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full  p-3 rounded-xl border border-gray-500 shadow focus:outline-none focus:ring focus:border-blue-400"
          />
        </div>

        <div className="subjects w-full overflow-x-auto whitespace-nowrap flex gap-3 pb-2 px-4 hide-scroll-bar">
          {Object.entries(quizes).map(([subject]) => (
            <button
              key={subject}
              onClick={() =>
                subjectRefs.current[subject]?.current?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                })
              }
              className="border hover:cursor-pointer hover:text-white border-black px-4 py-1 rounded-full text-sm font-medium bg-white hover:bg-gray-800 transition"
            >
              {subject}
            </button>
          ))}
        </div>

        {Object.keys(quizes).length === 0 ? (
          <p className="text-gray-500">No quizzes available</p>
        ) : (
          Object.entries(quizes).map(([subject, { quizzes, color }]) => {
            const filteredQuizzes = quizzes.filter((quiz) =>
              quiz.quizTitle?.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (filteredQuizzes.length === 0) return null;

            return (
              <div
                key={subject}
                ref={subjectRefs.current[subject]}
                className="flex flex-col mx-auto scroll-mt-20"
              >
                <h1 className="mb-2 lg:px-20 md:px-10 px-5 font-bold text-2xl text-[#142073]">
                  {subject}
                </h1>
                <div className="overflow-x-auto scroll-smooth px-6 py-2 hide-scroll-bar">
                  <div className="flex gap-4">
                    {filteredQuizzes.map((quiz) => (
                      <div key={quiz._id} className="flex-shrink-0 w-64">
                        <div className="transition-transform duration-300 hover:scale-105">
                          <QuizCard quiz={quiz} color={color || '#FEFBC7'} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
    </>
  );
};

export default Quiz;
