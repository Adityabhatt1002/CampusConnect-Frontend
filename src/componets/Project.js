import React, {  useState } from "react";
import Navbar from "../componets/Navbar"; // Your existing Navbar component

import CreateProjectModal from "../componets/projectfiles/CreateProjectModal";
import ProjectList from "../componets/projectfiles/ProjectList";
import GroupModal from "./projectfiles/GroupModal";
const ProjectBoard = () => {

  const [showModal, setShowModal] = useState(false);
  const [reloadKey,setReloadKey] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);

  

  const handleProjectCreated = () => {
    setShowModal(false);
    setReloadKey((prev)=>prev +1);
    
  };
  const handleProjectClick =(project)=>{
    setSelectedProject(project);//open modal with this project
  };
  const handleCloseGroupModal=()=>{
    setSelectedProject(null);
    setReloadKey((prev)=>prev +1);
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <Navbar />

     <main className="flex-grow pt-32 px-4">
  <div className="max-w-6xl mx-auto bg-[#111827] bg-opacity-70 rounded-3xl p-8 shadow-xl relative">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-4xl font-bold">🚀 Project Board</h1>
      <button
        onClick={() => setShowModal(true)}
        className="bg-white text-blue-900 px-5 py-2 rounded-xl font-semibold shadow hover:bg-gray-100 transition"
      >
        + Create Project
      </button>
    </div>

    <div className="max-h-[400px] overflow-y-auto flex flex-col gap-4">
      <ProjectList key={reloadKey} onProjectClick={handleProjectClick} />
    </div>

    {showModal && (
      <CreateProjectModal
        onClose={() => setShowModal(false)}
        onCreated={handleProjectCreated}
      />
    )}
    {
      selectedProject && (
        <GroupModal project={selectedProject} onClose={handleCloseGroupModal}/>
      )
    }

    
  </div>
</main>
<img
      src="https://banner2.cleanpng.com/lnd/20240419/keb/transparent-star-wars-cartoon-darth-vader-with-red-lightsaber-pose6622de7d408799.35217947.webp"
      alt="funny monkey"
      className="absolute top-4 right-6 w-16"
    />


      {/* Animated Footer */}
    <footer className="marquee-wrapper">
  <div className="marquee-track ">
    {[
      "Placement Group",
      "DSA Group",
      "Web Dev Group",
      "AI/ML Circle",
      "DevOps Squad",
      "Sports 11",
      "Gamers Group",
      "DataScience Group",
      "React Group",
      "Elite Group",
    ]
      .concat([
        "Placement Group",
        "DSA Group",
        "Web Dev Group",
        "AI/ML Circle", // duplicate for seamless loop
      ])
      .map((group, idx) => (
        <div className="marquee-card" key={idx}>
          {group}
        </div>
      ))}
  </div>
</footer>

    </div>
  );
};
export default ProjectBoard;