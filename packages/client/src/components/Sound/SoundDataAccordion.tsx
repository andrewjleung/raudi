import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';

type SoundDataAccordionProps = {
  children: React.ReactNode;
};

export default function SoundDataAccordion({
  children,
}: SoundDataAccordionProps) {
  return (
    <>
      <Accordion allowToggle>
        <AccordionItem borderTopWidth={0}>
          <AccordionButton pl={0} flex="1" justifyContent="center">
            <FontAwesomeIcon icon={faEllipsis} className="text-gray-300" />
          </AccordionButton>
          <AccordionPanel pr={0} pl={0} pb={3}>
            {children}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
