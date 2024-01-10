import Identity from "@/components/Identity/Identity";
import Managers from "@/components/Managers/Managers";
import Positions from "@/components/Positions/Positions";
import Spinner from "@/components/Spinner/Spinner";
import Projects from "@/containers/Projects/Projects";
import Skills from "@/containers/Skills/Skills";
import { trpc } from "@/utils/trpc";

const MyProfile = () => {
  const { data: loggedUser, isLoading: isLoggedUserLoading } =
    trpc.users.getLoggedUser.useQuery(undefined, { cacheTime: 0 });

  if (isLoggedUserLoading || !loggedUser) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col">
      <section className="flex justify-between">
        <Identity user={loggedUser} isLoggedUser={true} />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        <Positions user={loggedUser} isLoggedUser={true} />
        <Managers user={loggedUser} isLoggedUser={true} />
      </section>
      <section className="mb-10">
        <Skills user={loggedUser} isLoggedUser={true} />
      </section>
      <section className="mb-4">
        <Projects user={loggedUser} isLoggedUser={true} />
      </section>
    </div>
  );
};

export default MyProfile;
