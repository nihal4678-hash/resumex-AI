import { useEffect, useState } from "react";
import {
  getMyResumes,
  deleteResume,
  analyzeResume,
} from "../services/resumeService";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import { generateInterviewQuestions } from "../services/interviewService";

const MyResumes = () => {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const handleInterview = async (resumeId) => {
  try {
    const data = await generateInterviewQuestions(resumeId);

    toast.success("Interview Questions Generated!");

    navigate("/interview", {
      state: {
        questions: data.questions,
      },
    });
  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Failed to generate interview questions"
    );
  }
};
  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const data = await getMyResumes();
      setResumes(data.resumes || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load resumes");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?"
    );

    if (!confirmDelete) return;

    try {
      await deleteResume(id);

      toast.success("Resume deleted successfully!");

      fetchResumes();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Delete failed"
      );
    }
  };

  const handleAnalyze = async (resumeId) => {
    try {
      setAnalyzing(true);

      const data = await analyzeResume(resumeId);

      setAnalysis(data.analysis);

      toast.success("Resume analyzed successfully!");

      fetchResumes();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Analysis failed"
      );
    } finally {
      setAnalyzing(false);
    }
  };
  

  const downloadPDF = () => {
    if (!analysis) {
      toast.error("Please analyze a resume first.");
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("ResumeX AI Analysis Report", 20, 20);

    doc.setFontSize(14);
    doc.text(`ATS Score: ${analysis.atsScore}/100`, 20, 40);

    let y = 60;

    doc.text("Strengths:", 20, y);
    analysis.strengths?.forEach((item, index) => {
      doc.text(`• ${item}`, 25, y + 10 + index * 8);
    });

    y += (analysis.strengths?.length || 0) * 8 + 20;

    doc.text("Weaknesses:", 20, y);
    analysis.weaknesses?.forEach((item, index) => {
      doc.text(`• ${item}`, 25, y + 10 + index * 8);
    });

    y += (analysis.weaknesses?.length || 0) * 8 + 20;

    doc.text("Missing Keywords:", 20, y);
    analysis.missingKeywords?.forEach((item, index) => {
      doc.text(`• ${item}`, 25, y + 10 + index * 8);
    });

    y += (analysis.missingKeywords?.length || 0) * 8 + 20;

    doc.text("Suggestions:", 20, y);
    analysis.suggestions?.forEach((item, index) => {
      doc.text(`• ${item}`, 25, y + 10 + index * 8);
    });

    doc.save("ResumeX_AI_Report.pdf");
  };

  const filteredResumes = resumes
    .filter((resume) =>
      resume.fileName
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((resume) => {
      if (filter === "good") return resume.atsScore >= 80;

      if (filter === "average")
        return resume.atsScore >= 60 &&
               resume.atsScore < 80;

      if (filter === "poor") return resume.atsScore < 60;

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "highest")
        return b.atsScore - a.atsScore;

      if (sortBy === "lowest")
        return a.atsScore - b.atsScore;

      return new Date(b.createdAt) - new Date(a.createdAt);
    });

  if (loading) {
    return <Loader />;
  }
    return (
    <div className="max-w-6xl mx-auto mt-10 p-5">

      <h1 className="text-3xl font-bold mb-6">
        My Resumes
      </h1>

      {/* Statistics */}

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">

        <div className="bg-blue-100 rounded-xl p-5 text-center shadow">
          <h3 className="text-gray-600">Total Resumes</h3>
          <p className="text-4xl font-bold text-blue-700">
            {resumes.length}
          </p>
        </div>

        <div className="bg-green-100 rounded-xl p-5 text-center shadow">
          <h3 className="text-gray-600">Average ATS</h3>
          <p className="text-4xl font-bold text-green-700">
            {resumes.length
              ? Math.round(
                  resumes.reduce(
                    (sum, r) => sum + (r.atsScore || 0),
                    0
                  ) / resumes.length
                )
              : 0}
          </p>
        </div>

        <div className="bg-yellow-100 rounded-xl p-5 text-center shadow">
          <h3 className="text-gray-600">Highest ATS</h3>
          <p className="text-4xl font-bold text-yellow-700">
            {resumes.length
              ? Math.max(...resumes.map(r => r.atsScore || 0))
              : 0}
          </p>
        </div>

        <div className="bg-red-100 rounded-xl p-5 text-center shadow">
          <h3 className="text-gray-600">Lowest ATS</h3>
          <p className="text-4xl font-bold text-red-700">
            {resumes.length
              ? Math.min(...resumes.map(r => r.atsScore || 0))
              : 0}
          </p>
        </div>

        <div className="bg-purple-100 rounded-xl p-5 text-center shadow">
          <h3 className="text-gray-600">AI Analyzed</h3>
          <p className="text-4xl font-bold text-purple-700">
            {resumes.filter(r => r.atsScore > 0).length}
          </p>
        </div>

      </div>

      {/* Download Report */}

      {analysis && (
        <div className="flex justify-end mb-6">
          <button
            onClick={downloadPDF}
            className="bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700 transition"
          >
            📄 Download PDF Report
          </button>
        </div>
      )}

      {/* Search & Filters */}

      <div className="grid md:grid-cols-3 gap-4 mb-8">

        <input
          type="text"
          placeholder="🔍 Search Resume..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border rounded-lg p-3"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded-lg p-3"
        >
          <option value="latest">Latest Upload</option>
          <option value="highest">Highest ATS Score</option>
          <option value="lowest">Lowest ATS Score</option>
        </select>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded-lg p-3"
        >
          <option value="all">All Scores</option>
          <option value="good">Good (80+)</option>
          <option value="average">Average (60-79)</option>
          <option value="poor">Poor (&lt;60)</option>
        </select>

      </div>

      {filteredResumes.length === 0 ? (

        <div className="bg-white rounded-2xl shadow-lg p-12 text-center">

          <div className="text-7xl mb-6">
            📂
          </div>

          <h2 className="text-3xl font-bold text-gray-700 mb-3">
            No Resume Found
          </h2>

          <p className="text-gray-500 mb-8">
            Upload your first resume and let ResumeX AI analyze it.
          </p>

          <Link
            to="/upload"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
          >
            📄 Upload Resume
          </Link>

        </div>

      ) : (

        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filteredResumes.map((resume) => (

              <div
                key={resume._id}
                className="bg-white rounded-2xl shadow-lg border p-6 hover:shadow-2xl hover:-translate-y-2 transition"
              >

                <div className="flex items-center gap-3">

                  <div className="text-5xl">
                    📄
                  </div>

                  <div>

                    <h2 className="font-bold text-lg">
                      {resume.fileName}
                    </h2>

                    <p className="text-sm text-gray-500">
                      Uploaded on{" "}
                      {new Date(resume.createdAt).toLocaleDateString()}
                    </p>

                  </div>

                </div>

                <div className="mt-5">

                  <div className="flex justify-between mb-2">

                    <span className="font-semibold">
                      ATS Score
                    </span>

                    <span
                      className={`px-3 py-1 rounded-full text-white ${
                        resume.atsScore >= 80
                          ? "bg-green-500"
                          : resume.atsScore >= 60
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                    >
                      {resume.atsScore}/100
                    </span>

                  </div>

                  <div className="w-full h-3 bg-gray-200 rounded-full">

                    <div
                      className={`h-full rounded-full ${
                        resume.atsScore >= 80
                          ? "bg-green-500"
                          : resume.atsScore >= 60
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{
                        width: `${resume.atsScore}%`,
                      }}
                    />

                  </div>

                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">

                  <a
                    href={resume.fileUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-blue-600 text-white py-3 rounded-lg text-center hover:bg-blue-700"
                  >
                    📄 View
                  </a>

                  <a
                    href={resume.fileUrl.replace(
                      "/upload/",
                      "/upload/fl_attachment/"
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-indigo-600 text-white py-3 rounded-lg text-center hover:bg-indigo-700"
                  >
                    ⬇ Download
                  </a>

                </div>

                <button
                  onClick={() => handleAnalyze(resume._id)}
                  disabled={analyzing}
                  className="w-full mt-3 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
                >
                  {analyzing
                    ? "Analyzing..."
                    : "🤖 Analyze Resume"}
                </button>
                <button
  onClick={() => handleInterview(resume._id)}
  className="w-full mt-3 bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
>
  🎤 Generate Interview Questions
</button>
                <button
                  onClick={() => handleDelete(resume._id)}
                  className="w-full mt-3 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700"
                >
                  🗑 Delete Resume
                </button>

              </div>

            ))}

          </div>
                    {analysis && (

            <div className="mt-10 bg-white rounded-2xl shadow-2xl border p-8">

              <h2 className="text-3xl font-bold text-center mb-8">
                🤖 AI Resume Analysis
              </h2>

              <div className="flex justify-center mb-8">

                <span
                  className={`px-8 py-4 rounded-full text-white text-2xl font-bold ${
                    analysis.atsScore >= 80
                      ? "bg-green-500"
                      : analysis.atsScore >= 60
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  ATS Score : {analysis.atsScore}/100
                </span>

              </div>

              <div className="grid md:grid-cols-2 gap-6">

                {/* Strengths */}

                <div className="bg-green-50 rounded-xl p-6">

                  <h3 className="text-xl font-bold text-green-700 mb-4">
                    ✅ Strengths
                  </h3>

                  <ul className="list-disc ml-5 space-y-2">
                    {analysis.strengths?.length ? (
                      analysis.strengths.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))
                    ) : (
                      <li>No strengths found.</li>
                    )}
                  </ul>

                </div>

                {/* Weaknesses */}

                <div className="bg-red-50 rounded-xl p-6">

                  <h3 className="text-xl font-bold text-red-700 mb-4">
                    ❌ Weaknesses
                  </h3>

                  <ul className="list-disc ml-5 space-y-2">
                    {analysis.weaknesses?.length ? (
                      analysis.weaknesses.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))
                    ) : (
                      <li>No weaknesses found.</li>
                    )}
                  </ul>

                </div>

                {/* Missing Keywords */}

                <div className="bg-yellow-50 rounded-xl p-6">

                  <h3 className="text-xl font-bold text-yellow-700 mb-4">
                    🔑 Missing Keywords
                  </h3>

                  <ul className="list-disc ml-5 space-y-2">
                    {analysis.missingKeywords?.length ? (
                      analysis.missingKeywords.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))
                    ) : (
                      <li>No missing keywords.</li>
                    )}
                  </ul>

                </div>

                {/* Suggestions */}

                <div className="bg-blue-50 rounded-xl p-6">

                  <h3 className="text-xl font-bold text-blue-700 mb-4">
                    💡 Suggestions
                  </h3>

                  <ul className="list-disc ml-5 space-y-2">
                    {analysis.suggestions?.length ? (
                      analysis.suggestions.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))
                    ) : (
                      <li>No suggestions available.</li>
                    )}
                  </ul>

                </div>

              </div>

            </div>

          )}

        </>

      )}

    </div>

  );
};

export default MyResumes;