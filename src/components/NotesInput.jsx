import { useState } from "react";
import { FaPaperPlane, FaTrash, FaDownload } from "react-icons/fa";
import { jsPDF } from "jspdf";

function NotesInput({ inputText, setInputText, onShorten, onClear, disabled }) {
  const [fileError, setFileError] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (event) => setInputText(event.target.result);
      reader.readAsText(file);
      setFileError("");
    } else {
      setFileError("Please upload a .txt file");
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text(inputText || "No content", 10, 10);
    doc.save("notes.pdf");
  };

  return (
    <div className="flex flex-col gap-4">
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        className="h-64 outline-none border-b-2 border-gray-300 rounded-lg p-4 resize-y"
        placeholder="Enter your notes here..."
      />
      <input
        type="file"
        accept=".txt"
        onChange={handleFileUpload}
        className="mt-2 text-sm"
      />
      {fileError && <p className="text-red-600 text-sm">{fileError}</p>}
      <div className="flex justify-center gap-4 mt-4">
        <button
          onClick={onShorten}
          disabled={disabled}
          className={`flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition-all ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label="Shorten notes"
        >
          <FaPaperPlane /> Shorten
        </button>
        <button
          onClick={onClear}
          disabled={disabled}
          className={`flex items-center gap-2 px-5 py-2.5 bg-gray-600 text-white rounded-xl font-medium hover:bg-gray-700 transition-all ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label="Clear notes"
        >
          <FaTrash /> Clear
        </button>
        <button
          onClick={downloadPDF}
          className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-all"
          aria-label="Download as PDF"
        >
          <FaDownload /> Download
        </button>
      </div>
    </div>
  );
}

export default NotesInput;