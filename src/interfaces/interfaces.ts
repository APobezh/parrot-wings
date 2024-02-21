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
  id: number;
  firstName: string;
  lastName: string;
  email: string;
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
