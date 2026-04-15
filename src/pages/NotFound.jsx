import { Link } from 'react-router-dom';
import { GiTrafficLightsRed } from "react-icons/gi";

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] gap-4 text-center px-6">
      <h1 className="text-8xl font-bold text-[#f50f0b]"><GiTrafficLightsRed /></h1>
      <h2 className="text-2xl font-semibold text-slate-700">Page Not Found</h2>
      <p className="text-[#2d6a4f] text-lg max-w-md">
        Oops! The page you're looking for, doesn't exist.
      </p>
      <Link
        to="/"
        className="mt-4 px-6 py-2 bg-[#2d6a4f] text-white rounded-lg font-semibold hover:bg-[#1a3c34] transition"
      >
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;