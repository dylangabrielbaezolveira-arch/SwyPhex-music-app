import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token a las requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('music_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('music_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  register: (userData: {
    username: string;
    email: string;
    password: string;
    displayName?: string;
  }) => api.post('/auth/register', userData),
};

export const songsAPI = {
  getSongs: (params?: {
    page?: number;
    limit?: number;
    genre?: string;
    search?: string;
    sortBy?: string;
    sortOrder?: string;
  }) => api.get('/songs', { params }),
  
  getSong: (id: string) => api.get(`/songs/${id}`),
  
  uploadSong: (songData: FormData) =>
    api.post('/songs', songData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  
  searchSongs: (query: string, limit?: number) =>
    api.get(`/songs/search/${query}`, { params: { limit } }),
};

export const playlistsAPI = {
  getPlaylists: () => api.get('/playlists'),
  
  getPlaylist: (id: string) => api.get(`/playlists/${id}`),
  
  createPlaylist: (playlistData: {
    name: string;
    description?: string;
    isPublic?: boolean;
  }) => api.post('/playlists', playlistData),
  
  updatePlaylist: (id: string, updates: any) =>
    api.put(`/playlists/${id}`, updates),
  
  addToPlaylist: (playlistId: string, songId: string) =>
    api.post(`/playlists/${playlistId}/songs`, { songId }),
  
  removeFromPlaylist: (playlistId: string, songId: string) =>
    api.delete(`/playlists/${playlistId}/songs/${songId}`),
};

export default api;
