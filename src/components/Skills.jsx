import React from 'react'

function Skills() {
  const skillCategories = [
    {
      category: "Frontend",
      skills: ["React", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Redux"]
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express", "Python", "Django", "REST APIs"]
    },
    {
      category: "Database",
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Firebase"]
    },
    {
      category: "Tools & Others",
      skills: ["Git", "Docker", "AWS", "CI/CD", "Agile"]
    }
  ]

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Skills & Technologies
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h3 className="text-xl font-bold text-blue-600 mb-4 text-center">
                {category.category}
              </h3>
              <ul className="space-y-2">
                {category.skills.map((skill, skillIndex) => (
                  <li 
                    key={skillIndex}
                    className="text-gray-700 text-center py-2 hover:text-blue-600 transition"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
