import axios from 'axios';

const API_URL_BASE = process.env.VUE_APP_API_URL_BASE;
const API_URL = `${API_URL_BASE}/api/licitacoes`; 

export const fetchLicitacoes = (page = 1, size = 10) => {
  console.log(process.env.VUE_APP_API_URL_BASE)

  return axios.get(API_URL, {
    params: {
      page,
      size
    }
  });
};
