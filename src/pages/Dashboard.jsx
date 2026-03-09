import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/axios";

import StatsCards from "../components/dashboard/StatsCards";
import TrendChart from "../components/dashboard/TrendChart";
import SkillRadar from "../components/dashboard/SkillRadar";
import InterviewTable from "../components/dashboard/InterviewTable";

const Dashboard = () => {

  const navigate = useNavigate();

  const [analytics, setAnalytics] = useState(null);
  const [results, setResults] = useState([]);

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    async function loadDashboard() {
      try {

        const analyticsRes = await API.get("/dashboard/analytics");
        const resultsRes = await API.get("/dashboard/results");

        setAnalytics(analyticsRes.data);
        setResults(resultsRes.data);

      } catch (err) {
        console.error(err);
      }
    }

    loadDashboard();

  }, []);

  if (!analytics) {
    return <div className="text-center py-40 text-gray-400">Loading Dashboard...</div>;
  }

  return (
    <section className="relative px-6 py-20 overflow-hidden">

      {/* Glow background */}
      <div className="absolute w-[700px] h-[700px] bg-green-400/20 blur-[150px] rounded-full top-0 left-1/2 -translate-x-1/2"></div>

      <div className="relative max-w-7xl mx-auto space-y-12">

        <h1 className="text-4xl md:text-5xl font-extrabold text-center">
          AI Interview <span className="text-green-400">Dashboard</span>
        </h1>

        {/* Stats */}
        <StatsCards analytics={analytics} />

        {/* Graph Section */}
        <div className="grid md:grid-cols-2 gap-8">
          <TrendChart data={analytics.trend} />
          <SkillRadar data={analytics.segmentScores} />
        </div>

        {/* Interview History */}
        <InterviewTable results={results} />

      </div>

    </section>
  );
};

export default Dashboard;