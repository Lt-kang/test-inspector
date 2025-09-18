import LeftPanelTopbar from './LeftPanel/LeftPanelTopbar';
import LeftPanelSubject from './LeftPanel/LeftPanelSubject';




export default function LeftPanel() {
  return (
            <div className="lg:col-span-1">
                {/* <div class="rounded-lg border bg-card text-card-foreground shadow-sm h-[calc(100vh-200px)]"> */}
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm h-[calc(100vh-200px)] overflow-y-auto">
                    <LeftPanelTopbar />

                    <LeftPanelSubject />
                </div>
            </div>
  );
}






