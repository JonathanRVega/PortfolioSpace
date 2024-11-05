import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Layout from './components/UI/Layout';
import PlanetsLayout from './components/UI/PlanetsLayout';
import PlanetPage from './pages/PlanetPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/planets" replace />} />
        <Route path="/planets" element={<Layout />}>
          <Route path="/planets" element={<PlanetsLayout />}>
            <Route path=":planetId" element={<PlanetPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
