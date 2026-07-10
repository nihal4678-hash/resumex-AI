import { useState } from "react";
import toast from "react-hot-toast";

import {
  FaRobot,
  FaUser,
  FaGraduationCap,
  FaLaptopCode,
  FaBriefcase,
  FaMagic,
} from "react-icons/fa";

import {
  generateSummary,
} from "../services/resumeBuilderService";

import {
  generateSkills,
} from "../services/skillsService";

const ResumeBuilder = () => {

const [formData,setFormData]=useState({

fullName:"",
email:"",
phone:"",
skills:"",
education:"",
experience:"",
projects:"",
summary:"",

});

const handleChange=(e)=>{

setFormData({

...formData,

[e.target.name]:e.target.value,

});

};

const handleGenerateSummary=async()=>{

try{

const data=await generateSummary(formData);

setFormData({

...formData,

summary:data.summary,

});

toast.success("Summary Generated");

}catch(err){

console.log(err);

toast.error("Generation Failed");

}

};

const handleGenerateSkills=async()=>{

try{

const data=await generateSkills(formData);

setFormData({

...formData,

skills:data.skills,

});

toast.success("Skills Generated");

}catch(err){

console.log(err);

toast.error("Failed to Generate Skills");

}

};

return(

<div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">

<div className="max-w-7xl mx-auto px-8 py-10">

{/* HERO */}

<div className="rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-700 via-blue-700 to-cyan-600 text-white shadow-2xl p-10 mb-10">

<div className="flex flex-col lg:flex-row justify-between items-center">

<div>

<h1 className="text-5xl font-extrabold">

🤖 AI Resume Builder

</h1>

<p className="text-xl mt-4 text-blue-100">

Build a professional ATS-friendly resume using Artificial Intelligence.

</p>

</div>

<div className="hidden lg:block">

<div className="bg-white/20 backdrop-blur-xl rounded-3xl p-8">

<FaRobot className="text-8xl"/>

</div>

</div>

</div>

</div>

{/* FORM */}

<div className="grid lg:grid-cols-2 gap-8">

{/* LEFT PANEL */}

<div className="space-y-8">

{/* PERSONAL INFO */}

<div className="bg-white rounded-3xl shadow-xl p-8">

<div className="flex items-center gap-3 mb-6">

<div className="bg-blue-100 p-3 rounded-xl">

<FaUser className="text-blue-600 text-2xl"/>

</div>

<h2 className="text-2xl font-bold">

Personal Information

</h2>

</div>
<h2 className="text-2xl font-bold">
Personal Information
</h2>

</div>
<input
type="text"
name="fullName"
placeholder="Full Name"
value={formData.fullName}
onChange={handleChange}
className="w-full border-2 border-gray-200 rounded-2xl p-4 mb-4 focus:border-blue-500 outline-none"
/>

<input
type="email"
name="email"
placeholder="Email Address"
value={formData.email}
onChange={handleChange}
className="w-full border-2 border-gray-200 rounded-2xl p-4 mb-4 focus:border-blue-500 outline-none"
/>

<input
type="text"
name="phone"
placeholder="Phone Number"
value={formData.phone}
onChange={handleChange}
className="w-full border-2 border-gray-200 rounded-2xl p-4 focus:border-blue-500 outline-none"
/>

</div>

{/* SKILLS */}

<div className="bg-white rounded-3xl shadow-xl p-8">

<div className="flex justify-between items-center mb-6">

<div className="flex items-center gap-3">

<div className="bg-purple-100 p-3 rounded-xl">

<FaLaptopCode className="text-purple-600 text-2xl"/>

</div>

<h2 className="text-2xl font-bold">

Skills

</h2>

</div>

<button
type="button"
onClick={handleGenerateSkills}
className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white px-5 py-3 rounded-xl hover:scale-105 transition"
>

<FaMagic className="inline mr-2"/>

AI Skills

</button>

</div>

<textarea
rows="7"
name="skills"
placeholder="Enter your skills..."
value={formData.skills}
onChange={handleChange}
className="w-full border-2 border-gray-200 rounded-2xl p-5 resize-none focus:border-purple-500 outline-none"
/>

</div>

</div>

{/* RIGHT PANEL */}

<div className="space-y-8">
{/* EDUCATION */}

<div className="bg-white rounded-3xl shadow-xl p-8">

<div className="flex items-center gap-3 mb-6">

<div className="bg-green-100 p-3 rounded-xl">

<FaGraduationCap className="text-green-600 text-2xl"/>

</div>

<h2 className="text-2xl font-bold">

Education

</h2>

</div>

<textarea
rows="5"
name="education"
placeholder="Enter your education details..."
value={formData.education}
onChange={handleChange}
className="w-full border-2 border-gray-200 rounded-2xl p-5 resize-none focus:border-green-500 outline-none"
/>

</div>

{/* EXPERIENCE */}

<div className="bg-white rounded-3xl shadow-xl p-8">

<div className="flex items-center gap-3 mb-6">

<div className="bg-orange-100 p-3 rounded-xl">

<FaBriefcase className="text-orange-600 text-2xl"/>

</div>

<h2 className="text-2xl font-bold">

Work Experience

</h2>

</div>

<textarea
rows="6"
name="experience"
placeholder="Enter your work experience..."
value={formData.experience}
onChange={handleChange}
className="w-full border-2 border-gray-200 rounded-2xl p-5 resize-none focus:border-orange-500 outline-none"
/>

</div>

{/* PROJECTS */}

<div className="bg-white rounded-3xl shadow-xl p-8">

<div className="flex items-center gap-3 mb-6">

<div className="bg-cyan-100 p-3 rounded-xl">

<FaLaptopCode className="text-cyan-600 text-2xl"/>

</div>

<h2 className="text-2xl font-bold">

Projects

</h2>

</div>

<textarea
rows="6"
name="projects"
placeholder="Describe your projects..."
value={formData.projects}
onChange={handleChange}
className="w-full border-2 border-gray-200 rounded-2xl p-5 resize-none focus:border-cyan-500 outline-none"
/>

</div>

</div>

</div>

{/* AI SUMMARY SECTION */}

<div className="mt-10">

<div className="bg-white rounded-3xl shadow-2xl p-8">

<div className="flex justify-between items-center mb-8">

<h2 className="text-3xl font-bold">

🤖 AI Professional Summary

</h2>

<button
type="button"
onClick={handleGenerateSummary}
className="bg-gradient-to-r from-green-600 to-emerald-700 text-white px-6 py-3 rounded-xl hover:scale-105 transition flex items-center gap-2"
>

<FaMagic />

Generate AI Summary

</button>

</div>
<textarea
rows="8"
name="summary"
placeholder="Your AI-generated professional summary will appear here..."
value={formData.summary}
onChange={handleChange}
className="w-full border-2 border-gray-200 rounded-2xl p-5 resize-none focus:border-green-500 outline-none"
/>

</div>

</div>

{/* LIVE PREVIEW */}

<div className="mt-10 bg-white rounded-3xl shadow-2xl p-8">

<h2 className="text-3xl font-bold mb-8">

📄 Resume Preview

</h2>

<div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 bg-gray-50">

<h1 className="text-4xl font-bold text-blue-700">

{formData.fullName || "Your Name"}

</h1>

<p className="text-gray-600 mt-2">

{formData.email || "email@example.com"}

</p>

<p className="text-gray-600">

{formData.phone || "+91 XXXXX XXXXX"}

</p>

<hr className="my-6"/>

<h2 className="text-2xl font-bold mb-2">

Professional Summary

</h2>

<p className="text-gray-700 whitespace-pre-wrap">

{formData.summary || "AI-generated summary will appear here."}

</p>

<hr className="my-6"/>

<h2 className="text-2xl font-bold mb-2">

Skills

</h2>

<p className="text-gray-700 whitespace-pre-wrap">

{formData.skills || "Your skills"}

</p>

<hr className="my-6"/>

<h2 className="text-2xl font-bold mb-2">

Education

</h2>

<p className="text-gray-700 whitespace-pre-wrap">

{formData.education || "Education details"}

</p>

<hr className="my-6"/>

<h2 className="text-2xl font-bold mb-2">

Experience

</h2>

<p className="text-gray-700 whitespace-pre-wrap">

{formData.experience || "Experience details"}

</p>

<hr className="my-6"/>

<h2 className="text-2xl font-bold mb-2">

Projects

</h2>

<p className="text-gray-700 whitespace-pre-wrap">

{formData.projects || "Projects details"}

</p>

</div>

</div>

{/* GENERATE BUTTON */}

<div className="flex justify-center mt-10 mb-16">

<button
className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white px-12 py-5 rounded-2xl text-xl font-bold shadow-2xl hover:scale-105 transition duration-300 flex items-center gap-3"
>

<FaRobot />

Generate Resume

</button>

</div>

</div>



);

};

export default ResumeBuilder;