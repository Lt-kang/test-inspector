export default function ProblemMetaData({ problemInfoShow, problem_data }) {
  if (!problemInfoShow) return null;

  const meta = problem_data?.meta ?? {};

  return (
    <div className="rounded-lg border text-card-foreground shadow-sm bg-muted/50 mb-6">
      <div className="flex flex-col space-y-1.5 p-6">
        <div className="font-semibold tracking-tight text-lg">메타데이터</div>
      </div>
      <div className="p-6 pt-0 space-y-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div><span className="font-medium">question_id:</span> {problem_data?.question_id ?? '-'}</div>
          <div><span className="font-medium">section:</span> {problem_data?.section ?? '-'}</div>
          <div><span className="font-medium">problem_number:</span> {problem_data?.problem_number ?? '-'}</div>
          <div><span className="font-medium">score:</span> {problem_data?.score ?? 'null'}</div>
        </div>

        <div data-orientation="horizontal" role="none" className="shrink-0 bg-border h-[1px] w-full"></div>

        <div>
          <h4 className="font-semibold mb-2">meta</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div><span className="font-medium">problem_type:</span> <span className="text-muted-foreground">{meta.problem_type ?? '-'}</span></div>
            <div><span className="font-medium">image_full:</span> <span className="text-muted-foreground">{meta.image_full ?? '-'}</span></div>
            <div><span className="font-medium">image_full_type:</span> <span className="text-muted-foreground">{meta.image_full_type ?? '-'}</span></div>
            <div><span className="font-medium">source:</span> <span className="text-muted-foreground">{meta.source ?? '-'}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
