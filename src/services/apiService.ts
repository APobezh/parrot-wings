import axios from "axios";
import {
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  UserDataResponse,
  TransactionRequest,
  TopUpTransactionRequest,
  TransactionResponse,
  TransactionHistoryRequest,
  TransactionHistoryResponse,
} from "../interfaces/interfaces";

const baseURL = process.env.REACT_APP_API_MOCK_BASE_URL;

const api = axios.create({
  baseURL,
});

export const apiService = {
  // TODO: Send encrypted user password after DB schema fix
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>("/Login", credentials);
      return response.data;
    } catch (error) {
      throw new Error("Authentication failed. Please try again later.");
    }
  },
  // TODO: Send encrypted user password after DB schema fix
  register: async (credentials: RegisterRequest): Promise<LoginResponse> => {
    try {
      const response = await api.post<LoginResponse>("/Register", credentials);
      return response.data;
    } catch (error) {
      throw new Error("Registration or authentication failed. Please try again later.");
    }
  },
  // TODO: Update after UserController refactoring - add body
  fetchUserData: async (): Promise<UserDataResponse> => {
    try {
      const response = await api.get<UserDataResponse>("/User");
      return response.data;
    } catch (error) {
      throw new Error("Error fetching user data.");
    }
  },
  // TODO: Update after UserController refactoring - add body
  fetchUsersData: async (): Promise<UserDataResponse[]> => {
    try {
      const response = await api.get<UserDataResponse[]>("/Users");
      return response.data;
    } catch (error) {
      throw new Error("Error fetching user data.");
    }
  },
  fetchTransactionHistory: async (
    request: TransactionHistoryRequest
  ): Promise<TransactionHistoryResponse> => {
    try {
      const response = await api.post<TransactionHistoryResponse>("/Transactions/History", request);
      return response.data;
    } catch (error) {
      throw new Error("Error fetching transaction history data.");
    }
  },
  sendMoney: async (data: TransactionRequest): Promise<TransactionResponse> => {
    try {
      const response = await api.post<TransactionResponse>("/Transaction/SendMoney", data);
      return response.data;
    } catch (error) {
      throw new Error("Error sending money.");
    }
  },
  topUpMoney: async (data: TopUpTransactionRequest): Promise<TransactionResponse> => {
    try {
      const response = await api.post<TransactionResponse>("/Transaction/TopUpMoney", data);
      return response.data;
    } catch (error) {
      throw new Error("Error topping up money.");
    }
  },
};