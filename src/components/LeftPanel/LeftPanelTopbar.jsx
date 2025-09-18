import { useContext } from "react";

import { ProblemDataContext } from "../../context/ProblemDataContext";


function TotalProblemCount() {
  const { totalProblemNum } = useContext(ProblemDataContext);
    return (
      <div className="font-semibold tracking-tight text-lg">Problems ({totalProblemNum})</div>
    );
  }


function SearchBar() {
    return (
      <div className="relative">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search absolute left-2 top-2.5 h-4 w-4 text-muted-foreground">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
          </svg>
          <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pl-8" placeholder="문제번호 또는 과목 검색..." value="" />
      </div>
    );
  }


  function SubjectButton() {
    return (
      <button type="button" role="combobox" aria-controls="radix-«r6»" aria-expanded="false" aria-autocomplete="none" dir="ltr" data-state="closed" className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&amp;&gt;span]:line-clamp-1">
      <span style={{pointerEvents: 'none'}}>전체 과목</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down h-4 w-4 opacity-50" aria-hidden="true">
          <path d="m6 9 6 6 6-6"></path>
          </svg>
      </button>
    );
  }

  
function SearchProblemNumber() {
    return (
      <div className="flex gap-2">
          <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 flex-1" placeholder="문제번호" value="" />
          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-9 rounded-md px-3">이동</button>
      </div>
    );
  }


export default function LeftPanelTopbar() {
    return (
        <div className="flex flex-col space-y-1.5 p-6 pb-4">
            <TotalProblemCount />
            <div className="space-y-3">
                {/* <SearchBar />

                <SubjectButton />

                <SearchProblemNumber /> */}
            </div>
        </div>
    )
}