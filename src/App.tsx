import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LaunchDashboard from './Components/LaunchDashboard';
import LaunchDetails from './Components/LaunchDetails';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/launch/:id" element={ <LaunchDetails/> }/>
        <Route path="/" element={ <LaunchDashboard/> }/>
      </Routes>
    </Router>
  );
};

export default App;