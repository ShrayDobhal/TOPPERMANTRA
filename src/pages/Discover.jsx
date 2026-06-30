import React, { useState, useMemo } from 'react';
import DiscoverHero from '../components/discover/DiscoverHero';
import DiscoverSearch from '../components/discover/DiscoverSearch';
import OpportunityCategories from '../components/discover/OpportunityCategories';
import CompanyShowcase from '../components/discover/CompanyShowcase';
import DiscoverCta from '../components/discover/DiscoverCta';
import { mockOpportunities } from '../lib/mockDiscover';

export default function Discover() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    types: [],
    workplace: [],
    paid: [],
    experience: []
  });

  const handleFilterChange = (filterType, newValues) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: newValues
    }));
  };

  // Apply filters to opportunities
  const filteredOpportunities = useMemo(() => {
    return mockOpportunities.filter(opp => {
      // Search matching (title, company, skills)
      const matchesSearch = searchQuery === "" || 
        opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));

      // Filter matching
      const matchesType = filters.types.length === 0 || filters.types.includes(opp.type);
      const matchesWorkplace = filters.workplace.length === 0 || filters.workplace.includes(opp.workplaceType);
      const matchesPaid = filters.paid.length === 0 || filters.paid.includes(opp.paidStatus);
      
      // Currently, experience filter isn't mapped to mock data directly, but we include it for UI completeness
      // const matchesExperience = filters.experience.length === 0 || filters.experience.includes(opp.experienceLevel);
      const matchesExperience = true;

      return matchesSearch && matchesType && matchesWorkplace && matchesPaid && matchesExperience;
    });
  }, [searchQuery, filters]);

  return (
    <div className="bg-white min-h-screen">
      <DiscoverHero />
      
      <DiscoverSearch 
        onSearch={setSearchQuery}
        onFilterChange={handleFilterChange}
        currentFilters={filters}
      />
      
      <OpportunityCategories 
        opportunities={filteredOpportunities}
        filters={filters}
        searchQuery={searchQuery}
      />

      <CompanyShowcase />

      <DiscoverCta />
    </div>
  );
}
