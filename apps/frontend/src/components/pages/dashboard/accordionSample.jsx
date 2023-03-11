import React, { useState } from "react";
import FaqAccordion from "../../layout/elements/Accordion/accordion";

function Dashboard() {
  const [toggleId, setToggleId] = useState("");

  return (
    <div>
      <FaqAccordion
        accordionId="Acc1"
        setToggleId={setToggleId}
        toggleId={toggleId}
        title={<h3>Accordion 1</h3>}
      >
        This is a sample accordion
      </FaqAccordion>

      <FaqAccordion
        accordionId="Acc2"
        setToggleId={setToggleId}
        toggleId={toggleId}
        title={<h3>Accordion 2</h3>}
      >
        This is another sample accordion
      </FaqAccordion>

      <FaqAccordion
        accordionId="Acc3"
        setToggleId={setToggleId}
        toggleId={toggleId}
        title={<h3>Accordion 3</h3>}
      >
        This is a third sample accordion
      </FaqAccordion>
    </div>
  );
}

export default Dashboard;
