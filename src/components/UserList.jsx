import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchUsers, getAvatar } from "../api";
import Loading from "./Loading";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await fetchUsers();
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
      setLoading(false);
    };
    loadData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-700">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="px-4 py-3 font-medium text-gray-900">ID</th>
              <th className="px-4 py-3 font-medium text-gray-900">Avatar</th>
              <th className="px-4 py-3 font-medium text-gray-900">Name</th>
              <th className="px-4 py-3 font-medium text-gray-900">Email</th>
              <th className="px-4 py-3 font-medium text-gray-900">Phone</th>
              <th className="px-4 py-3 font-medium text-gray-900">Website</th>
              <th className="px-4 py-3 font-medium text-gray-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{user.id}</td>
                <td className="px-4 py-3">
                  <img
                    src={getAvatar(user.name)}
                    alt={`Avatar of ${user.name}`}
                    className="w-10 h-10 rounded-full border border-gray-200"
                  />
                </td>
                <td className="px-4 py-3">
                  <Link
                    to={`/users/${user.id}`}
                    className="text-indigo-600 hover:text-indigo-800 font-medium cursor-pointer"
                  >
                    {user.name}
                  </Link>
                </td>
                <td className="px-4 py-3">
                  <a
                    href={`mailto:${user.email}`}
                    className="text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  >
                    {user.email}
                  </a>
                </td>
                <td className="px-4 py-3">
                  <a
                    href={`tel:${user.phone}`}
                    className="text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  >
                    {user.phone}
                  </a>
                </td>
                <td className="px-4 py-3">
                  <a
                    href={`https://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-600 hover:text-indigo-800 cursor-pointer"
                  >
                    {user.website}
                  </a>
                </td>
                <td className="px-4 py-3">
                  <Link
                    to={`/users/${user.id}`}
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
  );
};

export default UserList;