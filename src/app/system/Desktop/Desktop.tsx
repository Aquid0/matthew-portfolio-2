import React from "react";

export const Desktop = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full w-full bg-[url('/desktop.jpg')] bg-cover bg-fixed bg-center bg-no-repeat">
      {children}
    </div>
  );
};
