import { FaInstagram, FaFacebookF, FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#1a4731] text-white py-6 px-4 mt-20">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        
        {/* Footer Heading*/}
        <h2 className="text-5xl font-bold mb-4 tracking-tight">KeenKeeper</h2>
        <p className="max-w-xl text-gray-300 mb-8 text-sm md:text-base leading-relaxed">
          Your personal shelf of meaningful connections. Browse, tend, 
          and nurture the relationships that matter most.
        </p>

        {/* Social Media Links */}
        <div className="mb-10">
          <p className="text-m font-medium mb-4">Social Links</p>
          <div className="flex gap-4">
            
            {/* Instagram */}
            <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1a4731] hover:scale-110 transition-transform">
              <FaInstagram size={18} />
            </a>

            {/* Facebook */}
            <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1a4731] hover:scale-110 transition-transform">
              <FaFacebookF size={18} />
            </a>

            {/* X - Twitter */}
            <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1a4731] hover:scale-110 transition-transform">
              <FaXTwitter size={18} />
            </a>

          </div>
         </div>

         {/* Divider */}
         <div className="w-full border-t border-white/15 pt-6 flex flex-col md:flex-row justify-between items-center text-xs md:text-sm text-gray-400 gap-4">
          <p>&copy; 2026 KeenKeeper. All rights reserved.</p>
          <div className="flex gap-6 md:gap-10">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;