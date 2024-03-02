import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from ".";
import { resetState, setUsers } from "../store/usersListSlice";
import { UserItem } from "../queries/getUsers";
import { useNavigate } from "react-router-dom";

export default function useUsersContentData({
  initialUsers,
}: {
  initialUsers: UserItem[];
}) {
  const dispatch = useAppDispatch();
  const currentUsers = useAppSelector((state) => state.usersList.users);
  const navigate = useNavigate();

  const navigateToUserInfoPage = (user: UserItem) => {
    // Passing data to get right access to it on user-info page
    navigate(`/user-info/${user.login.username}`, { state: user });
  };

  useEffect(() => {
    dispatch(setUsers(initialUsers));
    return () => {
      dispatch(resetState());
    };
  }, [dispatch, initialUsers]);

  const usersToRender = !currentUsers.length ? [initialUsers] : currentUsers;

  return {
    usersToRender,
    navigateToUserInfoPage,
  };
}
