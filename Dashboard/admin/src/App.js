import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './Pages/HomePage';
import TaskPage from './Pages/TaskPage';
import CreateUserPage from './Pages/CreateUserPage';

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
        <Route path="/" element={<HomePage />} />

          <Route exact path="/tasks" component={TaskPage} />
          <Route exact path="/create-user" component={CreateUserPage} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;




