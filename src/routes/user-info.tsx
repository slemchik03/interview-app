import { useLocation, useNavigate } from "react-router-dom";
import { UserItem } from "../utils/queries/getUsers";
import { motion } from "framer-motion";
import { Phone, Home, CalendarDays } from "lucide-react";
import { FC } from "react";
import Card from "../components/Users/Card";
import Button from "../components/ui/Button";

function getUserInfoProperties(
  currentUser: UserItem
): { icon: FC; value: string }[] {
  return [
    {
      icon: Phone,
      value: currentUser.phone,
    },
    {
      icon: Home,
      value: `${currentUser.location.city}, ${currentUser.location.state} ${currentUser.location.country}`,
    },
    {
      icon: CalendarDays,
      value: ` Registration date - ${new Date(
        currentUser.registered.date
      ).toLocaleDateString()}`,
    },
  ] as const;
}

export default function UserInfo() {
  const navigate = useNavigate();

  const currentUser: UserItem | null = useLocation().state;

  if (!currentUser) {
    navigate("/users");
    return null;
  }

  const userInfoProperties = getUserInfoProperties(currentUser);
  return (
    <motion.div
      animate={{ opacity: [0, 1], scale: [0.9, 1] }}
      transition={{ ease: "easeIn" }}
      className="grid grid-cols-1 px-10 md:grid-cols-[500px] justify-center mt-20 items-center"
    >
      <Card
        avatarSize="large"
        dob={currentUser.dob}
        name={currentUser.name}
        picture={currentUser.picture}
        gender={currentUser.gender}
        additionalProperties={userInfoProperties}
      />

      <Button
        onClick={() => navigate("/users")}
        className="mt-5"
        variant={currentUser.gender === "female" ? "pink" : "blue"}
      >
        Back to users
      </Button>
    </motion.div>
  );
}
