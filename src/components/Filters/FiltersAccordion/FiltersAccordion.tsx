import AvailabilityFilter from "@/components/Filters/AvailabilityFilter/AvailabilityFilter";
import SkillFilter from "@/components/Filters/SkillFilter/SkillFilter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FiltersAccordion = () => {
  return (
    <Accordion defaultValue="Availability" type="single" collapsible>
      <AccordionItem value="Availability">
        <AccordionTrigger>Availability</AccordionTrigger>
        <AccordionContent>
          <AvailabilityFilter />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="Skills">
        <AccordionTrigger>Skills</AccordionTrigger>
        <AccordionContent>
          <SkillFilter />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FiltersAccordion;
