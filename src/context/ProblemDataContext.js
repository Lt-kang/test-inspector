import { createContext, useState } from "react";

export const ProblemDataContext = createContext();

export const ProblemDataProvider = ({ children }) => {
  const [fileName, setFileName] = useState('');
  const [metaData, setMetaData] = useState({
    year: null,
    type: null,
    subject: null
  });
  const [totalProblemNum, setTotalProblemNum] = useState(0);

  const [jsonFileName, setJsonFileName] = useState('');

  const [masterProblemData, setMasterProblemData] = useState([
    {
      question_id: null,
      section: null,
      problem_number: null,
      passage: null,
      question: null,
      options_text: null,
      score: null,
      answer: null,
      explanation: null,
      attachments: {
        passage: null,
        question: null,
        options_text: null,
        answer: null,
        explanation: null
      },
      meta: {
        problem_type: null,
        image_full: null,
        image_full_type: null,
        source: null
      }
    }
]);

    return (
      <ProblemDataContext.Provider value={{ fileName, setFileName, 
                                            metaData, setMetaData,
                                            totalProblemNum, setTotalProblemNum,
                                            jsonFileName, setJsonFileName,
                                            masterProblemData, setMasterProblemData, 
                                            }}>
        {children}
      </ProblemDataContext.Provider>
    );
  };