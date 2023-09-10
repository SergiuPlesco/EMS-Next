import { useSession } from "next-auth/react";
import { useState } from "react";
import { MdModeEdit } from "react-icons/md";

import AddPosition from "@/components/AddPosition/AddPosition";
import AddSkill from "@/components/AddSkill/AddSkill";
import Identity from "@/components/Identity/Identity";
import Modal from "@/components/Modal/Modal";
import Spinner from "@/components/Spinner/Spinner";
import Tabs from "@/components/Tabs/Tabs";
import Contact from "@/containers/Contact/Contact";
import Projects from "@/containers/Projects/Projects";
import Skills from "@/containers/Skills/Skills";
import { trpc } from "@/utils/trpc";

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
  const { data: userPositions } = trpc.users.getPositions.useQuery();
  const [isModalOpen, setIsOpenModal] = useState(false);

  const openModal = () => {
    setIsOpenModal(true);
  };
  const closeModal = () => {
    setIsOpenModal(false);
  };

  if (!session) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col">
      <section className="flex justify-between">
        <div>
          <Identity
            userImage={session?.user?.image as string}
            userName={session?.user?.name || "-"}
            userEmail={session?.user?.email || "-"}
          />
        </div>

        <div className="self-start">
          <button onClick={openModal}>
            <MdModeEdit size={16} className="text-slate-400" />
          </button>
        </div>
      </section>
      <section className="flex flex-wrap mb-6 gap-3">
        {userPositions ? (
          userPositions.map((position) => {
            return (
              <h3 key={position.id} className="font-semibold text-slate-600">
                {position.title}
              </h3>
            );
          })
        ) : (
          <p>no position? click pensil to add</p>
        )}
      </section>
      <section>
        <Tabs elements={elements} />
      </section>
      <Modal open={isModalOpen} onClose={closeModal} title="Edit Info">
        <AddPosition />
        <AddSkill />
      </Modal>
    </div>
  );
};

export default Profile;
