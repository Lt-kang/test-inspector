import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";



export default function KorMarkdownViewer({content}) {
  return (
    <div className="prose prose-neutral max-w-none mb-4 p-4 bg-muted rounded-lg" >
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeRaw, rehypeKatex]}
          components={{
            h1: ({node, ...props}) => <h1 className="text-3xl font-bold mt-6 mb-4" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-2xl font-semibold mt-5 mb-3" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-lg font-semibold mb-3" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc list-outside ml-6 mb-2" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal list-inside my-4" {...props} />,
            p:  ({node, ...props}) => <p className="mb-3 last:mb-0" {...props} />,
            strong: ({node, ...props}) => <strong className="font-semibold" {...props} />,
            th: ({node, ...props}) => <th className="px-4" {...props} />,
            td: ({node, ...props}) => <td className="px-4" {...props} />,
            // br: ({node, ...props}) => <br className="my-4" {...props} />, 
            br: () => <span className="block my-4" />,
            code: ({node, ...props}) => <code style={{
              wordWrap: 'break-word',
              overflowWrap: 'break-word',
              wordBreak: 'break-word',
              whiteSpace: 'pre-wrap',
              fontSize: '12px'
            }} {...props} />,
          }}
        >
        {content.replace(/\n/g, '  \n')}
        </ReactMarkdown>
    </div>
  );
}


