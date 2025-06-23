import React from 'react';
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';
import ProposalDashboard from './proposalDashboard';
import ProposalFormManager from './proposalFormManager';
import NavigationBar from './navigationBar';
import AppInfoPanel from './appInfoPanel';
import './globalLayoutStyles.css';

function Layout() {
  return (
    <div className="app-container">
      <NavigationBar />
      <main>
        <Outlet />
      </main>
      <footer>
        <AppInfoPanel />
        <p>&copy; {new Date().getFullYear()} Proposal Genie</p>
      </footer>
    </div>
  );
}

function Dashboard() {
  return <ProposalDashboard />;
}

function Proposals() {
  return <ProposalFormManager />;
}

function NotFound() {
  return (
    <div>
      <h1>404 - Not Found</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="proposals">
            <Route index element={<Proposals />} />
            <Route path="new" element={<Proposals />} />
            <Route path=":id" element={<Proposals />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
