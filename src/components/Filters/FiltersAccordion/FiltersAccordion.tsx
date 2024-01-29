import AvailabilityFilter from "@/components/Filters/AvailabilityFilter/AvailabilityFilter";
import SkillFilter from "@/components/Filters/SkillFilter/SkillFilter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import ManagersFilter from "../ManagersFilter/ManagersFilter";
import PositionsFilter from "../PositionsFilter/PositionsFilter";
import ProjectsFilter from "../ProjectsFilter/ProjectsFilter";
import { FILTERS } from "../utils/constans";
// import { trpc } from "@/utils/trpc";

const FiltersAccordion = () => {
  // const { data: filters } = trpc.filters.all.useQuery();

  return (
    <Accordion defaultValue={FILTERS.AVAILABILITY} type="single" collapsible>
      <AccordionItem value={FILTERS.AVAILABILITY}>
        <AccordionTrigger className="capitalize text-left">
          Employees available for new projects
        </AccordionTrigger>
        <AccordionContent>
          <AvailabilityFilter />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value={FILTERS.SKILLS}>
        <AccordionTrigger className="capitalize">
          Employees with skills
        </AccordionTrigger>
        <AccordionContent>
          <SkillFilter />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value={FILTERS.POSITIONS}>
        <AccordionTrigger className="capitalize">
          Employees with positions
        </AccordionTrigger>
        <AccordionContent>
          <PositionsFilter />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value={FILTERS.PROJECTS}>
        <AccordionTrigger className="capitalize">
          Project&apos;s Team
        </AccordionTrigger>
        <AccordionContent>
          <ProjectsFilter />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value={FILTERS.MANAGERS}>
        <AccordionTrigger className="capitalize">
          Manager&apos;s Team
        </AccordionTrigger>
        <AccordionContent>
          <ManagersFilter />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FiltersAccordion;
