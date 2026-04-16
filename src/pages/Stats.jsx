import { PieChart, Pie, Tooltip, ResponsiveContainer, Legend } from 'recharts';

 function Stats() {
  const entries = JSON.parse(localStorage.getItem('timelineEntries') || '[]');

  const counts = { Call: 0, Text: 0, Video: 0 };
  entries.forEach(i => {
    if (counts[i.type] !== undefined) counts[i.type]++;
  });

  const data = [
    { name: 'Text', value: counts.Text, fill: '#7c3aed' },
    { name: 'Call', value: counts.Call, fill: '#2d6a4f' },
    { name: 'Video', value: counts.Video, fill: '#1a3c34' },
  ];

  const total = data.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-800 mb-6">Friendship Analytics</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <p className="text-sm text-slate-500 mb-6">By Interaction Type</p>

        {total === 0 ? (
          <div className="text-center text-slate-400 py-20">
            <p className="text-lg">No interactions yet.</p>
            <p className="text-sm mt-1">Log some check-ins to see your stats!</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={120}
                paddingAngle={4}
                dataKey="value"
              />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
export default Stats;