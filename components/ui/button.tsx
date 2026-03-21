
 "use client"
interface ButtonProps {
  label?: string;
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

export default function Button({ label, variant = 'primary', onClick, className, children,type }: ButtonProps) {
  // Base styles (Size, Font, Shadow)
  const baseStyles = "px-[30px] cursor-pointer py-[10px]  font-['Poppins'] text-[20px] font-medium leading-[30px]  transition-all duration-200 hover:shadow-[0px_18px_40px_-12px_#FBE18F] active:scale-95";

  // Variant specific styles
  const variants = {
    primary: "bg-gradient-to-r from-[#FCC822] to-[#FFCD2E] text-white border-none",
    secondary: "bg-white text-[#FCC822] border border-[#FCC822] font-normal"
  };

  return (
    <button 
      onClick={onClick}
      type={type || "submit"}
      className={`${baseStyles} ${variants[variant]} ${className || ''}`}
    >
      {children || label}
    </button>
  );
}

