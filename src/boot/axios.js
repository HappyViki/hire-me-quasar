import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:5000/'
})

export default ({ Vue }) => { Vue.prototype.$axios = axiosInstance }

export { axiosInstance }
