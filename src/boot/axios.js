import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: '/'
})

export default ({ Vue }) => { Vue.prototype.$axios = axiosInstance }

export { axiosInstance }
