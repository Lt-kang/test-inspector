import { useState, useEffect, useContext } from "react";
import { PopupContext } from "../../context/PopupContext";


export default function UnitJsonViewerPopup({ unitJsonData }) {
  const [copySuccess, setCopySuccess] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const { isUnitJsonPopupOpen, setIsUnitJsonPopupOpen } = useContext(PopupContext);


  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
    
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    // 애니메이션 지속 시간(200ms) 후에 실제로 닫기
    setTimeout(() => {
      setIsClosing(false);
    }, 200);
    setIsUnitJsonPopupOpen(false);
  };

  // JSON을 보기 좋게 포맷팅
  const formatJsonString = (data) => {
    try {
      if (typeof data === 'string') {
        return JSON.stringify(JSON.parse(data), null, 4);
      }
      return JSON.stringify(data, null, 4);
    } catch (error) {
      return typeof data === 'string' ? data : JSON.stringify(data);
    }
  };

  // 클립보드에 복사
  const handleCopy = async () => {
    try {
      const textToCopy = formatJsonString(unitJsonData);
      await navigator.clipboard.writeText(textToCopy);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // 2초 후 메시지 사라짐
    } catch (err) {
      console.error('복사 실패:', err);
      // 대체 방법 (구형 브라우저 지원)
      const textArea = document.createElement('textarea');
      textArea.value = formatJsonString(unitJsonData);
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  if (!isUnitJsonPopupOpen) return null;

  return (
    <div className="p-6">
        <div
        className="fixed inset-0 bg-black/50"
        onClick={() => setIsUnitJsonPopupOpen(false)}
      ></div>

    <div 
      role="dialog" 
      id="radix-«r3»" 
      aria-describedby="radix-«r5»" 
      aria-labelledby="radix-«r4»" 
      data-state={isClosing ? "closed" : "open"} 
      className="fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg max-w-5xl max-h-[80vh]" 
      tabIndex="-1" 
      style={{pointerEvents: "auto"}}
    >
      {/* <div
        className="fixed inset-0 bg-black/50"
        onClick={() => setIsUnitJsonPopupOpen(false)}
      ></div> */}

      <div className="flex flex-col space-y-1.5 text-center sm:text-left">
        <h2 
          id="radix-«r4»" 
          className="text-lg font-semibold leading-none tracking-tight flex items-center justify-between"
        >
          <span>Problem {unitJsonData.problem_num} - Raw JSON</span>
          <button 
            onClick={handleCopy}
            className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="lucide lucide-copy h-4 w-4 mr-2"
            >
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"></path>
            </svg>
            {copySuccess ? "복사됨!" : "복사"}
          </button>
        </h2>
      </div>
      
      <div 
        dir="ltr" 
        className="relative overflow-hidden h-[60vh] w-full border rounded-md" 
        style={{
          position: "relative", 
          "--radix-scroll-area-corner-width": "0px", 
          "--radix-scroll-area-corner-height": "0px"
        }}
      >
        <style>
          {`[data-radix-scroll-area-viewport]{scrollbar-width:none;-ms-overflow-style:none;-webkit-overflow-scrolling:touch;}[data-radix-scroll-area-viewport]::-webkit-scrollbar{display:none}`}
        </style>
        <div 
          data-radix-scroll-area-viewport="" 
          className="h-full w-full rounded-[inherit]" 
          style={{overflow: "hidden scroll"}}
        >
          <div style={{minWidth: "100%", display: "table"}}>
            <pre className="text-xs bg-muted p-4 rounded-lg whitespace-pre-wrap break-words">
              <code>
                <div style={{textAlign: "left"}}>
                  {formatJsonString(unitJsonData)}
                </div>
              </code>
            </pre>
          </div>
        </div>
      </div>
      
      <button 
        type="button" 
        onClick={handleClose}
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="lucide lucide-x h-4 w-4"
        >
          <path d="M18 6 6 18"></path>
          <path d="m6 6 12 12"></path>
        </svg>
        <span className="sr-only">Close</span>
      </button>
    </div>
    </div>
  );
}

