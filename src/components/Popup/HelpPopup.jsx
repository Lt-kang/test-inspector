import { useContext, useEffect } from "react";
import { PopupContext } from "../../context/PopupContext";

const SHORTCUTS = [
  { key: 'W', desc: '정답 마킹' },
  { key: 'E', desc: '오답 마킹' },
  { key: 'R', desc: '마킹 초기화' },

  { key: 'S', desc: '저장' },
  { key: 'D', desc: '이전 문제' },
  { key: 'F', desc: '다음 문제' },
];

export default function HelpPopup() {
  const { isHelpPopupOpen, setIsHelpPopupOpen } = useContext(PopupContext);

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape') setIsHelpPopupOpen(false);
    };
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, []);

  if (!isHelpPopupOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={() => setIsHelpPopupOpen(false)}
      />

      <div
        role="dialog"
        data-state="open"
        className="fixed left-[50%] top-[50%] z-50 grid w-full translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg max-w-sm"
        tabIndex="-1"
        style={{ pointerEvents: 'auto' }}
      >
        <div className="flex flex-col space-y-1.5 text-center sm:text-left">
          <h2 className="text-lg font-semibold leading-none tracking-tight">키보드 단축키</h2>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="py-2 pr-4 text-center font-medium text-muted-foreground">키</th>
              <th className="py-2 text-center font-medium text-muted-foreground">동작</th>
            </tr>
          </thead>
          <tbody>
            {SHORTCUTS.map(({ key, desc }) => (
              <tr key={key} className="border-b last:border-0">
                <td className="py-2 pr-4">
                  <kbd className="inline-flex items-center justify-center rounded border bg-muted px-2 py-0.5 font-mono text-xs font-semibold">
                    {key}
                  </kbd>
                </td>
                <td className="py-2">{desc}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          type="button"
          onClick={() => setIsHelpPopupOpen(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x h-4 w-4">
            <path d="M18 6 6 18"></path>
            <path d="m6 6 12 12"></path>
          </svg>
          <span className="sr-only">Close</span>
        </button>
      </div>
    </>
  );
}
