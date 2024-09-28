const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-inner mt-auto transition-colors duration-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-center items-center">
          <div className="text-gray-600 dark:text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Roxiller Transactions. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

