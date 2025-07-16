import React from 'react';
import Header from '../components/Layout/Header';
import Insights from '../components/Insights';

const InsightsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Insights />
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;
