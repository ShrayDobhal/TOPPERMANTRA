import { useState } from "react";
import { cn } from "../../lib/utils";

export function Avatar({ src, fallback, size = "md", className, status }) {
  const [imgError, setImgError] = useState(false);

  const sizeClasses = {
    xs: "w-6 h-6 text-[10px]",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-14 h-14 text-base",
    xl: "w-20 h-20 text-xl",
    "2xl": "w-28 h-28 text-2xl",
    full: "w-full h-full text-2xl",
  };

  const statusClasses = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    busy: "bg-red-500",
    away: "bg-yellow-500"
  };

  // Derive initials from fallback or src seed
  const initials = fallback
    ? fallback.charAt(0).toUpperCase()
    : src
    ? (src.split("seed=")[1] || "?").charAt(0).toUpperCase()
    : "?";

  const showImage = src && !imgError;

  return (
    <div className={cn("relative inline-block shrink-0", className)}>
      <div className={cn(
        "rounded-full flex items-center justify-center font-bold overflow-hidden bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] text-white",
        sizeClasses[size] || sizeClasses["md"]
      )}>
        {showImage ? (
          <img
            src={src}
            alt="Avatar"
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <span>{initials}</span>
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
