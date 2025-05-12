import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchAlbumById, fetchPhotosByAlbumId, fetchUserById, getAvatar } from "../api";
import Loading from "./Loading";

const AlbumDetail = () => {
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPhoto, setCurrentPhoto] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const albumRes = await fetchAlbumById(id);
        const albumData = albumRes.data;
        const [photosRes, userRes] = await Promise.all([
          fetchPhotosByAlbumId(id),
          fetchUserById(albumData.userId),
        ]);
        setAlbum(albumData);
        setPhotos(photosRes.data);
        setUser(userRes.data);
      } catch (error) {
        console.error("Error fetching album details:", error);
      }
      setLoading(false);
    };
    loadData();
  }, [id]);

  {/* Mở ảnh lên */}
  const openPhotoModal = (photo) => {
    setCurrentPhoto(photo);
  };

  const closePhotoModal = () => {
    setCurrentPhoto(null);
  };

  if (loading) return <Loading />;
  if (!album || !user) return <div>Not found</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Album Details</h2>
      <div className="mb-6">
        <div className="flex items-center mt-2">
          <img
            src={getAvatar(user.name)}
            alt={`Avatar of ${user.name}`}
            className="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <Link
              to={`/users/${user.id}`}
              className="text-blue-500 hover:underline cursor-pointer"
            >
              {user.name}
            </Link>
            <p>
              <a
                href={`mailto:${user.email}`}
                className="text-blue-500 hover:underline cursor-pointer"
              >
                {user.email}
              </a>
            </p>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Album Title</h3>
        <p>{album.title}</p>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Photos</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => openPhotoModal(photo)}
              className="block cursor-pointer"
            >
              <img
                src={photo.thumbnailUrl}
                alt={photo.title}
                className="w-full h-auto rounded hover:opacity-80"
              />
            </div>
          ))}
        </div>
      </div>

    {/* Bấm vào ảnh hiển thị lên toàn màn hình */}
      {currentPhoto && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={closePhotoModal}
        >
          <div
            className="relative max-w-4xl w-full p-4"
            onClick={(e) => e.stopPropagation()} 
          >
            <button
              onClick={closePhotoModal}
              className="absolute top-2 right-2 text-white bg-gray-800 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-700"
            >
              &times;
            </button>
            <img
              src={currentPhoto.url}
              alt={currentPhoto.title}
              className="w-full h-auto rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumDetail;