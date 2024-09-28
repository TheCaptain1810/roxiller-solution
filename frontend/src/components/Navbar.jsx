/* eslint-disable react/prop-types */

import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

const Navbar = () => {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className='bg-white dark:bg-gray-800 shadow-lg fixed w-full top-0 z-10 transition-colors duration-200'>
      <div className='container mx-auto px-4 h-16 flex justify-between items-center'>
        <span className='text-2xl font-bold text-indigo-600 dark:text-indigo-400'>
          Roxiller Transactions
        </span>   
        <div className='flex items-center space-x-4'>
          <NavLink onClick={() => scrollTo('transactions')}>Transactions</NavLink>
          <NavLink onClick={() => scrollTo('statistics')}>Statistics</NavLink>
          <NavLink onClick={() => scrollTo('barchart')}>Bar Chart</NavLink>
          <NavLink onClick={() => scrollTo('piechart')}>Pie Chart</NavLink>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200"
          >
            {isDarkMode ? '🌞' : '🌙'}
          </button>
        </div>
      </div>
    </nav> 
  );
};

const NavLink = ({ onClick, children }) => (
  <button 
    onClick={onClick}
    className='text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 px-3 py-2 rounded-md text-sm font-medium transition duration-300'
  >
    {children}
  </button>
);

export default Navbar;
