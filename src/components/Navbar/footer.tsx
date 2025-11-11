import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 sm:mb-16 gap-6">
          <div>
            <h2 className="text-sm font-semibold mb-2">Journey</h2>
            <p className="text-base sm:text-lg md:text-xl font-medium">
              A Team Committed <br /> to Enhancing Every Journey
            </p>
          </div>

          <nav className="flex flex-wrap gap-4 sm:gap-6 text-sm mt-4 md:mt-0">
            <a href="#" className="hover:underline">Home</a>
            <a href="#" className="hover:underline">About Us</a>
            <a href="#" className="hover:underline">Services</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of Use</a>
          </nav>
        </div>

        {/* Large Background Text */}
        <div className="relative text-center mb-12 sm:mb-16 overflow-hidden">
          <h1 className="text-[4.5rem] sm:text-[8rem] md:text-[12rem] font-extrabold text-gray-300 tracking-tight leading-none">
            JOURNEY
          </h1>
        </div>

        {/* Social and Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-gray-200 pt-6 text-sm text-gray-600 gap-4">
          <div className="flex gap-4">
            <a href="#" className="hover:text-gray-800 transition-colors">
              <Facebook size={18} />
            </a>
            <a href="#" className="hover:text-gray-800 transition-colors">
              <Linkedin size={18} />
            </a>
            <a href="#" className="hover:text-gray-800 transition-colors">
              <Twitter size={18} />
            </a>
            <a href="#" className="hover:text-gray-800 transition-colors">
              <Instagram size={18} />
            </a>
          </div>

          <p className="text-xs">© 2025 Journey. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}