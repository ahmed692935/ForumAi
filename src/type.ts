// User types
export interface User {
  id: number;
  tenant_id: number;
  email: string;
  role: string;
  created_at: string;
}

// Register types
export interface RegisterPayload {
  tenant_id: number;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

// Login types
export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  access_token: string;
  user: User;
}

// Auth context types
export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Document types
export interface Document {
  id: number;
  filename: string;
  file_size: number;
  upload_date: string;
  tenant_id: number;
  status?: string;
}

export interface DocumentsResponse {
  documents: Document[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

export interface UploadDocumentResponse {
  message: string;
  document: Document;
}

// Chat types
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}
