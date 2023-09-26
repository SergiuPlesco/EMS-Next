import { useSession } from "next-auth/react";
import { useState } from "react";
import { AiFillSetting } from "react-icons/ai";

import AddPhone from "@/components/AddPhone/AddPhone";
import AddPosition from "@/components/AddPosition/AddPosition";
import AddSkill from "@/components/AddSkill/AddSkill";
import Identity from "@/components/Identity/Identity";
import Managers from "@/components/Managers/Managers";
import Modal from "@/components/Modal/Modal";
import Positions from "@/components/Positions/Positions";
import Spinner from "@/components/Spinner/Spinner";
import Tabs from "@/components/Tabs/Tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Projects from "@/containers/Projects/Projects";
import Skills from "@/containers/Skills/Skills";

const tabsElements = [
  {
    label: "Skills",
    component: <Skills />,
  },
  {
    label: "Projects",
    component: <Projects />,
  },
];

const Profile = () => {
  const { data: session } = useSession();

  const [isModalOpen, setIsOpenModal] = useState(false);

  // const openModal = () => {
  // 	setIsOpenModal(true);
  // };
  const closeModal = () => {
    setIsOpenModal(false);
  };

  if (!session) {
    return <Spinner />;
  }

  return (
    <>
      {" "}
      <div className="flex flex-col">
        <section className="flex justify-between">
          <Identity />

          <div className="self-start">
            {/* <button onClick={openModal}>
							<AiFillSetting size={24} color="var(--smart-purple)" />
						</button> */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <AiFillSetting size={24} color="var(--smart-purple)" />
                </Button>
              </DialogTrigger>
              <DialogContent className="flex flex-col justify-start h-full sm:h-auto sm:max-w-[425px] overflow-y-scroll">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Save each detail.
                  </DialogDescription>
                </DialogHeader>
                <AddPhone />
                <AddPosition />
                <AddSkill />
              </DialogContent>
            </Dialog>
          </div>
        </section>
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <Positions />
          <Managers />
        </section>
        <section>
          <Tabs elements={tabsElements} />
        </section>
      </div>
      <Modal open={isModalOpen} onClose={closeModal} title="Edit Info">
        <AddPhone />
        <AddPosition />
        <AddSkill />
      </Modal>
    </>
  );
};

export default Profile;
