import { useState } from "react";
import api from "../services/api";
import toast from "react-hot-toast";

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

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

      const res = await api.post("/resume/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success(res.data.message);
      setFile(null);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Upload Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Upload Resume
      </h1>

      <form onSubmit={uploadResume}>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full border p-3 rounded mb-6"
        />

        {file && (
          <p className="mb-4 text-green-600">
            Selected: {file.name}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full flex justify-center items-center gap-2 text-white py-3 rounded transition ${
            loading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Uploading...
            </>
          ) : (
            "Upload Resume"
          )}
        </button>
      </form>
    </div>
  );
};

export default UploadResume;