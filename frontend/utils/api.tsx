import axios from 'axios';

const apiData = axios.create({
  baseURL: 'http://localhost:4000/data',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
})

export const getDataPmLink = async () => {
  try {
    const response = await apiData.get('/getallpmlink');
    return response.data;
  } catch (error) {
    console.error('Error fetching PM Link: ', error);
    throw error;
  }
}

export const getDataPmPOP = async () => {
  try {
    const response = await apiData.get('/getalldatapmpop');
    return response.data;
  } catch (error) {
    console.error('Error fetching PM Link: ', error);
    throw error;
  }
}

export const register = axios.create({
  baseURL: 'http://localhost:4000/auth/register', // Backend API URL
  timeout: 10000,
  headers: {'Content-Type' : 'application/json'}
});

export const login = axios.create({
  baseURL: 'http://localhost:4000/auth/login', // Backend API URL
  timeout: 10000,
  headers: {'Content-Type' : 'application/json'}
});
