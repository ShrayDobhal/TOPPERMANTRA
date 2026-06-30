import React, { useState, useMemo } from 'react';
import ProjectsHero from '../components/projects/ProjectsHero';
import ProjectSearch from '../components/projects/ProjectSearch';
import ProjectCategories from '../components/projects/ProjectCategories';
import ProjectsCta from '../components/projects/ProjectsCta';
import { mockProjects } from '../lib/mockProjects';

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    domains: [],
    difficulties: [],
    statuses: []
  });

  const handleFilterChange = (filterType, newValues) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: newValues
    }));
  };

  // Apply filters to projects
  const filteredProjects = useMemo(() => {
    return mockProjects.filter(project => {
      // Search matching
      const matchesSearch = searchQuery === "" || 
        project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.techStack.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      // Filter matching
      const matchesDomain = filters.domains.length === 0 || filters.domains.includes(project.domain);
      const matchesDifficulty = filters.difficulties.length === 0 || filters.difficulties.includes(project.difficulty);
      const matchesStatus = filters.statuses.length === 0 || filters.statuses.includes(project.status);

      return matchesSearch && matchesDomain && matchesDifficulty && matchesStatus;
    });
  }, [searchQuery, filters]);

  return (
    <div className="bg-white min-h-screen">
      <ProjectsHero />
      
      <ProjectSearch 
        onSearch={setSearchQuery}
        onFilterChange={handleFilterChange}
        currentFilters={filters}
      />
      
      <ProjectCategories 
        projects={filteredProjects}
        filters={filters}
        searchQuery={searchQuery}
      />

      <ProjectsCta />
    </div>
  );
}
