import { useLocation, useNavigate } from "react-router-dom";

const Interview = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const questions = location.state?.questions || [];

  return (
    <div className="max-w-5xl mx-auto mt-10 p-5">

      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">
          🤖 AI Interview Questions
        </h1>

        <button
          onClick={() => navigate(-1)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
        >
          ← Back
        </button>
      </div>

      {questions.length === 0 ? (
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">
            No Questions Available
          </h2>

          <p className="text-gray-500">
            Generate interview questions from your resume first.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          {questions.map((question, index) => (
            <div
              key={index}
              className="bg-white shadow rounded-xl p-5 border-l-4 border-blue-600"
            >
              <h3 className="font-bold text-blue-700 mb-2">
                Question {index + 1}
              </h3>

              <p>{question}</p>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default Interview;