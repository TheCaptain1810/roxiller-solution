/* eslint-disable react/prop-types */
const MonthSelector = ({ month, setMonth }) => {
  return (
    <div className="flex items-center">
      <label htmlFor="month-select" className="text-sm font-medium text-indigo-400 mr-2">Month:</label>
      <select 
        id="month-select"
        value={month} 
        onChange={(e) => setMonth(e.target.value)}
        className="p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      >
        <option value="01">January</option>
        <option value="02">February</option>
        <option value="03">March</option>
        <option value="04">April</option>
        <option value="05">May</option>
        <option value="06">June</option>
        <option value="07">July</option>
        <option value="08">August</option>
        <option value="09">September</option>
        <option value="10">October</option>
        <option value="11">November</option>
        <option value="12">December</option>
      </select>
    </div>
  );
};

export default MonthSelector;
