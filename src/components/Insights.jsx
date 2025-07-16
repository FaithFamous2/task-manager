import React, { useState, useEffect } from 'react';
import { getInsights } from '../services/insights';

const Insights = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadInsights = async () => {
      try {
        const data = await getInsights();
        setInsights(data);
      } catch (err) {
        setError('Failed to load insights');
      } finally {
        setLoading(false);
      }
    };

    loadInsights();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md text-red-700">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 text-indigo-600 hover:underline"
        >
          Try again
        </button>
      </div>
    );
  }

  // Provide fallback data if insights is null
  const data = insights || {
    total: 0,
    pending: 0,
    inProgress: 0,
    done: 0,
    completionRate: 0
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Task Insights</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 className="text-lg font-medium text-blue-800">Total Tasks</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">{data.total}</p>
        </div>

        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
          <h3 className="text-lg font-medium text-yellow-800">Pending</h3>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{data.pending}</p>
        </div>

        <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
          <h3 className="text-lg font-medium text-indigo-800">In Progress</h3>
          <p className="text-3xl font-bold text-indigo-600 mt-2">{data.inProgress}</p>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
          <h3 className="text-lg font-medium text-green-800">Completed</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">{data.done}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Completion Progress</h3>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className="bg-green-600 h-4 rounded-full"
            style={{ width: `${data.completionRate}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-gray-600">
          <span>0%</span>
          <span>{data.completionRate}%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};

export default Insights;
