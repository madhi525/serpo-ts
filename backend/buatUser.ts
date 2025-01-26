import express from 'express';
import { login, register } from './controllers/authControllers';
const router = express.Router();

const newUser = {
    username: "admin",
    password: "admin123",
    role: "admin"
  };

  // Simulasikan Request dan Response
const mockRequest = {
    body: newUser,
  } as any;
  
  const mockResponse = {
    status: (code: number) => ({
      json: (data: any) => console.log(`Status: ${code}, Response:`, data),
    }),
  } as any;
  
  // Panggil fungsi register secara langsung
  register(mockRequest, mockResponse);