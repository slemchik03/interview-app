import { useEffect } from "react";
import { loadMoreUsers } from "../store/usersListSlice";
import { useScroll } from "framer-motion";
import { useAppDispatch, useAppSelector } from ".";



export default function useUsersEffects() {
  const { scrollY } = useScroll();
  const dispatch = useAppDispatch();
  const { canBeLoadedMore, currentPage } = useAppSelector(
    (state) => state.usersList
  );

  useEffect(() => {
    scrollY.on("change", (y) => {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = document.documentElement.clientHeight;

      if (y + clientHeight >= scrollHeight && canBeLoadedMore) {
        dispatch(loadMoreUsers({ nextPage: currentPage + 1 }));
      }
    });
    return () => {
      scrollY.clearListeners();
    };
  }, [canBeLoadedMore, currentPage, dispatch, scrollY]);
}
