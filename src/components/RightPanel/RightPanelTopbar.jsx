import { SaveButton, FlashButton } from './Button';

import { useContext, useEffect, useRef } from 'react';
import { ProblemDataContext } from '../../context/ProblemDataContext';
import { TargetKeyContext } from '../../context/TargetKeyContext';
import { EtcContext } from '../../context/EtcContext';

import { UnitProblemDataContext } from './UnitProblemDataContext';
import { PopupContext } from '../../context/PopupContext';

import UnitJsonViewerPopup from '../Popup/UnitJsonPopup';



const someButtonClass = "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"

function RightPanelTopbar() {
  const { isUnitJsonPopupOpen, 
          isJsonPopupOpen,
          isPopupOpen } = useContext(PopupContext);
   

  const { masterProblemData, setMasterProblemData } = useContext(ProblemDataContext);
  const { targetSubject, targetProblemNum, setTargetProblemNum } = useContext(TargetKeyContext);
  const { loadStatus, problemInfoShow, setProblemInfoShow, problemStatuses, setProblemStatuses } = useContext(EtcContext);

  const { unitProblemData, unitProblemIndex } = useContext(UnitProblemDataContext);

  const targetSubjectCount = masterProblemData.filter(item => item.section === targetSubject).length;

  const saveButtonRef = useRef(null);
  const resetRef = useRef(null);
  const prevRef  = useRef(null);
  const nextRef  = useRef(null);

  const SaveAction = () => {
    if (!loadStatus) return;
    const isMultipleChoice = unitProblemData?.meta?.problem_type === 'multiple_choice';
    const rawAnswer = unitProblemData?.answer;
    const coercedAnswer = isMultipleChoice
      ? (rawAnswer === '' || rawAnswer == null ? rawAnswer : parseInt(rawAnswer, 10))
      : (rawAnswer == null ? rawAnswer : String(rawAnswer));
    const updatedMasterProblemData = [...masterProblemData];
    updatedMasterProblemData[unitProblemIndex] = { ...unitProblemData, answer: coercedAnswer };
    setMasterProblemData(updatedMasterProblemData);
  };

  const markStatus = (status) => {
    if (!loadStatus) return;
    const qid = unitProblemData?.question_id;
    if (!qid) return;
    setProblemStatuses(prev => {
      if (status === null) {
        const next = { ...prev };
        delete next[qid];
        return next;
      }
      return { ...prev, [qid]: status };
    });
  };

  const currentStatus = problemStatuses[unitProblemData?.question_id] ?? null;

  useEffect(() => {
    const handler = (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'w' || e.key === 'W') markStatus(currentStatus === 'correct' ? null : 'correct');
      if (e.key === 'e' || e.key === 'E') markStatus(currentStatus === 'wrong' ? null : 'wrong');
      if (e.key === 'r' || e.key === 'R') resetRef.current?.click();
      if (e.key === 'q' || e.key === 'Q') saveButtonRef.current?.click();
      if (e.key === 'd' || e.key === 'D') prevRef.current?.click();
      if (e.key === 'f' || e.key === 'F') nextRef.current?.click();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStatus, unitProblemData, loadStatus, targetProblemNum, targetSubjectCount]);

  const problemTypeLabel = {
    multiple_choice: '객관식',
    short_answer: '주관식',
    essay: '서술형',
  }[unitProblemData?.meta?.problem_type] ?? null;

  const badgeBase = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  const badgeFilled = `${badgeBase} border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80`;
  const badgeOutline = `${badgeBase} text-foreground`;

  return (
    <div className="flex flex-col space-y-1.5 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="font-semibold tracking-tight text-xl" style={{ textAlign: "left" }}>Problem {targetProblemNum}</div>
          <div className="flex gap-2 flex-wrap">
            <div className={badgeFilled}>{targetSubject || '과목'}</div>
            <div className={badgeOutline}>{problemTypeLabel || '문제유형'}</div>
            <div className={badgeOutline}>{!loadStatus ? '점수' : unitProblemData?.score != null ? `${unitProblemData.score}점` : '-점'}</div>
            <div className={`${badgeOutline} font-mono`}>{unitProblemData?.question_id || 'question_id'}</div>
            {currentStatus === 'correct' && (
              <div className={`${badgeBase} border-transparent bg-green-600 text-green-50 hover:bg-green-600/80`}>정답</div>
            )}
            {currentStatus === 'wrong' && (
              <div className={`${badgeBase} border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80`}>오답</div>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <SaveButton ref={saveButtonRef} onClickFunction={SaveAction} loadCheck={loadStatus} />

          <div className="border-l mx-2"></div>
          
          <button className={someButtonClass}
            onClick={() => { if (!loadStatus) return; setProblemInfoShow(!problemInfoShow); }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-info h-4 w-4">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
          </button>

          <ViewJsonButton />
          {isUnitJsonPopupOpen && <UnitJsonViewerPopup unitJsonData={unitProblemData} />}

          <div className="border-l mx-2"></div>

          <button
            className={`${someButtonClass}${currentStatus === 'correct' ? ' bg-green-100' : ''}`}
            onClick={() => markStatus(currentStatus === 'correct' ? null : 'correct')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check h-4 w-4 text-green-600">
              <path d="M20 6 9 17l-5-5"></path>
            </svg>
          </button>

          <button
            className={`${someButtonClass}${currentStatus === 'wrong' ? ' bg-red-100' : ''}`}
            onClick={() => markStatus(currentStatus === 'wrong' ? null : 'wrong')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x h-4 w-4 text-red-600">
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>

          <FlashButton ref={resetRef} noMargin onClickFunction={() => markStatus(null)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-rotate-ccw h-4 w-4">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
            </svg>
          </FlashButton>

          <div className="border-l mx-2"></div>

          <FlashButton
            ref={prevRef}
            noMargin
            disabled={parseInt(targetProblemNum) === 1 && !(isUnitJsonPopupOpen || isJsonPopupOpen || isPopupOpen)}
            onClickFunction={() => { if (!loadStatus) return; setTargetProblemNum(parseInt(targetProblemNum) - 1); }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left h-4 w-4">
              <path d="m15 18-6-6 6-6"></path>
            </svg>
          </FlashButton>

          <FlashButton
            ref={nextRef}
            noMargin
            disabled={parseInt(targetProblemNum) === targetSubjectCount}
            onClickFunction={() => { if (!loadStatus) return; setTargetProblemNum(parseInt(targetProblemNum) + 1); }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right h-4 w-4">
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </FlashButton>
        </div>
      </div>
    </div>
  );
}

export default RightPanelTopbar;


function ViewJsonButton() {
  const { setIsUnitJsonPopupOpen } = useContext(PopupContext);
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