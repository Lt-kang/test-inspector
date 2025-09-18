import { createContext, useState } from "react";

export const ProblemCountContext = createContext();

export const ProblemCountProvider = ({ children }) => {
  const [correct_count, setCorrectCount] = useState(0);
  const [wrong_count, setWrongCount] = useState(0);
  const [unresolved_count, setUnresolvedCount] = useState(0);
    
    return (
      <ProblemCountContext.Provider value={{ correct_count, setCorrectCount, wrong_count, setWrongCount, unresolved_count, setUnresolvedCount }}>
        {children}
      </ProblemCountContext.Provider>
    );
  };