import { useState, useEffect } from "react";
import { SignedIn, SignedOut, SignIn, useAuth } from "@clerk/clerk-react";
import NotesInput from "./components/NotesInput.jsx";
import NotesOutput from "./components/NotesOutput.jsx";
import Loader from "./components/Loader.jsx";
import { shortenNotes } from "./utils/api.js";
import './App.css';

function App() {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const { isLoaded, isSignedIn } = useAuth();

  useEffect(() => {
    console.log("Clerk State:", { isLoaded, isSignedIn });
    try {
      const saved = JSON.parse(localStorage.getItem("summaryHistory")) || [];
      setHistory(saved);
    } catch (err) {
      console.error("LocalStorage Error:", err);
    }
  }, [isLoaded]);

  const handleShorten = async () => {
    if (!inputText.trim()) {
      setError("Please enter some notes.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const result = await shortenNotes(inputText);
      setSummary(result.summary);
      const newHistory = [...history, { text: result.summary, date: new Date().toLocaleString() }];
      setHistory(newHistory);
      localStorage.setItem("summaryHistory", JSON.stringify(newHistory));
    } catch (err) {
      setError("Failed to shorten notes. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInputText("");
    setSummary("");
    setError("");
  };

  if (!isLoaded) {
    console.log("Clerk is still loading...");
    return <div>Loading Clerk...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center p-4 sm:p-6">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">
        AI Notes Shortener
      </h1>
      <p>Clerk Debug: isLoaded={String(isLoaded)}, isSignedIn={String(isSignedIn)}</p>
      <SignedOut>
        <div style={{ marginTop: "20px", padding: "20px", border: "2px solid red" }}>
          <p>DEBUG: Inside SignedOut block</p>
          <SignIn />
        </div>
      </SignedOut>
      <SignedIn>
        <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-6 sm:p-8">
          <NotesInput
            inputText={inputText}
            setInputText={setInputText}
            onShorten={handleShorten}
            onClear={handleClear}
            disabled={loading}
          />
          {loading && <Loader />}
          {error && (
            <p className="text-red-600 text-sm font-medium text-center mt-4 bg-red-50 py-2 rounded-lg" role="alert">
              {error}
            </p>
          )}
          {summary && <NotesOutput summary={summary} />}
          {history.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">History</h2>
              <ul className="list-disc pl-5 text-gray-800">
                {history.map((item, i) => (
                  <li key={i}>
                    {item.date}: {item.text}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </SignedIn>
    </div>
  );
}

export default App;