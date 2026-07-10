import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";
import jsPDF from "jspdf";

import Loader from "../components/ui/Loader";

import {
  getMyResumes,
  deleteResume,
  analyzeResume,
} from "../services/resumeService";

import { generateInterviewQuestions } from "../services/interviewService";

import {
  FaFileAlt,
  FaSearch,
  FaSortAmountDown,
  FaFilter,
  FaChartLine,
  FaStar,
  FaBrain,
  FaDownload,
  FaTrash,
  FaEye,
  FaRobot,
  FaMicrophone,
} from "react-icons/fa";

const MyResumes = () => {
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [analysis, setAnalysis] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const [search, setSearch] = useState("");

  const [sortBy, setSortBy] = useState("latest");

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const data = await getMyResumes();
      setResumes(data.resumes || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load resumes");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this resume permanently?"
    );

    if (!confirmDelete) return;

    try {
      await deleteResume(id);

      toast.success("Resume deleted successfully");

      fetchResumes();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Delete Failed"
      );
    }
  };

  const handleAnalyze = async (resumeId) => {
    try {
      setAnalyzing(true);

      const data = await analyzeResume(resumeId);

      setAnalysis(data.analysis);

      toast.success("AI Analysis Complete");

      fetchResumes();
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Analysis Failed"
      );
    } finally {
      setAnalyzing(false);
    }
  };

  const handleInterview = async (resumeId) => {
    try {
      const data =
        await generateInterviewQuestions(
          resumeId
        );

      toast.success(
        "Interview Questions Generated"
      );

      navigate("/interview", {
        state: {
          questions: data.questions,
        },
      });
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to generate interview questions"
      );
    }
  };

  const downloadPDF = () => {
    if (!analysis) {
      toast.error(
        "Please analyze a resume first."
      );
      return;
    }

    const doc = new jsPDF();

    doc.setFontSize(22);

    doc.text(
      "ResumeX AI Analysis Report",
      20,
      20
    );

    doc.setFontSize(16);

    doc.text(
      `ATS Score : ${analysis.atsScore}/100`,
      20,
      40
    );

    let y = 60;

    doc.text("Strengths", 20, y);

    analysis.strengths?.forEach((item, index) => {
      doc.text(
        `• ${item}`,
        25,
        y + 10 + index * 8
      );
    });

    y +=
      (analysis.strengths?.length || 0) * 8 +
      20;

    doc.text("Weaknesses", 20, y);

    analysis.weaknesses?.forEach(
      (item, index) => {
        doc.text(
          `• ${item}`,
          25,
          y + 10 + index * 8
        );
      }
    );

    y +=
      (analysis.weaknesses?.length || 0) * 8 +
      20;

    doc.text("Missing Keywords", 20, y);

    analysis.missingKeywords?.forEach(
      (item, index) => {
        doc.text(
          `• ${item}`,
          25,
          y + 10 + index * 8
        );
      }
    );

    y +=
      (analysis.missingKeywords?.length || 0) *
        8 +
      20;

    doc.text("Suggestions", 20, y);

    analysis.suggestions?.forEach(
      (item, index) => {
        doc.text(
          `• ${item}`,
          25,
          y + 10 + index * 8
        );
      }
    );

    doc.save("ResumeX_AI_Report.pdf");
  };

  const filteredResumes = resumes
    .filter((resume) =>
      resume.fileName
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((resume) => {
      if (filter === "good")
        return resume.atsScore >= 80;

      if (filter === "average")
        return (
          resume.atsScore >= 60 &&
          resume.atsScore < 80
        );

      if (filter === "poor")
        return resume.atsScore < 60;

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "highest")
        return b.atsScore - a.atsScore;

      if (sortBy === "lowest")
        return a.atsScore - b.atsScore;

      return (
        new Date(b.createdAt) -
        new Date(a.createdAt)
      );
    });

  if (loading) {
    return <Loader />;
  }
  return (
  <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

    <div className="max-w-7xl mx-auto px-8 py-10">

      {/* HERO */}

      <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white shadow-2xl p-10 mb-10">

        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">

          <div>

            <h1 className="text-5xl font-extrabold">
              📂 My Resume Vault
            </h1>

            <p className="text-blue-100 text-xl mt-3">
              Manage • Analyze • Improve • Download
            </p>

            <p className="mt-4 text-blue-200">
              Store all your resumes securely and let ResumeX AI
              analyze them for better job opportunities.
            </p>

          </div>

          <div className="text-center">

            <div className="text-6xl font-black">
              {resumes.length}
            </div>

            <div className="text-blue-200 text-lg">
              Total Resumes
            </div>

          </div>

        </div>

      </div>

      {/* STATISTICS */}

      <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-6 mb-10">

        <div className="bg-white rounded-3xl shadow-xl p-6 hover:-translate-y-2 transition">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500">
                Total Resumes
              </p>

              <h2 className="text-4xl font-bold mt-2">
                {resumes.length}
              </h2>

            </div>

            <div className="bg-blue-100 p-4 rounded-2xl">
              <FaFileAlt className="text-3xl text-blue-600"/>
            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 hover:-translate-y-2 transition">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500">
                Average ATS
              </p>

              <h2 className="text-4xl font-bold text-green-600 mt-2">

                {resumes.length
                  ? Math.round(
                      resumes.reduce(
                        (sum,r)=>sum+(r.atsScore||0),
                        0
                      ) / resumes.length
                    )
                  :0}

              </h2>

            </div>

            <div className="bg-green-100 p-4 rounded-2xl">
              <FaChartLine className="text-3xl text-green-600"/>
            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 hover:-translate-y-2 transition">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500">
                Highest ATS
              </p>

              <h2 className="text-4xl font-bold text-yellow-500 mt-2">

                {resumes.length
                  ? Math.max(...resumes.map(r=>r.atsScore||0))
                  :0}

              </h2>

            </div>

            <div className="bg-yellow-100 p-4 rounded-2xl">
              <FaStar className="text-3xl text-yellow-500"/>
            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 hover:-translate-y-2 transition">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500">
                AI Analysis
              </p>

              <h2 className="text-4xl font-bold text-purple-600 mt-2">

                {resumes.filter(r=>r.atsScore>0).length}

              </h2>

            </div>

            <div className="bg-purple-100 p-4 rounded-2xl">
              <FaBrain className="text-3xl text-purple-600"/>
            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-xl p-6 hover:-translate-y-2 transition">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-gray-500">
                Reports
              </p>

              <h2 className="text-4xl font-bold text-indigo-600 mt-2">

                {analysis ? 1 : 0}

              </h2>

            </div>

            <div className="bg-indigo-100 p-4 rounded-2xl">
              <FaDownload className="text-3xl text-indigo-600"/>
            </div>

          </div>

        </div>

      </div>

      {/* SEARCH */}

      <div className="bg-white rounded-3xl shadow-xl p-6 mb-10">

        <div className="grid lg:grid-cols-3 gap-5">

          <div className="relative">

            <FaSearch className="absolute left-5 top-5 text-gray-400"/>

            <input

              type="text"

              placeholder="Search Resume..."

              value={search}

              onChange={(e)=>setSearch(e.target.value)}

              className="w-full pl-14 pr-5 py-4 border rounded-2xl outline-none focus:ring-2 focus:ring-blue-500"

            />

          </div>

          <div className="relative">

            <FaSortAmountDown className="absolute left-5 top-5 text-gray-400"/>

            <select

              value={sortBy}

              onChange={(e)=>setSortBy(e.target.value)}

              className="w-full pl-14 py-4 border rounded-2xl"

            >

              <option value="latest">
                Latest Upload
              </option>

              <option value="highest">
                Highest ATS
              </option>

              <option value="lowest">
                Lowest ATS
              </option>

            </select>

          </div>

          <div className="relative">

            <FaFilter className="absolute left-5 top-5 text-gray-400"/>

            <select

              value={filter}

              onChange={(e)=>setFilter(e.target.value)}

              className="w-full pl-14 py-4 border rounded-2xl"

            >

              <option value="all">
                All Scores
              </option>

              <option value="good">
                Excellent (80+)
              </option>

              <option value="average">
                Average (60-79)
              </option>

              <option value="poor">
                Needs Improvement
              </option>

            </select>

          </div>

        </div>

      </div>
      {filteredResumes.length === 0 ? (

  <div className="bg-white rounded-3xl shadow-xl p-16 text-center">

    <div className="text-8xl mb-6">
      📂
    </div>

    <h2 className="text-4xl font-bold text-gray-700">
      No Resume Found
    </h2>

    <p className="text-gray-500 mt-4 mb-8 text-lg">
      Upload your first resume and let ResumeX AI analyze it.
    </p>

    <Link
      to="/upload"
      className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl hover:scale-105 transition shadow-xl"
    >
      <FaFileAlt />
      Upload Resume
    </Link>

  </div>

) : (

<div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">

{filteredResumes.map((resume)=>(

<div
key={resume._id}
className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition duration-300 overflow-hidden border"
>

<div className="bg-gradient-to-r from-blue-600 to-indigo-700 h-3"></div>

<div className="p-7">

<div className="flex justify-between items-start">

<div>

<h2 className="font-bold text-xl break-all">

{resume.fileName}

</h2>

<p className="text-gray-500 mt-2">

{new Date(resume.createdAt).toLocaleDateString()}

</p>

</div>

<div
className={`px-4 py-2 rounded-full text-white font-bold ${
resume.atsScore>=80
? "bg-green-500"
: resume.atsScore>=60
? "bg-yellow-500"
: "bg-red-500"
}`}
>

{resume.atsScore}/100

</div>

</div>

<div className="mt-8">

<div className="flex justify-between mb-2">

<span className="font-semibold">

ATS Score

</span>

<span>

{resume.atsScore}%

</span>

</div>

<div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

<div

className={`h-full rounded-full transition-all duration-700 ${
resume.atsScore>=80
? "bg-green-500"
: resume.atsScore>=60
? "bg-yellow-500"
: "bg-red-500"
}`}

style={{

width:`${resume.atsScore}%`

}}

></div>

</div>

</div>

<div className="grid grid-cols-2 gap-3 mt-8">

<a

href={resume.fileUrl}

target="_blank"

rel="noreferrer"

className="flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"

>

<FaEye />

View

</a>

<a

href={resume.fileUrl.replace(
"/upload/",
"/upload/fl_attachment/"
)}

target="_blank"

rel="noreferrer"

className="flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl transition"

>

<FaDownload />

Download

</a>

</div>

<button

onClick={()=>handleAnalyze(resume._id)}

disabled={analyzing}

className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"

>

<FaRobot className="inline mr-2"/>

{analyzing ? "Analyzing..." : "Analyze Resume"}

</button>

<button

onClick={()=>handleInterview(resume._id)}

className="w-full mt-3 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition"

>

<FaMicrophone className="inline mr-2"/>

Generate Interview

</button>

<button

onClick={()=>handleDelete(resume._id)}

className="w-full mt-3 bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-semibold transition"

>

<FaTrash className="inline mr-2"/>

Delete Resume

</button>

</div>

</div>

))}

</div>

)}
{analysis && (

<div className="mt-12">

<div className="bg-white rounded-3xl shadow-2xl overflow-hidden border">

<div className="bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-600 text-white p-8">

<h2 className="text-4xl font-bold">
🤖 ResumeX AI Analysis Report
</h2>

<p className="mt-2 text-blue-100">
AI-powered ATS analysis and improvement suggestions
</p>

</div>

<div className="p-8">

<div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-10">

<div>

<h3 className="text-2xl font-bold">
ATS Score
</h3>

<p className="text-gray-500">
Your resume compatibility score
</p>

</div>

<div
className={`w-40 h-40 rounded-full flex items-center justify-center text-5xl font-bold text-white shadow-xl ${
analysis.atsScore >= 80
? "bg-green-500"
: analysis.atsScore >= 60
? "bg-yellow-500"
: "bg-red-500"
}`}
>

{analysis.atsScore}

</div>

</div>

<div className="grid lg:grid-cols-2 gap-8">

<div className="bg-green-50 rounded-2xl p-6 border border-green-200">

<h3 className="text-2xl font-bold text-green-700 mb-4">
✅ Strengths
</h3>

<ul className="space-y-3">

{analysis.strengths?.length ? (

analysis.strengths.map((item,index)=>(
<li key={index}>
• {item}
</li>
))

) : (

<li>No strengths found.</li>

)}

</ul>

</div>

<div className="bg-red-50 rounded-2xl p-6 border border-red-200">

<h3 className="text-2xl font-bold text-red-700 mb-4">
❌ Weaknesses
</h3>

<ul className="space-y-3">

{analysis.weaknesses?.length ? (

analysis.weaknesses.map((item,index)=>(
<li key={index}>
• {item}
</li>
))

) : (

<li>No weaknesses found.</li>

)}

</ul>

</div>

<div className="bg-yellow-50 rounded-2xl p-6 border border-yellow-200">

<h3 className="text-2xl font-bold text-yellow-700 mb-4">
🔑 Missing Keywords
</h3>

<ul className="space-y-3">

{analysis.missingKeywords?.length ? (

analysis.missingKeywords.map((item,index)=>(
<li key={index}>
• {item}
</li>
))

) : (

<li>No missing keywords.</li>

)}

</ul>

</div>

<div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">

<h3 className="text-2xl font-bold text-blue-700 mb-4">
💡 Suggestions
</h3>

<ul className="space-y-3">

{analysis.suggestions?.length ? (

analysis.suggestions.map((item,index)=>(
<li key={index}>
• {item}
</li>
))

) : (

<li>No suggestions available.</li>

)}

</ul>

</div>

</div>

<div className="flex justify-center mt-10">

<button
onClick={downloadPDF}
className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-10 py-4 rounded-2xl shadow-xl transition flex items-center gap-3"
>

<FaDownload />

Download PDF Report

</button>

</div>

</div>

</div>

</div>

)}

</div>

</div>

);

};

export default MyResumes;