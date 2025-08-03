import React, { useState } from 'react';
import Sidebar from '../component/sidebar';
import { PlusCircle, Trash } from 'react-feather';
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
import Loader from '../component/loader';
import { Trophy } from 'lucide-react';

const Tournament = () => {
  const [quizModal, setQuizModal] = useState(false);
  const [subject, setSubject] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [quizTitle, setQuizTitle] = useState('');

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: '', options: ['', '', '', ''], correctAnswer: '' }
    ]);
  };

  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].question = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[oIndex] = value;
    setQuestions(updated);
  };

  const handleCorrectAnswerChange = (qIndex, value) => {
    const updated = [...questions];
    updated[qIndex].correctAnswer = value;
    setQuestions(updated);
  };

  const handleDeleteQuestion = (indexToDelete) => {
    const updated = questions.filter((_, i) => i !== indexToDelete);
    setQuestions(updated);
  };

  const handleSubmit = async () => {
    
    if (!quizTitle || !subject || questions.length === 0) {
      alert('Please fill in all fields and add at least one question.');
      return;
    }

    const formattedQuestions = questions.map((q) => ({
      questionText: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
    }));

    const quizData = {
      quizTitle,
      subject,
      questions: formattedQuestions,
    };

    try {
      const res = await fetch(`${baseURL}/quizes/addTournamentQuiz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(quizData),
      });

      if (!res.ok) {
        console.error('Failed to submit quiz');
        alert('Failed to submit quiz. Please try again.');
      } else {
        setQuizTitle('');
        setSubject('');
        setQuestions([]);
        setQuizModal(false);
        alert('Quiz submitted successfully!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong while submitting the quiz.');
    }
  };

  return (
    <div className='w-screen h-screen flex'>
      <div className='h-full flex-shrink-0'>
        <Sidebar />
      </div>
      <div className="flex-1 overflow-y-auto p-6 text-black">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold flex gap-4 items-center"><Trophy />All Tournament Quizzes</h1>
          <button
            onClick={() => setQuizModal(true)}
            className="flex items-center bg-white text-black px-4 py-2 rounded shadow"
          >
            <PlusCircle className="mr-2" /> Add Quiz
          </button>
        </div>

        {/* Quiz Modal */}
        {quizModal && (
          <div className="fixed inset-0 bg-[#04040e] bg-opacity-40 flex justify-center items-start pt-20 z-50">
            <div className="bg-white w-[90%] max-w-3xl p-6 rounded-lg shadow-lg max-h-[80vh] overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4">Add Quiz</h2>

              <input
                type="text"
                placeholder="Enter Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded mb-4"
              />
              <input
                type="text"
                placeholder="Enter Quiz Title"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded mb-4"
              />

              {questions.map((q, index) => (
                <div key={index} className="relative border border-gray-300 p-4 pt-8 mb-4 rounded bg-gray-50">
                  <button
                    className="absolute top-2 right-2 mr-1 text-red-600 hover:text-red-800"
                    onClick={() => handleDeleteQuestion(index)}
                  >
                    <Trash size={18} />
                  </button>

                  <input
                    type="text"
                    placeholder={`Question ${index + 1}`}
                    value={q.question}
                    onChange={(e) => handleQuestionChange(index, e.target.value)}
                    className="w-full mb-2 border p-2 rounded"
                  />
                  {q.options.map((opt, i) => (
                    <input
                      key={i}
                      type="text"
                      placeholder={`Option ${i + 1}`}
                      value={opt}
                      onChange={(e) => handleOptionChange(index, i, e.target.value)}
                      className="w-full mb-1 border p-2 rounded"
                    />
                  ))}
                  <select
                    value={q.correctAnswer}
                    onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
                    className="w-full mt-2 border p-2 rounded"
                  >
                    <option value="">Select Correct Answer</option>
                    {q.options.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt || `Option ${i + 1}`}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              <button
                onClick={handleAddQuestion}
                className="bg-green-600 text-white px-4 py-2 rounded mb-4"
              >
                + Add Question
              </button>

              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setQuizModal(false)}
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Submit Quiz
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dummy Quiz List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {['Machine Learning', 'DSA', 'AI', 'Verbal English', 'Aptitude'].map((subj, i) => (
            <div key={i} className="bg-white rounded-xl p-4 shadow hover:shadow-lg">
              <h3 className="text-lg font-bold text-blue-700 mb-2">{subj}</h3>
              <p className="text-sm text-gray-600">10 Questions</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tournament;
