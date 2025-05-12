const Loading = () => (
  <div className="flex flex-col justify-center items-center h-64">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
    <p className="mt-4 text-gray-600 font-medium">Loading content...</p>
  </div>
);

export default Loading;