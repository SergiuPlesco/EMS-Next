import AvailabilityFilter from "@/components/Filters/AvailabilityFilter/AvailabilityFilter";
import SkillFilter from "@/components/Filters/SkillFilter/SkillFilter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { FILTERS } from "../utils/constans";

const FiltersAccordion = () => {
  return (
    <Accordion defaultValue={FILTERS.AVAILABILITY} type="single" collapsible>
      <AccordionItem value={FILTERS.AVAILABILITY}>
        <AccordionTrigger className="capitalize">
          {FILTERS.AVAILABILITY}
        </AccordionTrigger>
        <AccordionContent>
          <AvailabilityFilter />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value={FILTERS.SKILLS}>
        <AccordionTrigger className="capitalize">
          {FILTERS.SKILLS}
        </AccordionTrigger>
        <AccordionContent>
          <SkillFilter />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FiltersAccordion;
