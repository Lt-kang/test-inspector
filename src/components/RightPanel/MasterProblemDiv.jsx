import { useState, useContext, useEffect } from 'react';

import { ProblemDataContext } from '../../context/ProblemDataContext';
import { EtcContext } from '../../context/EtcContext';
import { TargetKeyContext } from '../../context/TargetKeyContext';

import { UnitProblemDataContext } from './UnitProblemDataContext';

import { CustomButton } from './Button';
import ProblemMetaData from './ProblemMetaData';
import KorMarkdownViewer from './MarkdownWithKor';

import MarkdownEditor from './MarkdownEditor';
import MarkdownWithMathRenderer from './MarkdownWithMath';

import { ParsingChoice } from '../etc/parsingObject';


export default function MasterDiv({_type = "Q"}) {
    const { masterProblemData, setMasterProblemData } = useContext(ProblemDataContext);
    const { problemInfoShow, 
            loadStatus } = useContext(EtcContext);
    const { targetSubject, targetProblemNum } = useContext(TargetKeyContext);

    const { unitProblemData, setUnitProblemData,
            unitProblemIndex, setUnitProblemIndex } = useContext(UnitProblemDataContext);

    const [targetIndex, setTargetIndex] = useState(-1);


    useEffect(() => {
      if (!loadStatus) { return; }

      if (targetSubject !== '') {
          setUnitProblemData(masterProblemData.find(item => item.subject === targetSubject && item.problem_num == targetProblemNum));
          setTargetIndex(masterProblemData.findIndex(item => item.subject === targetSubject && item.problem_num == targetProblemNum));
          setUnitProblemIndex(masterProblemData.findIndex(item => item.subject === targetSubject && item.problem_num == targetProblemNum));
      }
    }, [targetSubject, targetProblemNum, masterProblemData]);



    if (_type == "Q") {
      return (
      <div style={{ textAlign: "left" }}>
          <ProblemMetaData problemInfoShow={problemInfoShow} problem_data={unitProblemData} />

          <ProblemTitle  title="question_common" target_key="question_common" unitProblemData={unitProblemData} setUnitProblemData={setUnitProblemData} 
          masterProblemData={masterProblemData} setMasterProblemData={setMasterProblemData} targetIndex={targetIndex} />
          <BoarderLine />

          <ProblemTitle  title="passage_common" target_key="passage_common" unitProblemData={unitProblemData} setUnitProblemData={setUnitProblemData} 
          masterProblemData={masterProblemData} setMasterProblemData={setMasterProblemData} targetIndex={targetIndex} />
          <BoarderLine />

          <ProblemTitle  title="question" target_key="question" unitProblemData={unitProblemData} setUnitProblemData={setUnitProblemData} 
          masterProblemData={masterProblemData} setMasterProblemData={setMasterProblemData} targetIndex={targetIndex} />
          <BoarderLine />

          <ProblemTitle  title="passage" target_key="passage" unitProblemData={unitProblemData} setUnitProblemData={setUnitProblemData} 
          masterProblemData={masterProblemData} setMasterProblemData={setMasterProblemData} targetIndex={targetIndex} />
          <BoarderLine />

          <ProblemTitle  title="choices" target_key="choices" unitProblemData={unitProblemData} setUnitProblemData={setUnitProblemData} 
          masterProblemData={masterProblemData} setMasterProblemData={setMasterProblemData} targetIndex={targetIndex} />
          <BoarderLine />
      </div>
      )
  }

  else if (_type == "A") {
    return (
      <div style={{ textAlign: "left" }}>
          <AnswerTitle title="explanation_common" target_key="explanation_common" unitProblemData={unitProblemData} setUnitProblemData={setUnitProblemData} 
                       masterProblemData={masterProblemData} setMasterProblemData={setMasterProblemData} targetIndex={targetIndex}   />
          <BoarderLine />
  
          <AnswerTitle title="explanation" target_key="explanation" unitProblemData={unitProblemData} setUnitProblemData={setUnitProblemData} 
                       masterProblemData={masterProblemData} setMasterProblemData={setMasterProblemData} targetIndex={targetIndex}   />
          <BoarderLine />
  
          <AnswerTitle title="explanation_wrongchoice" target_key="explanation_wrongchoice" unitProblemData={unitProblemData} setUnitProblemData={setUnitProblemData} 
                       masterProblemData={masterProblemData} setMasterProblemData={setMasterProblemData} targetIndex={targetIndex}   />
          <BoarderLine />
  
          <AnswerTitle title="answer_multiple" target_key="answer_multiple" unitProblemData={unitProblemData} setUnitProblemData={setUnitProblemData} 
                       masterProblemData={masterProblemData} setMasterProblemData={setMasterProblemData} targetIndex={targetIndex}   />
          <BoarderLine />
  
          <AnswerTitle title="answer_short" target_key="answer_short" unitProblemData={unitProblemData} setUnitProblemData={setUnitProblemData}
                       masterProblemData={masterProblemData} setMasterProblemData={setMasterProblemData} targetIndex={targetIndex}   />
          <BoarderLine />
      </div>
      )
}
}

