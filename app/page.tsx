"use client";
import React, { useState } from "react";

// --- Form Component ---
function InvestmentForm({
  investmentFocus,
  setInvestmentFocus,
  geographicRegion,
  setGeographicRegion,
  riskTolerance,
  setRiskTolerance,
  specificKeywords,
  setSpecificKeywords,
  loading,
  handleSubmit,
}: any) {
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="investmentFocus" className="block text-sm font-medium text-gray-700 mb-1">
          Investment Focus (e.g., &quot;growth potential&quot;, &quot;stable dividends&quot;, &quot;low debt&quot;)
        </label>
        <textarea
          id="investmentFocus"
          value={investmentFocus}
          onChange={(e) => setInvestmentFocus(e.target.value)}
          placeholder="Describe what you're looking for in an airline stock..."
          rows={3}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
          required
        />
      </div>
      <div>
        <label htmlFor="geographicRegion" className="block text-sm font-medium text-gray-700 mb-1">
          Geographic Region (Optional)
        </label>
        <input
          type="text"
          id="geographicRegion"
          value={geographicRegion}
          onChange={(e) => setGeographicRegion(e.target.value)}
          placeholder="e.g., North America, Europe, Asia-Pacific"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="riskTolerance" className="block text-sm font-medium text-gray-700 mb-1">
          Risk Tolerance
        </label>
        <select
          id="riskTolerance"
          value={riskTolerance}
          onChange={(e) => setRiskTolerance(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <div>
        <label htmlFor="specificKeywords" className="block text-sm font-medium text-gray-700 mb-1">
          Specific Keywords (Optional, e.g., "sustainable aviation", "cargo")
        </label>
        <input
          type="text"
          id="specificKeywords"
          value={specificKeywords}
          onChange={(e) => setSpecificKeywords(e.target.value)}
          placeholder="e.g., 'sustainable aviation', 'cargo operations'"
          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-lg font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          "Get Stock Recommendations"
        )}
      </button>
    </form>
  );
}

// --- Result Component ---
function RecommendationResult({ result }: any) {
  if (!result) return null;
  return (
    <div className="mt-6 p-6 bg-teal-50 rounded-lg border border-teal-200 shadow-md">
      <h2 className="text-xl font-semibold text-gray-800 mb-3">Recommendation Result (Day 1 Simulation):</h2>
      <div className="text-gray-700 mb-2">
        <span className="font-medium">Simulated Web Search Queries:</span>
        <ul className="list-disc list-inside ml-4">
          {result.searchQueries?.map((query: string, idx: number) => (
            <li key={idx} className="text-sm text-gray-600">{query}</li>
          ))}
        </ul>
      </div>
      <div className="text-gray-700 mb-2">
        <span className="font-medium">Simulated Search Results:</span>
        <pre className="bg-gray-100 p-3 rounded-md text-sm overflow-auto max-h-40">
          {JSON.stringify(result.mockSearchResults, null, 2)}
        </pre>
      </div>
      <div className="text-gray-700">
        <span className="font-medium">Simulated LLM Analysis:</span> {result.marketAnalysis}
      </div>
      <div className="text-gray-700">
        <span className="font-medium">Simulated Recommended Stocks:</span>
        <ul className="list-disc list-inside ml-4">
          {result.recommendedStocks?.map((stock: string, idx: number) => (
            <li key={idx} className="text-sm text-gray-600">{stock}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// --- Error Component ---
function ErrorMessage({ error }: { error: string | null }) {
  if (!error) return null;
  return (
    <div className="mt-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
      <p className="font-bold">Error:</p>
      <p>{error}</p>
    </div>
  );
}

// --- Main Page ---
export default function App() {
  const [investmentFocus, setInvestmentFocus] = useState("");
  const [geographicRegion, setGeographicRegion] = useState("");
  const [riskTolerance, setRiskTolerance] = useState("medium");
  const [specificKeywords, setSpecificKeywords] = useState("");
  const [recommendationResult, setRecommendationResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRecommendationResult(null);

    try {
      const response = await fetch("/api/recommend-stocks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          investmentFocus,
          geographicRegion,
          riskTolerance,
          specificKeywords,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Something went wrong with the API request.");
      }
      const data = await response.json();
      setRecommendationResult(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">
      <div className="bg-white p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl w-full max-w-2xl border border-gray-200">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
          Airline Stock Recommender
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Tell me your investment focus, and I'll recommend airline stocks based on market data.
        </p>
        <InvestmentForm
          investmentFocus={investmentFocus}
          setInvestmentFocus={setInvestmentFocus}
          geographicRegion={geographicRegion}
          setGeographicRegion={setGeographicRegion}
          riskTolerance={riskTolerance}
          setRiskTolerance={setRiskTolerance}
          specificKeywords={specificKeywords}
          setSpecificKeywords={setSpecificKeywords}
          loading={loading}
          handleSubmit={handleSubmit}
        />
        <ErrorMessage error={error} />
        <RecommendationResult result={recommendationResult} />
      </div>
    </div>
  );
}