/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import EmpireHome from './pages/EmpireHome';
import LabelPage from './pages/LabelPage';
import EMPPage from './pages/MultimediaPage';
import ServicesPage from './pages/ServicesPage';
import ScrollToTop from './components/ScrollToTop';
import { PlayerProvider } from './context/PlayerContext';

export default function App() {
  return (
    <PlayerProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<EmpireHome />} />
            <Route path="/label" element={<LabelPage />} />
            <Route path="/multimedia" element={<EMPPage />} />
            <Route path="/services" element={<ServicesPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PlayerProvider>
  );
}