function BoarderLine() {
  return (
    <div class="border-t my-6"></div>
  )
}


function ProblemTitle({ title, target_key }) {
  const [ProblemEditorShow, setProblemEditorShow] = useState(false);
  const { loadStatus } = useContext(EtcContext);
  const { targetSubject, targetProblemNum } = useContext(TargetKeyContext);

  useEffect(() => {
    /**
     * LeftPanel에서 과목 및 항목을 변경할 경우 이미 실행되어있는 Editor를 종료합니다.
     */
    setProblemEditorShow(false);
  }, [targetSubject, targetProblemNum]);


  return (
  <div>
      <h3 class="text-lg font-semibold mb-3">{title} 
        {
        title != "choices" && (
                <CustomButton Text={ProblemEditorShow ? "View" : "Editor"} 
                              onClickFunction={() => {
                                if (!loadStatus) {
                                  return ;
                                }
                                setProblemEditorShow(!ProblemEditorShow)}}
                />
        )}

                  {/* <CustomButton Text={ProblemEditorShow ? "View" : "Editor"} 
                        onClickFunction={() => {
                          if (!loadStatus) {
                            return ;
                          }
                          setProblemEditorShow(!ProblemEditorShow)}}
          /> */}

      </h3>

      <div style={{marginTop: "7px"}}></div>
      <br></br>

      <DivProblemEdit target_key={target_key}
                      ProblemEditorShow={ProblemEditorShow} />
  </div>
  )
}


function DivProblemEdit({ target_key, ProblemEditorShow }) {
    const { unitProblemData, setUnitProblemData } = useContext(UnitProblemDataContext);

    const EditorChangeAction = (v) => {
      setUnitProblemData(prev => ({
        ...prev,
        problem: {
          ...prev.problem,
          [target_key]: v,
        },
      }));
    }

    const contents = (typeof unitProblemData.problem[target_key] == 'object') ?
                      // JSON.stringify(unitProblemData.problem[target_key], null, 4).replace("{", "").replace("}", "") :
                      ParsingChoice(unitProblemData.problem[target_key]) :
                      unitProblemData.problem[target_key];

    if (!ProblemEditorShow) {
        return(
          <div className="prose max-w-none">
            <KorMarkdownViewer content={contents} />
          </div>
        )
      }
      else {
        // Editor button을 눌렀을 때
        return (
            <div className="prose max-w-none">
                <MarkdownEditor 
                    content={unitProblemData.problem[target_key]} 
                    onChange={EditorChangeAction} 
                    />
            </div>
        );
    }
}






function AnswerTitle({ title, target_key }) {
const [AnswerEditorShow, setAnswerEditorShow] = useState(false);
const { loadStatus } = useContext(EtcContext);
const { targetSubject, targetProblemNum } = useContext(TargetKeyContext);

useEffect(() => {
  /**
   * LeftPanel에서 과목 및 항목을 변경할 경우 이미 실행되어있는 Editor를 종료합니다.
   */
  setAnswerEditorShow(false);
}, [targetSubject, targetProblemNum]);


return (
        <div>
          <h3 class="text-lg font-semibold mb-3">{title} 
            {title != "explanation_wrongchoice" && (
              <CustomButton Text={AnswerEditorShow ? "View" : "Editor"} 
                            onClickFunction={() => {
                              if (!loadStatus) {
                                return ;
                              }
                              setAnswerEditorShow(!AnswerEditorShow)}}
              />
            )}
          </h3>

        <div style={{marginTop: "7px"}}></div>
        <br></br>

          <DivAnswerEdit target_key={target_key} 
                         AnswerEditorShow={AnswerEditorShow} />
        </div>
        )
  }



function DivAnswerEdit({target_key, AnswerEditorShow}) {
    const { unitProblemData, setUnitProblemData } = useContext(UnitProblemDataContext);

    const EditorChangeAction = (v) => {
      setUnitProblemData(prev => ({
        ...prev,
        answer: {
          ...prev.answer,
          [target_key]: v,
        },
      }));
    }


    if (!AnswerEditorShow) {
        let contents = ""

        if (typeof unitProblemData.answer[target_key] == 'object') {
          contents = ParsingChoice(unitProblemData.answer[target_key])

          // contents = JSON.stringify(unitProblemData.answer[target_key], null, 4).replace("{", "").replace("}", "")
          // contents = (contents.includes('0"')) ? 
          //             contents.replace('0":', '0":\n') :
          //             contents.replace('common":', 'common":\n');
        }
        else {
          contents = unitProblemData.answer[target_key];
        }


        return (
          <div className="prose max-w-none">
            <KorMarkdownViewer content={contents} />
          </div>
        )
        
    }
    else {
      // Editor button을 눌렀을 때
        return (
            <div class="prose max-w-none">
                <p>
                  <MarkdownEditor content={unitProblemData.answer[target_key]} 
                                  onChange={EditorChangeAction} />
                </p>
            </div>
        );
    }
  }


