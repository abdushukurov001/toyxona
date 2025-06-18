// src/services.ts
import axios from 'axios';

const APIURL = 'https://abdumannof.anonymous.uz/'; // /uz/ ni komponentlarda qo‘shish kerak emas

const client = axios.create({
  baseURL: APIURL,
  withCredentials: true, // CSRF va cookie uchun
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  const isLogin = config.url?.includes('/auth/login/');
  const csrfToken = document.cookie.match(/csrftoken=([^;]+)/)?.[1];

  // /uz/ prefiksini qo‘shish
  if (!config.url?.startsWith('/uz/') && config.url?.startsWith('/api/v1/')) {
    config.url = `/uz${config.url}`;
  }

  // Token qo‘shish
  if (token && !isLogin && !config.url?.includes('/uz/api/v1/web/')) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // CSRF tokenini qo‘shish
  if (csrfToken && ['post', 'put', 'patch', 'delete'].includes(config.method?.toLowerCase() || '')) {
    config.headers['X-CSRFToken'] = csrfToken;
  }

  // FormData bo‘lsa, Content-Type o‘rnatilmaydi (browser o‘zi multipart/form-data qiladi)
  if (!(config.data instanceof FormData)) {
    config.headers['Content-Type'] = 'application/json';
  }

  console.log('So‘rov:', {
    url: config.url,
    method: config.method,
    headers: config.headers,
    data: config.data,
  });
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API xatosi:', {
      status: error.response?.status,
      data: error.response?.data,
      config: error.config,
    });
    if (error.response?.status === 401) {
      console.warn('Token noto‘g‘ri yoki muddati tugagan');
      if (!localStorage.getItem('access_token')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// CSRF tokenini olish uchun funksiya
export const getCsrfToken = async () => {
  try {
    await client.get('/api/get-csrf-token/');
  } catch (error) {
    console.error('CSRF token olishda xatolik:', error);
  }
};

export default client;