import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

export default function MarkdownRenderer({ content }) {
  return (
    <div className="prose prose-slate max-w-none
      prose-headings:font-bold prose-headings:text-gray-900
      prose-h1:text-3xl prose-h1:border-b prose-h1:border-gray-200 prose-h1:pb-4 prose-h1:mb-6
      prose-h2:text-2xl prose-h2:mt-8 prose-h2:mb-4
      prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
      prose-p:text-gray-700 prose-p:leading-relaxed
      prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
      prose-strong:text-gray-900
      prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
      prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:overflow-x-auto
      prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-blue-50 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:not-italic
      prose-table:border-collapse prose-table:w-full
      prose-th:bg-gray-100 prose-th:border prose-th:border-gray-300 prose-th:px-4 prose-th:py-2 prose-th:text-left
      prose-td:border prose-td:border-gray-300 prose-td:px-4 prose-td:py-2
      prose-ul:list-disc prose-ul:pl-6
      prose-ol:list-decimal prose-ol:pl-6
      prose-li:text-gray-700
      prose-hr:border-gray-200 prose-hr:my-8
      prose-img:rounded-lg prose-img:shadow-md
    ">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
