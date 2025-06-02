import axios from "axios";

const APIURL = "http://127.0.0.1:8001/";

const client = axios.create({
  baseURL: APIURL,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true, // agar cookie ishlatilmasa, bu kerak emas
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // yoki `JWT ${token}` bo‘lishi mumkin
  }
  return config;
});

client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token noto‘g‘ri yoki muddati tugagan
      console.warn("Token noto‘g‘ri yoki muddati tugagan");
      // Faqat token yo‘q bo‘lsa yoki noto‘g‘ri bo‘lsa login sahifaga yuborish
      if (!localStorage.getItem("access_token")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default client;
