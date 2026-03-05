import { useState, useContext, useEffect } from 'react';

import { ProblemDataContext } from '../../context/ProblemDataContext';
import { EtcContext } from '../../context/EtcContext';
import { TargetKeyContext } from '../../context/TargetKeyContext';

import { UnitProblemDataContext } from './UnitProblemDataContext';

import { CustomButton } from './Button';
import ProblemMetaData from './ProblemMetaData';
import KorMarkdownViewer from './MarkdownWithKor';

import MarkdownEditor from './MarkdownEditor';
import ChoiceEditor from './ChoiceEditor';

import { ParsingChoice } from '../etc/parsingObject';



const insepct_list = [
  "question_id",
  "section",
  "problem_number",
  "passage",
  "question",
  "options_text",
  "score",
  "answer",
  "explanation",
  "attachments",
  "meta"
]



export default function MasterDiv() {
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
          setUnitProblemData(masterProblemData.find(item => item.section === targetSubject && item.problem_number == targetProblemNum));
          setTargetIndex(masterProblemData.findIndex(item => item.section === targetSubject && item.problem_number == targetProblemNum));
          setUnitProblemIndex(masterProblemData.findIndex(item => item.section === targetSubject && item.problem_number == targetProblemNum));
      }
    }, [targetSubject, targetProblemNum, masterProblemData]);



    return (
      <div style={{ textAlign: "left" }}>
          <ProblemMetaData problemInfoShow={problemInfoShow} problem_data={unitProblemData} />


          <ProblemTitle  title="question_id" target_key="question_id" unitProblemData={unitProblemData} setUnitProblemData={setUnitProblemData} 
          masterProblemData={masterProblemData} setMasterProblemData={setMasterProblemData} targetIndex={targetIndex} />
          <BoarderLine />

          <ProblemTitle  title="section" target_key="section" unitProblemData={unitProblemData} setUnitProblemData={setUnitProblemData} 
          masterProblemData={masterProblemData} setMasterProblemData={setMasterProblemData} targetIndex={targetIndex} />
          <BoarderLine />

          <ProblemTitle  title="problem_number" target_key="problem_number" unitProblemData={unitProblemData} setUnitProblemData={setUnitProblemData} 
          masterProblemData={masterProblemData} setMasterProblemData={setMasterProblemData} targetIndex={targetIndex} />
          <BoarderLine />

          <ProblemTitle  title="passage" target_key="passage" unitProblemData={unitProblemData} setUnitProblemData={setUnitProblemData} 
          masterProblemData={masterProblemData} setMasterProblemData={setMasterProblemData} targetIndex={targetIndex} />
          <BoarderLine />

          <ProblemTitle  title="question" target_key="question" unitProblemData={unitProblemData} setUnitProblemData={setUnitProblemData} 
          masterProblemData={masterProblemData} setMasterProblemData={setMasterProblemData} targetIndex={targetIndex} />
          <BoarderLine />

          <ProblemTitle  title="options_text" target_key="options_text" unitProblemData={unitProblemData} setUnitProblemData={setUnitProblemData} 
          masterProblemData={masterProblemData} setMasterProblemData={setMasterProblemData} targetIndex={targetIndex} />
          <BoarderLine />

          <ProblemTitle  title="score" target_key="score" unitProblemData={unitProblemData} setUnitProblemData={setUnitProblemData} 
          masterProblemData={masterProblemData} setMasterProblemData={setMasterProblemData} targetIndex={targetIndex} />
          <BoarderLine />

          <ProblemTitle  title="answer" target_key="answer" unitProblemData={unitProblemData} setUnitProblemData={setUnitProblemData} 
          masterProblemData={masterProblemData} setMasterProblemData={setMasterProblemData} targetIndex={targetIndex} />
          <BoarderLine />

          <ProblemTitle  title="explanation" target_key="explanation" unitProblemData={unitProblemData} setUnitProblemData={setUnitProblemData} 
          masterProblemData={masterProblemData} setMasterProblemData={setMasterProblemData} targetIndex={targetIndex} />
          <BoarderLine />

          <ProblemTitle  title="attachments" target_key="attachments" unitProblemData={unitProblemData} setUnitProblemData={setUnitProblemData} 
          masterProblemData={masterProblemData} setMasterProblemData={setMasterProblemData} targetIndex={targetIndex} />
          <BoarderLine />

          <ProblemTitle  title="meta" target_key="meta" unitProblemData={unitProblemData} setUnitProblemData={setUnitProblemData} 
          masterProblemData={masterProblemData} setMasterProblemData={setMasterProblemData} targetIndex={targetIndex} />
          <BoarderLine />

      </div>
    )
}


