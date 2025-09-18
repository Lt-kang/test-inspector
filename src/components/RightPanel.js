import React, { useState } from "react";


import { AnswerHideButton } from './RightPanel/Button';
import RightPanelTopbar from './RightPanel/RightPanelTopbar';
import MasterDiv from './RightPanel/MasterProblemDiv';

import { UnitProblemDataProvider } from './RightPanel/UnitProblemDataContext';



const activate_save = {backgroundColor: "#0085cf", color: "white", marginLeft: "5px"}



function BoarderLine() {
  return (
    <div className="border-t my-6"></div>
  )
}



export default function RightPanel() {
  const [answerShow, setAnswerShow] = useState(true);
  return (
    <UnitProblemDataProvider>


        <div className="lg:col-span-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <RightPanelTopbar />

            <div className="p-6 pt-0">
              <div className="h-[1400px] overflow-y-auto pr-4">
                <div className="space-y-6">

                  <MasterDiv _type="Q" />

                  <BoarderLine />

                  <AnswerHideButton answerShow={answerShow} setAnswerShow={setAnswerShow} />

                  {answerShow && <MasterDiv _type="A" />}
                  
                </div>
              </div>
            </div>
          </div>
        </div>


    </UnitProblemDataProvider>
  );
}

