import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchUserById, fetchAlbumsByUserId, getAvatar } from "../api";
import Loading from "./Loading";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [userRes, albumsRes] = await Promise.all([
          fetchUserById(id),
          fetchAlbumsByUserId(id),
        ]);
        setUser(userRes.data);
        setAlbums(albumsRes.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
      setLoading(false);
    };
    loadData();
  }, [id]);

  if (loading) return <Loading />;
  if (!user) return <div>User not found</div>;

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex items-start">
          <img
            src={getAvatar(user.name)}
            alt={`Avatar of ${user.name}`}
            className="w-24 h-24 rounded-full mr-6 border-2 border-indigo-100"
          />
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <a
                  href={`mailto:${user.email}`}
                  className="text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  {user.email}
                </a>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a
                  href={`tel:${user.phone}`}
                  className="text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  {user.phone}
                </a>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                </svg>
                <a
                  href={`https://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 transition-colors"
                >
                  {user.website}
                </a>
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1.581.814L10 13.197l-4.419 3.617A1 1 0 014 16V4zm2-1h8a1 1 0 011 1v10.927l-3.84-3.147a1 1 0 00-1.32 0L6 14.927V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-600">
                  {user.company?.name || "No company information"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Albums by {user.name}</h3>
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full border-collapse bg-white text-left text-sm text-gray-700">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 font-medium text-gray-900">ID</th>
                <th className="px-4 py-3 font-medium text-gray-900">Title</th>
                <th className="px-4 py-3 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {albums.map((album) => (
                <tr key={album.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{album.id}</td>
                  <td className="px-4 py-3">{album.title}</td>
                  <td className="px-4 py-3">
                    <Link
                      to={`/albums/${album.id}`}
                      className="inline-flex items-center rounded-md bg-indigo-50 px-3 py-1 text-indigo-700 hover:bg-indigo-100 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2 12s3-3 5-3 5 3 7.5 3 5-3 7.5-3 5 3 5 3" />
                      </svg>
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;