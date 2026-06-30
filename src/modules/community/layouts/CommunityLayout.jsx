import { Outlet } from 'react-router-dom';
import CommunitySidebar from './CommunitySidebar';
import ActivityPanel from './ActivityPanel';

export default function CommunityLayout() {
  return (
    <div className="flex h-full -mx-4 sm:-mx-6 lg:-mx-8 -my-8 bg-[#F8FAFC]">
      {/* Left Sidebar */}
      <div className="hidden lg:block shrink-0">
        <CommunitySidebar />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col relative h-[calc(100vh-73px)] overflow-hidden">
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
          <Outlet />
        </div>
      </div>

      {/* Right Activity Panel */}
      <div className="hidden xl:block shrink-0">
        <ActivityPanel />
      </div>
    </div>
  );
}
