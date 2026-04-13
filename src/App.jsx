import { useState } from 'react'

import { BrowserRouter, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-500 flex flex-col items-center justify-center gap-4">
        
        {/* Testing Lucide Icon */}
        <CheckCircle className="text-green-600 w-16 h-16" />
        
        <h1 className="text-6xl font-bold text-brand-dark">
          Dependencies Verified!
        </h1>

        {/* Testing React Router Link */}
        <nav className="flex gap-4">
          <Link to="/" className="btn btn-outline btn-sm">Router Link Test</Link>
        </nav>

        <nav className="flex gap-4 p-4 bg-white rounded-xl shadow-inner">
        <Link to="/test-route" className="btn btn-primary btn-sm">
        Go to Test Route
        </Link>
        </nav>

        <p className="text-m text-white">
          Lucide, Router, and DaisyUI all firing.
        </p>
      </div>
    </BrowserRouter>
  )
}

export default App
