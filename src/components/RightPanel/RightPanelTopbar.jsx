import { ProblemInfoButton, CorrectButton, WrongButton, UnresolvedButton, SaveButton } from './Button';

import { useState, useContext, useEffect } from 'react';
import { ProblemDataContext } from '../../context/ProblemDataContext';
import { TargetKeyContext } from '../../context/TargetKeyContext';
import { EtcContext } from '../../context/EtcContext';

import { UnitProblemDataContext } from './UnitProblemDataContext';
import { HistoryContext } from '../../context/HistoryContext';
import { PopupContext } from '../../context/PopupContext';

import UnitJsonViewerPopup from '../Popup/UnitJsonPopup';



const someDivClass = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground"
const someButtonClass = "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"

function RightPanelTopbar() {
  const { isUnitJsonPopupOpen, 
          isJsonPopupOpen,
          isPopupOpen } = useContext(PopupContext);
   

  const { masterProblemData, setMasterProblemData } = useContext(ProblemDataContext);
  const { targetSubject, targetProblemNum, setTargetProblemNum } = useContext(TargetKeyContext);
  const { loadStatus, problemInfoShow, setProblemInfoShow } = useContext(EtcContext);

  const { unitProblemData, unitProblemIndex } = useContext(UnitProblemDataContext);

  const { setHistory } = useContext(HistoryContext);


  const targetSubjectCount = masterProblemData.filter(item => item.subject === targetSubject).length;

  const SaveAction = () => {
    /*
    모든 key 순회 후 변경된 값이 있는지 확인 후 
    history 추가
    */
    if (!loadStatus) {
      return ;
    }


    for (const key in unitProblemData.problem) {
      if (unitProblemData.problem[key] !== masterProblemData[unitProblemIndex].problem[key] && unitProblemData.problem[key] != "[object Object]") {
        setHistory(prev => [...prev, {
          index: prev.length + 1,
          subject: unitProblemData.subject,
          problem_num: unitProblemData.problem_num,
          key: key,
          value_before: masterProblemData[unitProblemIndex].problem[key],
          value_after: unitProblemData.problem[key],
        }]);
      }
    }

    for (const key in unitProblemData.answer) {
      if (unitProblemData.answer[key] !== masterProblemData[unitProblemIndex].answer[key] && unitProblemData.answer[key] != "[object Object]") {
        setHistory(prev => [...prev, {
          index: prev.length + 1,
          subject: unitProblemData.subject,
          problem_num: unitProblemData.problem_num,
          key: key,
          value_before: masterProblemData[unitProblemIndex].answer[key],
          value_after: unitProblemData.answer[key],
        }]);
      }
    }

    const updatedMasterProblemData = [...masterProblemData];
    updatedMasterProblemData[unitProblemIndex] = unitProblemData;

    setMasterProblemData(updatedMasterProblemData);
  }


    return (
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="font-semibold tracking-tight text-xl" style={{ textAlign: "left" }}>Problem {targetProblemNum}</div>
              <div className="flex gap-2 flex-wrap">
                <div className={someDivClass + " bg-secondary text-secondary-foreground hover:bg-secondary/80"}>
                  {unitProblemData.subject}
                </div>
                <div className={someDivClass}>
                  {unitProblemData.answer_type}
                </div>
                <div className={someDivClass}>
                  {unitProblemData.score.endsWith('점') ? unitProblemData.score : unitProblemData.score + '점'}
                </div>
                <div className={someDivClass}>
                  {unitProblemData.grade.endsWith('학년') ? unitProblemData.grade : unitProblemData.grade + '학년'}
                </div>
                <div className={someDivClass}>
                  p.{unitProblemData.page_num}
                </div>
              </div>
            </div>
          <div className="flex gap-2">

          <SaveButton onClickFunction={SaveAction}
                      loadCheck={loadStatus} />

          <ViewJsonButton />
          {isUnitJsonPopupOpen && <UnitJsonViewerPopup unitJsonData={unitProblemData} />}

            <div className="border-l mx-2"></div>

            <ProblemInfoButton onClickFunction={() => { if (!loadStatus) {return ;}
                                                        setProblemInfoShow(!problemInfoShow)}} />
            <CorrectButton onClickFunction={() => {}} />
            <WrongButton onClickFunction={() => {}} />
            <UnresolvedButton onClickFunction={() => {}} />

            <div className="border-l mx-2"></div>

            <button className={someButtonClass} 
            disabled={targetProblemNum == 1 && !(isUnitJsonPopupOpen || isJsonPopupOpen || isPopupOpen)}
            onClick={() => {
              if (!loadStatus) {return ;}
              setTargetProblemNum(parseInt(targetProblemNum) - 1)}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left h-4 w-4">
                <path d="m15 18-6-6 6-6"></path>
              </svg>
            </button>

            <button className={someButtonClass}
            disabled={targetProblemNum == targetSubjectCount}
            onClick={() => {
              if (!loadStatus) {return ;}
              setTargetProblemNum(parseInt(targetProblemNum) + 1)}}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right h-4 w-4">
                <path d="m9 18 6-6-6-6"></path>
              </svg>
            </button>

          </div>
        </div>
      </div>
    )
}

export default RightPanelTopbar;


function ViewJsonButton() {
  const { isUnitJsonPopupOpen, setIsUnitJsonPopupOpen } = useContext(PopupContext);
  return (
    <button 
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 mr-1 bg-transparent" 
      type="button" 
      aria-haspopup="dialog" 
      aria-expanded="false" 
      aria-controls="radix-«r7»" 
      data-state="closed"
      onClick={() => {setIsUnitJsonPopupOpen(true)}}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="lucide lucide-code h-4 w-4"
      >
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    </button>
  )
}