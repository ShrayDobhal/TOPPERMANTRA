import { Outlet } from 'react-router-dom';
import ProjectSidebar from './ProjectSidebar';

export default function ProjectLayout() {
  return (
    <div className="flex h-full -mx-4 sm:-mx-6 lg:-mx-8 -my-8">
      {/* Sidebar hidden on smaller screens, can add a mobile drawer later if needed */}
      <div className="hidden lg:block shrink-0">
        <ProjectSidebar />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col bg-[#F8FAFC]">
        <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto custom-scrollbar">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
