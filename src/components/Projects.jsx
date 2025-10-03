import React from 'react'

function Projects() {
  const projects = [
    {
      title: "Project One",
      description: "A full-stack web application built with React and Node.js",
      technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      github: "https://github.com",
      demo: "https://example.com"
    },
    {
      title: "Project Two",
      description: "An e-commerce platform with payment integration",
      technologies: ["React", "Express", "PostgreSQL", "Stripe"],
      github: "https://github.com",
      demo: "https://example.com"
    },
    {
      title: "Project Three",
      description: "A mobile-responsive portfolio website",
      technologies: ["React", "Tailwind CSS", "Vite"],
      github: "https://github.com",
      demo: "https://example.com"
    }
  ]

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          My Projects
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="bg-gray-50 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="h-48 bg-gradient-to-br from-blue-400 to-indigo-600"></div>
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4">
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    GitHub
                  </a>
                  <a 
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-blue-600 transition"
                  >
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
