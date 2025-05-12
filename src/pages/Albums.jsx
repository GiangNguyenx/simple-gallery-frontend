import AlbumList from "../components/AlbumList";
import BackButton from "../components/BackButton";
import { useLocation } from "react-router-dom";

const Albums = () => {
  const location = useLocation();
  
  const showBackButton = location.key !== 'default';
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        {showBackButton && <BackButton />}
      </div>
      <AlbumList />
    </div>
  );
};

export default Albums;