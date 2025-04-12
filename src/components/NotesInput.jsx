import { useState } from "react";
import { FaPaperPlane, FaTrash, FaDownload } from "react-icons/fa";
import { jsPDF } from "jspdf";

function NotesInput({
  inputText,
  setInputText,
  onShorten,
  onClear,
  disabled,
}) {
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
        style={{ height: "40vh", outline: "none", borderBottom: "2px solid #bcbcbc", borderRadius: "10px" }}
        placeholder="Enter your notes here..."
      />
      <input
        type="file"
        accept=".txt"
        onChange={handleFileUpload}
        className="mt-2"
      />
      {fileError && <p className="text-red-600 text-sm">{fileError}</p>}
      <div className="flex" style={{ gap: "2rem", justifyContent: "center", margin: "16px 0" }}>
        <button
          style={{ gap: "10px", borderRadius: "4px", padding: "4px 10px", backgroundColor: "#e1e1e1" }}
          onClick={onShorten}
          disabled={disabled}
          className={`flex items-center gap-2 px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label="Shorten notes"
        >
          <FaPaperPlane /> Shorten
        </button>
        <button
          style={{ gap: "10px", borderRadius: "4px", padding: "4px 10px", backgroundColor: "#e1e1e1" }}
          onClick={onClear}
          disabled={disabled}
          className={`flex items-center gap-2 px-5 py-2.5 bg-gray-600 text-white rounded-xl font-medium hover:bg-gray-700 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          aria-label="Clear notes"
        >
          <FaTrash /> Clear
        </button>
        <button
          style={{ gap: "10px", borderRadius: "4px", padding: "4px 10px", backgroundColor: "#e1e1e1" }}
          onClick={downloadPDF}
          className="flex items-center gap-2 px-5 py-2.5 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-all duration-200"
          aria-label="Download as PDF"
        >
          <FaDownload /> Download
        </button>
      </div>
    </div>
  );
}

export default NotesInput;