import { useContext } from 'react';
import { UnitProblemDataContext } from './UnitProblemDataContext';

const ATTACHMENT_KEYS = ['passage', 'question', 'options_text', 'answer', 'explanation'];

export default function ProblemAttachments() {
  const { unitProblemData } = useContext(UnitProblemDataContext);
  const attachments = unitProblemData?.attachments;

  return (
    <div style={{ textAlign: "left" }}>
      <h3 className="text-lg font-semibold mb-3">attachments</h3>
      {/* <div className="rounded-lg border bg-muted/50 p-4 space-y-2 text-sm"> */}
      <div className="prose prose-neutral max-w-none mb-4 p-4 bg-muted rounded-lg">
      
        {ATTACHMENT_KEYS.map(key => {
          const items = attachments?.[key];
          return (
            <div key={key} className="py-1.5">
              <span className="font-medium">{key}: </span>
              {!items
                ? <span className="mb-3 last:mb-0">null</span>
                : items.map((item, i) => (
                  <span key={i} className="ml-2 font-mono text-xs bg-background border rounded px-2 py-0.5">
                    {item.data}
                  </span>
                ))
              }
            </div>
          );
        })}
      </div>
    </div>
  );
}
