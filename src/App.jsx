import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Tournament from './page/tournaments';
import Hotquizzes from './page/hotquizzes';
import Manageusers from './page/manageusers';
import Quizadd from './page/quizadd';
import Feedbacks from './page/feedbacks';
import Quiz from './page/quiz'
import Home from './page/home';
import NotFound from './pages/notfound';

import LandingPage from './page/landingpage';
function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/tournament' element={<Tournament />} />

          <Route path='/hotquizzes' element={<Hotquizzes />} />
          <Route path='/manageusers' element={<Manageusers />} />
          <Route path='/addquiz' element={<Quizadd />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/feedbacks' element={<Feedbacks />} />
          <Route path='/home' element={<Home />} />
          <Route path='/' element={<LandingPage />} />

        <Route path="*" element={<NotFound/>} />

        </Routes>
      </Router>

    </>
  )
}

export default App
