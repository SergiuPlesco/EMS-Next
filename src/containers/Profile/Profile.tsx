import { useRouter } from "next/router";

import Identity from "@/components/Identity/Identity";
import Managers from "@/components/Managers/Managers";
import Positions from "@/components/Positions/Positions";
import Spinner from "@/components/Spinner/Spinner";
import Projects from "@/containers/Projects/Projects";
import Skills from "@/containers/Skills/Skills";
import { trpc } from "@/utils/trpc";

const Profile = () => {
  const router = useRouter();
  const userId = router.query.id as string;
  const { data: user, isLoading } = trpc.users.getLoggedUser.useQuery({
    userId,
  });

  if (isLoading || !user) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col">
      <section className="flex justify-between">
        <Identity user={user} />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <Positions user={user} />
        <Managers user={user} />
      </section>
      <section className="mb-10">
        <Skills user={user} />
      </section>
      <section className="mb-4">
        <Projects user={user} />
      </section>
      {/* <section>
        <Certificates />
      </section> */}
    </div>
  );
};

export default Profile;
