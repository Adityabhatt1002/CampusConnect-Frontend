// src/routes/AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

// Import your pages here
import HomePage from "../Hero";
import LoginPage from "../componets/login";
import ProjectsPage from "../componets/Project";
import ChatPage from "../componets/Chat";
import AboutPage from "../componets/About";
import TermsPage from "../componets/Terms";
import ContactPage from "../componets/Contact";
import Home from "../componets/Home";
import FacultyHome from "../componets/FacultyHome";
import { useSelector } from "react-redux";
import StudyGroup from "../componets/StudyGroup/StudyGroup";
import ForgotPassword from "../componets/Password/ForgotPassword";
import ResetPassword from "../componets/Password/ResetPassword";


const AppRoutes = () => {
  const role = useSelector((state) => state.auth.role);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route 
       path="/home"
  element={
    role === null ? (
      <div>Loading...</div>
    ) : role === "faculty" ? (
      <FacultyHome />
    ) : (
      <Home />
    )
  }/>
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/groups" element={<StudyGroup />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/reset-password/:token" element={<ResetPassword/>}/>
      <Route path="/about" element={<AboutPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
};

export default AppRoutes;

