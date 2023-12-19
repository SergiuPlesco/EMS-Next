import Identity from "@/components/Identity/Identity";
import Managers from "@/components/Managers/Managers";
import Positions from "@/components/Positions/Positions";
import Projects from "@/containers/Projects/Projects";
import Skills from "@/containers/Skills/Skills";

const Profile = () => {
  return (
    <div className="flex flex-col">
      <section className="flex justify-between">
        <Identity />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <Positions />
        <Managers />
      </section>
      <section className="mb-10">
        <Skills />
      </section>
      <section className="mb-4">
        <Projects />
      </section>
      {/* <section>
        <Certificates />
      </section> */}
    </div>
  );
};

export default Profile;
