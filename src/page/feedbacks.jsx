import React, { useState, useEffect } from 'react';
import Sidebar from '../component/sidebar';
import { Sticker, Contact, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Loader from '../component/loader';
const baseURl = import.meta.env.VITE_API_URL;

const Feedbacks = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openMessage, setOpenMessage] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState({});

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${baseURl}/admin/getFeedback`);
        const data = await response.json();
        setFeedbacks(data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleOpen = (message) => {
    setSelectedFeedback(message);
    setOpenMessage(true);
  };

  return (
    <>
      <Loader loading={loading} />
      <div className="w-screen h-screen flex relative">
        {/* Sidebar - stays sharp */}
        <div className="h-full flex-shrink-0 z-10">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className={`flex-1 p-6 overflow-y-auto relative transition-all duration-300 ${openMessage ? 'blur-sm' : ''}`}>
          <h1 className="text-3xl font-bold flex items-center gap-4 mb-6">
            <Sticker size={30} /> Feedback
          </h1>

          {feedbacks.length === 0 ? (
            <p className="text-gray-500">No feedbacks available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {feedbacks.map((message) => (
                <div
                  key={message._id || message.id}
                  onClick={() => handleOpen(message)}
                  className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition cursor-pointer"
                >
                  <h2 className="text-xl font-semibold text-[#334155] mb-1 flex items-center gap-2">
                    <Contact size={24} /> {message.name}
                  </h2>
                  <p className="text-gray-700 mb-1">
                    <span className="font-medium">Subject:</span> {message.subject}
                  </p>
                  <p className="text-gray-700 mb-1 truncate">
                    <span className="font-medium">Message:</span> {message.message}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Email:</span> {message.email}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal */}
        {openMessage && (
          <div className="absolute inset-0 z-50 flex items-center justify-center">
            {/* Dark overlay */}
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setOpenMessage(false)}
            ></div>

            {/* Modal Box */}
            <div className="bg-white relative z-10 rounded-xl shadow-xl max-w-lg w-full p-6 transform transition-all duration-300 ease-out scale-100 opacity-100">
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                onClick={() => setOpenMessage(false)}
              >
                <X />
              </button>
              <h2 className="text-2xl font-bold mb-2 text-[#334155] flex items-center gap-2">
                <Contact size={22} /> {selectedFeedback.name}
              </h2>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Email:</span> {selectedFeedback.email}
              </p>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">Subject:</span> {selectedFeedback.subject}
              </p>
              <p className="text-gray-700 whitespace-pre-wrap mt-4">
                <span className="font-semibold">Message:</span> <br />
                {selectedFeedback.message}
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Feedbacks;
