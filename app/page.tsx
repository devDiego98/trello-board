'use client'
import React from 'react';
import withAuth from './components/withAuth';
import TrelloBoard from './components/TrelloBoard';

const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <TrelloBoard/>
    </div>
  );
};

export default withAuth(DashboardPage);
