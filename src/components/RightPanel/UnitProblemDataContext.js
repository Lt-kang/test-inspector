import { createContext, useState } from "react";

export const UnitProblemDataContext = createContext();

export const UnitProblemDataProvider = ({ children }) => {
  const [unitProblemIndex, setUnitProblemIndex] = useState(0);
  const [unitProblemData, setUnitProblemData] = useState(    {
    question_id: "",
    section: "",
    problem_number: "",
    passage: "",
    question: "",
    options_text: "",
    score: "",
    answer: "",
    explanation: "",
    attachments: {
      passage: "",
      question: "",
      options_text: "",
      answer: "",
      explanation: ""
    },
    meta: {
      problem_type: "",
      image_full: "",
      image_full_type: "",
      source: ""
    }
  });

  const [lineBreakSwitch, setLineBreakSwitch] = useState(true);

    return (
      <UnitProblemDataContext.Provider value={{ 
                                            unitProblemIndex, setUnitProblemIndex,
                                            unitProblemData, setUnitProblemData, 
                                            lineBreakSwitch, setLineBreakSwitch,
                                            }}>
        {children}
      </UnitProblemDataContext.Provider>
    );
  };