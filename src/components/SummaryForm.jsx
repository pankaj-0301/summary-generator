import { useState, useEffect } from "react";
import axios from "axios";

const BASE_URL = "https://summary-j2xh.onrender.com";

export default function SummaryForm() {
  const [subject] = useState("Mathematics");
  const [className] = useState("Class 10");
  const [chapter, setChapter] = useState("");
  const [language, setLanguage] = useState("Hinglish");
  const [chapters, setChapters] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/chapters`, {
        params: { subject, class_name: className },
      })
      .then((res) => {
        setChapters(res.data);
        setChapter(res.data[0]);
      })
      .catch(console.error);
  }, [subject, className]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/languages`)
      .then((res) => setLanguages(res.data))
      .catch(console.error);
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    setSummary(null);
    try {
      const res = await axios.post(`${BASE_URL}/generate-summary`, {
        subject,
        chapter,
        language,
        class_name: className,
      });
      setSummary(res.data.summary_data);
    } catch (error) {
      console.error(error);
      setSummary({ story_summary: "Failed to generate summary." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 text-white px-4 pb-10">
      <div className="bg-[#1f1f1f] p-6 rounded-lg space-y-6">
        <div>
          <label className="block mb-1 text-lg font-bold">Subject</label>
          <div className="bg-black p-3 rounded text-white">Mathematics</div>
        </div>

        <div>
          <label className="block mb-1 text-lg font-bold">Chapter</label>
          <select
            value={chapter}
            onChange={(e) => setChapter(e.target.value)}
            className="bg-black p-3 w-full rounded"
          >
            {chapters.map((ch) => (
              <option key={ch} value={ch}>
                {ch}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-lg font-bold">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-black p-3 w-full rounded"
          >
            {languages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleGenerate}
          className={`bg-lime-400 text-black font-bold px-6 py-2 rounded-full mt-4 hover:bg-lime-500 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>

      {summary && (
        <div className="bg-[#1f1f1f] mt-8 p-6 rounded-lg space-y-4">
          <h2 className="text-xl font-bold text-lime-400">{chapter}</h2>

          <p className="text-white whitespace-pre-wrap">{summary.story_summary}</p>

          {summary.bullet_points?.length > 0 && (
            <div>
              <h3 className="text-lime-400 font-semibold mt-6 mb-2">Key Points</h3>
              <ul className="list-disc pl-6 space-y-1">
                {summary.bullet_points.map((point, index) => (
                  <li key={index} className="text-white">{point}</li>
                ))}
              </ul>
            </div>
          )}

          {summary.important_formulas?.length > 0 && (
            <div>
              <h3 className="text-lime-400 font-semibold mt-6 mb-2">Important Formulas</h3>
              <ul className="list-disc pl-6 space-y-4">
                {summary.important_formulas.map((formula, index) => (
                  <li key={index} className="text-white">
                    <div className="font-semibold">
                      {formula.formula_name} = {formula.formula}
                    </div>
                    <div className="text-gray-300 text-sm">
                      Description: {formula.description}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {summary.key_theorems?.length > 0 && (
            <div>
              <h3 className="text-lime-400 font-semibold mt-6 mb-2">Key Theorems</h3>
              <ul className="list-disc pl-6 space-y-4">
                {summary.key_theorems.map((theorem, index) => (
                  <li key={index} className="text-white">
                    <div className="font-semibold">{theorem.theorem_name}</div>
                    <div className="text-gray-300 text-sm">
                      Description: {theorem.description}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
