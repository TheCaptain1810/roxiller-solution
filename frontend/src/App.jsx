import { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TransactionsPage from './components/TransactionsPage';
import Statistics from './components/Statistics';
import BarChartPage from './components/BarChartPage';
import PieChartPage from './components/PieChartPage';
import MonthSelector from './components/MonthSelector';
import { ThemeProvider } from './ThemeContext';

function App() {
  const [month, setMonth] = useState('03');

  const handlePreviousMonth = () => {
    setMonth(prevMonth => {
      const newMonth = parseInt(prevMonth, 10) - 1;
      if (newMonth === 0) return '12';
      return newMonth.toString().padStart(2, '0');
    });
  };

  const handleNextMonth = () => {
    setMonth(prevMonth => {
      const newMonth = parseInt(prevMonth, 10) + 1;
      if (newMonth === 13) return '01';
      return newMonth.toString().padStart(2, '0');
    });
  };

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8 mt-16">
          <div className="flex items-center justify-between mb-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
            <button onClick={handlePreviousMonth} className="btn text-white bg-indigo-500 hover:bg-indigo-600 rounded-md px-4 py-2 transition duration-300 ease-in-out transform hover:-translate-y-1">
              Previous Month
            </button>
            <MonthSelector month={month} setMonth={setMonth} />
            <button onClick={handleNextMonth} className="btn text-white bg-indigo-500 hover:bg-indigo-600 rounded-md px-4 py-2 transition duration-300 ease-in-out transform hover:-translate-y-1">
              Next Month
            </button>
          </div>
          <div className="flex flex-col gap-3">
            <TransactionsPage month={month} />
            <Statistics month={month} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <BarChartPage month={month} />
            <PieChartPage month={month} />
          </div>
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
