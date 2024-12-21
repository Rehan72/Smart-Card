import React from 'react';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

const Layout = ({ Children }) => {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      <Header />
      <div className="flex">
        <Navbar />
        <main className="min-h-screen container mx-auto px-4 py-8">
        <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;