import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { fetchAlbums, fetchUsers, getAvatar } from "../api";
import Loading from "./Loading";

const AlbumList = () => {
  const [albums, setAlbums] = useState([]);
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page") || "1");
  const perPage = parseInt(searchParams.get("perPage") || "10");

  const perPageOptions = [10, 20, 50, 100];
  useEffect(() => {
    const currentParams = {};

    if (isNaN(page) || page < 1) {
      currentParams.page = "1";
    } else {
      currentParams.page = page.toString();
    }

    if (isNaN(perPage) || !perPageOptions.includes(perPage)) {
      currentParams.perPage = "10";
    } else {
      currentParams.perPage = perPage.toString();
    }

    if (
      currentParams.page !== searchParams.get("page") ||
      currentParams.perPage !== searchParams.get("perPage")
    ) {
      setSearchParams(currentParams);
    }
  }, [page, perPage, perPageOptions, searchParams, setSearchParams]);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [albumRes, userRes] = await Promise.all([
          fetchAlbums(),
          fetchUsers(),
        ]);
        setAlbums(albumRes.data);
        setUsers(
          userRes.data.reduce((acc, user) => ({ ...acc, [user.id]: user }), {})
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) return <Loading />;
  const paginatedAlbums = albums.slice(
    (page - 1) * perPage,
    page * perPage
  );
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        {/* Hiển thị thứ tự album từ mấy đến mấy */}
        <div className="text-sm text-gray-600">
          Showing {(page - 1) * perPage + 1} to {Math.min(page * perPage, albums.length)} of {albums.length} albums
        </div>
        <div className="flex items-center space-x-2">
          <label htmlFor="perPage" className="text-gray-700">Show per page:</label>
          <select
            id="perPage"
            value={perPage}
            onChange={(e) => {
              setSearchParams({
                page: "1",
                perPage: e.target.value
              });
            }}
            className="border rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {perPageOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-700">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 font-medium text-gray-900">ID</th>
              <th className="px-4 py-3 font-medium text-gray-900">Title</th>
              <th className="px-4 py-3 font-medium text-gray-900">User</th>
              <th className="px-4 py-3 font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {paginatedAlbums.map((album) => (
              <tr key={album.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{album.id}</td>
                <td className="px-4 py-3">{album.title}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center">
                    <img
                      src={getAvatar(users[album.userId]?.name || "Unknown")}
                      alt={`Avatar of ${users[album.userId]?.name || "Unknown"}`}
                      className="w-10 h-10 rounded-full mr-3 border border-gray-200"
                    />
                    <Link
                      to={`/users/${album.userId}`}
                      className="text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
                    >
                      {users[album.userId]?.name || "Unknown"}
                    </Link>
                  </div>
                </td>
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
      <div className="flex flex-wrap justify-center items-center mt-6">
        {page > 1 && (
          <button
            onClick={() => setSearchParams({ page: page - 1, perPage: perPage.toString() })}
            className="px-4 py-2 mx-1 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        )}
        
        {/* Phân trang và bấm chuyển trang tiếp / trước */}
        {Array(Math.min(5, Math.ceil(albums.length / perPage)))
          .fill()
          .map((_, i) => {
            let pageNum;
            if (Math.ceil(albums.length / perPage) <= 5) {
              pageNum = i + 1;
            } else {
              const start = Math.max(1, Math.min(page - 2, Math.ceil(albums.length / perPage) - 4));
              pageNum = start + i;
            }
            
            return (
              <button
                key={pageNum}
                onClick={() => setSearchParams({ page: pageNum, perPage: perPage.toString() })}
                className={`px-4 py-2 mx-1 rounded-md ${
                  page === pageNum 
                    ? "bg-indigo-600 text-white" 
                    : "bg-white border border-gray-300 hover:bg-gray-50"
                } transition-colors`}
              >
                {pageNum}
              </button>
            );
          })}
          
        {page < Math.ceil(albums.length / perPage) && (
          <button
            onClick={() => setSearchParams({ page: page + 1, perPage: perPage.toString() })}
            className="px-4 py-2 mx-1 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default AlbumList;