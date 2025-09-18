import './App.css';

import { useState, useEffect, useContext } from 'react';

import TopNav from './components/TopNav';
import LeftPanel from './components/LeftPanel';
import RightPanel from './components/RightPanel';
import HistoryPopup from './components/Popup/HistoryPopup';
import JsonViewerPopup from './components/Popup/JsonPopup';

import { ProblemDataProvider } from './context/ProblemDataContext';
import { ProblemCountProvider } from './context/ProblemCountContext'
import { TargetKeyProvider } from './context/TargetKeyContext';
import { EtcProvider } from './context/EtcContext';
import { HistoryProvider } from './context/HistoryContext';

import { PopupContext } from './context/PopupContext';

import "https://esm.run/mathlive";


function App() {
  const { isPopupOpen, 
          isJsonPopupOpen, 
          isUnitJsonPopupOpen } = useContext(PopupContext);


  const [bodyStyle, setBodyStyle] = useState({pointerEvents: "auto"});

  useEffect(() => {
    if (isPopupOpen || isJsonPopupOpen || isUnitJsonPopupOpen) {
      // setBodyStyle({pointerEvents: "None", overflow: "hidden", height: "100vh"});
      setBodyStyle({overflow: "hidden", height: "100vh"});
    } else {
      setBodyStyle({pointerEvents: "auto"});
    }
  }, [isPopupOpen, isJsonPopupOpen, isUnitJsonPopupOpen]);
 

  return (
    <ProblemDataProvider>
        <ProblemCountProvider>
          <TargetKeyProvider>
            <EtcProvider>
              <HistoryProvider>

        <div className="App" style={bodyStyle}>
          <div className="min-h-screen bg-background">
          <TopNav />

            <div className="container mx-auto px-4 py-6">
              <div className="grid lg:grid-cols-5 gap-6">
                <LeftPanel />

                  <RightPanel />
                    {isPopupOpen && <HistoryPopup />}

                    {isJsonPopupOpen && <JsonViewerPopup />}

              </div>
            </div>
          </div>
        </div>

              </HistoryProvider>
            </EtcProvider>
          </TargetKeyProvider>
        </ProblemCountProvider>
    </ProblemDataProvider>
  );
}

export default App;
