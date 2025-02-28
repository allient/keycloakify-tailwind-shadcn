import * as React from "react";
import { cn } from "../../lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    labelText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, labelText, ...props }, ref) => {
        return (
            <div className="relative w-full">
                {/* Label flotante */}
                {labelText && (
                    <span className="text-gray-500 absolute left-2 top-0 z-10 inline-block -translate-y-1/2 whitespace-nowrap bg-white px-2 py-0.5 text-xs font-semibold font-battambang">
                        {labelText}
                    </span>
                )}

                {/* Input */}
                <input
                    type={type}
                    className={cn(
                        "placeholder:text-gray-600 flex h-14 w-full rounded-lg border-2 bg-white px-3.5 text-sm outline-none transition-all duration-500 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 focus:border-blue-500 hover:border-blue-400 active:border-blue-600",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    }
);

Input.displayName = "Input";

export { Input };