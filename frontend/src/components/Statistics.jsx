/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';

const Statistics = ({ month }) => {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    fetchData();
  }, [month]);

  const fetchData = async () => {
    try {
      const statsRes = await axios.get(`http://localhost:3000/api/statistics?month=${month}`);
      setStatistics(statsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div id="statistics" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Sales Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Sale Amount" value={`$${statistics.totalSaleAmount || 0}`} />
        <StatCard title="Total Sold Items" value={statistics.totalSoldItems || 0} />
        <StatCard title="Total Not Sold Items" value={statistics.totalNotSoldItems || 0} />
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg shadow transition-colors duration-200">
    <h3 className="text-lg font-semibold mb-2 text-gray-700 dark:text-gray-300">{title}</h3>
    <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{value}</p>
  </div>
);

export default Statistics;