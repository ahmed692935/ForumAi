import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import {
  Send,
  Loader2,
  User,
  Bot,
  Copy,
  Check,
  Trash2,
  RefreshCw,
  MessageSquarePlus,
  History,
  X,
  Clock,
  Menu,
} from "lucide-react";
import { toast } from "react-toastify";
import {
  sendChatMessage,
  getConversationHistory,
  createConversation,
  getConversationMessages,
} from "../api/api";
import Navbar from "../components/Navbar";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isLoading?: boolean;
}

interface Conversation {
  id: number;
  created_at: string;
  first_message?: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<
    number | null
  >(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [isLoadingHistory, setIsLoadingHistory] = useState<boolean>(false);
  const [isLoadingMessages, setIsLoadingMessages] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Preprocess markdown to fix formatting issues
  const preprocessMarkdown = (text: string): string => {
    let processed = text;
    processed = processed.replace(/(\d+)\.\s+([^:\n]+):/g, "\n\n## $2\n\n");
    processed = processed.replace(/([a-z])-\s+/gi, "$1\n- ");
    processed = processed.replace(/([.!?:])\s*-\s+/g, "$1\n- ");
    processed = processed.replace(
      /\n-\s+([^\n]+?)\n\s+-\s+/g,
      "\n\n## $1\n\n- ",
    );
    processed = processed.replace(/\n\s{2,}-\s+/g, "\n  - ");
    processed = processed.replace(/([.!?])\s*(\d+)\.\s+/g, "$1\n$2. ");
    processed = processed.replace(/([.!?])\s*\*\s+/g, "$1\n* ");
    processed = processed.replace(/\.([A-Z][a-z])/g, ".\n\n$1");
    processed = processed.replace(/([^\n])(#{1,6}\s)/g, "$1\n\n$2");
    processed = processed.replace(/\n{3,}/g, "\n\n");
    processed = processed.trim();
    return processed;
  };

  // Fetch conversation history
  const fetchConversationHistory = async () => {
    setIsLoadingHistory(true);
    try {
      const response = await getConversationHistory();
      const conversationsData = response.conversations || [];
      setConversations(conversationsData);
    } catch (error: any) {
      console.error("Failed to fetch conversation history:", error);
      toast.error("Failed to load conversation history", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoadingHistory(false);
    }
  };

  // Create a new conversation on mount
  const initializeConversation = async () => {
    try {
      const response = await createConversation();
      const conversationId = response.id;

      setCurrentConversationId(conversationId);
      fetchConversationHistory();

      console.log("New conversation created:", conversationId);
    } catch (error) {
      console.error("Failed to create conversation:", error);
    }
  };

  // Load messages for a specific conversation
  const loadConversationMessages = async (conversationId: number) => {
    setIsLoadingMessages(true);
    try {
      const response = await getConversationMessages(conversationId);
      const messagesData = response.messages || [];

      // Transform API messages to ChatMessage format
      const transformedMessages: ChatMessage[] = messagesData.map(
        (msg: any, index: number) => ({
          id: `${conversationId}-${index}`,
          role: msg.role === "user" ? "user" : "assistant",
          content: msg.content,
          timestamp: msg.timestamp
            ? new Date(msg.timestamp)
            : new Date(msg.created_at || Date.now()),
        }),
      );

      setMessages(transformedMessages);
      setCurrentConversationId(conversationId);

      toast.success("Conversation loaded", {
        position: "top-right",
        autoClose: 1500,
      });
    } catch (error: any) {
      console.error("Failed to load conversation messages:", error);
      toast.error("Failed to load conversation messages", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoadingMessages(false);
    }
  };
  const hasInitialized = useRef(false);
  useEffect(() => {
    if (hasInitialized.current) return;

    hasInitialized.current = true;

    initializeConversation();
    fetchConversationHistory();
  }, []);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [input]);

  const handleNewConversation = async () => {
    setMessages([]);
    setInput("");

    // Create new conversation
    try {
      const response = await createConversation();
      // const conversationId = response.conversation_id;
      // setCurrentConversationId(conversationId);
      setCurrentConversationId(response.id);

      // Refresh conversation history
      fetchConversationHistory();

      toast.success("New chatroom created", {
        position: "top-right",
        autoClose: 1500,
      });
    } catch (error: any) {
      console.error("Failed to create conversation:", error);
      toast.error("Failed to create new conversation", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleSelectConversation = (conversationId: number) => {
    loadConversationMessages(conversationId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    const assistantMessageId = (Date.now() + 1).toString();
    const assistantMessage: ChatMessage = {
      id: assistantMessageId,
      role: "assistant",
      content: "",
      timestamp: new Date(),
      isLoading: true,
    };

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
    setInput("");
    setIsLoading(true);

    try {
      if (!currentConversationId) {
        toast.error("Conversation not initialized yet");
        setIsLoading(false);
        return;
      }

      const response = await sendChatMessage(
        userMessage.content,
        currentConversationId,
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP Error: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let buffer = "";
        let hasReceivedData = false;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;

          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data.trim() === "" || data.trim() === "[DONE]") continue;

              if (!hasReceivedData) {
                hasReceivedData = true;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMessageId
                      ? { ...msg, isLoading: false }
                      : msg,
                  ),
                );
              }

              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantMessageId
                    ? { ...msg, content: msg.content + data }
                    : msg,
                ),
              );
            } else if (line.trim() !== "") {
              if (!hasReceivedData) {
                hasReceivedData = true;
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === assistantMessageId
                      ? { ...msg, isLoading: false }
                      : msg,
                  ),
                );
              }

              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantMessageId
                    ? { ...msg, content: msg.content + line }
                    : msg,
                ),
              );
            }
          }
        }

        if (buffer.trim()) {
          if (buffer.startsWith("data: ")) {
            const data = buffer.slice(6);
            if (data.trim() && data.trim() !== "[DONE]") {
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantMessageId
                    ? { ...msg, content: msg.content + data, isLoading: false }
                    : msg,
                ),
              );
            }
          } else {
            setMessages((prev) =>
              prev.map((msg) =>
                msg.id === assistantMessageId
                  ? { ...msg, content: msg.content + buffer, isLoading: false }
                  : msg,
              ),
            );
          }
        }

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId ? { ...msg, isLoading: false } : msg,
          ),
        );
      }

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId && !msg.content.trim()
            ? {
                ...msg,
                content:
                  "I received your message but couldn't generate a response. Please try again.",
                isLoading: false,
              }
            : msg,
        ),
      );

      // Refresh conversation history after sending a message
      // fetchConversationHistory();
    } catch (error: any) {
      console.error("Chat error:", error);
      toast.error(error?.message || "Failed to send message", {
        position: "top-right",
        autoClose: 3000,
      });

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? {
                ...msg,
                content: "Sorry, I encountered an error. Please try again.",
                isLoading: false,
              }
            : msg,
        ),
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleCopy = async (content: string, messageId: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(messageId);
      toast.success("Copied to clipboard!", {
        position: "top-right",
        autoClose: 1500,
      });
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error("Failed to copy", {
        position: "top-right",
        autoClose: 1500,
      });
    }
  };

  const handleClearChat = () => {
    if (messages.length === 0) return;

    if (
      window.confirm(
        "Are you sure you want to clear all messages? This cannot be undone.",
      )
    ) {
      setMessages([]);
      toast.success("Chat cleared", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const handleRetry = () => {
    if (messages.length < 2) return;

    const lastUserMessage = [...messages]
      .reverse()
      .find((msg) => msg.role === "user");

    if (lastUserMessage) {
      setInput(lastUserMessage.content);
      textareaRef.current?.focus();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) return "Today";
    if (days === 1) return "Yesterday";
    if (days < 7) return `${days} days ago`;

    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
    }).format(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <div className="max-w-[1800px] mx-auto px-4 pt-22 pb-8">
        <div className="flex gap-4 h-[calc(100vh-120px)]">
          {/* Sidebar - Conversation History */}
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 320, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col"
              >
                {/* Sidebar Header */}
                <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-emerald-500 to-emerald-600">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2 text-white">
                      <History className="w-5 h-5" />
                      <h2 className="font-bold text-lg">Chat History</h2>
                    </div>
                    <button
                      onClick={() => setIsSidebarOpen(false)}
                      className="p-1 hover:bg-white/20 rounded-lg transition-colors lg:hidden"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                  <button
                    onClick={handleNewConversation}
                    className="w-full px-4 py-2.5 bg-white text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquarePlus className="w-5 h-5" />
                    New Chat
                  </button>
                </div>

                {/* Conversations List */}
                <div className="flex-1 overflow-y-auto p-3 space-y-2">
                  {isLoadingHistory ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="w-6 h-6 text-emerald-600 animate-spin" />
                    </div>
                  ) : conversations.length === 0 ? (
                    <div className="text-center py-8 px-4">
                      <History className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                      <p className="text-sm text-gray-600">
                        No chat history yet
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        Start chatting to create your first chat
                      </p>
                    </div>
                  ) : (
                    conversations.map((conv) => (
                      <motion.button
                        key={conv.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelectConversation(conv.id)}
                        className={`w-full p-3 rounded-xl text-left transition-colors ${
                          currentConversationId === conv.id
                            ? "bg-emerald-50 border-2 border-emerald-500"
                            : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                              {conv.first_message || `Conversation ${conv.id}`}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-gray-500">
                          <Clock className="w-3 h-3" />
                          {formatDate(conv.created_at)}
                        </div>
                      </motion.button>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                {!isSidebarOpen && (
                  <button
                    onClick={() => setIsSidebarOpen(true)}
                    className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                    title="Show history"
                  >
                    <Menu className="w-6 h-6" />
                  </button>
                )}
              </div>

              {/* Action Buttons */}
              {messages.length > 0 && (
                <div className="flex gap-2">
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={handleRetry}
                    disabled={isLoading}
                    className="p-2 text-gray-600 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors disabled:opacity-50"
                    title="Retry last message"
                  >
                    <RefreshCw className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={handleClearChat}
                    disabled={isLoading}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    title="Clear chat"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </div>
              )}
            </motion.div>

            {/* Chat Container */}
            <div className="flex-1 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden flex flex-col">
              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {isLoadingMessages ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
                      <p className="text-gray-600 font-medium">
                        Loading conversation...
                      </p>
                    </div>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center space-y-4">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 10,
                        }}
                        className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/50"
                      >
                        <Bot className="w-10 h-10 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          Start a chat
                        </h3>
                        <p className="text-gray-600 text-sm max-w-md mx-auto">
                          Ask me anything about your documents, data, or
                          business insights.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className={`flex gap-4 ${
                          message.role === "user"
                            ? "flex-row-reverse"
                            : "flex-row"
                        }`}
                      >
                        {/* Avatar */}
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.1 }}
                          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-md ${
                            message.role === "user"
                              ? "bg-gradient-to-br from-gray-600 to-gray-800"
                              : "bg-gradient-to-br from-emerald-400 to-emerald-600"
                          }`}
                        >
                          {message.role === "user" ? (
                            <User className="w-5 h-5 text-white" />
                          ) : (
                            <Bot className="w-5 h-5 text-white" />
                          )}
                        </motion.div>

                        {/* Message Content */}
                        <div
                          className={`flex-1 max-w-[80%] ${
                            message.role === "user" ? "text-right" : "text-left"
                          }`}
                        >
                          <div
                            className={`inline-block px-6 py-4 rounded-2xl relative group ${
                              message.role === "user"
                                ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-tr-none shadow-lg shadow-emerald-500/30"
                                : "bg-gray-100 text-gray-900 rounded-tl-none shadow-md"
                            }`}
                          >
                            {message.isLoading ? (
                              <div className="flex items-center gap-3">
                                <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
                                <span className="text-gray-600 text-sm">
                                  Thinking...
                                </span>
                              </div>
                            ) : (
                              <>
                                {message.role === "user" ? (
                                  <p className="whitespace-pre-wrap break-words">
                                    {message.content}
                                  </p>
                                ) : (
                                  <div className="prose prose-sm max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-p:my-3 prose-p:leading-relaxed prose-ul:my-3 prose-ul:space-y-2 prose-ol:my-3 prose-ol:space-y-2 prose-li:my-0 prose-li:leading-relaxed prose-pre:my-3 prose-pre:bg-gray-900 prose-code:text-emerald-600 prose-code:bg-emerald-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-medium prose-a:text-emerald-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-strong:font-bold prose-em:text-gray-700 prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:pl-4 prose-blockquote:italic">
                                    <ReactMarkdown
                                      components={{
                                        code({
                                          inline,
                                          className,
                                          children,
                                          ...props
                                        }: any) {
                                          const match = /language-(\w+)/.exec(
                                            className || "",
                                          );
                                          return !inline && match ? (
                                            <SyntaxHighlighter
                                              style={vscDarkPlus}
                                              language={match[1]}
                                              PreTag="div"
                                              className="rounded-lg my-3 text-sm"
                                              customStyle={{
                                                margin: "12px 0",
                                                padding: "16px",
                                                fontSize: "14px",
                                                lineHeight: "1.6",
                                              }}
                                              {...props}
                                            >
                                              {String(children).replace(
                                                /\n$/,
                                                "",
                                              )}
                                            </SyntaxHighlighter>
                                          ) : (
                                            <code
                                              className={className}
                                              {...props}
                                            >
                                              {children}
                                            </code>
                                          );
                                        },
                                        ul({ children }) {
                                          return (
                                            <ul className="list-disc list-outside ml-4 space-y-2 my-3">
                                              {children}
                                            </ul>
                                          );
                                        },
                                        ol({ children }) {
                                          return (
                                            <ol className="list-decimal list-outside ml-4 space-y-2 my-3">
                                              {children}
                                            </ol>
                                          );
                                        },
                                        li({ children }) {
                                          return (
                                            <li className="leading-relaxed text-gray-800">
                                              {children}
                                            </li>
                                          );
                                        },
                                        p({ children }) {
                                          return (
                                            <p className="my-2 leading-relaxed text-gray-800">
                                              {children}
                                            </p>
                                          );
                                        },
                                        h1({ children }) {
                                          return (
                                            <h1 className="text-xl font-bold text-gray-900 mt-4 mb-2">
                                              {children}
                                            </h1>
                                          );
                                        },
                                        h2({ children }) {
                                          return (
                                            <h2 className="text-lg font-bold text-gray-900 mt-3 mb-2">
                                              {children}
                                            </h2>
                                          );
                                        },
                                        h3({ children }) {
                                          return (
                                            <h3 className="text-base font-bold text-gray-900 mt-3 mb-1">
                                              {children}
                                            </h3>
                                          );
                                        },
                                        a({ href, children }) {
                                          return (
                                            <a
                                              href={href}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="text-emerald-600 hover:underline font-medium"
                                            >
                                              {children}
                                            </a>
                                          );
                                        },
                                        blockquote({ children }) {
                                          return (
                                            <blockquote className="border-l-4 border-emerald-500 pl-4 italic text-gray-700 my-3">
                                              {children}
                                            </blockquote>
                                          );
                                        },
                                      }}
                                    >
                                      {preprocessMarkdown(message.content)}
                                    </ReactMarkdown>
                                  </div>
                                )}

                                {/* Copy button for assistant messages */}
                                {message.role === "assistant" &&
                                  message.content && (
                                    <button
                                      onClick={() =>
                                        handleCopy(message.content, message.id)
                                      }
                                      className="absolute top-2 right-2 p-1.5 bg-white/80 hover:bg-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                                      title="Copy message"
                                    >
                                      {copiedId === message.id ? (
                                        <Check className="w-4 h-4 text-emerald-600" />
                                      ) : (
                                        <Copy className="w-4 h-4 text-gray-600" />
                                      )}
                                    </button>
                                  )}
                              </>
                            )}
                          </div>
                          <div className="text-xs text-gray-500 mt-1 px-2">
                            {message.timestamp.toLocaleTimeString()}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-200 p-4 bg-gray-50">
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <div className="flex-1 relative">
                    <textarea
                      ref={textareaRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type your message..."
                      disabled={isLoading}
                      rows={1}
                      className="w-full px-4 py-3 pr-12 bg-white border border-gray-300 rounded-xl resize-none focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed max-h-32 transition-all"
                    />
                  </div>
                  <motion.button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span className="font-semibold">Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span className="font-semibold">Send</span>
                      </>
                    )}
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
