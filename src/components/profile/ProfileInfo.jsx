import { Link } from "react-router-dom";
import { Avatar, Text } from "../common";
import { FaKey } from "../../assets/icons/icons";
import { useGetCurrentUser } from "../../hooks";

const ProfileInfo = () => {
  const { data } = useGetCurrentUser();
  const { first_name, last_name, email, profile_image } = data || {};

  return (
    <div className="card m-0 border-0 py-5">
      <div className="flex-center flex-col gap-5 text-center md:flex-row md:justify-between md:text-start">
        <Avatar image={profile_image} className="h-30 w-30" />
        <div className="flex-1 text-center md:text-start">
          <Text
            tagElement="h3"
            className="text-xl font-medium"
          >{`${first_name || ""} ${last_name || ""}`}</Text>
          <Text tagElement="p" className="text-secondary">
            {email}
          </Text>
        </div>
        <Text
          tagElement={Link}
          to="/change-password"
          i18nKey="profile.changePassword"
          className="text-accent flex-end cursor-pointer text-end"
        >
          <span className="px-1">
            <FaKey />
          </span>
        </Text>
      </div>
    </div>
  );
};

export default ProfileInfo;
