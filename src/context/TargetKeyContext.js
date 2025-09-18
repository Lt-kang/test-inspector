import { createContext, useState } from "react";

export const TargetKeyContext = createContext();

export const TargetKeyProvider = ({ children }) => {
  const [targetSubject, setTargetSubject] = useState('');
  const [targetProblemNum, setTargetProblemNum] = useState(1);

  return (
    <TargetKeyContext.Provider value={{ targetSubject, setTargetSubject, 
                                        targetProblemNum, setTargetProblemNum, 
                                      }}>
      {children}
    </TargetKeyContext.Provider>
  );
};