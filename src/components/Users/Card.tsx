import { CalendarFold, ShieldQuestion } from "lucide-react";
import { UserItem } from "../../utils/queries/getUsers";
import clsx from "../../utils/clsx";
import { FC } from "react";

type UserPreviewInfo = Pick<UserItem, "dob" | "gender" | "picture" | "name">;

interface Props extends UserPreviewInfo {
  additionalProperties?: { icon: FC; value: string }[];
  avatarSize?: keyof UserItem["picture"];
}

export default function Card({
  name,
  picture,
  dob,
  gender,
  additionalProperties,
  avatarSize = "medium",
}: Props) {
  return (
    <div className="group/card relative cursor-pointer font-roboto">
      <div className="w-full grid items-center min-h-[290px] px-4 py-2 rounded-xl shadow-xl hover:scale-95 transition-all">
        <div className="flex justify-between items-center">
          <img
            className="rounded-full max-w-[78px] max-h-[78px] xl:max-w-[148px] xl:max-h-[148px]"
            src={picture[avatarSize]}
          />
          <span className="font-bold md:text-[18px]">
            {name.first} {name.last}
          </span>
        </div>
        <div className="flex text-sm md:text-[16px] gap-2 justify-center md:justify-between flex-row flex-wrap py-10">
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <CalendarFold />
              {new Date(dob.date).toLocaleDateString()}
            </div>
            {additionalProperties &&
              additionalProperties.map(({ icon: Icon, value }) => (
                <div key={value} className="flex gap-2">
                  <Icon />
                  {value}
                </div>
              ))}
          </div>

          <div className="flex gap-2">
            <ShieldQuestion /> Gender - {gender}
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "group-hover/card:blur-2xl absolute top-0 left-0",
          "blur-3xl w-full h-full z-[-1]  transition-all",
          gender === "male" ? "bg-blue-500" : "bg-pink-500"
        )}
      ></div>
    </div>
  );
}
