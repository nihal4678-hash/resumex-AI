import { useState } from "react";
import { generateSummary } from "../services/resumeBuilderService";
import toast from "react-hot-toast";
import { generateSkills } from "../services/skillsService";

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    skills: "",
    education: "",
    experience: "",
    projects: "",
    summary: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleGenerateSummary = async () => {
    try {
      const data = await generateSummary(formData);

      setFormData({
        ...formData,
        summary: data.summary,
      });

      toast.success("Summary Generated");
    } catch (error) {
      console.error(error);
      toast.error("Generation Failed");
    }
  };
  const handleGenerateSkills = async () => {
  try {
    const data = await generateSkills(formData);

    setFormData({
      ...formData,
      skills: data.skills,
    });

    toast.success("Skills Generated");
  } catch (error) {
    console.error(error);
    toast.error("Failed to Generate Skills");
  }
};

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6">

      <h1 className="text-4xl font-bold mb-8">
        🤖 AI Resume Builder
      </h1>
      <div>

  <div className="flex justify-between items-center mb-2">

    <label className="font-semibold">
      Skills
    </label>

    <button
      type="button"
      onClick={handleGenerateSkills}
      className="bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700"
    >
      ✨ AI Skills
    </button>

  </div>

  <textarea
    rows="4"
    name="skills"
    placeholder="Skills"
    value={formData.skills}
    onChange={handleChange}
    className="border p-3 rounded-lg w-full"
  />

</div>

      <div className="grid md:grid-cols-2 gap-6">

        <input
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <textarea
          rows="4"
          name="skills"
          placeholder="Skills"
          value={formData.skills}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <textarea
          rows="4"
          name="education"
          placeholder="Education"
          value={formData.education}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <textarea
          rows="4"
          name="experience"
          placeholder="Experience"
          value={formData.experience}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

        <textarea
          rows="4"
          name="projects"
          placeholder="Projects"
          value={formData.projects}
          onChange={handleChange}
          className="border p-3 rounded-lg"
        />

      </div>

      {/* AI Summary */}

      <div className="mt-8">

        <div className="flex justify-between items-center mb-3">

          <h2 className="text-xl font-bold">
            Professional Summary
          </h2>

          <button
            type="button"
            onClick={handleGenerateSummary}
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700"
          >
            ✨ Generate AI Summary
          </button>

        </div>

        <textarea
          rows="6"
          name="summary"
          placeholder="Professional Summary"
          value={formData.summary}
          onChange={handleChange}
          className="border p-3 rounded-lg w-full"
        />

      </div>

      <button
        className="mt-8 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
      >
        🤖 Generate AI Resume
      </button>

    </div>
  );
};

export default ResumeBuilder;