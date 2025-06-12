import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CalendarPlan from './pages/CalendarPlan';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CalendarPlan />} />
      </Routes>
    </Router>
  );
}export default App;