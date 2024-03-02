import { FC } from "react";
import { Link, LinkProps } from "react-router-dom";
import clsx from "../../utils/clsx";

interface Props {
  text: string;
}

const NavLinkBtn: FC<LinkProps & Props> = ({
  to,
  text,
  className,
  ...props
}) => {
  return (
    <Link
      {...props}
      to={to}
      className={clsx(
        "relative group/item text-black text-[13px] text-left xl:text-center uppercase font-monument tracking-[0.86px] leading-[28px]",
        className
      )}
    >
      {text}
      <div className="absolute group-hover/item:w-full bottom-0 left-0 w-0 bg-black h-1 rounded-full duration-150 ease-in-out"></div>
    </Link>
  );
};

export default NavLinkBtn;
