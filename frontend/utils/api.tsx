import axios from 'axios';

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

export const dataRaker = axios.create({
  baseURL: 'http://localhost:4000/data/raker', // Backend API URL
  timeout: 10000,
  headers: {'Content-Type' : 'application/json'}
});