import { createContext, useState } from "react";

export const HistoryContext = createContext();

export const HistoryProvider = ({ children }) => {
    const [history, setHistory] = useState([]);

  //   {
  //     index: 0,
  //     subject: 'subject',
  //     problem_num: 'problem_num',
  //     key: 'key',
  //     value_before: 'value_before',
  //     value_after: 'value_after'
  // }


    return (
      <HistoryContext.Provider value={{ history, setHistory }}>
        {children}
      </HistoryContext.Provider>
    );
  };