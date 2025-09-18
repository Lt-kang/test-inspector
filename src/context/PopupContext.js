import { createContext, useState } from "react";

export const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isJsonPopupOpen, setIsJsonPopupOpen] = useState(false);
    const [isUnitJsonPopupOpen, setIsUnitJsonPopupOpen] = useState(false);


    return (
      <PopupContext.Provider value={{ isPopupOpen, setIsPopupOpen,
                                    isJsonPopupOpen, setIsJsonPopupOpen,
                                    isUnitJsonPopupOpen, setIsUnitJsonPopupOpen
                                    }}>
        {children}
      </PopupContext.Provider>
    );
  };