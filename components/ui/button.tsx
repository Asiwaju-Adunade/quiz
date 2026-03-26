"use client";
import { Loader2 } from "lucide-react";

interface ButtonProps {
  label?: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  disabled?: boolean;
}

export default function Button({ 
  label, 
  variant = 'primary', 
  onClick, 
  className, 
  children,
  type,
  isLoading,
  disabled 
}: ButtonProps) {
  // Base styles (Size, Font, Shadow)
  const baseStyles = "inline-flex items-center justify-center gap-2 px-[30px] cursor-pointer py-[10px] font-['Poppins'] text-[20px] font-medium leading-[30px] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed hover:shadow-[0px_18px_40px_-12px_#FBE18F] active:scale-95 disabled:hover:shadow-none disabled:active:scale-100";

  // Variant specific styles
  const variants = {
    primary: "bg-gradient-to-r from-[#FCC822] to-[#FFCD2E] text-white border-none",
    secondary: "bg-white text-[#FCC822] border border-[#FCC822] font-normal"
  };

  return (
    <button 
      onClick={onClick}
      type={type || "submit"}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${variants[variant]} ${className || ''}`}
    >
      {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
      {children || label}
    </button>
  );
}
