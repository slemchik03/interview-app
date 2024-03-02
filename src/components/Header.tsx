import { motion, type HTMLMotionProps } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "/react.svg";
import NavLinkBtn from "./ui/NavLinkBtn";
import useHeaderData from "../utils/hooks/useHeaderData";

type NavRouteLinkItem = {
  text: string;
  to: string;
};

const navRouteLinksItems: NavRouteLinkItem[] = [
  { text: "Home", to: "/" },
  { text: "Users", to: "/users" },
] as const;

export default function Header() {
  const { isHide } = useHeaderData();

  const headerAnimationProps: HTMLMotionProps<"div"> = {
    animate: {
      scale: isHide ? 0 : 1,
      opacity: isHide ? 0.2 : 1,
      translateY: isHide ? "-100%" : 0,
    },
    transition: {
      duration: 0.35,
      ease: "easeInOut",
    },
  };

  return (
    <motion.div
      {...headerAnimationProps}
      className="sticky grid items-center top-0 left-0 blur-effect 
      px-[25px] md:px-[35px] xl:px-[85px] py-[5px] grid-cols-[minmax(0,65px)_1fr] 
      grid-flow-col shadow-2xl z-[100]"
    >
      <Link to="/" className="animate-spin-slow">
        <img className="cursor-pointer" src={Logo} alt="Logo" />
      </Link>
      <div className="flex mx-auto gap-4">
        {navRouteLinksItems.map((props) => (
          <NavLinkBtn key={props.text} {...props} />
        ))}
      </div>
    </motion.div>
  );
}
