import { HTMLAttributes } from "react";
import clsx from "../../utils/clsx";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  variant: "blue" | "pink";
}
export default function Button({ variant, className, ...props }: Props) {
  return (
    <button
      type="button"
      className={clsx(
        "text-white bg-gradient-to-r ",
        "hover:bg-gradient-to-br focus:ring-4 focus:outline-none",
        "rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 font-medium",
        variant === "blue" &&
          "from-blue-500 via-blue-600 to-blue-700 focus:ring-blue-300",
        variant === "pink" &&
          "from-pink-400 via-pink-500 to-pink-600 focus:ring-pink-300",
        className
      )}
      {...props}
    />
  );
}
