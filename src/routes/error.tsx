import { motion } from "framer-motion";
import { useRouteError } from "react-router-dom";
import NavLinkBtn from "../components/ui/NavLinkBtn";

export default function Error() {
  const error = useRouteError();

  console.error(error);

  return (
    <motion.div
      animate={{ scale: [0, 1], opacity: [0, 1] }}
      transition={{ ease: "easeInOut", duration: 0.4 }}
      className="grid grid-rows-1 h-[600px] my-auto md:grid-cols-[600px] items-center justify-center px-4"
    >
      <h1 className="text-xl md:text-2xl xl:text-5xl font-bold text-center">
        Unfortanutely something went wrong.
      </h1>
      <div className="flex justify-center">
        <NavLinkBtn className="md:text-[18px]" to={"/"} text="Back home" />
      </div>
    </motion.div>
  );
}
