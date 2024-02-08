import AvailabilityFilter from "@/components/Filters/AvailabilityFilter/AvailabilityFilter";
import SkillFilter from "@/components/Filters/SkillFilter/SkillFilter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { trpc } from "@/utils/trpc";

import ManagersFilter from "../ManagersFilter/ManagersFilter";
import PositionsFilter from "../PositionsFilter/PositionsFilter";
import ProjectsFilter from "../ProjectsFilter/ProjectsFilter";
import { FILTERS } from "../utils/constans";

const FiltersAccordion = () => {
  const { data: filters } = trpc.filters.all.useQuery();

  return (
    <Accordion defaultValue={FILTERS.OCCUPANCY} type="single" collapsible>
      <AccordionItem value={FILTERS.OCCUPANCY}>
        <AccordionTrigger className="capitalize">
          Current Occupancy
        </AccordionTrigger>
        <AccordionContent>
          <AvailabilityFilter />
        </AccordionContent>
      </AccordionItem>
      {filters?.hasSkills && (
        <AccordionItem value={FILTERS.SKILLS}>
          <AccordionTrigger className="capitalize">
            {FILTERS.SKILLS}
          </AccordionTrigger>
          <AccordionContent>
            <SkillFilter />
          </AccordionContent>
        </AccordionItem>
      )}
      {filters?.hasPositions && (
        <AccordionItem value={FILTERS.POSITIONS}>
          <AccordionTrigger className="capitalize">
            {FILTERS.POSITIONS}
          </AccordionTrigger>
          <AccordionContent>
            <PositionsFilter />
          </AccordionContent>
        </AccordionItem>
      )}
      {filters?.hasProjects && (
        <AccordionItem value={FILTERS.PROJECTS}>
          <AccordionTrigger className="capitalize">
            {FILTERS.PROJECTS}
          </AccordionTrigger>
          <AccordionContent>
            <ProjectsFilter />
          </AccordionContent>
        </AccordionItem>
      )}
      {filters?.hasManagers && (
        <AccordionItem value={FILTERS.MANAGERS}>
          <AccordionTrigger className="capitalize">
            {FILTERS.MANAGERS}
          </AccordionTrigger>
          <AccordionContent>
            <ManagersFilter />
          </AccordionContent>
        </AccordionItem>
      )}
    </Accordion>
  );
};

export default FiltersAccordion;
