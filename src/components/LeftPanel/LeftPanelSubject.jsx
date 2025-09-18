import { useState, useContext } from "react";
import { ProblemDataContext } from "../../context/ProblemDataContext";
import { TargetKeyContext } from "../../context/TargetKeyContext";
import { EtcContext } from "../../context/EtcContext";


const button_on = "inline-flex items-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-3 flex-1 justify-start h-8 text-xs"
const button_off = "inline-flex items-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md px-3 flex-1 justify-start h-8 text-xs"

const openStyle = {"--radix-collapsible-content-height": "1616px", "--radix-collapsible-content-width": "257.25px"}
const tempClass = "inline-flex items-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 hover:bg-accent hover:text-accent-foreground w-full justify-between p-2 h-auto"
function SubjectList({ subject, subjectCount, masterProblemData}) {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <div data-state={isOpen ? "open" : "closed"}>
              <button className={tempClass} type="button" aria-controls="radix-«rf»" aria-expanded={isOpen} data-state={isOpen ? "open" : "closed"}
              onClick={() => setIsOpen(!isOpen)}>

              <div className="flex items-center gap-2">
                  <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80">{subject}</div>
                  <span className="text-sm text-muted-foreground">({subjectCount})</span>
              </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down h-4 w-4">
                      <path d="m6 9 6 6 6-6"></path>
                  </svg>
              </button>
          <div data-state={isOpen ? "open" : "closed"} id="test_id" hidden="" className="space-y-1 mt-1" style={isOpen ? openStyle : {}}></div>
          {isOpen && <div>
            {masterProblemData.filter(item => item.subject === subject).map(item => (
                <UnitProblemList key={`${subject}-${item.problem_num}`} subject={subject} problemNum={item.problem_num} />
            ))}
          </div>}
        </div>
      </div>
    );
  }


function UnitProblemList({ subject, problemNum }) {
    // const [selectOpen, setSelectOpen] = useState(false);

    const { targetSubject, targetProblemNum, setTargetSubject, setTargetProblemNum } = useContext(TargetKeyContext);
    const { loadStatus } = useContext(EtcContext);
    const isSelected = targetSubject === subject && targetProblemNum == problemNum;

    const handleProblemClick = () => {
        if (!loadStatus) {
            return;
        }
        setTargetSubject(subject);
        setTargetProblemNum(parseInt(problemNum));
    }

    return (
        <div className="flex items-center gap-2 pl-4" style={{marginBottom: "3px"}}>
            <button className={isSelected ? button_on : button_off} onClick={() => handleProblemClick()}>
                <span className="truncate">{problemNum}번</span>
            </button>
            <div className="flex gap-1"></div>
        </div>
    );
}


export default function LeftPanelSubject() {
    const { masterProblemData } = useContext(ProblemDataContext);

    const subjectSet = new Set(masterProblemData.map(item => item.subject));
    const subjectCount = new Map(Array.from(subjectSet).map(subject => [subject, masterProblemData.filter(item => item.subject === subject).length]));
    

  return (
        <div className="p-0">
            {/* 420px */}
            <div dir="ltr" className="relative overflow-hidden h-[calc(100vh-276px)]" style={{position: "relative", "--radix-scroll-area-corner-width": "0px", "--radix-scroll-area-corner-height": "0px"}}>
                {/* <style>{`[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}`}</style> */}
                <style>{`[data-radix-scroll-area-viewport]{scrollbar-width:auto;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}`}</style>
                <div data-radix-scroll-area-viewport="" className="h-full w-full rounded-[inherit]" style={{overflow: "hidden scroll"}}>
                    <div style={{minWidth: "100%", display: "table"}}>
                        <div className="p-4 space-y-2">
                            {Array.from(subjectSet).map(subject => (
                                <SubjectList key={subject} subject={subject} subjectCount={subjectCount.get(subject)} masterProblemData={masterProblemData} />
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
  );
}

