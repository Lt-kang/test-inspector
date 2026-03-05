import RightPanelTopbar from './RightPanel/RightPanelTopbar';
import MasterDiv from './RightPanel/MasterProblemDiv';

import { UnitProblemDataProvider } from './RightPanel/UnitProblemDataContext';




export default function RightPanel() {
  return (
    <UnitProblemDataProvider>


        <div className="lg:col-span-4">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <RightPanelTopbar />

            <div className="p-6 pt-0">
              <div className="h-[1400px] overflow-y-auto pr-4">
                <div className="space-y-6">

                  <MasterDiv />
                  
                </div>
              </div>
            </div>
          </div>
        </div>


    </UnitProblemDataProvider>
  );
}

