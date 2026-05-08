import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './screens/Dashboard/Home';
import Calendar from './screens/Calendar/Calendar';
import TaskList from './screens/Tasks/TaskList';
import GroupHub from './screens/Groups/GroupHub';
import Notes from './screens/Notes/Notes';
import Settings from './screens/Settings/Settings';
import Login from './screens/Auth/Login';
import Register from './screens/Auth/Register';
import Onboarding from './screens/Onboarding';

function App() {
  // Simple auth check simulation for now
  const isAuthenticated = true; 

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />
        
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/tasks" element={<TaskList />} />
          <Route path="/groups" element={<GroupHub />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
