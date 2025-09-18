import { createContext, useState } from "react";

export const EtcContext = createContext();

export const EtcProvider = ({ children }) => {
    const [loadStatus, setLoadStatus] = useState(false);
    
    const [answerShow, setAnswerShow] = useState(true);
    const [problemInfoShow, setProblemInfoShow] = useState(false);


    return (
      <EtcContext.Provider value={{ loadStatus, setLoadStatus,
                                    answerShow, setAnswerShow,
                                    problemInfoShow, setProblemInfoShow
                                    }}>
        {children}
      </EtcContext.Provider>
    );
  };