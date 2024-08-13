"use client";
import React, { useState } from "react";
import { Col, Divider, Row } from "antd";

import ResultCard from "@/components/ui/ResultCard";

const HomePage = () => {
  const [keyword, setKeyword] = useState("");
  const [socialMedia, setSocialMedia] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `/api/search?keyword=${encodeURIComponent(
          keyword
        )}&platform=${encodeURIComponent(socialMedia)}`
      );
      const data = await response.json();
      if (response.ok) {
        setResults(data.results);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col w-full justify-center">
      <h1 className="text-2xl font-semibold mb-6 text-center">
        Search Social Media Posts
      </h1>
      <div className="flex flex-row justify-evenly items-end gap-2 px-2">
        <div className="w-2/3">
          <label
            htmlFor="keyword"
            className="block text-gray-700 font-medium mb-2"
          >
            Keyword
          </label>
          <input
            id="keyword"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Enter keyword..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="w-2/3">
          <label
            htmlFor="socialMedia"
            className="block text-gray-700 font-medium mb-2"
          >
            Social Media Platform
          </label>
          <select
            id="socialMedia"
            value={socialMedia}
            onChange={(e) => setSocialMedia(e.target.value)}
            className="w-full px-4 py-[10px] border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select a platform</option>
            <option value="facebook">Facebook</option>
            <option value="twitter">Twitter</option>
            <option value="linkedin">LinkedIn</option>
            <option value="instagram">Instagram</option>
          </select>
        </div>

        <button
          onClick={handleSearch}
          className="w-fit bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {/* Results  */}
      <div className="mt-3 p-8 w-full">
        {error && <p className="text-red-500 mt-4">{error}</p>}

        {results.length > 0 && (
          <div className="mt-6">
            <Divider orientation="center">
              <h2 className="text-lg font-semibold mb-4">Search Results</h2>
            </Divider>
            <Row gutter={[16, 16]}>
              {results.map((result, index) => (
                <Col key={index} xs={24} sm={12} md={12} lg={12} xl={12}>
                  <ResultCard
                    social_media={socialMedia}
                    post_title={result.title}
                    post_des={result.description}
                    post_url={result.link}
                  />
                </Col>
              ))}
            </Row>
          </div>
        )}

        {/* Show loading skeleton if results are loading */}
        {loading && (
          <div className="mt-6">
            <Row gutter={[16, 16]}>
              {[...Array(4)].map((_, index) => (
                <Col key={index} xs={24} sm={12} md={12} lg={12} xl={12}>
                  <ResultCard isLoading={true} />
                </Col>
              ))}
            </Row>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
