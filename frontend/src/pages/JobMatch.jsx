import { useState } from "react";
import toast from "react-hot-toast";

import {
  compareResume,
} from "../services/jobService";

import {
  FaRobot,
  FaBriefcase,
  FaFileAlt,
  FaSearch,
} from "react-icons/fa";

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

<div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

<div className="max-w-7xl mx-auto px-8 py-10">

{/* HERO */}

<div className="rounded-3xl overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white shadow-2xl p-10 mb-10">

<div className="flex flex-col lg:flex-row justify-between items-center gap-8">

<div>

<h1 className="text-5xl font-extrabold">

🎯 AI Job Match

</h1>

<p className="text-blue-100 text-xl mt-3">

Compare your Resume with any Job Description

</p>

<p className="text-blue-200 mt-4 max-w-2xl">

ResumeX AI analyzes your resume using Artificial Intelligence
and finds missing skills, keywords, strengths and improvements.

</p>

</div>

<div className="hidden lg:block">

<div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8">

<FaRobot className="text-8xl"/>

</div>

</div>

</div>

</div>

{/* INPUT SECTION */}

<div className="grid lg:grid-cols-2 gap-8">

{/* Resume */}

<div className="bg-white rounded-3xl shadow-xl p-8">

<div className="flex items-center gap-3 mb-6">

<div className="bg-blue-100 p-3 rounded-xl">

<FaFileAlt className="text-2xl text-blue-600"/>

</div>

<div>

<h2 className="text-2xl font-bold">

Resume

</h2>

<p className="text-gray-500">

Paste your complete resume text

</p>

</div>

</div>

<textarea

rows="18"

value={resumeText}

onChange={(e)=>setResumeText(e.target.value)}

placeholder="Paste Resume Text Here..."

className="w-full border-2 border-gray-200 rounded-2xl p-5 outline-none focus:border-blue-500 resize-none"

></textarea>

</div>

{/* Job Description */}

<div className="bg-white rounded-3xl shadow-xl p-8">

<div className="flex items-center gap-3 mb-6">

<div className="bg-green-100 p-3 rounded-xl">

<FaBriefcase className="text-2xl text-green-600"/>

</div>

<div>

<h2 className="text-2xl font-bold">

Job Description

</h2>

<p className="text-gray-500">

Paste the company's job description

</p>

</div>

</div>

<textarea

rows="18"

value={jobDescription}

onChange={(e)=>setJobDescription(e.target.value)}

placeholder="Paste Job Description Here..."

className="w-full border-2 border-gray-200 rounded-2xl p-5 outline-none focus:border-green-500 resize-none"

></textarea>

</div>

</div>
<div className="flex justify-center mt-10">

  <button
    onClick={handleCompare}
    disabled={loading}
    className={`px-12 py-5 rounded-2xl text-white text-xl font-bold shadow-2xl transition duration-300 flex items-center gap-4 ${
      loading
        ? "bg-gray-500 cursor-not-allowed"
        : "bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 hover:scale-105 hover:shadow-blue-400/40"
    }`}
  >
    {loading ? (
      <>
        <div className="w-7 h-7 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        AI Comparing...
      </>
    ) : (
      <>
        <FaSearch className="text-2xl" />
        Compare Resume
      </>
    )}
  </button>

</div>

