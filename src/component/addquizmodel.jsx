import React, { useEffect, useState } from 'react';
import { Trash } from 'react-feather';
import Select from 'react-select';
import Loader from './loader';
import { FilePlus2 } from 'lucide-react';
import Sidebar from './sidebar';

const Addquizmodel = () => {
  const [subject, setSubject] = useState(null);
  const [quizTitle, setQuizTitle] = useState('');
  const [questions, setQuestions] = useState([]);
  const [difficulty, setDifficulty] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [type, setType] = useState('');
  const [loading, setLoading] = useState(true);
  const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseURL}/quizes/allsubjects`, {
          method: 'GET',
          credentials: 'include'
        });
        const data = await res.json();

        if (Array.isArray(data)) {
          const subjectOptions = data.map((sub) => ({ value: sub.name, label: sub.name }));
          setSubjects(subjectOptions);
        } else {
          console.error('Failed to fetch subjects:', data.message);
        }
      } catch (error) {
        console.error('Error fetching subjects:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, []);

  const handleAddQuestion = () => {
    if (questions.length >= 10) {
      alert('You can only add up to 10 questions.');
      return;
    }
    setQuestions([...questions, { question: '', options: ['', '', '', ''], correctAnswer: '' }]);
  };

  const handleQuestionChange = (index, value) => {
    const updated = [...questions];
    updated[index].question = value;
    setQuestions(updated);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updated = [...questions];
    updated[questionIndex].options[optionIndex] = value;
    setQuestions(updated);
  };

  const handleCorrectAnswerChange = (questionIndex, value) => {
    const updated = [...questions];
    updated[questionIndex].correctAnswer = value;
    setQuestions(updated);
  };

  const handleDeleteQuestion = (indexToDelete) => {
    const updated = questions.filter((_, i) => i !== indexToDelete);
    setQuestions(updated);
  };

  const handleSubmit = async () => {
    if (!subject || !quizTitle.trim() || !difficulty || !type) {
      alert('Please fill in all fields.');
      return;
    }
    if (!quizTitle.trim() || !subject || questions.length < 1) {
      alert('Please fill in all fields and add at least one question.');
      return;
    }

    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.question.trim()) {
        alert(`Question ${i + 1} is empty.`);
        return;
      }
      if (q.options.some(opt => !opt.trim())) {
        alert(`Please fill all options for Question ${i + 1}.`);
        return;
      }
      if (!q.correctAnswer.trim()) {
        alert(`Please select a correct answer for Question ${i + 1}.`);
        return;
      }
    }

    const formattedQuestions = questions.map(q => ({
      questionText: q.question.trim(),
      options: q.options.map(opt => opt.trim()),
      correctAnswer: q.correctAnswer.trim(),
    }));

    const quizData = {
      quizTitle: quizTitle.trim(),
      subject: subject.value,
      type: type,
      difficulty,
      questions: formattedQuestions,
    };
try {
      const res = await fetch(`${baseURL}/quizes/addquiz`, {
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
        setDifficulty('');
        setType('');
        setQuestions([]);
        alert('Quiz submitted successfully!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Something went wrong while submitting the quiz.');
    }
  };

  return (
    <>
  <Loader loading={loading} />
  <div className="text-black h-full w-full bg-opacity-40 flex justify-center items-start z-50">
    <div className='h-full flex-shrink-0'>
        <Sidebar />
      </div>
    <div className=" p-6 h-full w-full  rounded-lg shadow-lg  overflow-y-auto">
      <h2 className="text-3xl font-semibold mb-4 text-black flex items-center gap-2"><FilePlus2 />Add Quiz</h2>

       <Select
  options={subjects}
  value={subject}
  onChange={setSubject}
  styles={{
    control: (base) => ({
      ...base,
      background: "transparent",
      borderColor: "#6b7280", // gray-500
      color: "black",
      boxShadow: "none",
    }),
    
    }}
  placeholder="Select Subject..."
  required
  isSearchable
  className="mb-4"
  classNamePrefix="custom"
/>


        <input
          type="text"
          placeholder="Enter Quiz Title"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          className="w-full border border-gray-500 p-2 rounded mb-4 text-black"
        />

        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="w-full border border-gray-500 p-2 rounded mb-4 text-black"
          required
        >
          <option value="" disabled>Select Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select> 
        <select
          value={type}

          onChange={(e) => setType(e.target.value)}
          className="w-full border border-gray-500 p-2 rounded mb-4 text-black"
          required
        >
          <option value="" disabled>Select Type</option>
          <option value="Quiz">Quiz</option>
          <option value="Hot">Hot Quiz</option>
          <option value="Tournament">Tournament Quiz</option>
        </select>


        {questions.map((q, index) => (
          <div key={index} className="relative border border-gray-500 p-4 pt-8 mb-4 rounded ">
            <button
              className="absolute top-2 right-2 text-red-600 hover:text-red-800"
              onClick={() => handleDeleteQuestion(index)}
            >
              <Trash size={18} />
            </button>

            <input
              type="text"
              placeholder={`Question ${index + 1}`}
              value={q.question}
              onChange={(e) => handleQuestionChange(index, e.target.value)}
              className="w-full mb-2 border border-gray-500 p-2 rounded text-black"
            />

            {q.options.map((opt, i) => (
              <input
                key={i}
                type="text"
                placeholder={`Option ${i + 1}`}
                value={opt}
                onChange={(e) => handleOptionChange(index, i, e.target.value)}
                className="w-full mb-1 border border-gray-500 p-2 rounded text-black"
              />
            ))}

            <select
              value={q.correctAnswer}
              onChange={(e) => handleCorrectAnswerChange(index, e.target.value)}
              className="w-full mt-2 border border-gray-500 p-2 rounded text-black"
            >
              <option value="">Select Correct Answer</option>
              {q.options.map((opt, i) => (
                opt.trim() && (
                  <option key={i} value={opt}>{opt}</option>
                )
              ))}
            </select>
          </div>
        ))}

        <button
          onClick={handleAddQuestion}
          disabled={questions.length >= 10}
          className="bg-green-600 text-white px-4 py-2 rounded mb-4 disabled:opacity-50"
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
    </>
  );
};

export default Addquizmodel;
