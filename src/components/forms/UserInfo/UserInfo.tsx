import { TUser } from "@/typeDefinitions/typeDefinitions";

import UserInfoForm from "./UserInfoForm";

const UserInfo = ({ user }: { user: TUser }) => {
  if (!user) return null;

  return <UserInfoForm user={user} />;
};

export default UserInfo;
