import axios from "axios";

const API = axios.create({ baseURL: "https://jsonplaceholder.typicode.com" });

export const fetchAlbums = () => API.get("/albums");
export const fetchAlbumById = (id) => API.get(`/albums/${id}`);
export const fetchPhotosByAlbumId = (albumId) => API.get(`/albums/${albumId}/photos`);
export const fetchUsers = () => API.get("/users");
export const fetchUserById = (id) => API.get(`/users/${id}`);
export const fetchAlbumsByUserId = (userId) => API.get(`/users/${userId}/albums`);

export const getAvatar = (name) => `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`;