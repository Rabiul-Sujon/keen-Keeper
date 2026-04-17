import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

// import friendsData from '../data/friends.json'; 
//(galtisey mistake...)

// Status color helper
const getStatusStyle = (status) => {
  if (status === 'overdue') return 'bg-red-500 text-white';
  if (status === 'almost-due') return 'bg-yellow-400 text-white';
  if (status === 'on-track') return 'bg-green-500 text-white';
  return 'bg-gray-400 text-white';
};

const getStatusLabel = (status) => {
  if (status === 'overdue') return 'Overdue';
  if (status === 'almost-due') return 'Almost Due';
  if (status === 'on-track') return 'On Track';
  return status;
};

const getTagStyle = (tag) => {
  const colors = {
    'family': 'bg-blue-100 text-blue-700',
    'close friend': 'bg-purple-100 text-purple-700',
    'work': 'bg-orange-100 text-orange-700',
    'colleague': 'bg-orange-100 text-orange-700',
    'college': 'bg-green-100 text-green-700',
    'mentor': 'bg-red-100 text-red-700',
    'hobby': 'bg-pink-100 text-pink-700',
    'design': 'bg-pink-100 text-pink-700',
    'high school': 'bg-yellow-100 text-yellow-700',
    'old friend': 'bg-yellow-100 text-yellow-700',
    'neighbor': 'bg-teal-100 text-teal-700',
    'travel': 'bg-cyan-100 text-cyan-700',
  };
  return colors[tag] || 'bg-gray-100 text-gray-600';
};

function FriendCard({ friend }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/friend/${friend.id}`)}
      className="bg-white rounded-xl shadow-sm border border-slate-100 p-5 flex flex-col items-center gap-3 cursor-pointer hover:shadow-md transition-shadow"
    >
      <img
        src={friend.picture}
        alt={friend.name}
        className="w-16 h-16 rounded-full object-cover"
      />
      <h3 className="font-semibold text-gray-800 text-base">{friend.name}</h3>
      <p className="text-slate-400 text-sm">{friend.days_since_contact}d ago</p>

      <div className="flex flex-wrap gap-1 justify-center">
        {friend.tags.map((tag) => (
          <span
            key={tag}
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${getTagStyle(tag)}`}
          >
            {tag}
          </span>
        ))}
      </div>

      <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getStatusStyle(friend.status)}`}>
        {getStatusLabel(friend.status)}
      </span>
    </div>
  );
}

function Home() {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  // useEffect(() => {
  //   // Simulate loading
  //   setTimeout(() => {
  //     setFriends(friendsData);
  //     setLoading(false);
  //   }, 1000);
  // }, []);

   useEffect(() => {
    fetch('https://api.jsonbin.io/v3/b/69e20dce36566621a8c2b8c0')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        setFriends(data.record);
        setLoading(false);
      })
      .catch(err => {
         setError(err.message);
        setLoading(false);
      });

   }, []);

  // Summary card calculation
  const totalFriends = friends.length;
  const onTrack = friends.filter(f => f.status === 'on-track').length;
  const needAttention = friends.filter(f => f.status === 'overdue' || f.status === 'almost-due').length;
  const interactionsThisMonth = 5; 

   if (error) {
    return (
      <div className="flex justify-center py-20 text-red-500">
        Failed to load friends: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Banner */}
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-3">
          Friends to keep close in your life
        </h1>
        <p className="text-slate-500 text-base max-w-md mb-8">
          Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
        </p>
        <button className="flex items-center gap-2 bg-[#2d6a4f] hover:bg-[#245c43] text-white font-semibold px-5 py-2.5 rounded-lg transition-colors">
          <UserPlus size={18} />
          Add a Friend
        </button>
      </div>

      {/* Summary Cards */}
      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg text-[#2d6a4f]"></span>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 text-center">
              <p className="text-3xl font-bold text-gray-800">{totalFriends}</p>
              <p className="text-slate-500 text-sm mt-1">Total Friends</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 text-center">
              <p className="text-3xl font-bold text-gray-800">{onTrack}</p>
              <p className="text-slate-500 text-sm mt-1">On Track</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 text-center">
              <p className="text-3xl font-bold text-gray-800">{needAttention}</p>
              <p className="text-slate-500 text-sm mt-1">Need Attention</p>
            </div>
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 text-center">
              <p className="text-3xl font-bold text-gray-800">{interactionsThisMonth}</p>
              <p className="text-slate-500 text-sm mt-1">Interactions This Month</p>
            </div>
          </div>

          {/* Friends Grid */}
          <h2 className="text-xl font-bold text-gray-800 mb-5">Your Friends</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-16">
            {friends.map((friend) => (
              <FriendCard key={friend.id} friend={friend} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;