{analysis && (

<div className="mt-14">

<div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

<div className="bg-gradient-to-r from-green-600 via-blue-600 to-indigo-700 text-white p-8">

<h2 className="text-4xl font-bold">

🎯 Job Match Report

</h2>

<p className="text-blue-100 mt-2">

Artificial Intelligence analyzed your resume against this job.

</p>

</div>

<div className="p-10">

<div className="flex flex-col lg:flex-row items-center justify-between gap-10">

<div>

<h3 className="text-3xl font-bold">

Overall Match Score

</h3>

<p className="text-gray-500 mt-2">

Resume Compatibility

</p>

</div>

<div
className={`w-48 h-48 rounded-full flex items-center justify-center text-6xl font-extrabold text-white shadow-2xl ${
analysis.matchScore >= 80
? "bg-green-500"
: analysis.matchScore >= 60
? "bg-yellow-500"
: "bg-red-500"
}`}
>

{analysis.matchScore}%

</div>

</div>

<div className="mt-10 grid lg:grid-cols-2 gap-8">
{/* Matching Skills */}

<div className="bg-green-50 border border-green-200 rounded-3xl p-7 shadow">

<div className="flex items-center gap-3 mb-5">

<div className="bg-green-500 w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl">

✅

</div>

<h3 className="text-2xl font-bold text-green-700">

Matching Skills

</h3>

</div>

{analysis.matchingSkills?.length ? (

<ul className="space-y-3">

{analysis.matchingSkills.map((skill,index)=>(

<li
key={index}
className="bg-white rounded-xl px-4 py-3 shadow-sm border border-green-100 flex items-center gap-3"
>

<span className="text-green-600 font-bold">

✔

</span>

<span>

{skill}

</span>

</li>

))}

</ul>

) : (

<p className="text-gray-500">

No matching skills found.

</p>

)}

</div>

{/* Missing Skills */}

<div className="bg-red-50 border border-red-200 rounded-3xl p-7 shadow">

<div className="flex items-center gap-3 mb-5">

<div className="bg-red-500 w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl">

❌

</div>

<h3 className="text-2xl font-bold text-red-700">

Missing Skills

</h3>

</div>

{analysis.missingSkills?.length ? (

<ul className="space-y-3">

{analysis.missingSkills.map((skill,index)=>(

<li
key={index}
className="bg-white rounded-xl px-4 py-3 shadow-sm border border-red-100 flex items-center gap-3"
>

<span className="text-red-600 font-bold">

✖

</span>

<span>

{skill}

</span>

</li>

))}

</ul>

) : (

<p className="text-gray-500">

No missing skills.

</p>

)}

</div>

</div>

<div className="mt-8 grid lg:grid-cols-2 gap-8">
{/* Missing Keywords */}

<div className="bg-yellow-50 border border-yellow-200 rounded-3xl p-7 shadow">

  <div className="flex items-center gap-3 mb-5">

    <div className="bg-yellow-500 w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl">
      🔑
    </div>

    <h3 className="text-2xl font-bold text-yellow-700">
      Missing Keywords
    </h3>

  </div>

  {analysis.missingKeywords?.length ? (

    <div className="flex flex-wrap gap-3">

      {analysis.missingKeywords.map((keyword, index) => (

        <span
          key={index}
          className="bg-yellow-500 text-white px-4 py-2 rounded-full shadow"
        >
          {keyword}
        </span>

      ))}

    </div>

  ) : (

    <p className="text-gray-500">
      No missing keywords.
    </p>

  )}

</div>

{/* AI Suggestions */}

<div className="bg-blue-50 border border-blue-200 rounded-3xl p-7 shadow">

  <div className="flex items-center gap-3 mb-5">

    <div className="bg-blue-600 w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl">
      💡
    </div>

    <h3 className="text-2xl font-bold text-blue-700">
      AI Suggestions
    </h3>

  </div>

  {analysis.suggestions?.length ? (

    <ul className="space-y-4">

      {analysis.suggestions.map((item, index) => (

        <li
          key={index}
          className="bg-white rounded-xl p-4 shadow border border-blue-100 flex gap-3"
        >
          <span className="text-blue-600 text-xl">
            ➜
          </span>

          <span>
            {item}
          </span>

        </li>

      ))}

    </ul>

  ) : (

    <p className="text-gray-500">
      No suggestions available.
    </p>

  )}

</div>

</div>

</div>

</div>

</div>

)}

</div>

</div>

);

};

export default JobMatch;