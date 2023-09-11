import React from "react";

const SkillItem = ({ skill }: any) => {
  return (
    <div>
      <div className="flex">
        <p>{skill.title}</p>
      </div>
    </div>
  );
};

export default SkillItem;
