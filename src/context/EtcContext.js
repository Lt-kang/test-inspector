import { createContext, useState } from "react";

export const EtcContext = createContext();

export const EtcProvider = ({ children }) => {
    const [loadStatus, setLoadStatus] = useState(false);
    const [problemInfoShow, setProblemInfoShow] = useState(false);
    const [problemStatuses, setProblemStatuses] = useState({});

    return (
      <EtcContext.Provider value={{ loadStatus, setLoadStatus,
                                    problemInfoShow, setProblemInfoShow,
                                    problemStatuses, setProblemStatuses
                                    }}>
        {children}
      </EtcContext.Provider>
    );
  };