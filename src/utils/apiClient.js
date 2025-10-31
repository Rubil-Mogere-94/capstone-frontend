import { auth } from '../firebase'; // Import Firebase auth instance
import { API_BASE_URL } from '../config';

const apiClient = async (endpoint, method = 'GET', body = null, token = null) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    // For DELETE requests or other methods that might not return a body
    if (response.status === 204) {
        return null;
    }

    return await response.json();
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};

// --- Authenticated API Client ---
// This will automatically include the Firebase auth token
const authApiClient = async (endpoint, method = 'GET', body = null) => {
    const user = auth.currentUser;
    if (!user) {
        throw new Error("User not authenticated");
    }
    const token = await user.getIdToken();
    return apiClient(endpoint, method, body, token);
}


// --- Forum API Calls ---

export const getPosts = () => {
    return apiClient('/api/forum/posts');
};

export const createPost = (postData) => {
    return authApiClient('/api/forum/posts', 'POST', postData);
};

export const deletePost = (postId) => {
    return authApiClient(`/api/forum/posts/${postId}`, 'DELETE');
};

export const getComments = (postId) => {
    return apiClient(`/api/forum/posts/${postId}/comments`);
};

export const createComment = (postId, commentData) => {
    return authApiClient(`/api/forum/posts/${postId}/comments`, 'POST', commentData);
};


export default apiClient;