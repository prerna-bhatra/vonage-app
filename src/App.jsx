import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css'
import Meetings from './components/meetings'
import VideoRoom from './components/videoRoom'
import VideoChat from './components/confrence';

function App() {

  return (
    <div className="">
      <Router>
        <Routes>
          <Route path="/" element={<Meetings />} />
          <Route path="/conference" element={<VideoRoom />} />
          <Route path="/conference-new" element={<VideoChat />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
