import axios from 'axios';
import { Notify } from 'quasar'; // Импортируем компонент Notify из Quasar

// Создаем экземпляр Axios
const instance = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL, // Замените на адрес вашего бэкенда
    timeout: 10000, // Установите таймаут
    withCredentials: true // Разрешить передачу куки и заголовков авторизации в запросах
});


// Добавляем интерцептор для всех запросов
instance.interceptors.request.use(config => {
    config.headers['Content-Type'] = 'application/json;charset=utf-8'
    config.headers['Access-Control-Allow-Origin'] = '*';
    // Notify.create({
    //     spinner: true,
    //     color: 'positive',
    //     position: 'center',
    //     message: '',
    //     timeout: 2000
    // });
    return config;
}, error => {
    return Promise.reject(error);
});


// Перехватчик для обработки успешных ответов


// Экспортируем созданный экземпляр Axios
export default instance;