import { ReactNode } from "react";

const DecorLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex w-full min-h-screen">
      {/* Barra lateral con gradiente fijo */}
      <div className="hidden min-w-96 w-3/12 bg-gradient-to-b from-[#cce4ff] to-[#b3b8f3] lg:block relative mix-blend-multiply"></div>

      {/* Contenedor principal */}
      <div className="flex grow p-4 pt-32 pb-12 xl:py-24 lg:items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default DecorLayout;