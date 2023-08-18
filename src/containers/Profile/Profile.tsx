import { useSession } from "next-auth/react";

import Identity from "@/components/Identity/Identity";
import Position from "@/components/Position/Position";
import Spinner from "@/components/Spinner/Spinner";
import Tabs from "@/components/Tabs/Tabs";
import Contact from "@/containers/Contact/Contact";
import Projects from "@/containers/Projects/Projects";
import Skills from "@/containers/Skills/Skills";

const elements = [
  {
    label: "Skills",
    component: <Skills />,
  },
  {
    label: "Projects",
    component: <Projects />,
  },
  {
    label: "Contact",
    component: <Contact />,
  },
];

const Profile = () => {
  const { data: session } = useSession();

  if (!session) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col gap-16">
      <section className="">
        <Identity
          userImage={session?.user?.image as string}
          userName={session?.user?.name}
          userEmail={session?.user?.email}
        />
        <Position />
      </section>
      <section>
        <Tabs elements={elements} />
      </section>
    </div>
  );
};

export default Profile;
