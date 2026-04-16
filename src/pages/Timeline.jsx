import { useState, useEffect } from 'react';
import callIcon from '../assets/call.png';
import textIcon from '../assets/text.png';
import videoIcon from '../assets/video.png';

const typeIcons = {
  Call: callIcon,
  Text: textIcon,
  Video: videoIcon,
};

export default function Timeline() {
  const [entries, setEntries] = useState([]);
  const [filter, setFilter] = useState('All');

  useEffect(() => {
  const stored = JSON.parse(localStorage.getItem('timelineEntries') || '[]');

  const timeout = setTimeout(() => {
    setEntries(stored);
  }, 0);
  return () => clearTimeout(timeout);
  }, []);

  const filtered = filter === 'All'
    ? entries
    : entries.filter(e => e.type === filter);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Timeline</h1>

      {/* Filter dropdown */}
      <div className="mb-6">
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="border border-slate-200 rounded-lg px-4 py-2 text-sm text-slate-600 bg-white focus:outline-none focus:ring-2 focus:ring-[#2d6a4f]"
        >
          <option value="All">Filter Timeline</option>
          <option value="Call">Call</option>
          <option value="Text">Text</option>
          <option value="Video">Video</option>
        </select>
      </div>

      {/* Timeline entries */}
      {filtered.length === 0 ? (
        <div className="text-center text-slate-400 py-20">
          <p className="text-lg">No entries yet.</p>
          <p className="text-sm mt-1">Go to a friend's page and log a check-in!</p>
        </div>
       ) : (
        <div className="flex flex-col gap-1">
          {filtered.map(entry => (
            <div
              key={entry.id}
              className="flex items-center gap-4 bg-white border border-slate-100 rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition"
            >
              {/* Icon */}
              <div className="w-10 h-10 flex items-center justify-center bg-slate-100 rounded-full shrink-0">
                <img
                  src={typeIcons[entry.type]}
                  alt={entry.type}
                  className="w-5 h-5 object-contain"
                />
              </div>

              {/* Text */}
              <div className="flex flex-col">
                <p className="text-slate-800 font-medium text-sm">
                  <span className="font-bold">{entry.type}</span> {entry.title.replace(entry.type, '').trim()}
                </p>
                <p className="text-slate-400 text-xs mt-0.5">{entry.date}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

 