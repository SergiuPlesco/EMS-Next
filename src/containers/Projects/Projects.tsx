import React from "react";

const sample = [
  {
    id: 1,
    name: "Harbinger",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.",
    period: "04-2023 - present",
  },
  {
    id: 2,
    name: "LenderBidding App",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.",
    period: "10-2021 - present",
  },
  {
    id: 3,
    name: "LenderBidding Facing Site",
    description:
      "There are many variations of passages of Lorem Ipsum available.",
    period: "07-2022 - present",
  },
  {
    id: 4,
    name: "Smartskills",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc",
    period: "05-2023 - present",
  },
  {
    id: 5,
    name: "CCC - Carbon Capture Company",
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc",
    period: "04-2022 - 06-2022",
  },
];

const Projects = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {sample.map((project) => {
        return (
          <div
            key={project.id}
            className="flex flex-col gap-2 border rounded p-4"
          >
            <div>
              <p className="text-xl font-medium text-slate-700">
                {project.name}
              </p>
            </div>
            <div>
              <p className="text-xs">{project.period}</p>
            </div>
            <div>
              <p className="text-slate-600">{project.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Projects;
