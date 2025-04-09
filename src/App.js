import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { UserProvider } from './context/UserContext';
import CaptainsLog from './components/CaptainsLog';
import MedicalRecords from './components/MedicalRecords';
import ShipManifest from './components/ShipManifest';
import ActivityLog from './components/ActivityLog';
import AiLog from './components/AiLog';
import { ActivityLogProvider } from './context/ActivityLogContext';
import UserList from './components/UserList';
import NaniteConfirm from './components/NaniteConfirm';
import NaniteInstructions from './components/NaniteInstructions';

function App() {
  return (
    <UserProvider>
      <ActivityLogProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/captains-log" element={<CaptainsLog />} />
            <Route path="/medical-records" element={<MedicalRecords />} />
            <Route path="/ship-manifest" element={<ShipManifest />} />
            <Route path="/activity-log" element={<ActivityLog />} />
            <Route path="/ai-log" element={<AiLog />} />
            <Route path="/user-list" element={<UserList />} />
            <Route path="/nanite-confirm" element={<NaniteConfirm />} />
            <Route path="/nanite-instructions" element={<NaniteInstructions />} />
          </Routes>
        </BrowserRouter>
      </ActivityLogProvider>
    </UserProvider>
  );
}

export default App;
