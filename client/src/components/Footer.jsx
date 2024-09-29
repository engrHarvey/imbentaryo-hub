import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 p-6 text-center w-full border-t border-gray-700">
      <div className="container mx-auto">
        {/* Footer Text */}
        <p className="text-lg mb-2">
          © {new Date().getFullYear()} <span className="font-semibold">Harvey Abantao</span>. All rights reserved.
        </p>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mt-4">
          <a
            href="https://www.linkedin.com/in/harvey-abantao-a166a1124/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors duration-300"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/engrHarvey"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors duration-300"
          >
            GitHub
          </a>
          <a
            href="https://x.com/AbantaoHar92607"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-300 transition-colors duration-300"
          >
            Twitter
          </a>
        </div>

        {/* Bottom Text */}
        <p className="text-sm text-gray-500 mt-4">
          Made with <span className="text-red-500">♥</span> by Harvey Abantao
        </p>
      </div>
    </footer>
  );
};

export default Footer;
