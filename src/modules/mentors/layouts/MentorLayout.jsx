import { Outlet } from 'react-router-dom';
import MentorSidebar from '../components/MentorSidebar';

export default function MentorLayout() {
  return (
    <div className="flex h-full -mx-4 sm:-mx-6 lg:-mx-8 -my-8 bg-white">
      <MentorSidebar />
      <div className="flex-1 min-w-0 flex flex-col relative h-[calc(100vh-73px)] overflow-hidden bg-[#F8FAFC]">
        <Outlet />
      </div>
    </div>
  );
}
