// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FileText,
//   Trash2,
//   Eye,
//   ChevronLeft,
//   ChevronRight,
//   Loader2,
//   Upload,
//   AlertCircle,
// } from "lucide-react";
// import { toast } from "react-toastify";
// import { getDocuments, deleteDocument } from "../api/api";
// import Navbar from "../components/Navbar";

// interface Document {
//   id: number;
//   filename: string;
//   file_size: number;
//   upload_date: string;
//   tenant_id: number;
//   status?: string;
// }

// const Documents: React.FC = () => {
//   const [documents, setDocuments] = useState<Document[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(true);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [totalPages, setTotalPages] = useState<number>(1);
//   const [total, setTotal] = useState<number>(0);
//   const [perPage] = useState<number>(10);
//   const [deleteId, setDeleteId] = useState<number | null>(null);
//   const [isDeleting, setIsDeleting] = useState<boolean>(false);

//   useEffect(() => {
//     fetchDocuments();
//   }, [currentPage]);

//   const fetchDocuments = async () => {
//     setIsLoading(true);
//     try {
//       const response = await getDocuments(currentPage, perPage);
//       setDocuments(response.documents || []);
//       setTotalPages(response.total_pages || 1);
//       setTotal(response.total || 0);
//     } catch (error: any) {
//       console.error("Fetch documents error:", error);
//       toast.error(
//         error?.response?.data?.message || "Failed to load documents",
//         {
//           position: "top-right",
//           autoClose: 3000,
//         },
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDelete = async (documentId: number) => {
//     setIsDeleting(true);
//     try {
//       await deleteDocument(documentId);

//       toast.success("Document deleted successfully", {
//         position: "top-right",
//         autoClose: 2000,
//       });

//       setDeleteId(null);

//       // Refresh the list
//       fetchDocuments();
//     } catch (error: any) {
//       console.error("Delete error:", error);
//       toast.error(
//         error?.response?.data?.message || "Failed to delete document",
//         {
//           position: "top-right",
//           autoClose: 3000,
//         },
//       );
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   const formatFileSize = (bytes: number): string => {
//     if (bytes === 0) return "0 Bytes";
//     const k = 1024;
//     const sizes = ["Bytes", "KB", "MB", "GB"];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
//   };

//   const formatDate = (dateString: string): string => {
//     const date = new Date(dateString);
//     return new Intl.DateTimeFormat("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     }).format(date);
//   };

//   const getFileIcon = (filename: string) => {
//     const extension = filename.split(".").pop()?.toLowerCase();
//     if (extension === "pdf") {
//       return <FileText className="w-6 h-6 text-red-500" />;
//     }
//     return <FileText className="w-6 h-6 text-blue-500" />;
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
//       <Navbar />

//       <div className="max-w-7xl mx-auto px-4 pt-24 pb-8">
//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
//         >
//           <div>
//             <h1 className="text-4xl font-black text-gray-900 mb-2">
//               Document{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-600">
//                 Library
//               </span>
//             </h1>
//             <p className="text-gray-600">
//               Total: {total} document{total !== 1 ? "s" : ""}
//             </p>
//           </div>
//           <Link
//             to="/knowledge-base"
//             className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
//           >
//             <Upload className="w-5 h-5" />
//             Upload New Document
//           </Link>
//         </motion.div>

//         {/* Documents List */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.1 }}
//           className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden"
//         >
//           {isLoading ? (
//             <div className="flex items-center justify-center py-20">
//               <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
//             </div>
//           ) : documents.length === 0 ? (
//             <div className="text-center py-20">
//               <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <FileText className="w-10 h-10 text-gray-400" />
//               </div>
//               <h3 className="text-xl font-bold text-gray-900 mb-2">
//                 No documents yet
//               </h3>
//               <p className="text-gray-600 mb-6">
//                 Upload your first document to get started
//               </p>
//               <Link
//                 to="/knowledge-base"
//                 className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
//               >
//                 <Upload className="w-5 h-5" />
//                 Upload Document
//               </Link>
//             </div>
//           ) : (
//             <>
//               {/* Table */}
//               <div className="overflow-x-auto">
//                 <table className="w-full">
//                   <thead className="bg-gray-50 border-b border-gray-200">
//                     <tr>
//                       <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                         Document
//                       </th>
//                       <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                         Size
//                       </th>
//                       <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                         Upload Date
//                       </th>
//                       <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
//                         Status
//                       </th>
//                       <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
//                         Actions
//                       </th>
//                     </tr>
//                   </thead>
//                   <tbody className="divide-y divide-gray-200">
//                     {documents.map((doc, index) => (
//                       <motion.tr
//                         key={doc.id}
//                         initial={{ opacity: 0, y: 10 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: index * 0.05 }}
//                         className="hover:bg-gray-50 transition-colors"
//                       >
//                         <td className="px-6 py-4">
//                           <div className="flex items-center gap-3">
//                             {getFileIcon(doc.filename)}
//                             <div>
//                               <p className="font-semibold text-gray-900">
//                                 {doc.filename}
//                               </p>
//                               <p className="text-xs text-gray-500">
//                                 ID: {doc.id}
//                               </p>
//                             </div>
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-600">
//                           {formatFileSize(doc.file_size)}
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-600">
//                           {formatDate(doc.upload_date)}
//                         </td>
//                         <td className="px-6 py-4">
//                           <span
//                             className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
//                               doc.status === "active" || !doc.status
//                                 ? "bg-emerald-100 text-emerald-800"
//                                 : "bg-gray-100 text-gray-800"
//                             }`}
//                           >
//                             {doc.status || "Active"}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 text-right">
//                           <div className="flex items-center justify-end gap-2">
//                             <button
//                               onClick={() =>
//                                 toast.info("View feature coming soon!")
//                               }
//                               className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
//                               title="View document"
//                             >
//                               <Eye className="w-5 h-5" />
//                             </button>
//                             <button
//                               onClick={() => setDeleteId(doc.id)}
//                               className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
//                               title="Delete document"
//                             >
//                               <Trash2 className="w-5 h-5" />
//                             </button>
//                           </div>
//                         </td>
//                       </motion.tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>

//               {/* Pagination */}
//               {totalPages > 1 && (
//                 <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
//                   <p className="text-sm text-gray-600">
//                     Page {currentPage} of {totalPages}
//                   </p>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() =>
//                         setCurrentPage((prev) => Math.max(prev - 1, 1))
//                       }
//                       disabled={currentPage === 1}
//                       className="px-4 py-2 bg-white border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
//                     >
//                       <ChevronLeft className="w-4 h-4" />
//                       Previous
//                     </button>
//                     <button
//                       onClick={() =>
//                         setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//                       }
//                       disabled={currentPage === totalPages}
//                       className="px-4 py-2 bg-white border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
//                     >
//                       Next
//                       <ChevronRight className="w-4 h-4" />
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </motion.div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       <AnimatePresence>
//         {deleteId && (
//           <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0, scale: 0.9 }}
//               className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
//             >
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
//                   <AlertCircle className="w-6 h-6 text-red-600" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold text-gray-900">
//                     Delete Document
//                   </h3>
//                   <p className="text-sm text-gray-600">
//                     This action cannot be undone
//                   </p>
//                 </div>
//               </div>
//               <p className="text-gray-700 mb-6">
//                 Are you sure you want to delete this document? This will
//                 permanently remove it from the knowledge base.
//               </p>
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setDeleteId(null)}
//                   disabled={isDeleting}
//                   className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => handleDelete(deleteId)}
//                   disabled={isDeleting}
//                   className="flex-1 px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
//                 >
//                   {isDeleting ? (
//                     <>
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                       Deleting...
//                     </>
//                   ) : (
//                     <>
//                       <Trash2 className="w-4 h-4" />
//                       Delete
//                     </>
//                   )}
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Documents;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Trash2,
  //   Eye,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Upload,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import { getDocuments, deleteDocument } from "../api/api";
import Navbar from "../components/Navbar";

interface Document {
  id: number;
  title: string;
  file_path: string;
  file_hash: string;
  file_type: string;
  created_at: string;
}

const Documents: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [perPage] = useState<number>(10);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    fetchDocuments();
  }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchDocuments = async () => {
    setIsLoading(true);
    try {
      const response = await getDocuments(currentPage, perPage);
      setDocuments(response.documents || []);
      setTotalPages(response.total_pages || 1);
      setTotal(response.total_documents || 0);
    } catch (error: any) {
      console.error("Fetch documents error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to load documents",
        {
          position: "top-right",
          autoClose: 3000,
        },
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (documentId: number) => {
    setIsDeleting(true);
    try {
      await deleteDocument(documentId);

      toast.success("Document deleted successfully", {
        position: "top-right",
        autoClose: 2000,
      });

      setDeleteId(null);

      // Refresh the list
      fetchDocuments();
    } catch (error: any) {
      console.error("Delete error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to delete document",
        {
          position: "top-right",
          autoClose: 3000,
        },
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getFileIcon = (fileType: string) => {
    if (fileType === "pdf") {
      return <FileText className="w-6 h-6 text-red-500" />;
    }
    if (fileType === "docx" || fileType === "doc") {
      return <FileText className="w-6 h-6 text-blue-500" />;
    }
    return <FileText className="w-6 h-6 text-gray-500" />;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 pt-24 pb-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <div>
            <h1 className="text-4xl font-black text-gray-900 mb-2">
              Document{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-emerald-600">
                Library
              </span>
            </h1>
            <p className="text-gray-600">
              Total: {total} document{total !== 1 ? "s" : ""}
            </p>
          </div>
          <Link
            to="/knowledge-base"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
          >
            <Upload className="w-5 h-5" />
            Upload New Document
          </Link>
        </motion.div>

        {/* Documents List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl border border-gray-200 overflow-hidden"
        >
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
            </div>
          ) : documents.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                No documents yet
              </h3>
              <p className="text-gray-600 mb-6">
                Upload your first document to get started
              </p>
              <Link
                to="/knowledge-base"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all"
              >
                <Upload className="w-5 h-5" />
                Upload Document
              </Link>
            </div>
          ) : (
            <>
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Document
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Upload Date
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                        File Hash
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {documents.map((doc, index) => (
                      <motion.tr
                        key={doc.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {getFileIcon(doc.file_type)}
                            <div>
                              <p className="font-semibold text-gray-900">
                                {doc.title}
                              </p>
                              <p className="text-xs text-gray-500">
                                ID: {doc.id}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800 uppercase">
                            {doc.file_type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {formatDate(doc.created_at)}
                        </td>
                        <td className="px-6 py-4">
                          <code className="text-xs text-gray-500 font-mono">
                            {doc.file_hash.substring(0, 16)}...
                          </code>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {/* <button
                              onClick={() =>
                                toast.info("View feature coming soon!")
                              }
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="View document"
                            >
                              <Eye className="w-5 h-5" />
                            </button> */}
                            <button
                              onClick={() => setDeleteId(doc.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete document"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
                  <p className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                      disabled={currentPage === 1}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                      }
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 bg-white border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </motion.div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteId && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Delete Document
                  </h3>
                </div>
              </div>
              <p className="text-gray-700 mb-6">
                Are you sure you want to delete this document? This will
                permanently remove it from the knowledge base.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteId(null)}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteId)}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Documents;
