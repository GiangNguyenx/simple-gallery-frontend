import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const path = location.pathname;
  
  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-5 mb-6 rounded-lg shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <div className="text-2xl font-bold tracking-tight">Media Gallery</div>
        </div>
        <div className="flex space-x-6">
          <Link 
            to="/albums" 
            className={`hover:text-blue-100 transition-colors duration-200 px-3 py-2 ${path.includes('/album') && !path.includes('/user') ? 'font-semibold border-b-2 border-white' : ''}`}
          >
            Albums
          </Link>
          <Link 
            to="/users" 
            className={`hover:text-blue-100 transition-colors duration-200 px-3 py-2 ${path.includes('/user') ? 'font-semibold border-b-2 border-white' : ''}`}
          >
            Users
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
