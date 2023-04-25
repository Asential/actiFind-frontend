import axios from 'axios';

const API = axios.create({baseURL: "http://localhost:5000"});

// Adds the token to each request.
API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }

    return req;
})
export const fetchPost = (id) => API.get(`/posts/${id}`);
export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);
// export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'} &tags=${searchQuery.tags}`);

// NEVER MODIFY THE F***ING QUERIES IN THE URL. SINGLE GODDAMN SPACE MADE ME WASTE 3 HOURS F*** THIS
export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);

export const login = (formData) => API.post('/user/login', formData);
export const register = (formData) => API.post('/user/register', formData);

