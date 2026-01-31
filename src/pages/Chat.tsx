// import React, { useState, useRef, useEffect } from "react";
// import { motion } from "framer-motion";
// import { Send, Loader2, User, Bot } from "lucide-react";
// import { toast } from "react-toastify";
// import { sendChatMessage } from "../api/api";
// import Navbar from "../components/Navbar";

// interface ChatMessage {
//   id: string;
//   role: "user" | "assistant";
//   content: string;
//   timestamp: Date;
// }

// const Chat: React.FC = () => {
//   const [messages, setMessages] = useState<ChatMessage[]>([]);
//   const [input, setInput] = useState<string>("");
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const textareaRef = useRef<HTMLTextAreaElement>(null);

//   // Auto-scroll to bottom when new messages arrive
//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   // Auto-resize textarea
//   useEffect(() => {
//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//       textareaRef.current.style.height =
//         textareaRef.current.scrollHeight + "px";
//     }
//   }, [input]);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!input.trim() || isLoading) return;

//     const userMessage: ChatMessage = {
//       id: Date.now().toString(),
//       role: "user",
//       content: input.trim(),
//       timestamp: new Date(),
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setIsLoading(true);

//     try {
//       const response = await sendChatMessage(userMessage.content);

//       if (!response.ok) {
//         throw new Error("Failed to get response");
//       }

//       // Handle streaming response
//       const reader = response.body?.getReader();
//       const decoder = new TextDecoder();
//       const assistantMessage: ChatMessage = {
//         id: (Date.now() + 1).toString(),
//         role: "assistant",
//         content: "",
//         timestamp: new Date(),
//       };

//       setMessages((prev) => [...prev, assistantMessage]);

//       if (reader) {
//         while (true) {
//           const { done, value } = await reader.read();
//           if (done) break;

//           const chunk = decoder.decode(value);
//           assistantMessage.content += chunk;

//           // Update the last message with streamed content
//           setMessages((prev) => {
//             const newMessages = [...prev];
//             newMessages[newMessages.length - 1] = { ...assistantMessage };
//             return newMessages;
//           });
//         }
//       }
//     } catch (error: any) {
//       console.error("Chat error:", error);
//       toast.error(error?.message || "Failed to send message", {
//         position: "top-right",
//         autoClose: 3000,
//       });

//       // Add error message
//       const errorMessage: ChatMessage = {
//         id: (Date.now() + 1).toString(),
//         role: "assistant",
//         content: "Sorry, I encountered an error. Please try again.",
//         timestamp: new Date(),
//       };
//       setMessages((prev) => [...prev, errorMessage]);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit(e);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       <Navbar />

//       <div className="max-w-5xl mx-auto px-4 pt-24 pb-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center mb-8"
//         >
//           <h1 className="text-4xl font-black text-gray-900 mb-2">
//             Chat with{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-600">
//               FORUM AI
//             </span>
//           </h1>
//           <p className="text-gray-600">
//             Ask questions about your documents and data
//           </p>
//         </motion.div>

