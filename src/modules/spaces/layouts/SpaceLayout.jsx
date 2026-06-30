import { Outlet } from 'react-router-dom';

export default function SpaceLayout() {
  return (
    <div className="flex h-full -mx-4 sm:-mx-6 lg:-mx-8 -my-8 bg-white">
      <div className="flex-1 min-w-0 flex flex-col relative h-[calc(100vh-73px)] overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
}
