import { createContext, useState } from "react";

export const ProblemDataContext = createContext();

export const ProblemDataProvider = ({ children }) => {
  const [fileName, setFileName] = useState(['']);
  const [metaData, setMetaData] = useState({
    test_type: 'test_type',
    organizer: 'organizer',
    date: 'date',
    duration: 'duration',
  });
  const [totalProblemNum, setTotalProblemNum] = useState(0);

  const [jsonFileName, setJsonFileName] = useState('');

  const [masterProblemData, setMasterProblemData] = useState([{
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
  }]);

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