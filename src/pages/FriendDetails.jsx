import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import callIcon from '../assets/call.png';
import textIcon from '../assets/text.png';
import videoIcon from '../assets/video.png';

const friendsData = await import('../data/friends.json');

  function FriendDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [friend, setFriend] = useState(null);

  useEffect(() => {
    const found = friendsData.default.find(f => f.id === parseInt(id));
    if (!found) navigate('/404');
    else setFriend(found);
  }, [id,navigate]);

  const handleCheckIn = (type) => {
    const entry = {
      id: Date.now(),
      type,
      title: `${type} with ${friend.name}`,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      })
    };

    const existing = JSON.parse(localStorage.getItem('timelineEntries') || '[]');
    localStorage.setItem('timelineEntries', JSON.stringify([entry, ...existing]));
    toast.success(`${type} with ${friend.name} logged!`);
  };

  const statusColor = {
    'on-track': 'bg-green-500',
    'overdue': 'bg-red-500',
    'almost due': 'bg-yellow-400',
  };

  if (!friend) return (
    <div className="flex justify-center items-center h-64">
      <span className="loading loading-spinner loading-lg text-[#2d6a4f]"></span>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Left col */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col items-center text-center gap-3">
          <img
            src={friend.picture}
            alt={friend.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-slate-100"
          />
          <h2 className="text-xl font-bold text-slate-800">{friend.name}</h2>

          <span className={`text-white text-xs font-semibold px-3 py-1 rounded-full ${statusColor[friend.status]}`}>
            {friend.status === 'on-track' ? 'On Track' : friend.status === 'overdue' ? 'Overdue' : 'Almost Due'}
          </span>

          <div className="flex flex-wrap justify-center gap-2">
            {friend.tags.map(tag => (
              <span key={tag} className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full">{tag}</span>
            ))}
          </div>

          <p className="text-slate-500 text-sm italic">"{friend.bio}"</p>
          <p className="text-slate-400 text-sm">{friend.email}</p>

          {/* Action Buttons , (icon copied from README) */}
          <div className="w-full flex flex-col gap-2 mt-4">
            <button
              onClick={() => toast('Snoozed for 2 weeks!')}
              className="w-full flex items-center justify-center gap-2 border border-slate-200 text-slate-700 py-2 rounded-lg hover:bg-slate-50 transition text-sm font-medium"
            >
              ⏰ Snooze 2 Weeks 
            </button>
            <button
              onClick={() => toast('Friend archived!')}
              className="w-full flex items-center justify-center gap-2 border border-slate-200 text-slate-700 py-2 rounded-lg hover:bg-slate-50 transition text-sm font-medium"
            >
              📦 Archive
            </button>
            <button
              onClick={() => toast.error('Friend deleted!')}
              className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-500 py-2 rounded-lg hover:bg-red-50 transition text-sm font-medium"
            >
              🗑️ Delete
            </button>
          </div>
        </div>

        {/* Right col */}
        <div className="flex flex-col gap-4">

          {/* Status card */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 text-center">
              <p className="text-2xl font-bold text-slate-800">{friend.days_since_contact}</p>
              <p className="text-xs text-slate-400 mt-1">Days Since Contact</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 text-center">
              <p className="text-2xl font-bold text-slate-800">{friend.goal}</p>
              <p className="text-xs text-slate-400 mt-1">Goal (days)</p>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4 text-center">
              <p className="text-lg font-bold text-slate-800">{friend.next_due_date}</p>
              <p className="text-xs text-slate-400 mt-1">Next Due Date</p>
            </div>
          </div>

          {/* Relationship goal */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-slate-700">Relationship Goal</h3>
              <button className="text-sm text-[#2d6a4f] font-medium hover:underline">Edit</button>
            </div>
            <p className="text-slate-500 text-sm mt-2">Connect every <span className="font-semibold text-slate-700">{friend.goal} days</span></p>
          </div>

          {/* Quick check-in */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
            <h3 className="font-semibold text-slate-700 mb-4">Quick Check-In</h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Call', icon: callIcon },
                { label: 'Text', icon: textIcon },
                { label: 'Video', icon: videoIcon },
              ].map(({ label, icon }) => (
                <button
                  key={label}
                  onClick={() => handleCheckIn(label)}
                  className="flex flex-col items-center gap-2 border border-slate-200 rounded-xl py-4 hover:bg-slate-50 hover:border-[#2d6a4f] transition"
                >
                  <img src={icon} alt={label} className="w-6 h-6 object-contain" />
                  <span className="text-sm text-slate-600 font-medium">{label}</span>
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
export default FriendDetails;