import { createContext, useState } from "react";

export const UnitProblemDataContext = createContext();

export const UnitProblemDataProvider = ({ children }) => {
  const [unitProblemIndex, setUnitProblemIndex] = useState(0);
  const [unitProblemData, setUnitProblemData] = useState({
    grade: 'grade',
    subject: 'subject',
    page_num: 'page_num',
    problem_num: 'problem_num',
    answer_type: 'answer_type',
    score: 'score',
    image_complete: [],
    problem: {
      question_common: 'question_common',
      passage_common: 'passage_common',
      question: 'question',
      passage: 'passage',
      choices: {}
    },
    answer: {
      explanation_common: 'explanation_common',
      explanation: 'explanation',
      explanation_wrongchoice: {},
      answer_multiple: 'answer_multiple',
      answer_short: 'answer_short'
    }
  });

    return (
      <UnitProblemDataContext.Provider value={{ 
                                            unitProblemIndex, setUnitProblemIndex,
                                            unitProblemData, setUnitProblemData, 
                                            }}>
        {children}
      </UnitProblemDataContext.Provider>
    );
  };