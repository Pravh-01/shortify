import { useState } from "react";
import { FaCopy } from "react-icons/fa";

function NotesOutput({ summary }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-3">Summarized:</h2>
      <div className="p-5 bg-gray-50 border border-gray-200 rounded-lg">
        <p className="text-gray-800 leading-relaxed">{summary}</p>
        <button
          onClick={handleCopy}
          className="mt-3 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-all"
          aria-label={copied ? "Copied" : "Copy to clipboard"}
        >
          <FaCopy /> {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}

export default NotesOutput;