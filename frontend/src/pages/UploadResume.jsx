import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";
import {
  FaCloudUploadAlt,
  FaFilePdf,
  FaFileWord,
} from "react-icons/fa";

const UploadResume = () => {

  const [file, setFile] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleFile = (e) => {

    const selected = e.target.files[0];

    if (!selected) return;

    setFile(selected);

  };

  const uploadResume = async (e) => {

    e.preventDefault();

    if (!file) {

      toast.error("Please select a resume");

      return;

    }

    const formData = new FormData();

    formData.append("resume", file);

    try {

      setLoading(true);

      const res = await api.post(
        "/resume/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success(res.data.message);

      setFile(null);

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Upload Failed"
      );

    } finally {

      setLoading(false);

    }

  };

  const getIcon = () => {

    if (!file) return <FaCloudUploadAlt />;

    if (file.name.endsWith(".pdf"))
      return <FaFilePdf className="text-red-600" />;

    return <FaFileWord className="text-blue-600" />;

  };
    return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex justify-center items-center p-6">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-10">

        <div className="text-center">

          <div className="w-24 h-24 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-5xl text-blue-600">

            {getIcon()}

          </div>

          <h1 className="text-4xl font-bold text-gray-800 mt-6">
            Upload Resume
          </h1>

          <p className="text-gray-500 mt-2">
            Upload your Resume to get AI ATS Analysis,
            Job Matching and Interview Preparation.
          </p>

        </div>

        <form
          onSubmit={uploadResume}
          className="mt-10"
        >

          <label
            htmlFor="resume"
            className="block border-2 border-dashed border-blue-400 rounded-3xl p-12 text-center cursor-pointer hover:border-blue-600 hover:bg-blue-50 transition duration-300"
          >

            <div className="flex flex-col items-center">

              <FaCloudUploadAlt className="text-6xl text-blue-600 mb-5" />

              <h2 className="text-2xl font-bold text-gray-700">
                Drag & Drop Resume
              </h2>

              <p className="text-gray-500 mt-2">
                or Click to Browse
              </p>

              <p className="text-sm text-gray-400 mt-3">
                PDF, DOC, DOCX (Max 5MB)
              </p>

            </div>

            <input
              id="resume"
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFile}
              className="hidden"
            />

          </label>

          {file && (

            <div className="mt-8 bg-gray-50 rounded-2xl p-5 border flex items-center justify-between">

              <div className="flex items-center gap-4">

                <div className="text-4xl">

                  {getIcon()}

                </div>

                <div>

                  <h3 className="font-bold text-lg">

                    {file.name}

                  </h3>

                  <p className="text-gray-500">

                    {(file.size / 1024 / 1024).toFixed(2)} MB

                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={() => setFile(null)}
                className="text-red-600 hover:text-red-700 font-bold"
              >
                Remove
              </button>

            </div>

          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full mt-10 py-4 rounded-2xl text-white text-xl font-bold transition duration-300 shadow-lg ${
              loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-gradient-to-r from-blue-600 to-indigo-700 hover:scale-105"
            }`}
          >

            {loading ? (

              <div className="flex justify-center items-center gap-3">

                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>

                Uploading Resume...

              </div>

            ) : (

              "🚀 Upload Resume"

            )}

          </button>

        </form>

        <div className="grid md:grid-cols-3 gap-6 mt-12">

          <div className="bg-blue-50 rounded-2xl p-5 text-center">

            <h3 className="font-bold text-blue-700">
              🤖 AI ATS
            </h3>

            <p className="text-gray-500 mt-2 text-sm">
              Get ATS compatibility score instantly.
            </p>

          </div>

          <div className="bg-green-50 rounded-2xl p-5 text-center">

            <h3 className="font-bold text-green-700">
              💼 Job Match
            </h3>

            <p className="text-gray-500 mt-2 text-sm">
              Compare resume with Job Description.
            </p>

          </div>

          <div className="bg-purple-50 rounded-2xl p-5 text-center">

            <h3 className="font-bold text-purple-700">
              🎤 Interview
            </h3>

            <p className="text-gray-500 mt-2 text-sm">
              Generate AI Interview Questions.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default UploadResume;