import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../component/sidebar';
import { LoaderCircle, Users, FileText, ListChecks ,ClipboardClock} from 'lucide-react';
const baseURL = import.meta.env.VITE_API_URL;
import Loader from '../component/loader';
const AdminHome = () => {
  const [subjectStats, setSubjectStats] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchSubjectStats = async () => {
      try {
        const response = await fetch(`${baseURL}/admin/dashboard/data`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        const result = await response.json();

        if (response.ok) {
          setData(result);
          setSubjectStats(result.engagements || []);
        } else {
          console.error('Failed to fetch subject stats:', result);
        }
      } catch (error) {
        console.error('Error fetching subject stats:', error);
      } finally {
        setLoading(false);
      }
    };
 
    fetchSubjectStats();
  }, []);

  

  return (
    <>
      <Loader loading={loading} />
  

    <div className="w-screen h-screen flex">
      {/* Sidebar */}
      <div className="h-full flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <main className="p-6">
          <h1 className="text-3xl font-semibold mb-6">Welcome Admin 👋</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div  onClick={() => navigate('/manageusers')} className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition-all flex items-center justify-center gap-2">
              <Users className="text-blue-600" />

              <h2 className="text-xl font-semibold">Total Users</h2>
              <p className="text-3xl text-blue-600 ml-2 ">{data.users || 43}</p>
            </div>
            <div  onClick={() => navigate('/quiz')} className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition-all flex items-center justify-center gap-2">
              <FileText className="text-green-600" />
              <h2 className="text-xl font-semibold">Total Quizzes</h2>
              <p className="text-3xl text-green-600 ml-2">{data.totalquizzes || 324}</p>
            </div>
            <div  onClick={() => navigate('/feedbacks')} className="bg-white rounded-xl p-5 shadow hover:shadow-lg transition-all flex items-center justify-center gap-2">
              <ListChecks className="text-yellow-600" />
              <h2 className="text-xl font-semibold">Feedbacks/Reports</h2>
              <p className="text-3xl text-yellow-600 ml-2">{data.contacts || 6}</p>
            </div>
          </div>

          {/* Subject-wise Solving Count */}
          <div className="mt-10">
            <div className='flex justify-center items-center gap-2 mb-4'>
               <ClipboardClock className="text-blue-600" />
            <h2 className="text-2xl font-semibold "> Subject-wise Quiz Engagement</h2>
            </div>
           
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-3 px-4 text-left">Subject</th>
                    <th className="py-3 px-4 text-left">Total Attempts</th>
                    <th className="py-3 px-4 text-left">Average Score</th>
                  </tr>
                </thead>
                <tbody>
                  {subjectStats.map((item, index) => (
                    <tr key={index} className="border-t hover:bg-gray-50">
                      <td className="py-3 px-4">{item.subject || 'N/A'}</td>
                      <td className="py-3 px-4">{item.totalAttempts || 0}</td>
                      <td className="py-3 px-4">{item.avgScore?.toFixed(2) || '0.00'}</td>
                    </tr>
                  ))}
                  {subjectStats.length === 0 && (
                    <tr>
                      <td colSpan="3" className="text-center py-4 text-gray-500">
                        No engagement data available.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
    </>
  );
};

export default AdminHome;
