import { ReactNode } from "react";

function BrandButton({
  children,
  type = "button",
  className = "",
  ...props
}: React.ComponentProps<"button"> & {
  children: ReactNode;
  type?: "button" | "submit";
}) {
  return (
    <button type={type} {...props} className={`brand-button ${className}`}>
      {children}
    </button>
  );
}

export default BrandButton;
