import { trpc } from "@/utils/trpc";

import UserInfoForm from "./UserInfoForm";

const UserInfo = () => {
  const { data: user } = trpc.users.getLoggedUser.useQuery();

  if (!user) return null;

  return <UserInfoForm user={user} />;
};

export default UserInfo;
