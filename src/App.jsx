import { useState } from 'react'

import { Routes, Route, NavLink, Link } from 'react-router-dom';
import { Home as HomeIcon, Clock, BarChart3} from 'lucide-react'; // Icons
import logo from './assets/logo.png';
import Home from './pages/Home';
import FriendDetails from './pages/FriendDetails';
import Footer from './pages/Footer';
import { Toaster } from 'react-hot-toast';
import Timeline from './pages/Timeline';
import Stats from './pages/Stats';
import NotFound from './pages/NotFound';



function App() {
  // Logic for the button highlighting
  const navLinkStyles = ({ isActive }) => 
    `flex items-center gap-2 px-4 py-2 rounded-sm font-semibold transition-all ${
      isActive 
        ? 'bg-[#2d6a4f] text-white' //  green background for active
        : 'text-slate-500 hover:bg-slate-100' // Slate text for inactive
    }`;

  return (
    
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Toaster position="top-center" />

      
      <nav className="navbar bg-white shadow-sm border-b border-slate-100 px-15 h-20">
        <div className="flex-1">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Logo" className="h-5 md:h-10 w-auto object-contain filter brightness-125 contrast-120 saturate-150 scale-110 drop-shadow-sm"/>
          </Link>
        </div>

        <div className="flex-none">
          <ul className="flex gap-4">
            <li>
              <NavLink to="/" className={navLinkStyles}>
                <HomeIcon size={20} />
                <span className="hidden sm:inline">Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/timeline" className={navLinkStyles}>
                <Clock size={20} />
                <span className="hidden sm:inline">Timeline</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/stats" className={navLinkStyles}>
                <BarChart3 size={20} />
                <span className="hidden sm:inline">Stats</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>

      <main className="container mx-auto grow">
        <Routes>
          <Route path ="/" element={<Home/>}/>

          <Route path ="/timeline" element={<Timeline/>}
          />
          <Route path="/friend/:id" element={<FriendDetails />} />
          <Route path ="/stats" element={<Stats/>}/>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer/>
      
      
    </div>
    
  );
}

export default App;