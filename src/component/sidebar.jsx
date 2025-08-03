import React from 'react';
import {
  FaUsers,
  FaPlus,
  FaChartBar,
  FaCogs,
  FaTrophy,
  FaFire,
FaClipboardList
} from 'react-icons/fa';
import { LogOut } from 'lucide-react';

import { MdFeedback } from "react-icons/md";

import { useNavigate, useLocation } from 'react-router-dom';
import clsx from 'clsx';

const navItems = [
  { label: 'Dashboard', icon: <FaChartBar />, path: '/home' },
  { label: 'Manage Users', icon: <FaUsers />, path: '/manageusers' },
  { label: 'Add Quiz', icon: <FaPlus />, path: '/addquiz' },
  { label: 'All Quizzes', icon: <FaClipboardList />, path: '/quiz' },
  { label: 'Tournaments', icon: <FaTrophy />, path: '/tournament' },
  { label: 'Hot Quizzes', icon: <FaFire />, path: '/hotquizzes' },
  { label: 'Feedbacks', icon: <MdFeedback />, path: '/feedbacks' },
  { label: 'Logout', icon: <LogOut size={20} />, path: '/' }
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const desktopClass =
    'flex items-center gap-2 cursor-pointer transition-colors';
  const mobileClass =
    'flex items-center justify-center p-2 cursor-pointer transition-colors';

  const activeClasses = 'text-yellow-400';
  const inactiveClasses = 'hover:text-yellow-400 text-white';

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="w-64 hidden md:flex flex-col  bg-gradient-to-r to-[#0a0f36] from-[#04040e] text-white h-full p-6  py-6 space-y-6">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/home')}
        >
          <img
            src="/logo.png"
            alt="TestAura Logo"
            className="w-12 h-12 hover:scale-110 transition"
          />
          <h1 className="text-2xl font-bold font-serif">TestAura</h1>
        </div>

        {/* Navigation */}
        <nav className="space-y-6">
          {navItems.map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path)}
              className={clsx(
                desktopClass,
                isActive(item.path) ? activeClasses : inactiveClasses
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <aside className="w-16 md:hidden bg-[#04040e] text-white min-h-screen flex flex-col items-center space-y-6 py-6">
        <button
          type="button"
          onClick={() => navigate('/home')}
          className="hover:scale-110 transition"
          aria-label="Go to Dashboard"
        >
          <img src="/logo.png" alt="TestAura Logo" className="w-12 h-12" />
        </button>

        <nav className="space-y-6 flex flex-col items-center">
          {navItems.map((item) => (
            <button
              key={item.path}
              type="button"
              onClick={() => navigate(item.path)}
              aria-label={item.label}
              title={item.label}
              className={clsx(
                mobileClass,
                isActive(item.path) ? activeClasses : inactiveClasses
              )}
            >
              {item.icon}
            </button>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
