import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();
  
  const goBack = () => {
    navigate(-1); 
  };
  
  return (
    <button 
      onClick={goBack}
      className="mb-4 px-4 py-2 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors duration-200 ease-in-out rounded-md hover:bg-indigo-50"
      title="Go back to previous page"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
      </svg>
    </button>
  );
};

export default BackButton;

