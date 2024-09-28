/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';
import PieChartComponent from './PieChart';

const PieChartPage = ({ month }) => {
  const [pieChartData, setPieChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [month]);

  const fetchData = async () => {
    try {
      const pieRes = await axios.get(`http://localhost:3000/api/pie-chart?month=${month}`);
      setPieChartData(pieRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div id="piechart" className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-colors duration-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Pie Chart</h2>
      <div className="mt-6">
        <PieChartComponent data={pieChartData} />
      </div>
    </div>
  );
};

export default PieChartPage;