function BoarderLine() {
  return (
    <div class="border-t my-6"></div>
  )
}



const edit_key = [
  // "question_id",
  // "section",
  // "problem_number",
  "passage",
  "question",
  "options_text",
  // "score",
  // "answer",
  "explanation",
  // "attachments",
  // "meta"
]

function ProblemTitle({ title, target_key }) {
  const [ProblemEditorShow, setProblemEditorShow] = useState(false);
  const { loadStatus } = useContext(EtcContext);
  const { targetSubject, targetProblemNum } = useContext(TargetKeyContext);

  useEffect(() => {
    setProblemEditorShow(false);
  }, [targetSubject, targetProblemNum]);


  return (
  <div>
      <h3 class="text-lg font-semibold mb-3">{title} 

        {edit_key.includes(title) && (
        
        <CustomButton Text={ProblemEditorShow ? "View" : "Editor"} 
          onClickFunction={() => {
            if (!loadStatus) {
              return ;
            }
            setProblemEditorShow(!ProblemEditorShow)}}
            />)}
        
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
      console.log("v: ", v)
      setUnitProblemData(prev => ({
        ...(prev ?? {}),
        [target_key]: v,
      }));
      console.log("unitProblemData: ", unitProblemData)
    }


    const contents = (typeof unitProblemData[target_key] == 'object') ?
                              ParsingChoice(unitProblemData[target_key]) :
                              unitProblemData[target_key] ?? "null";

    
    
    // const contents = unitProblemData[target_key] ?? "None";

    if (!ProblemEditorShow) {
        return(
            <KorMarkdownViewer content={contents} />
        )
      }
      else {
        // Editor button을 눌렀을 때
        if (target_key in ["attachments", "meta"]) {
            return (
                  <ChoiceEditor 
                      content={unitProblemData[target_key]} 
                      onChange={EditorChangeAction} 
                      />
          )
        } else {
            return (
                  <MarkdownEditor 
                      content={unitProblemData[target_key]} 
                      onChange={EditorChangeAction} 
                      />
          );
        }

        
    }
}






function AnswerTitle({ title, target_key }) {
const [AnswerEditorShow, setAnswerEditorShow] = useState(false);
const { loadStatus } = useContext(EtcContext);
const { targetSubject, targetProblemNum } = useContext(TargetKeyContext);

useEffect(() => {
  setAnswerEditorShow(false);
}, [targetSubject, targetProblemNum]);


return (
        <div>
          <h3 class="text-lg font-semibold mb-3">{title} 
              <CustomButton Text={AnswerEditorShow ? "View" : "Editor"} 
                            onClickFunction={() => {
                              if (!loadStatus) {
                                return ;
                              }
                              setAnswerEditorShow(!AnswerEditorShow)}} />
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
        [target_key]: v,
      }));
    }


    if (!AnswerEditorShow) {
        let contents = ""

        if (typeof unitProblemData.answer[target_key] == 'object') {
          contents = ParsingChoice(unitProblemData.answer[target_key])
        }
        else {
          contents = unitProblemData.answer[target_key];
        }


        return (
        <KorMarkdownViewer content={contents} />
      )
        
    }
    else {
      // Editor button을 눌렀을 때
      if (target_key == "explanation_wrongchoice") {
        return (
              <ChoiceEditor 
                  content={unitProblemData.answer[target_key]} 
                  onChange={EditorChangeAction} 
                  />
        )
      } else {
          return (
                    <MarkdownEditor content={unitProblemData.answer[target_key]} 
                                    onChange={EditorChangeAction} />
          )
      }
    }
  }
