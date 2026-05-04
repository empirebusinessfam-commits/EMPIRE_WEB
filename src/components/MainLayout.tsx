import React from 'react';
import { Outlet } from 'react-router-dom';
import LLMSidebar from './LLMSidebar';

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-empire-white text-black font-sans selection:bg-crimson selection:text-white">
      <LLMSidebar />
      <main className="relative">
        <Outlet />
      </main>
    </div>
  );
}
