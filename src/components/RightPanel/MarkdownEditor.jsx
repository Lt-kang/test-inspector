// MarkdownMathEditor.jsx
import { useEffect, useState } from "react";
import MarkdownWithMath from "./MarkdownWithMath";
import KorMarkdownViewer from "./MarkdownWithKor";

export default function MarkdownEditor({
  content,          // 외부에서 주입되는 텍스트 (controlled)
  onChange,       // 에디터 변경 시 콜백
  placeholder = "여기에 Markdown + LaTeX를 입력하세요...",
  className = "",
  rows = 14,
  math_type = false,
}) {
  const [text, setText] = useState(content ?? "");

  // useEffect(() => {
  //   setText(content ?? "");
  // }, [content]);

  const handleChange = (e) => {
    const v = e.target.value;
    setText(v);
    onChange?.(v);
    // console.log(v);
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${className}`}>
      {/* Editor */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">Editor</label>
        <textarea
          value={text}
          onChange={handleChange}
          placeholder={placeholder}
          rows={rows}
          className="w-full p-3 border rounded font-mono text-sm outline-none focus:ring-2"
          spellCheck={false}
        />
      </div>

      {/* Preview */}
      <div className="flex flex-col">
        <label className="text-sm text-gray-600 mb-1">Preview</label>
        <div className="p-3 border rounded overflow-auto max-h-[60vh]">
          {math_type ? <MarkdownWithMath content={text} /> : <KorMarkdownViewer content={text} />}
        </div>
      </div>
    </div>
  );
}
