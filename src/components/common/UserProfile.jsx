import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUser, useLogoutUser, useOutsideClick } from "../../hooks";
import { CiUser, VscSignOut } from "../../assets/icons/icons";
import { Avatar, Text } from "./index";
import { useModal } from "../../context";

export default function UserProfile() {
  const [open, setOpen] = useState(false);
  const { mutate: logoutUser } = useLogoutUser();
  const {
    data: { first_name, last_name, email, profile_image },
  } = useGetCurrentUser();
  const { openModal } = useModal();
  const ref = useOutsideClick(() => setOpen(false));
  const navigate = useNavigate();

  return (
    <div ref={ref} className="flex-center relative">
      <button onClick={() => setOpen(!open)}>
        <Avatar image={profile_image} />
      </button>

      {open && (
        <div className="border-default border-default bg-primary absolute top-16 z-10 w-50 rounded-md shadow-2xl ltr:right-0 rtl:left-0">
          <div className="border-bottom px-4 py-3 text-left text-sm">
            <Text
              tagElement="h6"
              className="font-medium"
            >{`${first_name} ${last_name}`}</Text>
            <Text tagElement="span" className="text-muted truncate">
              {email}
            </Text>
          </div>

          <ul className="space-y-3 p-2 text-sm font-medium">
            <li
              className="profile-list"
              onClick={() => {
                navigate("/profile");
                setOpen(false);
              }}
            >
              <CiUser size={20} />
              <Text i18nKey="profile.title" />
            </li>
            <li
              onClick={() =>
                openModal("logoutConfirm", {
                  variant: "logout",
                  onConfirm: logoutUser,
                })
              }
              className="profile-list text-red-500"
            >
              <VscSignOut size={20} />
              <Text
                tagElement="button"
                type="button"
                className="cursor-pointer"
                i18nKey="auth.logout"
              />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
