import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
// import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import KnowledgeBase from "./pages/KnowledgeBase";
import Documents from "./pages/Documents";
import ProtectedRoute from "./routes/protectedRoutes";
import FloatingChatButton from "./pages/FloatingChat";
import OnboardUser from "./pages/OnboardUser";
import UsersList from "./pages/UsersList";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          {/* <Route path="/signup" element={<Signup />} /> */}

          {/* User and Admin can access Chat */}
          <Route
            path="/chat"
            element={
              <ProtectedRoute allowedRoles={["user", "admin"]}>
                <Chat />
              </ProtectedRoute>
            }
          />

          {/* Admin only routes */}
          <Route
            path="/knowledge-base"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <KnowledgeBase />
              </ProtectedRoute>
            }
          />
          <Route
            path="/documents"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Documents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/onboard-user"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <OnboardUser />
              </ProtectedRoute>
            }
          />
          <Route
            path="/users-list"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <UsersList />
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* Floating Chat Button for Admins */}
        <FloatingChatButton />
      </Router>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default App;
