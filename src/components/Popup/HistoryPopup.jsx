import { useState, useEffect, useContext } from "react";

import { HistoryContext } from "../../context/HistoryContext";
import { PopupContext } from "../../context/PopupContext";


export default function HistoryPopup() {
  const [rows, setRows] = useState(null);
  const [loading, setLoading] = useState(true);
  const columns = ["index", "subject", "problem_num", "key", "value_before", "value_after"];

  const { history } = useContext(HistoryContext);
  const { isPopupOpen, setIsPopupOpen } = useContext(PopupContext);

  useEffect(() => {
    setRows(history);
    setLoading(false);
  }, [history]);

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
    
  }, []);

  return (
    <div className="p-6">
      {/* 배경 */}
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => setIsPopupOpen(false)}
      ></div>

      {/* 팝업 */}
      <div className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[56rem] max-h-[80vh] flex flex-col">
        <h2 className="text-lg font-bold mb-2">Edit History</h2>
        <p className="text-sm text-gray-600 mb-4">최근 변경 이력</p>

        <div className="flex-1 overflow-auto border rounded">
          {loading && <div className="p-3 text-sm">불러오는 중...</div>}

          {!loading && rows && rows.length > 0 && (
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  {columns.map((c) => (
                    <th key={c} className="px-3 py-2 text-left font-semibold whitespace-nowrap">
                      {c}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((item, i) => (
                  <tr key={i} className="odd:bg-white even:bg-gray-50 align-top">
                    {columns.map((c) => (
                      <td key={c} className="px-3 py-2">
                        <div className="whitespace-pre-wrap break-words max-w-[28rem]">
                          {String(item?.[c] ?? "")}
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {!loading && rows && rows.length === 0 && (
            <div className="p-3 text-sm">변경사항이 없습니다.</div>
          )}
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={() => setIsPopupOpen(false)}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}
