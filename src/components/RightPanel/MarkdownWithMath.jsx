import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// KaTeX 스타일 (꼭 import 해야 수식이 보임)
import "katex/dist/katex.min.css";

export default function MarkdownWithMathRenderer({ content }) {
  return (
    <div className="prose prose-neutral max-w-none mb-4 p-4 bg-blue-50 rounded-lg">
      <ReactMarkdown
        // 수식 인식
        remarkPlugins={[remarkMath]}
        // 수식 렌더링
        rehypePlugins={[rehypeKatex]}
        // 필요하다면 컴포넌트 오버라이드 가능
        components={{
          h2: ({ node, ...props }) => (
            <h2 className="text-xl font-bold mt-6 mb-3" {...props} />
          ),
          p: ({ node, ...props }) => <p className="mb-4" {...props} />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}