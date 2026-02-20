import type { LoginPayload, LoginResponse, RegisterPayload } from "../type";
import api from "./axios";

export const registerUser = async (payload: RegisterPayload) => {
  const response = await api.post("/register", payload);
  return response.data;
};

export const loginUser = async (
  payload: LoginPayload,
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>("/login", payload);
  return response.data;
};

// Upload document (Admin only)
export const uploadDocument = async (file: File): Promise<any> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post("/documents/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// Get documents list with pagination
export const getDocuments = async (
  page: number = 1,
  perPage: number = 10,
): Promise<any> => {
  const response = await api.get(`/documents?page=${page}&per_page=${perPage}`);
  return response.data;
};

// Delete document
export const deleteDocument = async (documentId: number): Promise<void> => {
  await api.delete(`/documents/${documentId}`);
};

// Chat stream (User)
export const sendChatMessage = async (
  question: string,
  conversationId: number,
  model: string,
): Promise<Response> => {
  const token = localStorage.getItem("token");

  // Use URLSearchParams for application/x-www-form-urlencoded
  const params = new URLSearchParams();
  params.append("question", question);
  params.append("conversation_id", conversationId.toString());
  params.append("model", model);

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/chat/stream`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });

  return response;
};

// Get all users (Admin only)
export const getAllUsers = async (): Promise<any> => {
  const response = await api.get("/admin/users");
  return response.data;
};

export const deleteUser = async (userId: number): Promise<void> => {
  await api.delete(`/admin/users/${userId}`);
};

// Get conversation history
export const getConversationHistory = async (): Promise<any> => {
  const response = await api.get("/conversations");
  return response.data;
};

// Create new conversation
export const createConversation = async (): Promise<any> => {
  const response = await api.post("/conversations");
  return response.data;
};

// Get messages for a specific conversation
export const getConversationMessages = async (
  conversationId: number,
): Promise<any> => {
  const response = await api.get(`/conversations/${conversationId}/messages`);
  return response.data;
};

// Get RAG prompt (Admin only)
export const getRagPrompt = async (): Promise<any> => {
  const response = await api.get("/admin/rag-prompt");
  return response.data;
};

// Update RAG prompt (Admin only)
export const updateRagPrompt = async (prompt: string): Promise<any> => {
  const response = await api.put("/admin/rag-prompt", { prompt_body: prompt });
  return response.data;
};

// Delete conversation
export const deleteConversation = async (
  conversationId: number,
): Promise<void> => {
  await api.delete(`/conversations/${conversationId}`);
};
