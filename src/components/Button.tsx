import { ReactNode } from "react";

type ButtonType = "basic" | "link" | "success" | "plain";

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
];

const successClasses = [
  "bg-green-600",
  "text-white",
  "hover:bg-green-700",
  "focus:ring-green-400",
];

const plainClasses = ["border-none", "bg-transparent", "text-black"];

function Button({
  onClick,
  children,
  variant = "basic",
}: {
  variant?: ButtonType;
  children?: ReactNode;
  onClick: () => void;
}) {
  const handleButtonTypeClass = (type: ButtonType) => {
    const classes = {
      basic: basicClasses,
      link: linkClasses,
      success: successClasses,
      plain: plainClasses,
    };

    return [...baseClasses, ...classes[type]].join(" ");
  };

  return (
    <button
      onClick={() => onClick()}
      className={handleButtonTypeClass(variant)}
    >
      {children}
    </button>
  );
}

export default Button;
