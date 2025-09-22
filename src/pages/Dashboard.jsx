import { jobs } from "../mock/jobs";
import { candidates } from "../mock/candidates";
import { assessments } from "../mock/assessments";
import StatusBadge from "../components/StatusBadge";
import { Briefcase, Users, FileCheck } from "lucide-react";

export default function Dashboard() {
  const totalJobs = jobs.length;
  const activeJobs = jobs.filter((j) => j.status === "active").length;
  const archivedJobs = jobs.filter((j) => j.status === "archived").length;

  const totalCandidates = candidates.length;
  const stages = ["applied", "screen", "tech", "offer", "hired", "rejected"];
  const candidatesByStage = stages.map(
    (stage) => candidates.filter((c) => c.stage === stage).length
  );

  const totalAssessments = assessments.length;

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-extrabold tracking-tight mb-4">📊 Dashboard Overview</h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-2xl shadow-lg hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Jobs</h3>
            <Briefcase className="w-6 h-6 opacity-80" />
          </div>
          <p className="mt-3 text-sm">Total: {totalJobs}</p>
          <p className="text-sm">Active: {activeJobs}</p>
          <p className="text-sm">Archived: {archivedJobs}</p>
        </div>

        <div className="p-6 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-2xl shadow-lg hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Candidates</h3>
            <Users className="w-6 h-6 opacity-80" />
          </div>
          <p className="mt-3 text-sm">Total: {totalCandidates}</p>
          <div className="mt-2 space-y-1">
            {stages.map((stage, i) => (
              <div
                key={stage}
                className="flex justify-between text-xs bg-white/10 px-2 py-1 rounded"
              >
                <span className="capitalize">{stage}</span>
                <span>{candidatesByStage[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl shadow-lg hover:scale-105 transition-transform">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Assessments</h3>
            <FileCheck className="w-6 h-6 opacity-80" />
          </div>
          <p className="mt-3 text-sm">Total: {totalAssessments}</p>
        </div>
      </div>

      {/* Recent Candidates */}
      <div className="p-6 bg-white rounded-2xl shadow-lg">
        <h3 className="text-lg font-semibold mb-4">Recent Candidates</h3>
        <ul className="space-y-3">
          {candidates.slice(0, 5).map((c) => (
            <li
              key={c.id}
              className="flex justify-between items-center border-b last:border-none pb-2"
            >
              <div>
                <p className="font-medium">{c.name}</p>
                <p className="text-sm text-gray-500">{c.email}</p>
              </div>
              <StatusBadge status={c.stage} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
