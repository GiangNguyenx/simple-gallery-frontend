import { Link, useLocation } from 'react-router-dom';
import logo from '../logo.svg';

const Sidebar = () => {
  const location = useLocation();
  const path = location.pathname;
  
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-indigo-800 to-indigo-600 text-white w-64 fixed left-0 top-0 shadow-xl">
      {/* Logo và Tên ứng dụng */}
      <div className="p-6 border-b border-indigo-500">
        <div className="flex items-center justify-center mb-4">
          <img src={logo} alt="Media Gallery Logo" className="h-16 w-16" />
        </div>
        <h1 className="text-2xl font-bold text-center">Media Gallery</h1>
      </div>
      
      {/* Điều hướng */}
      <nav className="flex-grow p-4">
        <ul className="space-y-2">
          <li>
            <Link 
              to="/albums" 
              className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                path.includes('/album') && !path.includes('/user') 
                  ? 'bg-indigo-900 font-medium' 
                  : 'hover:bg-indigo-700'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Albums
            </Link>
          </li>
          <li>
            <Link 
              to="/users" 
              className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                path.includes('/user') 
                  ? 'bg-indigo-900 font-medium' 
                  : 'hover:bg-indigo-700'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Users
            </Link>
          </li>
        </ul>
      </nav>
      
      {/* Bản quyền */}
      <div className="p-4 text-sm text-center border-t border-indigo-500">
        <p>© 2025 Media Gallery</p>
      </div>
    </div>
  );
};

export default Sidebar;
