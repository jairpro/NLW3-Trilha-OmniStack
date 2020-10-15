import axios from 'axios'

const api = axios.create({

  // TODO: descobrir por que neste ponto process é undefined
  //baseURL: process.env.API_URL

  baseURL: 'http://localhost:3333'
})

export default api
