/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import axios from 'axios';

const TransactionsPage = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [month]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const transactionsRes = await axios.get(`http://localhost:3000/api/combined-data?month=${month}`);
      console.log('API Response:', transactionsRes.data);
      setTransactions(transactionsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setTransactions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <div className="text-center py-4">Loading...</div>;
    }

    if (transactions.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-xl text-gray-600">No transactions found for this month.</p>
          <p className="mt-2 text-gray-500">Try selecting a different month or check if there&apos;s data available.</p>
        </div>
      );
    }

    return (
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Title</th>
              <th className="px-4 py-2 text-left">Description</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Sold</th>
              <th className="px-4 py-2 text-left">Date of Sale</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="border-b text-indigo-400 hover:bg-gray-50 hover:text-black">
                <td className="px-4 py-2">{transaction.id}</td>
                <td className="px-4 py-2">
                  <img src={transaction.image} alt={transaction.title} className="w-16 h-16 object-cover rounded-md" />
                </td>
                <td className="px-4 py-2">{transaction.title}</td>
                <td className="px-4 py-2">{transaction.description}</td>
                <td className="px-4 py-2">${transaction.price}</td>
                <td className="px-4 py-2">{transaction.category}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${transaction.sold ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                    {transaction.sold ? 'Yes' : 'No'}
                  </span>
                </td>
                <td className="px-4 py-2">{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div id="transactions" className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100">Transactions</h2>
      {renderContent()}
    </div>
  );
};

export default TransactionsPage;