import { useState } from "react";
import { compareResume } from "../services/jobService";
import toast from "react-hot-toast";

const JobMatch = () => {
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleCompare = async () => {
    if (!resumeText || !jobDescription) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const data = await compareResume(
        resumeText,
        jobDescription
      );

      setAnalysis(data.analysis);

      toast.success("Comparison Completed");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Comparison Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-5">

      <h1 className="text-3xl font-bold mb-8">
        🎯 Job Description Match
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <textarea
          rows="15"
          placeholder="Paste Resume Text"
          value={resumeText}
          onChange={(e) =>
            setResumeText(e.target.value)
          }
          className="border rounded-lg p-4"
        />

        <textarea
          rows="15"
          placeholder="Paste Job Description"
          value={jobDescription}
          onChange={(e) =>
            setJobDescription(e.target.value)
          }
          className="border rounded-lg p-4"
        />

      </div>

      <button
        onClick={handleCompare}
        disabled={loading}
        className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
      >
        {loading
          ? "Comparing..."
          : "🚀 Compare Resume"}
      </button>

      {analysis && (

        <div className="mt-10 bg-white shadow rounded-xl p-6">

          <h2 className="text-2xl font-bold mb-6">
            Match Result
          </h2>

          <div className="text-3xl font-bold text-green-600 mb-6">
            {analysis.matchScore}%
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <h3 className="font-bold text-green-600">
                Matching Skills
              </h3>

              <ul className="list-disc ml-6">
                {analysis.matchingSkills?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-red-600">
                Missing Skills
              </h3>

              <ul className="list-disc ml-6">
                {analysis.missingSkills?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-yellow-600">
                Missing Keywords
              </h3>

              <ul className="list-disc ml-6">
                {analysis.missingKeywords?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-blue-600">
                Suggestions
              </h3>

              <ul className="list-disc ml-6">
                {analysis.suggestions?.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default JobMatch;