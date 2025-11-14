import React from "react";
import { Zap } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/90 backdrop-blur-sm border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo/Brand (Unified Gradient) */}
        <Link href={"/"} >
          <div className="flex items-center">
            <h1 className="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 flex items-center gap-2">
              LeadGen AI
            </h1>
          </div>
        </Link>

        {/* CTA Button (Primary Purple) */}
        <div>
          <Link href="/start">
            <button className="flex items-center justify-center px-5 py-2 text-sm font-semibold rounded-full bg-purple-600 hover:bg-purple-700 transition duration-300 shadow-lg shadow-purple-900/50">
              Start <Zap className="w-4 h-4 ml-2" />
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
