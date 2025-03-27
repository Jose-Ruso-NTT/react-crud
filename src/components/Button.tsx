import { ReactNode } from "react";
import { NavLink } from "react-router";

type ButtonType = "submit" | "button" | "reset";

type ButtonVariant = "basic" | "link" | "success" | "plain";

const baseClasses = [
  "inline-flex",
  "items-center",
  "justify-center",
  "rounded",
  "font-semibold",
  "focus:outline-none",
  "focus:ring-2",
  "transition",
  "duration-200",
  "ease-in-out",
  "px-6",
  "py-2",
  "text-center",
  "leading-none",
  "w-fit",
];

const basicClasses = [
  "border-2",
  "border-blue-600",
  "bg-blue-600",
  "text-white",
  "hover:bg-blue-700",
  "focus:ring-blue-400",
];

const linkClasses = [
  "border-2",
  "border-blue-600",
  "bg-white",
  "text-blue-600",
  "hover:underline",
  "hover:text-blue-700",
  "focus:ring-blue-400",
  "w-fit",
];

const successClasses = [
  "bg-green-600",
  "text-white",
  "hover:bg-green-700",
  "focus:ring-green-400",
];

const plainClasses = ["border-none", "bg-transparent", "text-black"];

type ButtonProps =
  | {
      variant: "link";
      children: ReactNode;
      href: string;
      onClick?: never;
      type?: never;
    }
  | {
      variant?: Exclude<ButtonVariant, "link">;
      children: ReactNode;
      onClick?: never;
      href?: never;
      type?: Exclude<ButtonType, "button">;
    }
  | {
      variant?: Exclude<ButtonVariant, "link">;
      children: ReactNode;
      onClick: () => void;
      href?: never;
      type: "button";
    };

function Button({
  variant = "basic",
  children,
  onClick,
  href,
  type = "button",
}: ButtonProps) {
  const handleButtonTypeClass = (variant: ButtonVariant) => {
    const classes = {
      basic: basicClasses,
      link: linkClasses,
      success: successClasses,
      plain: plainClasses,
    };

    return [...baseClasses, ...classes[variant]].join(" ");
  };

  if (variant === "link" && href) {
    return (
      <NavLink className={handleButtonTypeClass(variant)} to={href}>
        {children}
      </NavLink>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={handleButtonTypeClass(variant)}
    >
      {children}
    </button>
  );
}

export default Button;
