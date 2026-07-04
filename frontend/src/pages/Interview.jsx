import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Interview = () => {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  const generateInterview = async () => {
    if (!role || !experience) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/interview/generate`,
        {
          role,
          experience,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setQuestions(res.data.questions);

      toast.success("Interview Questions Generated");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to generate interview"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-5">

      <h1 className="text-4xl font-bold text-center mb-8">
        🎤 AI Mock Interview
      </h1>

      <div className="bg-white rounded-2xl shadow-lg p-8">

        <div className="grid md:grid-cols-2 gap-5">

          <div>

            <label className="font-semibold">
              Job Role
            </label>

            <input
              type="text"
              placeholder="Example: MERN Stack Developer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border rounded-lg p-3 mt-2"
            />

          </div>

          <div>

            <label className="font-semibold">
              Experience
            </label>

            <input
              type="text"
              placeholder="Example: Fresher / 2 Years"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full border rounded-lg p-3 mt-2"
            />

          </div>

        </div>

        <button
          onClick={generateInterview}
          disabled={loading}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
        >
          {loading
            ? "Generating..."
            : "Generate Interview Questions"}
        </button>

      </div>

      {questions.length > 0 && (

        <div className="mt-10">

          <h2 className="text-3xl font-bold mb-6">
            Interview Questions
          </h2>

          <div className="space-y-5">

            {questions.map((question, index) => (

              <div
                key={index}
                className="bg-white shadow rounded-xl p-6 border-l-4 border-blue-600"
              >
                <h3 className="font-bold text-lg text-blue-700 mb-2">
                  Question {index + 1}
                </h3>

                <p className="text-gray-700">
                  {question}
                </p>
              </div>

            ))}

          </div>

        </div>

      )}

    </div>
  );
};

export default Interview;