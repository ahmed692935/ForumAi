import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Save, Loader2, FileText } from "lucide-react";
import { toast } from "react-toastify";
import { getRagPrompt, updateRagPrompt } from "../api/api";

interface PromptEditorProps {
  isOpen: boolean;
  onClose: () => void;
}

const PromptEditor: React.FC<PromptEditorProps> = ({ isOpen, onClose }) => {
  const [prompt, setPrompt] = useState<string>("");
  const [originalPrompt, setOriginalPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Fetch prompt when modal opens
  useEffect(() => {
    if (isOpen) {
      fetchPrompt();
    }
  }, [isOpen]);

  const fetchPrompt = async () => {
    setIsLoading(true);
    try {
      const response = await getRagPrompt();
      const promptText = response.prompt_body || "";
      setPrompt(promptText);
      setOriginalPrompt(promptText);
    } catch (error: any) {
      console.error("Failed to fetch prompt:", error);
      toast.error("Failed to load prompt", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!prompt.trim()) {
      toast.error("Prompt cannot be empty", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    if (prompt === originalPrompt) {
      toast.info("No changes to save", {
        position: "top-right",
        autoClose: 2000,
      });
      return;
    }

    setIsSaving(true);
    try {
      await updateRagPrompt(prompt);
      setOriginalPrompt(prompt);
      toast.success("Prompt updated successfully!", {
        position: "top-right",
        autoClose: 2000,
      });
      onClose();
    } catch (error: any) {
      console.error("Failed to update prompt:", error);
      toast.error(error?.response?.data?.error || "Failed to update prompt", {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (prompt !== originalPrompt) {
      if (
        window.confirm(
          "You have unsaved changes. Are you sure you want to close?",
        )
      ) {
        setPrompt(originalPrompt);
        onClose();
      }
    } else {
      onClose();
    }
  };

  const hasChanges = prompt !== originalPrompt;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCancel}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-emerald-500 to-emerald-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white">
                        RAG Prompt Editor
                      </h2>
                      <p className="text-sm text-emerald-50">
                        Configure the system prompt for the AI assistant
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleCancel}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {isLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                      <Loader2 className="w-12 h-12 text-emerald-600 animate-spin mx-auto mb-4" />
                      <p className="text-gray-600 font-medium">
                        Loading prompt...
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Instructions */}
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                      <h3 className="text-sm font-bold text-emerald-900 mb-2">
                        💡 Instructions
                      </h3>
                      <ul className="text-sm text-emerald-800 space-y-1">
                        <li>
                          • Edit the system prompt below to customize the AI's
                          behavior
                        </li>
                        <li>
                          • This prompt will be used for all RAG (Retrieval
                          Augmented Generation) queries
                        </li>
                        <li>
                          • Changes will be applied immediately after saving
                        </li>
                      </ul>
                    </div>

                    {/* Prompt Editor */}
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        System Prompt
                      </label>
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Enter the system prompt for the AI assistant..."
                        rows={16}
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 font-mono text-sm"
                      />
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs text-gray-500">
                          {prompt.length} characters
                        </p>
                        {hasChanges && (
                          <p className="text-xs text-amber-600 font-medium">
                            ⚠️ Unsaved changes
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex items-center justify-end gap-3">
                <button
                  onClick={handleCancel}
                  disabled={isSaving}
                  className="px-5 py-2.5 text-gray-700 font-semibold border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={isSaving || isLoading || !hasChanges}
                  className="px-5 py-2.5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-emerald-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PromptEditor;
