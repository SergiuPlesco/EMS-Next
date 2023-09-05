import { useSession } from "next-auth/react";
import { useState } from "react";
import { MdModeEdit } from "react-icons/md";

import Identity from "@/components/Identity/Identity";
import Modal from "@/components/Modal/Modal";
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
    <div className="flex flex-col gap-16">
      <section className="flex justify-between">
        <div>
          <Identity
            userImage={session?.user?.image as string}
            userName={session?.user?.name || "-"}
            userEmail={session?.user?.email || "-"}
          />
          <Position />
        </div>

        <div className="self-start">
          <button onClick={openModal}>
            <MdModeEdit size={16} className="text-slate-400" />
          </button>
        </div>
      </section>
      <section>
        <Tabs elements={elements} />
      </section>
      <Modal open={isModalOpen} onClose={closeModal}>
        <div>
          <form action="" method="post" className="flex flex-col">
            <label htmlFor="headLine" className="flex flex-col">
              Headline
              <input
                type="text"
                name=""
                id="headLine"
                className="border rounded"
              />
            </label>
            <label htmlFor="headLine" className="flex flex-col">
              Position
              <input
                type="text"
                name=""
                id="headLine"
                className="border rounded"
              />
            </label>
            <button type="submit">save</button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Profile;
