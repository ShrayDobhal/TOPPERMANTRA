import { cn } from "../../lib/utils";

export function Avatar({ src, fallback, size = "md", className, status }) {
  const sizeClasses = {
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
    xl: "w-20 h-20 text-xl"
  };

  const statusClasses = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    busy: "bg-red-500",
    away: "bg-yellow-500"
  };

  return (
    <div className={cn("relative inline-block", className)}>
      <div className={cn(
        "rounded-full flex items-center justify-center font-bold overflow-hidden bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] text-white",
        sizeClasses[size]
      )}>
        {src ? (
          <img src={src} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <span>{fallback}</span>
        )}
      </div>
      {status && (
        <div className={cn(
          "absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white",
          statusClasses[status]
        )} />
      )}
    </div>
  );
}