//         {/* Chat Container */}
//         <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
//           {/* Messages Area */}
//           <div className="h-[600px] overflow-y-auto p-6 space-y-6">
//             {messages.length === 0 ? (
//               <div className="h-full flex items-center justify-center">
//                 <div className="text-center space-y-4">
//                   <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
//                     <Bot className="w-10 h-10 text-white" />
//                   </div>
//                   <div>
//                     <h3 className="text-xl font-bold text-gray-900 mb-2">
//                       Start a conversation
//                     </h3>
//                     <p className="text-gray-600 text-sm max-w-md mx-auto">
//                       Ask me anything about your documents, data, or business
//                       insights.
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ) : (
//               messages.map((message) => (
//                 <motion.div
//                   key={message.id}
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className={`flex gap-4 ${
//                     message.role === "user" ? "flex-row-reverse" : "flex-row"
//                   }`}
//                 >
//                   {/* Avatar */}
//                   <div
//                     className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
//                       message.role === "user"
//                         ? "bg-gradient-to-br from-gray-600 to-gray-800"
//                         : "bg-gradient-to-br from-emerald-400 to-emerald-600"
//                     }`}
//                   >
//                     {message.role === "user" ? (
//                       <User className="w-5 h-5 text-white" />
//                     ) : (
//                       <Bot className="w-5 h-5 text-white" />
//                     )}
//                   </div>

//                   {/* Message Content */}
//                   <div
//                     className={`flex-1 max-w-[80%] ${
//                       message.role === "user" ? "text-right" : "text-left"
//                     }`}
//                   >
//                     <div
//                       className={`inline-block px-6 py-4 rounded-2xl ${
//                         message.role === "user"
//                           ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-tr-none"
//                           : "bg-gray-100 text-gray-900 rounded-tl-none"
//                       }`}
//                     >
//                       <p className="whitespace-pre-wrap break-words">
//                         {message.content}
//                       </p>
//                     </div>
//                     <div className="text-xs text-gray-500 mt-1 px-2">
//                       {message.timestamp.toLocaleTimeString()}
//                     </div>
//                   </div>
//                 </motion.div>
//               ))
//             )}

//             {/* Loading Indicator */}
//             {isLoading && (
//               <motion.div
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 className="flex gap-4"
//               >
//                 <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
//                   <Bot className="w-5 h-5 text-white" />
//                 </div>
//                 <div className="bg-gray-100 px-6 py-4 rounded-2xl rounded-tl-none">
//                   <Loader2 className="w-5 h-5 text-emerald-600 animate-spin" />
//                 </div>
//               </motion.div>
//             )}

//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input Area */}
//           <div className="border-t border-gray-200 p-4 bg-gray-50">
//             <form onSubmit={handleSubmit} className="flex gap-3">
//               <div className="flex-1 relative">
//                 <textarea
//                   ref={textareaRef}
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   onKeyDown={handleKeyDown}
//                   placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
//                   disabled={isLoading}
//                   rows={1}
//                   className="w-full px-4 py-3 pr-12 bg-white border border-gray-300 rounded-xl resize-none focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed max-h-32"
//                 />
//               </div>
//               <button
//                 type="submit"
//                 disabled={isLoading || !input.trim()}
//                 className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-xl hover:shadow-lg hover:shadow-emerald-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
//               >
//                 {isLoading ? (
//                   <Loader2 className="w-5 h-5 animate-spin" />
//                 ) : (
//                   <Send className="w-5 h-5" />
//                 )}
//                 <span className="font-semibold">Send</span>
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Chat;

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
} from "lucide-react";
import { toast } from "react-toastify";
import { sendChatMessage } from "../api/api";
import Navbar from "../components/Navbar";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isLoading?: boolean;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Preprocess markdown to fix formatting issues
  const preprocessMarkdown = (text: string): string => {
    let processed = text;

    // STEP 1: Convert numbered headings (e.g., "1. Architecture:")
    processed = processed.replace(/(\d+)\.\s+([^:\n]+):/g, "\n\n## $2\n\n");

    // STEP 2: Add line breaks before ALL dashes (including those with no preceding punctuation)
    // This catches both "text.- item" and "text- item"
    processed = processed.replace(/([a-z])-\s+/gi, "$1\n- ");
    processed = processed.replace(/([.!?:])\s*-\s+/g, "$1\n- ");

    // STEP 3: Detect parent-child structure
    // If a dash-item is followed by a space and another dash, the first is a parent (heading)
    // Pattern: "\n- Parent Text\n - Child" where child has 1+ spaces before dash
    processed = processed.replace(
      /\n-\s+([^\n]+?)\n\s+-\s+/g,
      "\n\n## $1\n\n- ",
    );

    // STEP 4: Keep sub-items indented properly
    // Items with leading spaces should remain as nested lists
    processed = processed.replace(/\n\s{2,}-\s+/g, "\n  - ");

    // STEP 5: Fix numbered lists
    processed = processed.replace(/([.!?])\s*(\d+)\.\s+/g, "$1\n$2. ");

    // STEP 6: Fix asterisk lists
    processed = processed.replace(/([.!?])\s*\*\s+/g, "$1\n* ");

    // STEP 7: Separate sentences (capital letter after period)
    processed = processed.replace(/\.([A-Z][a-z])/g, ".\n\n$1");

    // STEP 8: Ensure spacing before markdown headings
    processed = processed.replace(/([^\n])(#{1,6}\s)/g, "$1\n\n$2");

    // STEP 9: Clean up multiple line breaks (max 2)
    processed = processed.replace(/\n{3,}/g, "\n\n");

    // STEP 10: Trim whitespace
    processed = processed.trim();

    return processed;
  };

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    // Create assistant message with loading state
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
      const response = await sendChatMessage(userMessage.content);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || `HTTP Error: ${response.status}`);
      }

      // Handle streaming response
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let buffer = "";
        let hasReceivedData = false;

        while (true) {
          const { done, value } = await reader.read();

          if (done) break;

          // Decode the chunk
          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;

          // Process SSE data
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);

              if (data.trim() === "" || data.trim() === "[DONE]") {
                continue;
              }

              // First chunk - remove loading state
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

              // Append the data to assistant message
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

        // Process any remaining buffer
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

        // Ensure loading state is removed
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId ? { ...msg, isLoading: false } : msg,
          ),
        );
      }

      // If no content was received, show fallback
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
    } catch (error: any) {
      console.error("Chat error:", error);

      const errorMessage = error?.message || "Failed to send message";
      toast.error(errorMessage, {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 pt-24 pb-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="text-center flex-1">
            <h1 className="text-4xl font-black text-gray-900 mb-2">
              Chat with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-600">
                FORUM AI
              </span>
            </h1>
            <p className="text-gray-600">
              Ask questions about your documents and data
            </p>
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
        <div className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Messages Area */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-6">
            {messages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center space-y-4">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                    className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/50"
                  >
                    <Bot className="w-10 h-10 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Start a conversation
                    </h3>
                    <p className="text-gray-600 text-sm max-w-md mx-auto">
                      Ask me anything about your documents, data, or business
                      insights.
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
                      message.role === "user" ? "flex-row-reverse" : "flex-row"
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
                                          {String(children).replace(/\n$/, "")}
                                        </SyntaxHighlighter>
                                      ) : (
                                        <code className={className} {...props}>
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
  );
};

export default Chat;
