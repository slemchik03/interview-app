import NavLinkBtn from "../components/ui/NavLinkBtn";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      animate={{ scale: [0, 1], opacity: [0, 1] }}
      transition={{ ease: "easeInOut", duration: 0.4 }}
      className="grid grid-rows-1 h-[600px] my-auto md:grid-cols-[600px] items-center justify-center px-4"
    >
      <div>
        <h1 className="text-xl md:text-2xl xl:text-5xl font-bold text-center">
          Welcome, to start searching people - click link below
        </h1>
        <div className="flex justify-center pt-10">
          <NavLinkBtn className="md:text-[18px]" to={"/users"} text="Search" />
        </div>
      </div>
    </motion.div>
  );
}
