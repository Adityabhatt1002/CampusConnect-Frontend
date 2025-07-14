import React, { useEffect, useState } from 'react';

import API from '../../util/api';


const ProjectList = ({onProjectClick}) => {
            
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {

        const res = await API.get("/auth/admin-projects");
        setProjects(res.data.projects);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
        setError('Failed to load projects');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="text-center text-gray-500 dark:text-gray-400">Loading projects...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="overflow-hidden">
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <div
          key={project._id}
          onClick={()=> onProjectClick(project)}
          className="cursor-pointer bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-4 shadow-md hover:scale-[1.02] hover:shadow-lg transition"
        >
          <h3 className="text-lg font-bold text-blue-700 dark:text-white mb-2">{project.title}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Created by: {project.createdBy?.name || 'Unknown'}
          </p>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            Members: {project.members.map((m) => m.name).join(', ')}
          </p>
          <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
            Tags: {project.tags.join(', ')}
          </p>
        </div>
      ))}
    </div>
    </div>
  );
};

export default ProjectList;
