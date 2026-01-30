import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Upload,
  FileText,
  CheckCircle,
  AlertCircle,
  Loader2,
  //   FolderOpen,
} from "lucide-react";
import { toast } from "react-toastify";
import { uploadDocument } from "../api/api";
import Navbar from "../components/Navbar";

const KnowledgeBase: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [dragActive, setDragActive] = useState<boolean>(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (selectedFile: File) => {
    // Validate file type (PDF or Word documents)
    const validTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!validTypes.includes(selectedFile.type)) {
      toast.error("Please upload only PDF or Word documents", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    // Validate file size (max 10MB)
    // const maxSize = 10 * 1024 * 1024; // 10MB
    // if (selectedFile.size > maxSize) {
    //   toast.error("File size must be less than 10MB", {
    //     position: "top-right",
    //     autoClose: 3000,
    //   });
    //   return;
    // }

    setFile(selectedFile);
  };

  const handleUpload = async (): Promise<void> => {
    if (!file) {
      toast.error("Please select a file first", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const response = await uploadDocument(file);

      clearInterval(progressInterval);
      setUploadProgress(100);

      // ✅ SHOW API SUCCESS MESSAGE
      toast.success(response?.message || "Document uploaded successfully!", {
        position: "top-right",
        autoClose: 3000,
      });

      setTimeout(() => {
        setFile(null);
        setUploadProgress(0);
      }, 1000);
    } catch (error: unknown) {
      let errorMessage = "Upload failed. Please try again.";

      if (typeof error === "object" && error !== null && "response" in error) {
        const err = error as {
          response?: { data?: { message?: string } };
        };
        errorMessage = err.response?.data?.message || errorMessage;
      }

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 4000,
      });

      setUploadProgress(0);
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes("pdf")) {
      return <FileText className="w-8 h-8 text-red-500" />;
    }
    return <FileText className="w-8 h-8 text-blue-500" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 pt-24 pb-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-black text-gray-900 mb-3">
            Knowledge Base{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-600">
              Management
            </span>
          </h1>
          <p className="text-gray-600 mb-6">Upload and manage your documents</p>

          {/* View Documents Button */}
          {/* <Link
            to="/documents"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
          >
            <FolderOpen className="w-5 h-5" />
            View All Documents
          </Link> */}
        </motion.div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8"
        >
          {/* Drag and Drop Area */}
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all ${
              dragActive
                ? "border-emerald-500 bg-emerald-50"
                : "border-gray-300 hover:border-emerald-400 hover:bg-gray-50"
            }`}
          >
            <input
              type="file"
              id="file-upload"
              className="hidden"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={(e) =>
                e.target.files && handleFileChange(e.target.files[0])
              }
              disabled={isUploading}
            />

            {!file ? (
              <div className="space-y-4">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <Upload className="w-10 h-10 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Upload Document
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Drag and drop your file here, or click to browse
                  </p>
                  <label
                    htmlFor="file-upload"
                    className="inline-block px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg cursor-pointer hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
                  >
                    Choose File
                  </label>
                </div>
                <p className="text-sm text-gray-500">
                  Supported formats: PDF, DOC, DOCX
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* File Preview */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="flex-shrink-0">{getFileIcon(file.type)}</div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                  {uploadProgress === 100 ? (
                    <CheckCircle className="w-6 h-6 text-emerald-500" />
                  ) : isUploading ? (
                    <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
                  ) : (
                    <button
                      onClick={() => setFile(null)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <AlertCircle className="w-6 h-6" />
                    </button>
                  )}
                </div>

                {/* Upload Progress */}
                {isUploading && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${uploadProgress}%` }}
                        className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600"
                      />
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                {!isUploading && uploadProgress !== 100 && (
                  <div className="flex gap-3">
                    <button
                      onClick={handleUpload}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
                    >
                      Upload Document
                    </button>
                    <button
                      onClick={() => setFile(null)}
                      className="px-6 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Info Cards */}
          <div className="grid md:grid-cols-2 gap-4 mt-8">
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <FileText className="w-6 h-6 text-emerald-600 mb-2" />
              <h4 className="font-bold text-gray-900 mb-1">Supported Files</h4>
              <p className="text-sm text-gray-600">PDF, DOC, DOCX</p>
            </div>
            {/* <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <Upload className="w-6 h-6 text-blue-600 mb-2" />
              <h4 className="font-bold text-gray-900 mb-1">Max File Size</h4>
              <p className="text-sm text-gray-600">10MB per file</p>
            </div> */}
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl">
              <CheckCircle className="w-6 h-6 text-purple-600 mb-2" />
              <h4 className="font-bold text-gray-900 mb-1">Secure Upload</h4>
              <p className="text-sm text-gray-600">Encrypted transfer</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
