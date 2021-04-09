const dev = 'http://127.0.0.1:8000/api/'
const pro = 'http://127.0.0.1:8000/api/'
export const baseURL = process.env.NODE_ENV === 'development' ? dev : pro
