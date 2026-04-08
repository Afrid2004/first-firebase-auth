import React from "react";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="border-t border-gray-200 py-2 bg-white">
      <div className="container">
        <div className="flex gap-1 items-center justify-center">
          <p>&copy; {year} All Rights Reserved | Design & Developed By </p>
          <a
            className="text-orange-600 hover:underline font-medium"
            href="https://faisalafrid.vercel.app/"
            target="_blank"
          >
            Afrid
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
