import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Typed from 'typed.js';
import { useNavigate } from 'react-router-dom';
const quizManageImg = "https://cdn-icons-png.flaticon.com/512/17255/17255163.png";
const userStatsImg = 'https://cdn-icons-png.flaticon.com/512/11629/11629278.png';
const feedbackImg = "https://cdn-icons-png.flaticon.com/512/10405/10405178.png";


const LandingPage = () => {
  const typedRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!typedRef.current) return;

    const typed = new Typed(typedRef.current, {
      strings: [
        "Manage Platform Quizzes",
        "Monitor User Engagement",
        "Review Feedback and Issues"
      ],
      typeSpeed: 40,
      backSpeed: 30,
      loop: true,
    });

    return () => typed.destroy();
  }, []);

 


  return (
    <div className="flex flex-col min-h-screen w-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
      <main className="flex-grow px-4">
        {/* Hero Section */}
        <div className="text-center mt-20">
          <h1 className="text-4xl md:text-6xl font-bold text-[#04040e] mb-4">
            Admin Dashboard — <span className="text-[#142073]">TestAura</span>
          </h1>

          <span
            ref={typedRef}
            className="block h-[40px] text-lg md:text-xl font-medium text-[#142073]"
          ></span>
        </div>
         

         {/* CTA Buttons */}
        <div className="flex  sm:flex-row gap-4 justify-center mt-6">
          <Link to="/home" aria-label="Sign up">
            <button className="bg-[#04040e] hover:bg-[#142073] text-white px-6 py-2 rounded-lg text-sm font-semibold shadow">
              Lets Grow Together
            </button>
          </Link>
          <Link to="/home" aria-label="Login">
            <button className="bg-gray-200 hover:bg-gray-300 text-[#04040e] px-6 py-2 rounded-lg text-sm font-semibold shadow">
              Login
            </button>
          </Link>
        </div>
      

        {/* Admin Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-6xl w-full px-4 mx-auto">
          <AdminFeatureCard
            image={quizManageImg}
            title="Quiz Management"
            desc="Create, update, and remove quizzes to keep content fresh and relevant."
          />
          <AdminFeatureCard
            image={userStatsImg}
            title="User Stats & Reports"
            desc="Track user performance, top performers, and usage statistics."
          />
          <AdminFeatureCard
            image={feedbackImg}
            title="View Feedback"
            desc="Read user suggestions, bug reports, and act on what matters most."
          />
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} TestAura Admin Panel — Built with ❤️ by Prajwal Bhomale
      </footer>
    </div>
  );
};

const AdminFeatureCard = ({ image, title, desc }) => (
  <div className="bg-white shadow-md p-6 rounded-2xl text-center hover:shadow-xl transition duration-300">
    <img src={image} alt={title} loading="lazy" className="w-20 h-20 mx-auto mb-4" />
    <h3 className="text-xl font-semibold text-[#142073]">{title}</h3>
    <p className="text-sm text-gray-600 mt-2">{desc}</p>
  </div>
);

export default LandingPage;
