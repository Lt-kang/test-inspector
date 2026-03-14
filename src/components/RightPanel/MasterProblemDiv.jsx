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




export default function MasterDiv() {
    const { masterProblemData } = useContext(ProblemDataContext);
    const { problemInfoShow, 
            loadStatus } = useContext(EtcContext);
    const { targetSubject, targetProblemNum } = useContext(TargetKeyContext);

    const { unitProblemData, setUnitProblemData,
            setUnitProblemIndex } = useContext(UnitProblemDataContext);

    useEffect(() => {
      if (!loadStatus || targetSubject === '') return;

      const idx = masterProblemData.findIndex(
        item => item.section === targetSubject &&
                String(item.problem_number) === String(targetProblemNum)
      );
      setUnitProblemIndex(idx);
      if (idx !== -1) setUnitProblemData(masterProblemData[idx]);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetSubject, targetProblemNum]);



    return (
      <div style={{ textAlign: "left" }}>
          <ProblemMetaData problemInfoShow={problemInfoShow} problem_data={unitProblemData} />


          {/* <ProblemTitle  title="question_id" target_key="question_id" />
          <BoarderLine />

          <ProblemTitle  title="section" target_key="section" />
          <BoarderLine />

          <ProblemTitle  title="problem_number" target_key="problem_number" />
          <BoarderLine /> */}

          <ProblemTitle  title="passage" target_key="passage" />
          <BoarderLine />

          <ProblemTitle  title="question" target_key="question" />
          <BoarderLine />

          <ProblemTitle  title="options_text" target_key="options_text" />
          <BoarderLine />

          <ProblemTitle  title="score" target_key="score" />
          <BoarderLine />

          <ProblemTitle  title="answer" target_key="answer" />
          <BoarderLine />

          <ProblemTitle  title="explanation" target_key="explanation" />
          <BoarderLine />

          <ProblemTitle  title="attachments" target_key="attachments" />
          <BoarderLine />

          {/* <ProblemTitle  title="meta" target_key="meta" />
          <BoarderLine /> */}

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
      setUnitProblemData(prev => ({
        ...(prev ?? {}),
        [target_key]: v,
      }));
    }


    const contents = (typeof unitProblemData[target_key] == 'object') ?
                              ParsingChoice(unitProblemData[target_key]) :
                              unitProblemData[target_key] ?? "null";

    
    
    if (!ProblemEditorShow) {
        return(
            <KorMarkdownViewer content={contents} />
        )
      }
      else {
        // Editor button을 눌렀을 때
        if (["attachments", "meta"].includes(target_key)) {
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






