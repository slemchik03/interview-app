import { useLoaderData, Await } from "react-router-dom";
import { CardSkeletonList } from "../components/Users/CardSkeleton";
import { UserItem } from "../utils/queries/getUsers";
import { Suspense } from "react";
import { useAppSelector } from "../utils/hooks";

import useUsersEffects from "../utils/hooks/useUsersEffects";
import { motion } from "framer-motion";
import Card from "../components/Users/Card";
import useUsersContentData from "../utils/hooks/useUsersContentData";

function UsersContent({ initialUsers }: { initialUsers: UserItem[] }) {
  const { usersToRender, navigateToUserInfoPage } = useUsersContentData({
    initialUsers,
  });
  return (
    <>
      {/* Each element equals to separate page */}
      {usersToRender.map((users) => {
        return users.map(({ login, ...user }, idx) => {
          return (
            <motion.div
              key={login.username}
              onClick={() => navigateToUserInfoPage({ ...user, login })}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, ease: "easeInOut" }}
            >
              <Card
                picture={user.picture}
                name={user.name}
                dob={user.dob}
                gender={user.gender}
              />
            </motion.div>
          );
        });
      })}
    </>
  );
}

interface DefferedData {
  users: Promise<UserItem[]>;
}

export default function Users() {
  const initialDefferedData = useLoaderData() as DefferedData;
  const loadingMore = useAppSelector((state) => state.usersList.loadingMore);

  useUsersEffects();

  return (
    <div className="grid md:justify-center sm:grid-cols-2 xl:grid-cols-[repeat(3,350px)] gap-4 px-10 py-10">
      <Suspense fallback={<CardSkeletonList />}>
        {/* For triggering Suspense boundary */}
        <Await
          resolve={initialDefferedData.users}
          errorElement={<h1>Opps smth went wrong!</h1>}
        >
          {(users) => (
            <>
              <UsersContent initialUsers={users} />
              {loadingMore && <CardSkeletonList />}
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
}
