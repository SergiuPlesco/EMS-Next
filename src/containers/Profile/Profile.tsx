import AddSkill from "@/components/AddSkill/AddSkill";
import Identity from "@/components/Identity/Identity";
import Managers from "@/components/Managers/Managers";
import Modal from "@/components/Modal/Modal";
import Positions from "@/components/Positions/Positions";
import Tabs from "@/components/Tabs/Tabs";
import Projects from "@/containers/Projects/Projects";
import Skills from "@/containers/Skills/Skills";

import Availability from "../Availability/Availability";
import Certificates from "../Certificates/Certificates";

const tabsElements = [
  {
    label: "Skills",
    component: <Skills />,
  },
  {
    label: "Projects",
    component: <Projects />,
  },
  {
    label: "Availability",
    component: <Availability />,
  },
  {
    label: "Certificates",
    component: <Certificates />,
  },
];

const Profile = () => {
  return (
    <>
      <div className="flex flex-col">
        <section className="flex justify-between">
          <Identity />

          <div className="self-start">
            <Modal
              title="Edit profile"
              description="Make changes to your profile here. Save each detail."
            >
              <AddSkill />
            </Modal>
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
    </>
  );
};

export default Profile;
