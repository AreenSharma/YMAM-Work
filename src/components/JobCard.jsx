import StatusBadge from "./StatusBadge";

export default function JobCard({ job, onEdit }) {
  return (
    <div className="p-4 border rounded-lg shadow-sm bg-white flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold">{job.title}</h3>
        <div className="flex gap-2 mt-1">
          {job.tags.map((tag, i) => (
            <span
              key={i}
              className="px-2 py-0.5 bg-gray-200 rounded-full text-xs"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex gap-3 items-center">
        <StatusBadge status={job.status} />
        <button
          onClick={onEdit}
          className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
