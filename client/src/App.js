import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CalendarPlan from './pages/CalendarPlan';
import Countdown from './pages/Countdown';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/calendar" element={<CalendarPlan />} />
        <Route path="/countdown" element={<Countdown />} />
      </Routes>
    </Router>
  );
}export default App;