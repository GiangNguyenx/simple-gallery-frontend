import AlbumDetail from "../components/AlbumDetail";
import BackButton from "../components/BackButton";

const Album = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <BackButton />
      </div>
      <AlbumDetail />
    </div>
  );
};

export default Album;