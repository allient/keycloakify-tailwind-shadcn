import { ReactNode } from "react";

const ErrorText = ({ children }: { children: ReactNode }) => {
  return (
    <p className="absolute left-0 top-[calc(100%+1px)] animate-fade-down text-xs font-medium text-red-500">
      {children}
    </p>
  );
};

export default ErrorText;
