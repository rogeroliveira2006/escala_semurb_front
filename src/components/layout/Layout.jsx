import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '@/components/layout/Header';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-barueri-light-gray dark:bg-gray-900">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;