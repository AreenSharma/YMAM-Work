import { useState } from "react";
import JobCard from "../components/JobCard";

export default function Jobs() {
  const [jobs, setJobs] = useState([
    { id: 1, title: "Frontend Developer", tags: ["React", "CSS"], status: "active" },
    { id: 2, title: "Backend Engineer", tags: ["Node.js", "MongoDB"], status: "draft" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [form, setForm] = useState({ title: "", tags: "", status: "active" });

  const openModal = (job = null) => {
    if (job) {
      console.log("Opening modal for EDIT", job);
      setEditingJob(job);
      setForm({
        title: job.title,
        tags: job.tags.join(", "),
        status: job.status,
      });
    } else {
      console.log("Opening modal for NEW job");
      setEditingJob(null);
      setForm({ title: "", tags: "", status: "active" });
    }
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const saveJob = () => {
    if (editingJob) {
      // Edit mode
      setJobs((prev) =>
        prev.map((j) =>
          j.id === editingJob.id
            ? { ...j, title: form.title, tags: form.tags.split(",").map(t => t.trim()), status: form.status }
            : j
        )
      );
      console.log("Updated job:", form);
    } else {
      // Add mode
      const newJob = {
        id: Date.now(),
        title: form.title,
        tags: form.tags.split(",").map(t => t.trim()),
        status: form.status,
      };
      setJobs((prev) => [...prev, newJob]);
      console.log("Created new job:", newJob);
    }
    closeModal();
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Jobs</h1>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          onClick={() => openModal()}
        >
          + Add Job
        </button>
      </div>

      <div className="grid gap-4">
        {jobs.map((job) => (
          <JobCard
            key={job.id}
            job={job}
            onEdit={() => openModal(job)}
          />
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md w-96">
            <h2 className="text-xl font-bold mb-4">
              {editingJob ? "Edit Job" : "Add Job"}
            </h2>

            <div className="mb-3">
              <label className="block text-sm font-medium">Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium">Tags (comma separated)</label>
              <input
                type="text"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="w-full border px-3 py-2 rounded-md"
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full border px-3 py-2 rounded-md"
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                onClick={closeModal}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                onClick={saveJob}
              >
                {editingJob ? "Save Changes" : "Create Job"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
