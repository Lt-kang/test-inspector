import { useState, useContext } from 'react';
import { UnitProblemDataContext } from './UnitProblemDataContext';
import { AnswerToggleButton } from './Button';
import KorMarkdownViewer from './MarkdownWithKor';

export default function ProblemAttachments() {
  const [show, setShow] = useState(false);
  const { unitProblemData } = useContext(UnitProblemDataContext);

  return (
    <div>
      <div className="flex justify-center">
        <AnswerToggleButton show={show} onClick={() => setShow(!show)} />
      </div>

      {show && (
        <div className="mt-4 space-y-4">
            <h3 className="text-lg font-semibold mb-3">answer</h3>
            <KorMarkdownViewer content={String(unitProblemData?.attachments ?? 'null')} />
        </div>
      )}
    </div>
  );
}
