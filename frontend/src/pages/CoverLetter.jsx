import { useState } from "react";
import toast from "react-hot-toast";

import {
  FaEnvelope,
  FaUser,
  FaBuilding,
  FaBriefcase,
  FaMagic,
} from "react-icons/fa";

import {
  generateCoverLetter,
} from "../services/coverLetterService";

const CoverLetter = () => {

const [loading,setLoading]=useState(false);

const [coverLetter,setCoverLetter]=useState("");

const [formData,setFormData]=useState({

fullName:"",
jobRole:"",
company:"",
skills:"",
experience:"",
jobDescription:"",

});

const handleChange=(e)=>{

setFormData({

...formData,

[e.target.name]:e.target.value,

});

};

const handleGenerate=async()=>{

try{

setLoading(true);

const data=await generateCoverLetter(formData);

setCoverLetter(data.coverLetter);

toast.success("Cover Letter Generated");

}catch(err){

console.log(err);

toast.error("Generation Failed");

}finally{

setLoading(false);

}

};

return(

<div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

<div className="max-w-7xl mx-auto px-8 py-10">

{/* HERO */}

<div className="rounded-3xl overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 text-white shadow-2xl p-10 mb-10">

<div className="flex flex-col lg:flex-row justify-between items-center">

<div>

<h1 className="text-5xl font-extrabold">

✉ AI Cover Letter Generator

</h1>

<p className="text-blue-100 text-xl mt-4">

Generate professional, ATS-friendly cover letters in seconds.

</p>

</div>

<div className="hidden lg:block">

<div className="bg-white/20 backdrop-blur-lg rounded-3xl p-8">

<FaEnvelope className="text-8xl"/>

</div>

</div>

</div>

</div>

<div className="grid lg:grid-cols-2 gap-8">

{/* LEFT */}

<div className="space-y-8">

<div className="bg-white rounded-3xl shadow-xl p-8">

<div className="flex items-center gap-3 mb-6">

<div className="bg-blue-100 p-3 rounded-xl">

<FaUser className="text-blue-600 text-2xl"/>

</div>

<h2 className="text-2xl font-bold">

Applicant Information

</h2>

</div>
<h2 className="text-2xl font-bold">

Applicant Information

</h2>

</div>
<input
type="text"
name="fullName"
placeholder="Full Name"
value={formData.fullName}
onChange={handleChange}
className="w-full border-2 border-gray-200 rounded-2xl p-4 mb-4 outline-none focus:border-blue-500"
/>

<input
type="text"
name="jobRole"
placeholder="Job Role"
value={formData.jobRole}
onChange={handleChange}
className="w-full border-2 border-gray-200 rounded-2xl p-4 mb-4 outline-none focus:border-blue-500"
/>

<div className="flex items-center gap-3 mb-4 mt-6">

<div className="bg-green-100 p-3 rounded-xl">

<FaBuilding className="text-green-600 text-xl"/>

</div>

<h2 className="text-xl font-bold">

Company Information

</h2>

</div>

<input
type="text"
name="company"
placeholder="Company Name"
value={formData.company}
onChange={handleChange}
className="w-full border-2 border-gray-200 rounded-2xl p-4 outline-none focus:border-green-500"
/>

</div>

{/* RIGHT FORM */}

<div className="bg-white rounded-3xl shadow-xl p-8">

<div className="flex items-center gap-3 mb-6">

<div className="bg-purple-100 p-3 rounded-xl">

<FaBriefcase className="text-purple-600 text-2xl"/>

</div>

<h2 className="text-2xl font-bold">

Professional Details

</h2>

</div>

<textarea
rows="4"
name="skills"
placeholder="Skills"
value={formData.skills}
onChange={handleChange}
className="w-full border-2 border-gray-200 rounded-2xl p-4 mb-5 resize-none outline-none focus:border-purple-500"
/>

<textarea
rows="5"
name="experience"
placeholder="Experience"
value={formData.experience}
onChange={handleChange}
className="w-full border-2 border-gray-200 rounded-2xl p-4 mb-5 resize-none outline-none focus:border-purple-500"
/>

<textarea
rows="8"
name="jobDescription"
placeholder="Paste the complete Job Description here..."
value={formData.jobDescription}
onChange={handleChange}
className="w-full border-2 border-gray-200 rounded-2xl p-4 resize-none outline-none focus:border-purple-500"
/>

</div>

</div>
<div className="flex justify-center mt-10">

<button
onClick={handleGenerate}
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

Generating Cover Letter...

</>

) : (

<>

<FaMagic className="text-2xl"/>

Generate AI Cover Letter

</>

)}

</button>

</div>

{coverLetter && (

<div className="mt-12">

<div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

<div className="bg-gradient-to-r from-green-600 via-blue-600 to-indigo-700 text-white p-8">

<h2 className="text-4xl font-bold">

📄 Generated Cover Letter

</h2>

<p className="text-blue-100 mt-2">

Professionally written by ResumeX AI.

</p>

</div>

<div className="p-8">

<div className="flex flex-wrap gap-4 justify-end mb-6">

<button
onClick={()=>{
navigator.clipboard.writeText(coverLetter);
toast.success("Copied to Clipboard");
}}
className="bg-blue-600 text-white px-5 py-3 rounded-xl hover:bg-blue-700 transition"
>

📋 Copy

</button>

<button
onClick={()=>{
const blob=new Blob([coverLetter],{type:"text/plain"});
const url=window.URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download="CoverLetter.txt";

a.click();

window.URL.revokeObjectURL(url);

toast.success("Downloaded Successfully");

}}
className="bg-green-600 text-white px-5 py-3 rounded-xl hover:bg-green-700 transition"
>

📥 Download

</button>

</div>

<div className="bg-gray-50 rounded-2xl border border-gray-200 p-8">

<pre className="whitespace-pre-wrap text-gray-700 leading-8 font-sans">

{coverLetter}

</pre>

</div>

</div>

</div>

</div>

)}

</div>

</div>

);

};

export default CoverLetter;