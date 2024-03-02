import { useEffect, useState } from "react";
import { useScroll } from "framer-motion";

export default function useHeaderData() {
  const [isHide, setIsHide] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    if (scrollY.get() < 450) {
      setIsHide(false);
    }
    scrollY.on("change", (value) => {
      const prevValue = scrollY.getPrevious() || 0;
      setIsHide(value > prevValue && value > 150);
    });
    return () => {
      scrollY.clearListeners();
      setIsHide(false);
    };
  }, [scrollY]);

  return {
    isHide,
  };
}
