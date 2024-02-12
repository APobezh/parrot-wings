import axios from "axios";

const mockApiUrl = "http://localhost:3001/api"; // Temporary solution
const apiUrl = "https://localhost:5001/api";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
}

export interface UserDataResponse {
  firstName: string;
  balance: number;
}

export interface TransactionRequest {
  amount: number;
  recipientEmail: string;
}

export interface TopUpTransactionRequest {
  amount: number;
  incomeSource: string;
}

export interface TransactionResponse {
  transactionStatus: string;
  transactionMessage: string;
  newBalance: number;
}

export interface Transaction {
  id: number;
  date: string;
  amount: number;
  sender: string;
  receiver: string;
}

export interface TransactionHistoryRequest {
  page: number;
  recordsPerPage: number;
}

export interface TransactionHistoryResponse {
  transactions: Transaction[];
  totalPages: number;
}

// TODO: Update after UserController refactoring - add body
export const fetchUserData = async (): Promise<UserDataResponse> => {
  try {
    const response = await axios.get(`${mockApiUrl}/User`);
    return response.data;
  } catch (error: any) {
    throw new Error(`Error fetching user data: ${error.message}`);
  }
};

// TODO #1: Send encrypted user password after DB schema fix
export const loginUser = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${mockApiUrl}/Login`, credentials);

    if (response.status === 200) {
      return { message: response.data.message };
    } else {
      throw new Error("Authentication failed. Please check your credentials.");
    }
  } catch (error) {
    throw new Error("Authentication failed. Please try again later.");
  }
};

// TODO #1: Send encrypted user password after DB schema fix
export const registerUser = async (
  credentials: RegisterRequest
): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${mockApiUrl}/Register`, credentials);

    if (response.status === 200) {
      return { message: response.data.message };
    } else {
      throw new Error("Registration or authentication failed. Please check your credentials.");
    }
  } catch (error) {
    throw new Error("Registration or authentication failed. Please try again later.");
  }
};

export const fetchTransactionHistory = async (
  request: TransactionHistoryRequest
): Promise<TransactionHistoryResponse> => {
  try {
    const response = await axios.post(
      `${mockApiUrl}/Transactions/History`,
      request
    );
    return response.data;
  } catch (error: any) {
    throw new Error(`Error fetching transaction history data: ${error.message}`);
  }
};

export const sendMoney = async (
  data: TransactionRequest
): Promise<TransactionResponse> => {
  try {
    const response = await axios.post(
      `${mockApiUrl}/Transaction/SendMoney`,
      data
    );
    return response.data;
  } catch (error: any) {
    throw new Error(`Error sending money: ${error.message}`);
  }
};

export const topUpMoney = async (
  data: TopUpTransactionRequest
): Promise<TransactionResponse> => {
  try {
    const response = await axios.post(
      `${mockApiUrl}/Transaction/TopUpMoney`,
      data
    );
    return response.data;
  } catch (error: any) {
    throw new Error(`Error top up money: ${error.message}`);
  }
};
